/*
 * VibeCoder Lab — 렌더링 엔진
 * --------------------------------------------------------------
 * 강의 내용은 content.js의 전역 COURSE에 있다. 이 파일은 화면을 그리고
 * 입력을 저장하는 일만 한다. 글을 고치려면 content.js를 수정하면 된다.
 */

const storeKey = "vibecoder-lab-redesign-v2";
let state = loadState();
let activeLevel = "rookie";
let activePage = 0;

const $ = (selector) => document.querySelector(selector);

/* ------------------------------- 상태 ------------------------------- */
function loadState() {
  try { return JSON.parse(localStorage.getItem(storeKey)) || {}; } catch { return {}; }
}
function saveState() {
  state.activeLevel = activeLevel;
  state.activePage = activePage;
  localStorage.setItem(storeKey, JSON.stringify(state));
}
function level() { return COURSE[activeLevel]; }
function courseState() {
  state.levels ||= {};
  state.levels[activeLevel] ||= { pages: {} };
  return state.levels[activeLevel];
}
function currentPage() { return level().pages[activePage] || level().pages[0]; }
function pageState() {
  const id = currentPage().id;
  const ls = courseState();
  ls.pages[id] ||= { fields: {}, checks: {}, complete: false };
  return ls.pages[id];
}
function field(name, fallback = "") { return pageState().fields[name] ?? fallback; }
function setField(name, value) { pageState().fields[name] = value; }

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (ch) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;", "'":"&#39;" }[ch]));
}
/* backtick으로 감싼 `명령어`를 클릭 복사 가능한 <code> 태그로 변환 */
function renderText(text) {
  return escapeHtml(text).replace(/`([^`]+)`/g, (_, cmd) =>
    `<code class="inline-code" title="클릭해서 복사">${cmd}</code>`
  );
}
function bindCodeCopy() {
  document.querySelectorAll(".inline-code").forEach((el) => {
    el.addEventListener("click", () => {
      navigator.clipboard?.writeText(el.textContent).then(() => toast("복사됐습니다."));
    });
  });
}
/* 페이지 객체의 practice.fields에서 key→label을 끌어온다(거대한 라벨 맵 대체). */
function fieldLabel(page, key) {
  const found = (page?.practice?.fields || []).find((f) => f.key === key);
  return found ? found.label : key;
}

const TOOL_MANUALS = {
  chatgpt: {
    name: "ChatGPT",
    context: "아이디어 정리, PRD 작성, 단일 HTML 코드 초안, 디버그 질문에 사용합니다.",
    steps: ["ChatGPT 페이지에 로그인합니다.", "만들 앱의 목표, 사용자, 기능, 조건을 한 번에 붙여넣습니다.", "불명확한 부분을 먼저 질문해 달라고 요청합니다.", "받은 결과를 실행해 보고, 안 되는 부분을 구체적으로 다시 요청합니다."]
  },
  claude: {
    name: "Claude",
    context: "긴 설명을 읽고 정리하거나, PRD와 코드 수정 요청을 차분히 다듬을 때 사용합니다.",
    steps: ["Claude에 로그인합니다.", "현재 단계의 PRD나 작업 지시서를 붙여넣습니다.", "먼저 이해한 내용을 요약하게 한 뒤 누락된 조건을 확인합니다.", "코드나 문구를 받으면 성공 기준과 비교해 수정 요청을 이어갑니다."]
  },
  gemini: {
    name: "Gemini",
    context: "Google 계정 기반으로 질문, 자료 정리, Gemini Gems, Gemini API 실습 준비에 사용합니다.",
    steps: ["Gemini에 Google 계정으로 로그인합니다.", "현재 만들 앱의 목적과 기능 3개를 입력합니다.", "답변이 너무 넓어지면 이번 단계에서 필요한 범위만 다시 지정합니다.", "반복해서 쓸 규칙은 Gemini Gems로 저장합니다."]
  },
  geminiGems: {
    name: "Gemini Gems",
    context: "반복해서 쓸 나만의 AI 코치 역할과 규칙을 저장할 때 사용합니다.",
    steps: ["Gemini Gems 만들기 페이지를 엽니다.", "Gem 이름을 정합니다.", "역할과 지침에 말투, 질문 방식, 보안 확인 규칙을 적습니다.", "저장한 뒤 해당 Gem을 열어 같은 규칙으로 대화를 시작합니다."]
  },
  geminiApi: {
    name: "Gemini API",
    context: "날씨, 예산, 준비물, 일정 데이터를 바탕으로 여행 준비 요약이나 추천 문구를 생성할 때 사용합니다.",
    steps: ["Gemini API 문서를 열고 사용 가능한 모델과 요청 형식을 확인합니다.", "API 키는 서버 환경변수에 저장하고 브라우저 코드에는 넣지 않습니다.", "앱에서 보낼 입력 데이터와 받을 결과 형식을 정합니다.", "테스트 응답을 확인한 뒤 실패했을 때 보여 줄 문구를 준비합니다."]
  },
  canva: {
    name: "Canva",
    context: "앱 화면 초안, 발표용 이미지, 사용자가 볼 화면 구성을 빠르게 시각화할 때 사용합니다.",
    steps: ["Canva에 로그인합니다.", "앱 스크린샷이나 휴대폰 목업 형식을 선택합니다.", "Magic Design에 화면 구성과 분위기를 적어 생성합니다.", "마음에 드는 초안을 저장하고 AI 코드 요청 때 참고 이미지로 사용합니다."]
  },
  netlify: {
    name: "Netlify",
    context: "단일 HTML 파일이나 정적 웹앱을 빠르게 인터넷 링크로 배포할 때 사용합니다.",
    steps: ["Netlify에 로그인합니다.", "Sites에서 새 사이트를 만들거나 Deploy manually를 선택합니다.", "index.html 또는 프로젝트 폴더를 드래그해서 올립니다.", "생성된 URL을 열어 첫 화면과 주요 버튼이 동작하는지 확인합니다."]
  },
  git: {
    name: "Git",
    context: "내 컴퓨터에서 파일 변경 기록을 남기고 GitHub로 올릴 준비를 할 때 사용합니다.",
    steps: ["Git 설치 파일을 내려받아 기본 옵션으로 설치합니다.", "설치 후 Git 버전이 보이는지 확인합니다.", "프로젝트 폴더에서 변경 파일을 확인합니다.", "작업 단위가 끝날 때 커밋으로 기록합니다."]
  },
  github: {
    name: "GitHub",
    context: "코드를 저장하고, 버전 기록을 남기고, 배포 서비스와 연결할 때 사용합니다.",
    steps: ["GitHub에 가입하고 로그인합니다.", "새 저장소를 만들거나 기존 저장소를 엽니다.", "Push 전에 API 키, 비밀번호, 개인정보가 없는지 확인합니다.", "파일이 올라간 뒤 GitHub 화면에서 변경 내용을 다시 확인합니다."]
  },
  githubPages: {
    name: "GitHub Pages",
    context: "GitHub 저장소의 정적 웹앱을 별도 서버 없이 공개 링크로 만들 때 사용합니다.",
    steps: ["GitHub 저장소 Settings로 이동합니다.", "Pages 메뉴에서 배포할 브랜치를 선택합니다.", "Save를 누르고 생성된 URL을 기다립니다.", "URL을 열어 새로고침과 모바일 화면을 확인합니다."]
  },
  claudeCode: {
    name: "Claude Code",
    context: "프로젝트 폴더를 열고 여러 파일 수정, 코드 설명, 구현 작업을 맡길 때 사용합니다.",
    steps: ["Claude Code를 실행합니다.", "작업할 프로젝트 폴더를 엽니다.", "PRD와 수정 범위, 보안 금지사항을 붙여넣습니다.", "변경 파일을 확인하고 실행 결과를 보며 수정 요청을 반복합니다."]
  },
  antigravity: {
    name: "Antigravity",
    context: "브라우저 흐름 확인, 화면 기반 작업, 여러 단계의 구현 점검에 사용합니다.",
    steps: ["Antigravity를 실행합니다.", "프로젝트 폴더나 확인할 화면을 엽니다.", "사용자가 누를 순서와 기대 결과를 지시합니다.", "화면에서 깨지는 지점이나 오류를 확인해 수정 요청으로 연결합니다."]
  },
  codex: {
    name: "Codex",
    context: "프로젝트 파일을 읽고 수정 방향을 제안하거나, 코드 변경과 검증을 함께 진행할 때 사용합니다.",
    steps: ["Codex에서 프로젝트 폴더를 엽니다.", "작업 목표와 건드리면 안 되는 범위를 적습니다.", "수정 전 확인할 파일과 성공 기준을 알려줍니다.", "변경 후 실행 결과, 문법 검사, 보안 점검을 확인합니다."]
  },
  vercel: {
    name: "Vercel",
    context: "GitHub 저장소와 연결해 웹앱을 배포하고 환경변수를 관리할 때 사용합니다.",
    steps: ["Vercel에 로그인합니다.", "Add New Project에서 GitHub 저장소를 연결합니다.", "필요한 환경변수를 Settings에서 등록합니다.", "배포 URL을 열어 주요 기능과 새로고침 동작을 확인합니다."]
  },
  cloudflarePages: {
    name: "Cloudflare Pages",
    context: "정적 웹앱을 빠르게 배포하고 GitHub 변경과 연결할 때 사용합니다.",
    steps: ["Cloudflare Pages에 로그인합니다.", "새 Pages 프로젝트를 만들고 GitHub 저장소를 연결합니다.", "빌드 설정을 확인하고 배포합니다.", "생성된 URL에서 화면과 주요 기능을 확인합니다."]
  },
  openMeteo: {
    name: "Open-Meteo",
    context: "API 키 없이 날씨 데이터를 불러오는 여행 준비 앱 실습에 사용합니다.",
    steps: ["Open-Meteo 문서를 엽니다.", "여행지의 위도, 경도와 날짜를 정합니다.", "샘플 URL로 날씨 응답이 오는지 확인합니다.", "앱에는 필요한 날씨 항목만 표시합니다."]
  },
  naverShopping: {
    name: "네이버 쇼핑 API",
    context: "준비물 구매 후보와 가격 검색 구조를 설계할 때 사용합니다. Client ID와 Secret은 브라우저에 넣지 않습니다.",
    steps: ["네이버 개발자 센터에서 애플리케이션을 등록합니다.", "쇼핑 검색 API 사용 권한을 확인합니다.", "Client ID와 Secret은 서버나 환경변수에만 보관합니다.", "프로리그에서는 요청 구조와 샘플 응답으로 먼저 화면을 설계합니다."]
  },
  supabase: {
    name: "Supabase",
    context: "로그인, 데이터베이스, 사용자별 데이터 분리를 한 서비스에서 다룰 때 사용합니다.",
    steps: ["Supabase에 로그인하고 새 프로젝트를 만듭니다.", "Auth에서 로그인 방식을 선택합니다.", "Database에 여행, 준비물, 예산 테이블을 만듭니다.", "RLS 정책으로 자기 데이터나 초대된 데이터만 보이게 설정합니다.", "API 키는 환경변수로 관리하고 화면에 직접 넣지 않습니다."]
  },
  firebase: {
    name: "Firebase",
    context: "Google 기반 로그인, Firestore 데이터 저장, 호스팅을 함께 사용할 때 검토합니다.",
    steps: ["Firebase 콘솔에서 프로젝트를 만듭니다.", "Authentication에서 로그인 제공자를 켭니다.", "Firestore에 사용자별 여행 데이터 구조를 만듭니다.", "Security Rules로 자기 데이터만 읽고 쓰게 제한합니다.", "배포 전 규칙과 테스트 계정을 확인합니다."]
  },
  clerk: {
    name: "Clerk",
    context: "로그인 화면과 사용자 관리를 빠르게 붙이고, 데이터베이스는 별도로 연결할 때 사용합니다.",
    steps: ["Clerk에 로그인하고 새 애플리케이션을 만듭니다.", "로그인 방식과 리디렉션 주소를 설정합니다.", "앱에서 현재 사용자 ID를 가져오도록 연결합니다.", "DB 저장 시 사용자 ID를 함께 저장합니다.", "다른 사용자의 데이터가 보이지 않는지 테스트합니다."]
  },
  pyinstaller: {
    name: "PyInstaller",
    context: "Python으로 만든 앱을 Windows exe 파일로 묶을 때 사용합니다.",
    steps: ["Python 프로젝트가 로컬에서 정상 실행되는지 확인합니다.", "PyInstaller를 설치합니다.", "진입 파일을 기준으로 exe를 생성합니다.", "다른 PC에서 실행해 보고 보안 경고 안내문을 준비합니다."]
  },
  electron: {
    name: "Electron",
    context: "웹 기술로 만든 앱을 데스크톱 프로그램처럼 패키징할 때 사용합니다.",
    steps: ["웹앱이 브라우저에서 정상 동작하는지 확인합니다.", "Electron 프로젝트 구조를 만듭니다.", "웹 화면을 Electron 창에 연결합니다.", "패키징 후 용량, 업데이트 방식, 보안 경고를 점검합니다."]
  },
  tauri: {
    name: "Tauri",
    context: "웹 기술 기반 데스크톱 앱을 비교적 가볍게 패키징할 때 검토합니다.",
    steps: ["웹앱 화면과 기능을 먼저 완성합니다.", "Tauri 요구 환경을 설치합니다.", "프론트엔드 빌드와 Tauri 설정을 연결합니다.", "exe 생성 후 실행, 권한, 보안 안내를 확인합니다."]
  }
};

function toolGuideKey(link) {
  const text = `${link?.label || ""} ${link?.url || ""}`.toLowerCase();
  const rules = [
    ["geminiGems", ["gems"]],
    ["geminiApi", ["gemini api"]],
    ["claudeCode", ["claude code"]],
    ["githubPages", ["github pages"]],
    ["cloudflarePages", ["cloudflare pages"]],
    ["naverShopping", ["naver", "shopping"]],
    ["openMeteo", ["open-meteo", "openmeteo"]],
    ["antigravity", ["antigravity"]],
    ["pyinstaller", ["pyinstaller"]],
    ["electron", ["electron"]],
    ["tauri", ["tauri"]],
    ["supabase", ["supabase"]],
    ["firebase", ["firebase"]],
    ["clerk", ["clerk"]],
    ["netlify", ["netlify"]],
    ["vercel", ["vercel"]],
    ["canva", ["canva"]],
    ["chatgpt", ["chatgpt", "chat.openai"]],
    ["claude", ["claude"]],
    ["gemini", ["gemini"]],
    ["codex", ["codex"]],
    ["git", ["git-scm"]],
    ["github", ["github"]]
  ];
  const found = rules.find(([, needles]) => needles.some((n) => text.includes(n)));
  return found ? found[0] : null;
}

function renderToolManuals(p) {
  const keys = [];
  (p.toolGuides || []).forEach((key) => keys.push(key));
  (p.links || []).forEach((link) => {
    const key = toolGuideKey(link);
    if (key) keys.push(key);
  });
  const unique = [...new Set(keys)].filter((key) => TOOL_MANUALS[key]);
  if (!unique.length) return "";
  return `<div class="tool-manuals">
    <div class="tool-manual-title">도구별 매뉴얼</div>
    ${unique.map((key) => {
      const guide = TOOL_MANUALS[key];
      return `<details class="tool-manual">
        <summary><span>${escapeHtml(guide.name)}</span><small>설치·활용 순서</small></summary>
        <div class="tool-manual-body">
          <p>${renderText(guide.context)}</p>
          <ol>${guide.steps.map((step) => `<li>${renderText(step)}</li>`).join("")}</ol>
        </div>
      </details>`;
    }).join("")}
  </div>`;
}

/* ------------------------------ 렌더 ------------------------------ */
function render() {
  renderLevels();
  renderPages();
  renderHeader();
  renderLesson();
  renderPractice();
  renderChecks();
  renderNotebook();
  renderHelp();
  saveState();
}

const LEAGUE_ICONS = {
  rookie: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12"/><path d="M5 3a7 7 0 0 0 7 7 7 7 0 0 0 7-7"/><path d="M5 3H3"/><path d="M19 3h2"/></svg>`,
  pro:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  master: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M5 20h14"/></svg>`
};

