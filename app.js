/*
 * VibeCoder Lab — 렌더링 엔진
 * --------------------------------------------------------------
 * 강의 내용은 content.js의 전역 COURSE에 있다. 이 파일은 화면을 그리고
 * 입력을 저장하는 일만 한다. 글을 고치려면 content.js를 수정하면 된다.
 */

const storeKey = "vibecoder-lab-redesign-v2";
let state = loadState();
let activeLevel = state.activeLevel && COURSE[state.activeLevel] ? state.activeLevel : "rookie";
let activePage = Number.isInteger(state.activePage) ? state.activePage : 0;
if (activePage < 0 || activePage >= COURSE[activeLevel].pages.length) activePage = 0;

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

function renderLevels() {
  $("#levelList").innerHTML = Object.entries(COURSE).map(([id, item]) => `
    <button class="level-btn ${id === activeLevel ? "active" : ""}" type="button" data-level="${id}">
      <strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.label)}</span>
    </button>
  `).join("");
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
  $("#discussion").innerHTML = (p.discussion || []).map((q) => `<li>${renderText(q)}</li>`).join("");
  $("#steps").innerHTML = (p.steps || []).map((s) => `<li>${renderText(s)}</li>`).join("");
  const hasGuide = p.externalGuide || (p.links && p.links.length);
  if (hasGuide) {
    let guideHtml = `<strong>외부 도구 따라하기</strong>`;
    if (p.externalGuide) guideHtml += `<p>${renderText(p.externalGuide)}</p>`;
    if (p.links && p.links.length) {
      guideHtml += `<div class="guide-links">${p.links.map(l =>
        `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer" class="guide-link-btn">↗ ${escapeHtml(l.label)}</a>`
      ).join("")}</div>`;
    }
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
  return { "#0056d2":"#003d99", "#1a8754":"#136640", "#c47800":"#9a5e00" }[color] || "#003d99";
}
function softTheme(levelId) {
  return { rookie:"#e8f0fe", pro:"#e6f4ed", master:"#fef3e2" }[levelId] || "#e8f0fe";
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