function renderLevels() {
  $("#levelList").innerHTML = Object.entries(COURSE).map(([id, item]) => {
    const saved = state.levels?.[id]?.pages || {};
    const total = item.pages.length;
    const done = item.pages.filter(p => saved[p.id]?.complete).length;
    const pct = total ? Math.round(done / total * 100) : 0;
    return `
      <button class="level-btn ${id === activeLevel ? "active" : ""}" type="button" data-level="${id}">
        <div class="level-btn-main">
          <span class="level-icon">${LEAGUE_ICONS[id] || ""}</span>
          <strong>${escapeHtml(item.name)}</strong>
          <span class="level-pct-badge">${pct}%</span>
        </div>
        <span class="level-sublabel">${escapeHtml(item.label)}</span>
        <div class="level-mini-track"><div class="level-mini-fill" style="width:${pct}%"></div></div>
      </button>`;
  }).join("");
}

function renderPages() {
  const pages = level().pages;
  $("#pageCounter").textContent = `${activePage + 1}/${pages.length}`;
  let html = "";
  let lastGroup = null;
  pages.forEach((item, idx) => {
    if (item.group && item.group !== lastGroup) {
      html += `<p class="page-group">${escapeHtml(item.group)}</p>`;
      lastGroup = item.group;
    }
    const done = courseState().pages[item.id]?.complete ? "완료" : "";
    html += `
      <button class="page-btn ${idx === activePage ? "active" : ""}" type="button" data-page="${idx}">
        <span class="num">${idx + 1}</span>
        <span><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.goal)}</span></span>
        <span class="done">${done}</span>
      </button>`;
  });
  $("#pageList").innerHTML = html;
}

function renderHeader() {
  const item = level();
  document.documentElement.style.setProperty("--accent", item.theme);
  document.documentElement.style.setProperty("--accent-strong", darkenTheme(item.theme));
  document.documentElement.style.setProperty("--accent-soft", softTheme(activeLevel));
  setLeagueClass(activeLevel);
  $("#levelIntro").textContent = item.description;

  // 전체 코스 진행률 (모든 리그 합산)
  let total = 0, done = 0;
  Object.entries(COURSE).forEach(([lid, lv]) => {
    const saved = state.levels?.[lid]?.pages || {};
    total += lv.pages.length;
    done += lv.pages.filter((p) => saved[p.id]?.complete).length;
  });
  const coursePct = total ? Math.round(done / total * 100) : 0;
  $("#courseProgressBar").style.width = `${coursePct}%`;
  $("#courseProgressText").textContent = `${coursePct}%`;
}

function renderLesson() {
  const p = currentPage();
  const pages = level().pages;

  // 강의 헤더: 브레드크럼 · 카운터 · 리그 진행바
  $("#crumbLevel").textContent = level().name;
  $("#crumbGroup").textContent = p.group || "";
  $("#pageBadge").textContent = `강의 ${activePage + 1} / ${pages.length}`;
  const levelDone = pages.filter((pg) => courseState().pages[pg.id]?.complete).length;
  const levelPct = Math.round(levelDone / pages.length * 100);
  $("#levelProgressBar").style.width = `${levelPct}%`;
  $("#levelProgressText").textContent = `${levelPct}% 완료`;

  $("#pageTitle").textContent = p.title;
  $("#pageGoal").textContent = p.goal;
  $("#summary").textContent = p.summary || "";
  $("#reading").innerHTML = renderText(p.reading || "");
  $("#terms").innerHTML = (p.terms || []).map((t) => `<dt>${escapeHtml(t.term)}</dt><dd>${renderText(t.def)}</dd>`).join("");
  renderVisual(p);
  $("#discussion").innerHTML = (p.discussion || []).map((q) =>
    `<li><span class="q-dot"></span><span>${renderText(q)}</span></li>`
  ).join("");
  $("#steps").innerHTML = (p.steps || []).map((s, i) =>
    `<li><span class="step-num">${i + 1}</span><span class="step-body">${renderText(s)}</span></li>`
  ).join("");
  const hasGuide = p.externalGuide || (p.links && p.links.length) || (p.toolGuides && p.toolGuides.length);
  if (hasGuide) {
    let guideHtml = `<strong>외부 도구 따라하기</strong>`;
    if (p.externalGuide) guideHtml += `<p>${renderText(p.externalGuide)}</p>`;
    if (p.links && p.links.length) {
      guideHtml += `<div class="guide-links">${p.links.map(l =>
        `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer" class="guide-link-btn">↗ ${escapeHtml(l.label)}</a>`
      ).join("")}</div>`;
    }
    guideHtml += renderToolManuals(p);
    $("#externalGuide").innerHTML = guideHtml;
  } else {
    $("#externalGuide").innerHTML = "";
  }

  bindCodeCopy();

  // 강의 이동 버튼 상태
  const order = Object.keys(COURSE);
  const atFirst = order.indexOf(activeLevel) === 0 && activePage === 0;
  const atLast = order.indexOf(activeLevel) === order.length - 1 && activePage === pages.length - 1;
  $("#prevPage").disabled = atFirst;
  $("#completePage").textContent = atLast ? "완료 ✓" : "완료하고 다음 →";
}

function visualHasContent(v) {
  return v && ((v.items && v.items.length) || (v.branches && v.branches.length) ||
    (v.steps && v.steps.length) || v.root || (v.columns && v.columns.length) ||
    (v.layers && v.layers.length));
}
function renderVisual(p) {
  const host = $("#visual");
  const v = p.visual;
  if (!visualHasContent(v)) { host.innerHTML = ""; host.classList.add("hidden"); return; }
  host.classList.remove("hidden");
  host.innerHTML = `
    <div class="visual-title"><span>${escapeHtml(v.caption || "")}</span><span>개념 정리</span></div>
    ${buildVisualHtml(v)}`;
}
function buildVisualHtml(v) {
  if (!v) return "";
  switch (v.type || "cards") {
    case "mindmap": return mindmapHtml(v);
    case "flow":    return flowHtml(v);
    case "tree":    return treeHtml(v);
    case "compare": return compareHtml(v);
    case "layers":  return layersHtml(v);
    default:        return cardsHtml(v);
  }
}
function cardsHtml(v) {
  return `<div class="concept">${(v.items || []).map((it) =>
    `<div class="concept-card"><strong>${escapeHtml(it.label)}</strong><span>${escapeHtml(it.text)}</span></div>`
  ).join("")}</div>`;
}
function mindmapHtml(v) {
  return `<div class="mindmap">
    <div class="mm-center">${escapeHtml(v.center || "")}</div>
    <div class="mm-branches">${(v.branches || []).map((b) => `
      <div class="mm-branch">
        <div class="mm-branch-label">${escapeHtml(b.label)}</div>
        ${(b.items || []).map((item) => `<div class="mm-leaf">${escapeHtml(item)}</div>`).join("")}
      </div>`).join("")}
    </div>
  </div>`;
}
function flowHtml(v) {
  const steps = v.steps || [];
  return `<div class="flow">${steps.map((s, i) => {
    const label = typeof s === "string" ? s : s.label;
    const sub = typeof s === "object" && s.sub ? s.sub : null;
    return `<div class="flow-step">
      <div class="flow-box"><strong>${escapeHtml(label)}</strong>${sub ? `<span>${escapeHtml(sub)}</span>` : ""}</div>
      ${i < steps.length - 1 ? `<div class="flow-arrow">→</div>` : ""}
    </div>`;
  }).join("")}</div>`;
}
function treeHtml(v) {
  function node(n, d) {
    const icons = ["🗂", "🌿", "📝"];
    const icon = icons[Math.min(d, icons.length - 1)];
    const kids = (n.children || []).map((c) => node(c, d + 1)).join("");
    return `<div class="tree-node depth-${d}">
      <div class="tree-label">${icon} ${escapeHtml(n.label)}</div>
      ${kids ? `<div class="tree-children">${kids}</div>` : ""}
    </div>`;
  }
  return `<div class="tree">${node({ label: v.root || "", children: v.children || [] }, 0)}</div>`;
}
function compareHtml(v) {
  return `<div class="compare">${(v.columns || []).map((col) => `
    <div class="compare-col">
      <div class="compare-head">${escapeHtml(col.label)}</div>
      ${(col.items || []).map((item) => `<div class="compare-item">${escapeHtml(item)}</div>`).join("")}
    </div>`).join("")}</div>`;
}
function layersHtml(v) {
  return `<div class="layers">${(v.layers || []).map((l, i) => `
    <div class="layer-item layer-${i}">
      <strong>${escapeHtml(l.label)}</strong><span>${escapeHtml(l.desc || "")}</span>
    </div>`).join("")}</div>`;
}

function darkenTheme(color) {
  return { "#0056d2":"#1d4ed8", "#1a8754":"#0f766e", "#c47800":"#a16207" }[color] || "#1d4ed8";
}
function softTheme(levelId) {
  return { rookie:"#eff6ff", pro:"#f0fdfa", master:"#fefce8" }[levelId] || "#eff6ff";
}
function setLeagueClass(levelId) {
  document.body.classList.remove("league-rookie", "league-pro", "league-master");
  document.body.classList.add("league-" + levelId);
}

/* ------------------------------ 실습 ------------------------------ */
function renderPractice() {
  const p = currentPage();
  $("#practiceArea").innerHTML = practiceHtml(p);
  bindPractice();
  updatePreview();
  updateResult();
}

function practiceHtml(p) {
  const pr = p.practice || { kind: "form", fields: [] };
  const inner = (pr.fields || []).map(fieldHtml).join("");
  if (pr.kind === "mini") {
    return wrapFields(inner + `<iframe id="miniPreview" class="mini-preview" title="미니 페이지 미리보기" sandbox=""></iframe>`);
  }
  if (pr.kind === "build") {
    return wrapFields(inner + `<iframe id="miniPreview" class="mini-preview build-preview" title="앱 미리보기" sandbox="allow-scripts allow-same-origin"></iframe>`);
  }
  if (pr.kind === "share") {
    return wrapFields(inner + shareExtraHtml());
  }
  return wrapFields(inner);
}

function wrapFields(inner) {
  return `<div class="fields">${inner}<div id="result" class="result"></div></div>`;
}

function fieldHtml(f) {
  const input = f.input || "textarea";
  const val = field(f.key, f.value ?? "");
  const ph = escapeHtml(f.placeholder || "");
  const chipsHtml = (f.chips || []).length
    ? `<div class="chip-guide">${f.chips.map(c =>
        `<button type="button" class="guide-chip" data-chip-field="${f.key}" data-chip-text="${escapeHtml(c)}">${escapeHtml(c)}</button>`
      ).join("")}</div>`
    : "";
  if (input === "text") {
    return `<label>${escapeHtml(f.label)}${chipsHtml}<input data-field="${f.key}" value="${escapeHtml(val)}" placeholder="${ph}"></label>`;
  }
  if (input === "select") {
    const opts = (f.options || []).map((o) => `<option ${o === val ? "selected" : ""}>${escapeHtml(o)}</option>`).join("");
    return `<label>${escapeHtml(f.label)}${chipsHtml}<select data-field="${f.key}">${opts}</select></label>`;
  }
  if (input === "choice") {
    const buttons = (f.choices || []).map((c) => `
      <button type="button" class="choice ${c.value === val ? "active" : ""}" data-choice-field="${f.key}" data-choice-value="${escapeHtml(c.value)}">
        <strong>${escapeHtml(c.value)}</strong><br>${escapeHtml(c.desc || "")}
      </button>`).join("");
    return `<label>${escapeHtml(f.label)}${chipsHtml}<div class="choice-row">${buttons}</div></label>`;
  }
  return `<label>${escapeHtml(f.label)}${chipsHtml}<textarea data-field="${f.key}" placeholder="${ph}">${escapeHtml(val)}</textarea></label>`;
}

function shareExtraHtml() {
  return `
    <label class="check-item"><input data-share-check="safe" type="checkbox" ${pageState().checks.safe ? "checked" : ""}><span>비밀번호·API 키·개인정보가 없습니다.</span></label>
    <div class="two">
      <button id="copyShare" type="button">공유글 복사</button>
      <button id="openPadlet" type="button">Padlet 열기</button>
    </div>`;
}

function bindPractice() {
  document.querySelectorAll("[data-field]").forEach((node) => {
    node.addEventListener("input", () => {
      setField(node.dataset.field, node.value);
      updatePreview(); updateResult(); renderNotebook(); renderHelp(); saveState();
    });
  });
  document.querySelectorAll("[data-chip-field]").forEach((node) => {
    node.addEventListener("click", () => {
      const key = node.dataset.chipField;
      const text = node.dataset.chipText;
      const cur = field(key, "");
      const newVal = cur ? cur + (cur.endsWith("\n") ? "" : "\n") + text : text;
      setField(key, newVal);
      const el = document.querySelector(`[data-field="${key}"]`);
      if (el) el.value = newVal;
      updatePreview(); updateResult(); renderNotebook(); renderHelp(); saveState();
    });
  });
  document.querySelectorAll("[data-choice-field]").forEach((node) => {
    node.addEventListener("click", () => {
      setField(node.dataset.choiceField, node.dataset.choiceValue);
      renderPractice(); renderNotebook(); saveState();
    });
  });
  document.querySelectorAll("[data-share-check]").forEach((node) => {
    node.addEventListener("change", () => {
      pageState().checks[node.dataset.shareCheck] = node.checked;
      saveState();
    });
  });
  $("#copyShare")?.addEventListener("click", () => copyText(buildShareText(), "공유글을 복사했습니다."));
  $("#openPadlet")?.addEventListener("click", () => window.open(level().padletUrl, "_blank", "noopener"));
}

function updatePreview() {
  const frame = $("#miniPreview");
  if (!frame) return;
  const p = currentPage();
  if (p.practice?.kind === "build") {
    const code = field("htmlCode", "").trim();
    frame.srcdoc = code ||
      `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>body{margin:0;min-height:100%;display:flex;align-items:center;justify-content:center;background:#f3f4f6;font-family:sans-serif;padding:40px;box-sizing:border-box}.card{background:#fff;border-radius:12px;padding:36px 28px;max-width:380px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.08)}.icon{font-size:44px;margin-bottom:14px}.msg{font-size:15px;line-height:1.75;color:#6b7280}</style></head><body><div class="card"><div class="icon">🖥️</div><p class="msg">AI에게 받은 HTML 코드를<br><b>위 입력칸에 붙여넣으면</b><br>여기서 바로 실행됩니다.</p></div></body></html>`;
    return;
  }
  const color = /^#[0-9a-fA-F]{6}$/.test(field("color", "#0056d2")) ? field("color", "#0056d2") : "#0056d2";
  frame.srcdoc = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f8faf6;font-family:sans-serif;color:#1f292c}main{width:min(88%,520px);border:1px solid #d8ded4;border-radius:8px;background:white;padding:24px}h1{color:${color};margin-top:0}button{border:0;border-radius:8px;background:${color};color:white;padding:10px 14px}</style></head><body><main><h1>${escapeHtml(field("appName", "오늘 할 일"))}</h1><p>${escapeHtml(field("screenText", "오늘 해야 할 일을 적고 하나씩 체크해 보세요."))}</p><button>할 일 추가</button></main></body></html>`;
}

function updateResult() {
  const box = $("#result");
  if (!box) return;
  box.textContent = outputForCurrentPage();
}

function outputForCurrentPage() {
  const p = currentPage();
  if (p.practice?.kind === "share") return buildShareText();
  const entries = Object.entries(pageState().fields).filter(([, v]) => String(v || "").trim());
  return entries.length ? entries.map(([k, v]) => `${fieldLabel(p, k)}: ${v}`).join("\n") : "실습을 작성하면 이곳에 결과물이 정리됩니다.";
}

/* ----------------------------- 확인하기 ----------------------------- */
function renderChecks() {
  const ps = pageState();
  $("#checks").innerHTML = (currentPage().checks || []).map((item, idx) =>
    `<label class="check-item"><input data-check="${idx}" type="checkbox" ${ps.checks[idx] ? "checked" : ""}><span>${escapeHtml(item)}</span></label>`
  ).join("");
  document.querySelectorAll("[data-check]").forEach((node) =>
    node.addEventListener("change", () => { ps.checks[node.dataset.check] = node.checked; saveState(); renderNotebook(); })
  );
}

/* ----------------------------- 결과물 ----------------------------- */
function renderNotebook() {
  const parts = [`# VibeCoder Lab - ${level().name} 결과물`, `Padlet: ${level().padletUrl}`, ""];
  level().pages.forEach((p) => {
    const saved = courseState().pages[p.id];
    if (!saved) return;
    parts.push(`## ${p.title}`);
    parts.push(`완료: ${saved.complete ? "예" : "아니오"}`);
    Object.entries(saved.fields).forEach(([k, v]) => { if (String(v || "").trim()) parts.push(`- ${fieldLabel(p, k)}: ${v}`); });
    parts.push("");
  });
  $("#notebook").value = parts.join("\n");
}

function buildShareText() {
  return [
    `[${level().name}] ${field("title", "나의 VibeCoder Lab 결과물")}`,
    "",
    `닉네임: ${field("nickname", "")}`,
    "PRD 요약:",
    summarizePrd(),
    "",
    "만든 것:",
    $("#notebook")?.value || "",
    "",
    `배운 점: ${field("learned", "")}`,
    `도움받고 싶은 점: ${field("help", "")}`
  ].join("\n");
}

function summarizePrd() {
  const prdEntry = Object.entries(courseState().pages).find(([id]) => id.includes("prd"));
  if (!prdEntry) return "아직 PRD 페이지를 작성하지 않았습니다.";
  const prdPage = level().pages.find((pg) => pg.id === prdEntry[0]);
  const lines = Object.entries(prdEntry[1].fields)
    .filter(([, v]) => String(v || "").trim())
    .map(([k, v]) => `- ${fieldLabel(prdPage, k)}: ${v}`);
  return lines.length ? lines.join("\n") : "PRD 입력값이 비어 있습니다.";
}

/* ----------------------------- 막혔을 때 ----------------------------- */
function renderHelp() {
  const type = $("#helpType").value;
  const memo = $("#helpMemo").value.trim();
  const intro = {
    term: "아래 내용을 코딩을 모르는 사람도 이해하게 쉽게 설명해 줘.",
    prompt: "바로 만들지 말고 필요한 정보를 먼저 질문하는 프롬프트를 만들어 줘.",
    tool: "외부 도구에서 따라 할 순서와 체크리스트를 만들어 줘.",
    review: "내 결과물이 목표를 달성했는지 확인해 줘."
  }[type];
  $("#helpPrompt").textContent = [
    intro, "",
    `레벨: ${level().name}`,
    `페이지: ${currentPage().title}`,
    `목표: ${currentPage().goal}`,
    `내 입력: ${JSON.stringify(pageState().fields, null, 2)}`,
    `상황 메모: ${memo || "없음"}`,
    "",
    "쉬운 한국어로 답하고, 민감정보가 있으면 먼저 제거하라고 알려 줘."
  ].join("\n");
}

/* ========================== 발표 모드 ========================== */
let presSlides = [];
let presIdx = 0;

function buildSlides(page) {
  const slides = [{ type: "title", title: page.title, goal: page.goal }];
  if (page.summary) slides.push({ type: "summary", content: page.summary });
  if (page.reading) slides.push({ type: "reading", content: page.reading });
  if (page.terms && page.terms.length) slides.push({ type: "terms", items: page.terms });
  if (visualHasContent(page.visual))
    slides.push({ type: "visual", visual: page.visual });
  if (page.discussion && page.discussion.length) slides.push({ type: "discussion", items: page.discussion });
  if (page.steps && page.steps.length) slides.push({ type: "steps", items: page.steps });
  return slides;
}

function renderPresSlide() {
  const slide = presSlides[presIdx];
  let html = "";
  switch (slide.type) {
    case "title":
      html = `<div class="pres-title-slide">
        <span class="pres-league-chip">${escapeHtml(level().name)}</span>
        <h1 class="pres-main-title">${escapeHtml(slide.title)}</h1>
        <p class="pres-slide-goal">${escapeHtml(slide.goal)}</p>
      </div>`;
      break;
    case "summary":
      html = `<div class="pres-section-slide">
        <p class="pres-section-label">한 줄 핵심</p>
        <blockquote class="pres-summary-text">${escapeHtml(slide.content)}</blockquote>
      </div>`;
      break;
    case "reading":
      html = `<div class="pres-section-slide">
        <p class="pres-section-label">읽고 이해하기</p>
        <p class="pres-body-text">${renderText(slide.content)}</p>
      </div>`;
      break;
    case "terms":
      html = `<div class="pres-section-slide">
        <p class="pres-section-label">용어 사전</p>
        <dl class="pres-terms">${slide.items.map((t) => `
          <div class="pres-term-row"><dt>${escapeHtml(t.term)}</dt><dd>${escapeHtml(t.def)}</dd></div>`).join("")}
        </dl>
      </div>`;
      break;
    case "visual":
      html = `<div class="pres-section-slide">
        <p class="pres-section-label">${escapeHtml(slide.visual?.caption || "개념 정리")}</p>
        <div class="pres-visual-wrap">${buildVisualHtml(slide.visual || {})}</div>
      </div>`;
      break;
    case "discussion":
      html = `<div class="pres-section-slide">
        <p class="pres-section-label">생각해보기</p>
        <ul class="pres-list">${slide.items.map((q) => `<li>${escapeHtml(q)}</li>`).join("")}</ul>
      </div>`;
      break;
    case "steps":
      html = `<div class="pres-section-slide">
        <p class="pres-section-label">따라하기</p>
        <ol class="pres-list">${slide.items.map((s) => `<li>${renderText(s)}</li>`).join("")}</ol>
      </div>`;
      break;
  }
  $("#presSlide").innerHTML = html;
  bindCodeCopy();
  $("#presCounter").textContent = `${presIdx + 1} / ${presSlides.length}`;
  $("#presPrev").disabled = presIdx === 0;
  $("#presNext").disabled = presIdx === presSlides.length - 1;
  $("#presDots").innerHTML = presSlides.map((_, i) =>
    `<span class="pres-dot ${i === presIdx ? "active" : ""}" data-pres-idx="${i}"></span>`).join("");
  // 슬라이드 상단으로 스크롤
  $("#presSlide").closest(".pres-stage").scrollTop = 0;
}

function enterPresentation() {
  const page = currentPage();
  presSlides = buildSlides(page);
  presIdx = 0;
  $("#presLeagueBadge").textContent = level().name;
  $("#presLessonName").textContent = page.title;
  const overlay = $("#presentationOverlay");
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  renderPresSlide();
  document.addEventListener("keydown", handlePresKey);
}

function exitPresentation() {
  const overlay = $("#presentationOverlay");
  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");
  document.removeEventListener("keydown", handlePresKey);
}

function handlePresKey(e) {
  if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
    e.preventDefault();
    if (presIdx < presSlides.length - 1) { presIdx++; renderPresSlide(); }
  } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    if (presIdx > 0) { presIdx--; renderPresSlide(); }
  } else if (e.key === "Escape") {
    exitPresentation();
  }
}

/* ------------------------------ 이벤트 ------------------------------ */
function bindGlobal() {
  document.body.addEventListener("click", (event) => {
    const levelBtn = event.target.closest("[data-level]");
    if (levelBtn) { activeLevel = levelBtn.dataset.level; activePage = 0; render(); return; }
    const pageBtn = event.target.closest("[data-page]");
    if (pageBtn) { activePage = Number(pageBtn.dataset.page); render(); }
  });
  $("#savePage").addEventListener("click", () => { saveState(); renderNotebook(); toast("저장했습니다."); });
  $("#prevPage").addEventListener("click", () => {
    const order = Object.keys(COURSE);
    if (activePage > 0) { activePage -= 1; }
    else {
      const i = order.indexOf(activeLevel);
      if (i > 0) { activeLevel = order[i - 1]; activePage = COURSE[activeLevel].pages.length - 1; }
      else return;
    }
    window.scrollTo(0, 0);
    render();
  });
  $("#completePage").addEventListener("click", () => {
    pageState().complete = true;
    const order = Object.keys(COURSE);
    if (activePage < level().pages.length - 1) {
      activePage += 1;
      toast("강의를 완료했습니다.");
    } else {
      const i = order.indexOf(activeLevel);
      if (i < order.length - 1) {
        const finished = level().name;
        activeLevel = order[i + 1];
        activePage = 0;
        toast(`${finished}을 마쳤습니다. 다음 리그로 이동합니다.`);
      } else {
        toast("모든 강의를 완료했습니다! 🎉");
      }
    }
    window.scrollTo(0, 0);
    render();
  });
  $("#presentBtn").addEventListener("click", enterPresentation);
  $("#presClose").addEventListener("click", exitPresentation);
  $("#presPrev").addEventListener("click", () => { if (presIdx > 0) { presIdx--; renderPresSlide(); } });
  $("#presNext").addEventListener("click", () => { if (presIdx < presSlides.length - 1) { presIdx++; renderPresSlide(); } });
  document.body.addEventListener("click", (e) => {
    const dot = e.target.closest("[data-pres-idx]");
    if (dot) { presIdx = Number(dot.dataset.presIdx); renderPresSlide(); }
  });
  $("#copyAll").addEventListener("click", () => copyText($("#notebook").value, "결과물을 복사했습니다."));
  $("#copyHelp").addEventListener("click", () => copyText($("#helpPrompt").textContent, "도움 요청을 복사했습니다."));
  $("#helpType").addEventListener("change", renderHelp);
  $("#helpMemo").addEventListener("input", renderHelp);
  $("#resetAll").addEventListener("click", () => {
    if (!confirm("진행 상태와 작성한 내용을 모두 지울까요?")) return;
    localStorage.removeItem(storeKey);
    state = {};
    activeLevel = "rookie";
    activePage = 0;
    render();
    toast("초기화했습니다.");
  });
}

async function copyText(text, message) {
  try { await navigator.clipboard.writeText(text); toast(message); } catch { toast("복사 권한을 확인해주세요."); }
}
function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  setTimeout(() => node.classList.remove("show"), 1700);
}

bindGlobal();
render();
