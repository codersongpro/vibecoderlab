/*
 * VibeCoder Lab — 커리큘럼 콘텐츠 (단일 출처)
 * --------------------------------------------------------------
 * 한 페이지 = 한 객체. 이 파일만 고치면 강의 내용이 바뀐다.
 * app.js(렌더링 엔진)는 아래 COURSE 전역만 읽는다.
 *
 * 페이지 객체 필드
 *   id          페이지 식별자(리그 안에서 고유)
 *   group       사이드바 단계 묶음 헤더
 *   title       페이지 제목
 *   goal        학습 목표 한 줄("~할 수 있다")
 *   summary     한 줄 핵심(TL;DR) — 맨 위에 표시
 *   reading     읽고 이해하기(개념 + 예시)
 *   terms       용어 사전 [{term, def}]
 *   discussion  생각해보기(페이지별 고유 질문) [문자열]
 *   steps       따라하기 [문자열]
 *   visual      개념 도식(선택) {caption, items:[{label,text}]} — 없으면 숨김
 *   practice    실습 {kind, fields:[{key,label,input,placeholder,value,options,choices}]}
 *               · 실습 입력은 비워 두고 placeholder로 예시를 보여 준다(사용자가 자기 앱을 작성).
 *   checks      확인하기 체크 [문자열]
 *   externalGuide 외부 도구 따라하기 안내(선택)
 *   difficulty/estimatedMinutes/updatedAt/completionRequirements  Phase 4 메타데이터(선택, 없으면 숨김)
 *   presenterNotes  발표 모드 발표자 노트(선택) {title, steps, checks}
 *
 * runPlan 저작 규칙
 *   - 세션 title 끝에 "(NN분)"으로 분량을 표기한다.
 *   - 그 NN은 세션 pages의 estimatedMinutes 합계와 정확히 일치해야 한다.
 *   - 강의 시간을 바꾸면 그 강의가 속한 모든 runPlan 세션의 표기를 함께 고친다.
 *   - 리그의 모든 강의는 최소 하나의 runPlan 세션에 등장해야 한다.
 *
 * 기본 예시는 "여행 준비 앱"이 리그마다 성장하는 흐름이다.
 * 사용자는 예시를 그대로 따라 해도 되고, 캠핑·출장·이사·운동 준비처럼 자기 앱으로 바꿔도 된다.
 *
 * 톤 & 보이스 가이드라인 (학생 수업과 교사 연수 양쪽에서 그대로 쓰는 글)
 *   - 이 콘텐츠는 학생과(연수에 참여하는) 성인 교사가 동일한 문장으로 읽는다. 한쪽만 겨냥한 어투를 쓰지 않는다.
 *   - 유아적 권유체("~해볼까요?", "우리 함께", "재밌게", "화이팅", "친구들아")·과도한 감탄사·이모지를 쓰지 않는다.
 *   - 학습 목표(goal)는 "~할 수 있다" 평서형을 유지한다. 지시(steps)는 간결한 명령형으로 쓴다.
 *   - 학습자를 가리킬 때는 "여러분"처럼 중립적인 표현만 쓰고, 낮춤·아동 지칭은 쓰지 않는다.
 *   - presenterNotes/facilitator 계열 필드는 교사를 동료 전문가로 대하는 톤(설명보다 운영 팁 중심)으로 쓴다.
 */

const COURSE = {
  /* ============================== 루키리그 ============================== */
  rookie: {
    name: "루키리그",
    theme: "#0056d2",
    label: "AI에게 코드를 받아 내 첫 앱을 만들고 배포한다",
    description: "시나리오: 한 파일짜리 여행 준비 미니앱을 만듭니다. 준비물 체크, 코스 후보 뽑기, 간단 예산 합계를 넣고 Netlify로 배포합니다. 교사 연수라면 같은 구조로 '수업 준비 미니앱'을 만드세요 — 준비물 체크는 수업 자료 체크로, 코스 뽑기는 랜덤 발표자 뽑기로, 예산 합계는 학급비 합계로 바꾸면 그대로 맞아떨어집니다. 캠핑·출장·이사·운동 준비, 가계부, 식단 체크처럼 자기 일상 앱으로 바꿔도 됩니다.",
    tags: ["Prompt·Context·Harness", "AI 코드 받기", "Netlify/Vercel 배포", "첫 앱 완성"],
    padletUrl: "https://padlet.com/dungstme/_-guhr4cbmj43e82ew",
    competency: "AI에게 요청해 한 파일짜리 앱을 완성하고 인터넷에 배포한다",
    finalOutput: "실제로 쓸 수 있는 HTML 단일 파일 앱 + 공개 배포 링크",
    prerequisites: "브라우저와 이메일 주소(코딩 경험 불필요)",
    graduationRequirements: [
      "내 아이디어를 한 문장과 PRD로 정리했다",
      "AI에게 받은 코드를 실행해 한 화면 앱을 완성했다",
      "오류를 1개 이상 직접 수정했다",
      "Netlify/Vercel로 배포해 공개 링크를 얻었다"
    ],
    capstone: {
      deliverable: "준비물 체크·후보 뽑기·예산 합계를 담은 한 파일짜리 미니앱(또는 같은 구조의 자기 아이디어 앱)",
      doneCriteria: [
        "배포 링크가 실제로 열리고 핵심 기능 1개 이상이 동작한다",
        "PRD에 적은 문제·기능·완료 기준이 실제 앱과 일치한다",
        "오류를 직접 고친 기록이 남아 있다"
      ],
      useInDailyLife: "다음 여행을 준비할 때 메모장 대신 이 링크를 열어 준비물·예산을 정리하고, 같은 구조를 가계부·운동 루틴·할 일 관리 앱으로 바꿔 계속 쓸 수 있습니다."
    },
    facilitatorIntro: "1차시(45~50분) 또는 단기 연수 한 모듈로 운영할 수 있습니다. 코딩 경험이 없는 참가자도 'AI에게 요청 → 받은 코드 실행 → 배포'까지 같은 시간에 끝낼 수 있도록 설계되어 있습니다. 진행 중 막히는 지점은 대부분 계정 가입·이메일 인증이므로, 시작 전 네트워크·메일 정책을 먼저 확인하면 흐름이 끊기지 않습니다.",
    runPlan: [
      {
        name: "5차시 표준형(차시당 40~55분)",
        note: "차시마다 직전 차시 산출물을 5분 점검 후 시작한다. 각 차시 제목의 분량은 강의별 예상 시간을 합한 값이다.",
        sessions: [
          { title: "1차시 — 환경·개념 시작 (35분)", pages: ["setup-rookie", "vibe"] },
          { title: "2차시 — Prompt·Context·Harness (40분)", pages: ["pch", "rules"] },
          { title: "3차시 — 질문과 PRD (40분)", pages: ["chatgpt", "prd-basic"] },
          { title: "4차시 — 만들고 배포하기 (50분)", pages: ["build-rookie", "deploy-rookie"] },
          { title: "5차시 — 확장과 공유 (55분)", pages: ["gemini", "canva", "share"] }
        ]
      },
      {
        name: "90분 특강형(계정 가입은 사전 과제)",
        note: "만들어서 배포하는 경험만 압축한 편성이다. 계정 가입(setup-rookie)은 반드시 사전 과제로 끝내고 오게 한다. 개념 강의(pch·rules·chatgpt)와 확장 강의(gemini·canva·share)는 다루지 않으므로, 배포까지가 아니라 개념까지 필요하면 5차시 표준형을 쓴다.",
        sessions: [
          { title: "전체 한 번에 (90분)", pages: ["vibe", "prd-basic", "build-rookie", "deploy-rookie"] }
        ]
      }
    ],
    pages: [
      {
        id: "setup-rookie",
        group: "환경 준비",
        title: "루키 환경 준비하기",
        goal: "루키리그 수업에 필요한 계정을 모두 만들어 준비한다.",
        difficulty: "beginner",
        estimatedMinutes: 20,
        updatedAt: "2026-06-22",
        completionRequirements: ["AI 도구 1개 이상 로그인", "Canva 로그인", "Netlify 로그인"],
        summary: "설치 없이 브라우저만으로 모든 실습을 진행합니다. 아래 계정들이 준비되면 바로 시작할 수 있습니다.",
        reading: "루키리그는 별도 설치 없이 웹에서 모든 작업을 처리합니다. 필요한 것은 브라우저와 이메일 주소뿐입니다. 코딩을 처음 시작한다면 각 강의를 위에서 아래로 읽고, 실습 칸에 직접 적고, 확인하기 체크를 누르는 순서로 진행하세요. 막히는 부분은 정답을 맞히려 하지 말고 메모한 뒤 AI에게 질문하면 됩니다. 코드 작성에는 ChatGPT·Gemini·Claude 중 편한 것을 선택하면 됩니다. Gemini Gems는 나만의 전용 AI를 구성할 때 씁니다. Canva는 화면 초안을 빠르게 만들 때, Netlify는 파일을 드래그&드롭으로 배포할 때 사용합니다. 모두 무료 플랜으로 충분합니다.",
        terms: [
          { term: "계정(Account)", def: "서비스에 내 정보를 등록해 로그인할 수 있는 신분증 같은 것." },
          { term: "배포(Deploy)", def: "만든 앱을 인터넷에 올려 다른 사람이 링크로 열 수 있게 하는 것." },
          { term: "무료 플랜(Free Tier)", def: "가입 후 요금 없이 쓸 수 있는 기본 기능 범위." }
        ],
        visual: {
          type: "mindmap",
          caption: "루키 필수 도구",
          center: "루키 환경",
          branches: [
            { label: "AI 코드 생성", items: ["ChatGPT — chat.openai.com", "Claude — claude.ai", "Gemini — gemini.google.com"] },
            { label: "Gemini Gems", items: ["나만의 AI 어시스턴트 구성", "반복 작업 자동화"] },
            { label: "Canva", items: ["화면 초안 디자인", "Magic Design AI 기능"] },
            { label: "Netlify", items: ["드래그&드롭 배포", "HTML → 인터넷 링크"] }
          ]
        },
        discussion: [
          "소개한 도구 중 이미 사용해 본 것이 있나요? 어떤 용도로 썼나요?",
          "내가 만들 앱에는 ChatGPT·Claude·Gemini 중 어떤 AI가 가장 잘 맞을까요?"
        ],
        steps: [
          "처음이라면 한 강의 안에서 읽고 이해하기 → 실습하기 → 확인하기 순서로 진행합니다.",
          "chat.openai.com → 'Sign up'. Google·Microsoft 계정으로도 가입 가능합니다.",
          "claude.ai → 'Sign up'. Anthropic 계정을 만들거나 Google 계정으로 가입합니다.",
          "gemini.google.com → Google 계정으로 로그인합니다. Google 계정이 없다면 accounts.google.com/signup에서 먼저 만드세요.",
          "canva.com → 'Sign up for free'. 이메일 또는 Google 계정으로 가입합니다.",
          "app.netlify.com → 'Sign up'. GitHub 또는 이메일로 가입합니다.",
          "가입 메일이 오지 않으면 먼저 스팸함을 확인합니다. 학교·회사 계정은 관리자 정책으로 외부 가입이 막히는 경우가 있으니, 막히면 개인 Gmail 같은 개인 메일로 다시 가입합니다.",
          "다섯 개를 다 만들지 못해도 됩니다. AI 도구 1개 + Netlify만 있으면 다음 강의로 진행할 수 있습니다.",
          "각 탭을 열어 로그인 상태를 확인하고, 아래 실습 칸에 체크합니다."
        ],
        externalGuide: "가입 순서: ① chat.openai.com ② claude.ai ③ gemini.google.com ④ canva.com ⑤ app.netlify.com. 모두 무료 플랜으로 충분합니다.",
        links: [
          { label: "ChatGPT 가입", url: "https://chat.openai.com" },
          { label: "Claude 가입", url: "https://claude.ai" },
          { label: "Gemini 로그인", url: "https://gemini.google.com" },
          { label: "Canva 가입", url: "https://www.canva.com" },
          { label: "Netlify 가입", url: "https://app.netlify.com" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "aiToolChoice", label: "주로 사용할 AI 도구", input: "select", options: ["ChatGPT", "Claude", "Gemini", "아직 미정"], value: "ChatGPT" },
            { key: "canvaDone", label: "Canva 계정", input: "select", options: ["완료", "진행 중", "나중에"], value: "완료" },
            { key: "netlifyDone", label: "Netlify 계정", input: "select", options: ["완료", "진행 중", "나중에"], value: "완료" },
            { key: "setupNote", label: "막힌 부분 메모", input: "text", placeholder: "예: Netlify 가입 중 이메일 인증 메일이 안 옴" }
          ]
        },
        checks: ["ChatGPT·Claude·Gemini 중 하나 이상 로그인했다", "Canva에 로그인했다", "Netlify에 로그인했다"],
        presenterNotes: {
          title: "이 강의의 목표는 '계정 준비' 하나다. 시작 전 교실 와이파이와 로그인 상태를 미리 점검한다.",
          steps: "가입에서 막히는 사람이 가장 많은 구간이다. 이메일 인증 메일, 학교 계정 차단 여부를 먼저 확인하도록 안내한다.",
          checks: "세 가지 로그인만 되면 다음으로 넘어간다. 완벽한 설정보다 '로그인 성공'에 집중하도록 한다."
        },
        facilitator: {
          time: "20분(계정 가입 10분 + 점검 10분)",
          talkingPoints: [
            "이 강의는 코드를 다루지 않는다. 목표는 '다섯 계정 로그인 성공' 하나뿐임을 먼저 밝힌다.",
            "학교·기관 네트워크에서는 특정 가입 메일이 차단될 수 있어 사전에 와이파이/메일 정책을 확인한다."
          ],
          pitfalls: [
            "이메일 인증 메일이 스팸함으로 가거나 도착이 늦는 경우가 가장 많다 — 개인 메일 사용을 권장한다.",
            "학교 계정으로 Google 가입 시 관리자 제한에 걸리는 경우가 있다 — 막히면 개인 Gmail로 전환하게 한다."
          ],
          faq: [
            { q: "다섯 개를 다 안 만들어도 되나요?", a: "AI 도구 1개 + Canva + Netlify 세 가지만 있으면 다음 강의로 진행할 수 있다고 안내한다." },
            { q: "회사/학교 보안 정책 때문에 가입이 막히면 어떻게 하나요?", a: "개인 기기·개인 이메일로 가입하게 하거나, 쉬는 시간에 완료하고 다음 시간에 합류하도록 한다." }
          ]
        }
      },
      {
        id: "vibe",
        group: "기초 개념",
        title: "바이브코딩 시작하기",
        goal: "바이브코딩이 무엇인지 내 말로 설명할 수 있다.",
        difficulty: "beginner",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["바이브코딩을 내 말로 설명", "만들 것을 한 문장으로 작성"],
        summary: "바이브코딩은 코드를 외우는 게 아니라, 만들고 싶은 것을 AI와 주고받으며 완성하는 방식입니다.",
        reading: "바이브코딩에서 가장 중요한 능력은 문법 암기가 아닙니다. 만들고 싶은 결과를 말로 또렷이 정리하고, AI에게 필요한 배경을 건네고, 나온 결과가 맞는지 직접 확인하는 습관입니다. 루키리그의 예시 앱은 '여행 준비 미니앱'입니다. 준비물 체크, 코스 후보 랜덤 뽑기, 간단 예산 합계를 한 화면에서 해 보는 앱입니다. 예시 그대로 따라 해도 되고, 캠핑 준비·출장 준비·이사 준비·운동 루틴 준비 앱으로 바꿔도 됩니다. 처음부터 완벽한 앱을 노리지 말고, 한 화면에서 바로 눌러 볼 수 있는 작은 기능부터 만들어 눈으로 확인해 보세요.",
        terms: [
          { term: "바이브코딩", def: "AI에게 말로 요청하고 결과를 확인하며 앱을 만들어 가는 방식." },
          { term: "결과 확인", def: "AI가 만든 것이 내가 원한 것과 같은지 직접 눈으로 점검하는 일." }
        ],
        visual: {
          type: "flow",
          caption: "바이브코딩 흐름",
          steps: [
            { label: "만들 것 정하기", sub: "한 문장으로" },
            { label: "AI에게 요청", sub: "Prompt 작성" },
            { label: "결과 확인", sub: "눈으로 점검" },
            { label: "수정 요청", sub: "더 구체적으로" },
            { label: "반복 → 완성", sub: "조금씩 발전" }
          ]
        },
        discussion: [
          "만들고 싶은 앱을 비개발자에게 한 문장으로 설명한다면 어떻게 표현하겠습니까?",
          "그 앱이 '성공적으로 만들어졌다'고 판단하려면 무엇을 확인해야 할까요?"
        ],
        steps: [
          "만들고 싶은 것을 한 문장으로 적습니다.",
          "누가 사용할지 적습니다.",
          "AI에게 던질 첫 질문을 만듭니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "appIdea", label: "내가 만들고 싶은 것(한 문장)", placeholder: "예: 여행 전 준비물 체크, 코스 뽑기, 예산 합계를 한 화면에서 하는 앱", chips: ["여행 준비 미니앱", "수업 준비 미니앱(교사)", "학급 당번표(교사)", "캠핑 준비 앱", "출장 준비 앱", "이사 준비 앱", "운동 루틴 준비 앱", "장보기 준비 앱", "내 아이디어로 바꾸기"] },
            { key: "user", label: "누가 사용하나요?", input: "text", placeholder: "예: 여행 전 준비물과 예산을 빠르게 정리하고 싶은 나", chips: ["나 자신", "가족", "친구", "여행 동행자", "우리 반 학생(교사)", "같은 학년 선생님(교사)", "출장이 잦은 직장인", "운동 루틴을 시작하는 사람"] },
            { key: "firstQ", label: "AI에게 던질 첫 질문", placeholder: "예: 여행 준비 미니앱의 가장 간단한 첫 화면부터 만들어 주세요. 준비물 체크, 코스 뽑기, 예산 합계가 필요해요. 불명확한 부분이 있으면 먼저 물어봐 줘.", chips: ["불명확한 부분이 있으면 먼저 물어봐 줘", "한 화면짜리로 만들어 줘", "API·로그인·DB는 넣지 마", "준비물 체크 기능을 넣어 줘", "랜덤 추천 버튼을 넣어 줘", "예산 합계를 계산해 줘", "내 아이디어에 맞게 항목명을 바꿔 줘", "<!DOCTYPE html>부터 </html>까지 전체를 줘"] }
          ]
        },
        checks: ["바이브코딩을 내 말로 설명했다", "만들고 싶은 것을 한 문장으로 적었다"],
        presenterNotes: {
          summary: "핵심 메시지: '문법 암기가 아니라 요청·확인의 반복'. 이 한 문장을 학습자가 따라 말하게 한다.",
          discussion: "한 문장 설명을 서로 발표시키면 좋다. 막연한 아이디어를 구체화하는 것이 이 강의의 진짜 목표다.",
          practice: "예시(여행 준비 앱)를 그대로 따라가도 되고, 자기 일상 앱으로 바꿔도 된다고 분명히 안내한다."
        }
      },
      {
        id: "pch",
        group: "기초 개념",
        title: "Prompt · Context · Harness",
        goal: "P-C-H 세 가지의 역할을 구분해 설명할 수 있다.",
        difficulty: "beginner",
        estimatedMinutes: 20,
        updatedAt: "2026-06-22",
        completionRequirements: ["Prompt를 한 문장으로 적었다", "Context에 화면 구성을 적었다", "Harness에 지킬 범위·확인 방법을 적었다"],
        summary: "Prompt는 요청, Context는 배경 자료, Harness는 똑똑하지만 가끔 엉뚱한 AI를 원하는 방향으로 안전하게 부리는 '제어 구조'입니다.",
        reading: "바이브코딩의 기본 한 벌은 Prompt, Context, Harness입니다. Prompt는 'AI에게 무엇을 해 달라'는 요청, Context는 'AI가 상황을 이해하도록 주는 자료'입니다. Harness는 원래 말에 씌우는 '마구(馬具)'에서 온 말로, 힘센 말을 억누르는 게 아니라 원하는 방향으로 안전하게 부리는 장치를 뜻합니다. AI도 똑똑하지만 그냥 두면 엉뚱하게 굴 수 있어서, ① 정해진 범위 안에서만 움직이게 하고(제어), ② 무엇을 하는지 지켜보고(감시), ③ 잘못된 점을 다음에 고치게(개선) 하는 구조 전체를 Harness라고 합니다. 즉 Harness는 AI의 속도를 늦추는 브레이크가 아니라, 사고 없이 목적지까지 데려다주는 핸들이자 안전벨트입니다.",
        terms: [
          { term: "Prompt", def: "AI에게 무엇을 해 달라고 건네는 요청 문장." },
          { term: "Context", def: "AI가 상황을 이해하도록 함께 주는 배경 자료." },
          { term: "Harness", def: "AI를 원하는 방향으로 안전하게 부리는 제어 구조. 제어(범위 제한)·감시(동작 추적)·개선(피드백 반영)을 함께 갖춘 틀이다." }
        ],
        discussion: [
          "Harness를 말에 씌우는 '마구'에 비유하면, AI는 무엇에 해당할까요?",
          "AI를 '제어·감시·개선' 없이 그냥 두면 어떤 문제가 생길 수 있을까요?"
        ],
        steps: [
          "AI에게 줄 요청문(Prompt)을 씁니다.",
          "상황을 이해시킬 배경(Context)을 씁니다.",
          "AI가 지킬 범위와, 결과를 확인·개선할 방법(Harness)을 정합니다."
        ],
        visual: {
          type: "mindmap",
          caption: "바이브코딩 기본 한 벌",
          center: "바이브코딩",
          branches: [
            { label: "Prompt", items: ["AI에게 주는 요청문", "목표 + 배경 + 형식 포함"] },
            { label: "Context", items: ["AI가 이해할 배경 자료", "화면 구성·제약 조건"] },
            { label: "Harness", items: ["제어: 작업 범위 제한", "감시: 동작 추적", "개선: 피드백 반영"] }
          ]
        },
        practice: {
          kind: "form",
          fields: [
            { key: "prompt", label: "Prompt (요청)", placeholder: "예: 여행 준비 미니앱을 HTML+CSS+JS 한 파일로 만들어 줘. 준비물 체크, 코스 랜덤 추천, 예산 합계 기능이 필요해.", chips: ["준비물 체크리스트를 만들어 줘", "코스 후보를 랜덤으로 하나 뽑게 해 줘", "교통비·식비·숙소비 합계를 계산해 줘", "불명확한 부분은 먼저 물어봐"] },
            { key: "context", label: "Context (배경 자료)", placeholder: "예: 사용자는 여행 전날 준비물, 갈 곳 후보, 예상 비용을 빠르게 정리하려는 사람이다.", chips: ["한 화면짜리 앱", "모바일 우선 디자인", "HTML+CSS+JS 순수 코드", "여행 준비 앱", "캠핑·출장 준비로 바꿀 수 있음"] },
            { key: "harness", label: "Harness (지킬 범위·확인 방법)", placeholder: "예: API·로그인·DB 없이 체크, 랜덤 추천, 합계 계산만 동작하게 하고 미리보기로 확인한다.", chips: ["API·로그인·DB 제외", "체크/랜덤/합계만 구현", "미리보기로 확인 후 다음 기능", "모르면 구현 전 먼저 물어봐"] }
          ]
        },
        checks: ["내 Prompt만 읽고도 무엇을 만들지 남이 알 수 있다", "Context에 화면 구성과 제약이 들어 있다", "Harness에 '하지 말 것'과 '어떻게 확인할지'가 둘 다 들어 있다"]
      },
      {
        id: "rules",
        group: "기초 개념",
        title: "좋은 지침 만들기",
        goal: "AI가 지킬 작업 규칙(지침)을 만들 수 있다.",
        difficulty: "beginner",
        estimatedMinutes: 20,
        updatedAt: "2026-06-22",
        completionRequirements: ["해야 할 일을 적었다", "하면 안 되는 일을 적었다", "보안 규칙을 넣었다"],
        summary: "지침은 AI가 멋대로 범위를 넓히거나 위험한 일을 하지 않도록 세우는 울타리(가드레일)입니다.",
        reading: "지침은 Harness의 '제어' 부분을 직접 만드는 일입니다. AI는 빠르지만, 시키지 않은 기능을 덧붙이거나 비밀 값을 코드에 적어 두는 실수를 하기도 합니다. 그래서 작업 전에 '해야 할 일'과 '하면 안 되는 일'을 미리 정해 두면 안전합니다. 예를 들어 '요청하지 않은 기능은 추가하지 마', '비밀번호나 키를 코드에 넣지 마', '바로 만들지 말고 모르는 건 먼저 물어봐' 같은 규칙이 도움이 됩니다. 지침은 한 번 만들고 끝이 아니라, 작업하며 계속 다듬는 기준표입니다.",
        terms: [
          { term: "지침(가드레일)", def: "AI가 작업할 때 지켜야 할 규칙. Harness의 '제어' 장치." },
          { term: "범위(스코프)", def: "이번 작업에서 손댈 부분과 손대지 않을 부분의 경계." }
        ],
        visual: {
          type: "mindmap",
          caption: "좋은 지침 구성",
          center: "지침(가드레일)",
          branches: [
            { label: "해야 할 일", items: ["한 번에 하나씩 작업", "화면에서 즉시 확인 가능하게"] },
            { label: "하면 안 되는 일", items: ["요청 없는 기능 추가 금지", "전체 코드 한꺼번에 재작성 금지"] },
            { label: "보안 규칙", items: ["비밀값을 코드에 넣지 않기", "개인정보 노출 금지"] }
          ]
        },
        discussion: [
          "AI가 '시키지 않은 기능'을 덧붙이면 왜 곤란할까요?",
          "내 앱에 꼭 넣고 싶은 금지 규칙 하나는 무엇인가요?"
        ],
        steps: [
          "AI가 해야 할 일을 적습니다.",
          "AI가 하면 안 되는 일을 적습니다.",
          "보안 규칙을 한 줄 넣습니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "doRules", label: "AI가 해야 할 일", placeholder: "예: 한 번에 하나씩 작은 단위로 만들고, 화면에서 바로 확인할 수 있게 한다.", chips: ["한 번에 하나씩 기능 단위로 만들기", "모르는 건 구현 전 먼저 물어보기", "화면에서 바로 확인할 수 있게 만들기"] },
            { key: "dontRules", label: "AI가 하면 안 되는 일", placeholder: "예: 요청하지 않은 기능을 추가하지 않는다. 한꺼번에 전부 새로 만들지 않는다.", chips: ["요청하지 않은 기능 추가 금지", "한꺼번에 전부 새로 만들기 금지", "기존 작동하는 코드 임의 변경 금지"] },
            { key: "securityRules", label: "보안 규칙", input: "text", placeholder: "예: 비밀번호·키를 코드에 직접 적지 않는다.", chips: ["비밀번호·키를 코드에 직접 적지 않기", "개인정보를 코드에 포함하지 않기"] }
          ]
        },
        checks: ["해야 할 일과 하면 안 되는 일이 각각 한 줄 이상 있다", "지침에 비밀값·개인정보를 코드에 넣지 말라는 문장이 있다", "이 지침을 그대로 복사해 AI에게 붙여넣을 수 있는 형태다"]
      },
      {
        id: "chatgpt",
        group: "루키PRD 만들기",
        title: "AI 도구로 질문 연습하기",
        goal: "ChatGPT·Claude·Gemini 중 하나로 목표·배경·형식을 담은 질문을 만들 수 있다.",
        difficulty: "beginner",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["목표·배경·형식을 담은 질문을 만들었다", "AI가 먼저 되묻게 하는 문구를 넣었다"],
        summary: "어떤 AI를 쓰든 핵심은 같습니다 — 목표·배경·원하는 형식을 함께 전달하면 훨씬 쓸 만한 답이 나옵니다.",
        reading: "ChatGPT·Claude·Gemini는 모두 같은 방식으로 작동합니다. 어떤 것을, 어떤 상황에서, 어떤 형태로 원하는지를 함께 알려주면 답의 질이 크게 달라집니다. 특히 코드를 처음 요청할 때는 'AI가 먼저 불명확한 점을 물어보도록' 유도하는 것이 효과적입니다. 그래야 AI가 잘못 짐작해 엉뚱한 코드를 쏟아내는 상황을 막을 수 있습니다. 세 도구의 차이점: ChatGPT는 범용성이 높고, Claude는 긴 문서나 코드 분석에 강하며, Gemini는 Google 서비스와 연동이 편리합니다. 어떤 것이든 루키 단계에서는 큰 차이 없이 활용할 수 있습니다.",
        terms: [
          { term: "프롬프트 형식", def: "답변을 표·목록·코드블록 등 어떤 형태로 받을지 지정하는 것." },
          { term: "되묻기 요청", def: "AI가 바로 실행하지 말고 불명확한 부분을 먼저 확인하게 하는 지시." },
          { term: "컨텍스트(배경 정보)", def: "AI가 상황을 정확히 이해하도록 제공하는 배경 — 현재 상태, 제약 조건, 관련 코드 등." }
        ],
        visual: {
          type: "flow",
          caption: "효과적인 AI 질문 구조",
          steps: [
            { label: "목표", sub: "무엇을 원하나?" },
            { label: "배경", sub: "현재 상황·제약 조건" },
            { label: "형식", sub: "코드/목록/설명 등" },
            { label: "되묻기 요청", sub: "확인 후 실행해줘" }
          ]
        },
        discussion: [
          "'앱 만들어 줘'와 '다음 조건으로 앱을 만들어 줘...'의 답변 품질 차이는 어디서 생길까요?",
          "같은 요청을 세 AI에 보낸다면, 어떤 결과 차이를 비교해 보고 싶나요?"
        ],
        steps: [
          "아래 칸에 AI에게 보낼 질문을 작성합니다.",
          "사용할 AI 도구(ChatGPT·Claude·Gemini)를 선택합니다.",
          "ChatGPT: chat.openai.com / Claude: claude.ai / Gemini: gemini.google.com 접속",
          "입력창에 작성한 질문을 붙여넣고, 끝에 '바로 구현하지 말고 불명확한 부분이 있으면 먼저 물어봐 줘'를 추가합니다.",
          "전송 후 AI가 질문으로 되물으면 차례로 답하며 대화를 이어갑니다.",
          "AI의 답변 품질을 확인하고, 미흡하면 추가 배경 정보를 제공해 재시도합니다."
        ],
        externalGuide: "세 도구 모두 같은 방식으로 사용합니다. 질문 붙여넣기 → '불명확한 부분 먼저 물어봐 줘' 추가 → 전송 → 되묻는 질문에 답변 → 반복.",
        links: [
          { label: "ChatGPT 열기", url: "https://chat.openai.com" },
          { label: "Claude 열기", url: "https://claude.ai" },
          { label: "Gemini 열기", url: "https://gemini.google.com" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "aiTool", label: "사용할 AI 도구", input: "select", options: ["ChatGPT", "Claude", "Gemini"], value: "ChatGPT" },
            { key: "question", label: "AI에게 보낼 질문", placeholder: "예: 여행 준비 미니앱의 첫 화면을 HTML+CSS로 만들어 줘. 준비물 체크, 코스 뽑기 버튼, 예산 합계가 필요해. 불명확한 부분이 있으면 먼저 물어봐 줘.", chips: ["불명확한 부분이 있으면 먼저 물어봐 줘", "한 화면짜리로 만들어 줘", "<!DOCTYPE html>부터 완성본 전체를 줘", "모바일에서도 잘 보이게 해 줘"] },
            { key: "askFirst", label: "AI가 먼저 확인했으면 하는 점", input: "text", placeholder: "예: 화면 레이아웃 방향(세로/가로)을 먼저 확인해 줘.", chips: ["화면 레이아웃 방향 먼저 확인", "버튼 색상·개수 먼저 확인", "저장 방식 먼저 확인"] },
            { key: "format", label: "원하는 답변 형식", input: "text", placeholder: "예: 완성된 HTML 한 파일로 전체를 줘.", chips: ["완성된 HTML 한 파일로 전체", "코드블록으로 줘", "설명은 주석으로만"] }
          ]
        },
        checks: ["질문에 목표·배경·원하는 형식이 모두 들어 있다", "질문 끝에 '불명확하면 먼저 물어봐 줘'가 들어 있다", "실제로 AI에 보냈고 AI가 되묻거나 답을 주었다"]
      },
      {
        id: "prd-basic",
        group: "루키PRD 만들기",
        title: "루키 PRD 만들기",
        goal: "내가 만들고 싶은 앱 설명서(PRD)를 완성한다.",
        difficulty: "beginner",
        estimatedMinutes: 25,
        updatedAt: "2026-06-22",
        completionRequirements: ["앱 이름·사용자·문제를 적었다", "기능 3개를 적었다", "성공 확인 방법을 적었다", "AI에게 요청할 PRD를 만들었다"],
        summary: "루키 PRD는 AI에게 요청할 앱 제작 설명서입니다.",
        reading: "PRD는 '내가 만들고 싶은 것 설명서'입니다. 앱 이름, 사용할 사람, 해결할 문제, 꼭 필요한 기능 3개, 성공 확인 방법만 정리해도 AI에게 훨씬 정확히 일을 맡길 수 있습니다. 이번 단계의 목표는 예쁜 문서가 아니라, AI에게 요청할 PRD를 완성하는 것입니다. 기능을 욕심내지 말고, 정말 필요한 3개만 골라 적으세요. 다음 제작 단계에서 결과가 한 번에 완성되지 않아도 괜찮습니다. 이 PRD를 기준으로 수정하고 디버그하는 과정이 핵심입니다.",
        terms: [
          { term: "PRD", def: "무엇을 왜 만드는지 적은 제품 설명서. 여기선 짧은 한 장이면 충분." },
          { term: "성공 기준", def: "'이게 되면 성공'이라고 말할 수 있는 확인 방법." }
        ],
        visual: {
          type: "flow",
          caption: "루키 PRD 작성 흐름",
          steps: [
            { label: "앱 이름", sub: "무엇을 만들까" },
            { label: "사용자", sub: "누가 쓸까" },
            { label: "문제", sub: "무엇이 불편할까" },
            { label: "기능 3개", sub: "작게 시작" },
            { label: "성공 기준", sub: "무엇을 확인할까" }
          ]
        },
        discussion: [
          "기능을 3개로 줄여야 한다면 무엇을 남기고 무엇을 뺄 기준이 되나요?",
          "이 앱이 성공했다고 판단할 수 있는 기준은 무엇인가요?"
        ],
        steps: [
          "앱 이름·사용자·문제를 적습니다.",
          "꼭 필요한 기능 3개를 적습니다.",
          "성공 확인 방법을 적습니다.",
          "AI에게 요청할 PRD 형태로 정리합니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "app", label: "앱 이름", input: "text", placeholder: "예: 여행 준비 미니앱", chips: ["여행 준비 미니앱", "수업 준비 미니앱(교사)", "랜덤 발표자 뽑기(교사)", "캠핑 준비 미니앱", "출장 준비 미니앱", "운동 루틴 준비 앱", "한 달 가계부 앱", "식단 체크 앱", "동아리 회비 정산 앱"] },
            { key: "user", label: "누구를 위한 앱인가요?", input: "text", placeholder: "예: 여행 전 준비물과 예산을 빠르게 정리하고 싶은 사람", chips: ["여행 전날 준비물을 확인하는 사람", "가족 여행을 준비하는 사람", "수업 자료를 매번 챙기는 교사", "학급 활동을 운영하는 교사", "출장 짐을 빠뜨리기 싫은 사람", "매달 지출을 정리하고 싶은 사람", "동아리 회비를 관리하는 사람"] },
            { key: "problem", label: "어떤 문제를 해결하나요?", placeholder: "예: 여행 전 준비물, 갈 곳 후보, 예상 비용이 흩어져 있어 빠뜨리기 쉽다.", chips: ["준비물이 여러 메모에 흩어져 있다", "어디를 갈지 매번 고민한다", "예상 비용을 머릿속으로만 계산한다", "수업 준비물을 매번 빠뜨린다(교사)", "발표 순서를 정하느라 시간이 든다(교사)", "내 앱 주제의 관리 항목이 흩어져 있다"] },
            { key: "features", label: "꼭 필요한 기능 3개", placeholder: "예: 1) 준비물 체크  2) 코스 후보 랜덤 뽑기  3) 예산 합계 계산", chips: ["1) 준비물 체크 2) 코스 후보 랜덤 뽑기 3) 예산 합계 계산", "(교사) 1) 수업 자료 체크 2) 랜덤 발표자 뽑기 3) 학급비 합계", "1) 항목 추가 2) 완료 체크 3) 총액 계산", "1) 후보 목록 2) 랜덤 추천 3) 메모 저장", "1) 할 일 체크 2) 우선순위 표시 3) 진행률 표시"] },
            { key: "success", label: "성공 확인 방법", placeholder: "예: 준비물을 체크하고, 코스를 하나 뽑고, 비용을 입력하면 총액이 바르게 표시된다.", chips: ["체크 버튼이 눌린다", "랜덤 추천 결과가 바뀐다", "비용을 입력하면 합계가 맞다", "모바일에서 화면이 밀리지 않는다", "새로 만든 항목명이 내 주제에 맞다"] },
            { key: "copyPrompt", label: "AI에게 요청할 루키 PRD", placeholder: "예: 아래 PRD를 바탕으로 여행 준비 미니앱을 HTML+CSS+JS 한 파일로 만들어 줘.\n\n[루키 PRD]\n앱 이름: 여행 준비 미니앱\n사용자: 여행 전 준비물과 예산을 빠르게 정리하고 싶은 사람\n해결할 문제: 준비물, 갈 곳 후보, 예상 비용이 흩어져 있어 빠뜨리기 쉽다.\n필수 기능: 1) 준비물 체크 2) 코스 후보 랜덤 뽑기 3) 예산 합계 계산\n성공 기준: 준비물을 체크하고, 코스를 하나 뽑고, 비용을 입력하면 총액이 바르게 표시된다.\n\n조건: API·로그인·DB는 넣지 말고, 모바일에서도 보기 좋게 만들어 줘. <!DOCTYPE html>부터 </html>까지 전체 파일로 줘.", chips: ["여행 준비 앱 기준으로 작성", "내 앱 주제로 항목명만 바꾸기", "API·로그인·DB 없이 만들기", "모바일 우선으로 만들기", "수정하기 쉽게 주석을 조금 넣기", "완성 HTML 한 파일로 받기"] }
          ]
        },
        checks: ["PRD만 읽고도 남이 같은 앱을 만들 수 있을 만큼 구체적이다", "기능이 3개로 좁혀져 있다", "성공 기준이 '무엇을 하면 무엇이 보인다' 형태로 적혀 있다", "PRD 전체를 복사해 AI에 붙여넣을 수 있다"]
      },
      {
        id: "build-rookie",
        group: "내 앱 만들기",
        title: "AI에게 코드 받아 실행하기",
        goal: "AI에게 HTML 코드를 받아 실행하고, 오류가 나면 원인을 찾아 고칠 수 있다.",
        difficulty: "beginner",
        estimatedMinutes: 30,
        updatedAt: "2026-09-06",
        completionRequirements: ["'루키 PRD 만들기'의 요청문을 붙여넣어 코드를 받았다", "붙여넣어 미리보기로 실행해 봤다", "수정·디버그를 한 번 이상 기록했다"],
        summary: "'루키 PRD 만들기'에서 완성한 요청문을 AI에게 붙여넣고, 실행 결과를 보며 수정·디버그를 반복합니다.",
        reading: "세 가지 AI 모두 HTML 코드를 만들 수 있습니다. ChatGPT·Claude는 chat.openai.com·claude.ai에서, Gemini는 gemini.google.com에서 사용합니다. 앞 강의 '루키 PRD 만들기'에서 완성한 요청문을 그대로 복사해 AI에게 붙여넣고, 받은 코드를 아래 입력칸에 붙여넣으면 미리보기에서 즉시 실행됩니다. 첫 결과는 초안입니다. 버튼이 안 눌리거나, 예산 합계가 틀리거나, 모바일 화면이 밀리면 문제를 구체적으로 적어 AI에게 수정 요청을 보내세요. 이 단계의 핵심은 완성 코드를 한 번에 받는 것이 아니라, PRD의 성공 기준을 보며 수정하고 디버그하는 과정입니다.",
        terms: [
          { term: "HTML", def: "화면의 구조를 정의하는 코드. 제목·버튼·입력칸 등의 요소를 담습니다." },
          { term: "CSS", def: "HTML 요소의 색·크기·간격 등 시각적 스타일을 지정하는 코드." },
          { term: "JS(JavaScript)", def: "버튼 클릭·입력 처리 같은 동적 동작을 구현하는 코드." },
          { term: "개발자 도구(F12)", def: "브라우저에 내장된 점검 창. 키보드 F12를 누르면 열린다." },
          { term: "콘솔(Console)", def: "개발자 도구의 한 탭. 코드가 멈춘 이유가 빨간 글자로 표시된다." }
        ],
        visual: {
          type: "flow",
          caption: "AI 코드 실행과 디버그 흐름",
          steps: [
            { label: "PRD 붙여넣기", sub: "AI에게 요청" },
            { label: "코드 받기", sub: "HTML 전체" },
            { label: "미리보기", sub: "직접 실행" },
            { label: "문제 찾기", sub: "성공 기준 비교" },
            { label: "수정 요청", sub: "다시 확인" }
          ]
        },
        discussion: [
          "AI가 만든 코드에서 수정하고 싶은 부분을 어떻게 구체적으로 설명할 수 있을까요?",
          "같은 요청을 ChatGPT와 Claude에 각각 보내면 결과가 다를까요? 어떻게 비교할 수 있을까요?"
        ],
        steps: [
          "'루키 PRD 만들기'에서 완성한 요청문을 복사합니다.",
          "ChatGPT(chat.openai.com)·Claude(claude.ai)·Gemini(gemini.google.com) 중 하나를 선택해 접속합니다.",
          "입력창에 그 요청문을 붙여넣고 HTML 전체 파일을 요청합니다.",
          "받은 코드 전체를 아래 '코드 붙여넣기' 칸에 붙여넣어 미리보기로 확인합니다.",
          "성공 기준과 비교하며 동작하지 않는 부분을 찾습니다.",
          "오류를 고칠 때는 네 단계를 따릅니다. ① 기대한 것과 실제로 무엇이 다른지 한 문장으로 적습니다. 예: '합계 버튼을 눌렀는데 숫자 대신 NaN이 뜬다.'",
          "② 키보드 F12를 눌러 개발자 도구를 열고 Console 탭의 빨간 글자를 전체 복사합니다. 빨간 글자가 없으면 이 단계는 건너뜁니다.",
          "③ AI에게 이렇게 재요청합니다. '이 코드에서 (①의 증상)이 나고 콘솔에 (②의 에러)가 뜬다. 원인을 찾아 최소한만 고쳐 줘. 다른 기능은 그대로 둬.'",
          "④ 받은 코드를 다시 붙여넣어 그 증상이 사라졌는지 확인합니다. 남아 있으면 ①로 돌아갑니다.",
          "화면 모양을 먼저 잡고 싶다면 'Canva AI로 화면 초안 만들기' 강의를 앞당겨 보고, 만든 그림을 AI에게 첨부해 요청해도 됩니다.",
          "완성된 코드를 index.html 파일로 저장합니다."
        ],
        externalGuide: "① '루키 PRD 만들기'의 요청문 복사 ② ChatGPT·Claude·Gemini 중 하나 접속 ③ 요청문 전송 ④ 받은 코드를 아래 칸에 붙여넣어 실행 ⑤ 준비물 체크·코스 뽑기·예산 합계를 확인 ⑥ 안 되면 F12 → Console의 빨간 글자를 복사해 '이 증상, 이 에러. 최소한만 고쳐 줘'로 재요청 ⑦ 다시 붙여넣어 확인 → 반복",
        links: [
          { label: "ChatGPT 열기", url: "https://chat.openai.com" },
          { label: "Claude 열기", url: "https://claude.ai" },
          { label: "Gemini 열기", url: "https://gemini.google.com" }
        ],
        practice: {
          kind: "build",
          fields: [
            { key: "aiRequest", label: "루키 PRD 기반 AI 요청문", placeholder: "앞 강의에서 만든 'AI에게 요청할 루키 PRD'를 여기에 붙여넣으세요.", chips: ["루키 PRD를 그대로 붙여넣기", "내 앱 주제로 항목명 바꾸기", "한 파일 HTML로 요청하기", "불명확하면 먼저 물어보라고 요청하기"] },
            { key: "htmlCode", label: "AI가 준 HTML 코드 붙여넣기", placeholder: "AI에게 받은 HTML 코드를 여기 전체 붙여넣으세요. 아래에서 바로 실행됩니다." },
            { key: "debugLog", label: "수정·디버그 기록(증상 → 에러 → 요청 → 결과)", placeholder: "예: 합계 버튼을 눌렀더니 NaN이 떴다. 콘솔에 'Cannot read properties of null'이 있었다. '이 증상과 에러, 원인만 최소로 고쳐 줘'로 재요청했고 다시 붙여넣으니 합계가 정상 표시됐다.", chips: ["버튼이 눌리지 않음", "합계가 숫자로 계산되지 않음(NaN)", "모바일에서 화면이 밀림", "콘솔 빨간 글자를 복사해 첨부함", "빨간 글자는 없고 동작만 다름", "수정 후 다시 붙여넣어 확인함"] }
          ]
        },
        checks: ["미리보기 화면에 내 앱이 실제로 떠 있다", "PRD에 적은 기능 3개를 눌러 보니 모두 동작한다", "오류를 한 번 이상 만나 고쳤고 그 과정이 기록에 남아 있다", "자동 점검 패널에 '위험' 항목이 없다"]
      },
      {
        id: "deploy-rookie",
        group: "내 앱 만들기",
        title: "Netlify/Vercel로 배포하기",
        goal: "AI에게 받은 HTML 파일을 Netlify 또는 Vercel에 올려 인터넷 링크를 만든다.",
        difficulty: "beginner",
        estimatedMinutes: 20,
        updatedAt: "2026-06-22",
        completionRequirements: ["Netlify 또는 Vercel에 파일을 올렸다", "배포 링크가 실제로 열린다", "배포 URL을 기록했다"],
        summary: "Netlify는 HTML 파일을 드래그&드롭 하나로 인터넷에 올려 주는 서비스입니다. 가입 후 파일을 끌어다 놓으면 바로 링크가 생깁니다.",
        reading: "Netlify는 HTML 파일을 무료로 배포해 주는 서비스입니다. 복잡한 설정 없이, 웹사이트에서 파일을 직접 끌어다 놓으면 수 초 안에 링크가 생깁니다. 절차는 세 단계입니다. ① netlify.com에서 가입하고 ② 'Sites' 탭에서 HTML 파일을 드래그&드롭으로 올린 뒤 ③ 자동으로 생성된 URL을 확인합니다. 원한다면 'Site configuration → Change site name'에서 주소 이름을 바꿀 수도 있습니다. 비슷한 서비스로 Vercel(vercel.com)도 있습니다. GitHub 저장소와 연결해 쓰면 편리하지만, 지금은 Netlify 드래그&드롭이 가장 빠른 방법입니다. 이제 내가 만든 앱이 실제로 인터넷에 올라간 겁니다.",
        terms: [
          { term: "Netlify", def: "HTML 파일을 드래그&드롭으로 무료 배포해 주는 서비스." },
          { term: "Vercel", def: "코드 프로젝트를 간편하게 무료 배포해 주는 서비스." },
          { term: "배포 링크", def: "인터넷 어디서나 열 수 있는 내 앱의 주소." }
        ],
        discussion: [
          "배포된 링크를 친구에게 보내면 친구는 어떤 경험을 하게 될까요?",
          "앱을 다시 수정하면 어떻게 해야 배포된 버전도 업데이트할 수 있을까요?"
        ],
        steps: [
          "netlify.com에 가입·로그인합니다.",
          "AI에게 받은 HTML 코드를 내 컴퓨터에 index.html 파일로 저장합니다.",
          "'Sites' 탭에서 점선 영역에 index.html 파일을 드래그&드롭합니다.",
          "몇 초 후 자동으로 URL이 생성됩니다.",
          "생성된 배포 링크를 열어 앱이 잘 열리는지 확인합니다.",
          "Netlify 가입이나 업로드가 막히면 순서대로 대안을 시도합니다. ① vercel.com에 가입해 같은 방식으로 폴더를 끌어다 놓습니다. ② 그것도 막히면 GitHub 저장소를 만들고 Settings → Pages에서 브랜치를 선택해 공개합니다. ③ 인터넷 배포가 모두 막힌 환경이라면 index.html 파일 자체를 메신저나 메일로 전달하고, 받는 사람이 파일을 더블클릭해 열도록 안내합니다.",
          "배포 링크를 아래에 기록합니다. 파일로 전달했다면 그 방법을 적습니다."
        ],
        externalGuide: "① Netlify에 접속해 로그인합니다. ② 'Sites' 탭의 점선 영역에 index.html 파일을 드래그&드롭합니다. ③ 몇 초 후 자동 생성된 URL을 복사해 아래에 기록합니다. ④ 브라우저에서 URL을 열어 앱이 정상 동작하는지 확인합니다.  막혔을 때: Netlify → Vercel(같은 드래그&드롭) → GitHub Pages(Settings → Pages) → 파일 직접 전달 순으로 내려갑니다.",
        links: [
          { label: "Netlify 열기", url: "https://app.netlify.com" },
          { label: "Vercel 열기", url: "https://vercel.com" }
        ],
        visual: {
          caption: "Netlify 배포 흐름",
          items: [
            { label: "① 가입", text: "netlify.com에서 계정 만들기" },
            { label: "② 파일 업로드", text: "index.html 드래그&드롭" },
            { label: "③ URL 생성", text: "자동으로 배포 링크 생성" },
            { label: "④ 링크 확인", text: "배포 URL 열어서 동작 확인" }
          ]
        },
        practice: {
          kind: "form",
          fields: [
            { key: "platform", label: "사용한 배포 서비스", input: "select", options: ["Netlify", "Vercel", "GitHub Pages", "파일로 직접 전달"], value: "Netlify" },
            { key: "deployUrl", label: "배포된 링크(URL)", input: "text", placeholder: "예: https://my-first-app.netlify.app" },
            { key: "deployNote", label: "배포하며 어려웠던 점 / 해결 방법", placeholder: "예: 파일 이름을 index.html로 바꾸니 바로 열렸다. / 학교망에서 Netlify 가입이 막혀 Vercel로 대신 배포했다.", chips: ["파일명을 index.html로 바꾸니 해결", "Netlify가 막혀 Vercel로 전환", "GitHub Pages로 전환", "이상 없이 한 번에 배포됨"] }
          ]
        },
        checks: ["배포 링크를 다른 기기나 시크릿 창에서 열어도 앱이 뜬다", "배포된 화면에서 주요 기능이 동작한다", "링크를 기록해 두어 다음에 다시 찾을 수 있다"]
      },
      {
        id: "share",
        group: "공유",
        title: "루키 결과물 공유하기",
        visual: {
          type: "cards",
          caption: "공유글에 담을 것",
          items: [
            { label: "앱 링크", text: "인터넷에서 열리는 배포 주소" },
            { label: "만든 것", text: "어떤 앱을 만들었는지 한 줄" },
            { label: "배운 점", text: "이번에 새로 알게 된 것" },
            { label: "도움받고 싶은 점", text: "더 나아지고 싶은 부분" }
          ]
        },
        goal: "내가 만든 앱의 배포 링크와 소감을 Padlet에 공유한다.",
        difficulty: "beginner",
        estimatedMinutes: 20,
        updatedAt: "2026-06-22",
        completionRequirements: ["배포 링크가 실제로 열린다", "공유글을 만들었다", "공개 점검을 했다"],
        summary: "이제 실제로 인터넷에서 열리는 내 첫 앱이 있습니다. 링크와 함께 배운 점을 공유해 서로 보고 배웁니다.",
        reading: "루키리그를 마친 여러분은 AI에게 코드를 받아 실제로 배포한 첫 앱을 갖게 되었습니다. 공유글에는 배포된 앱 링크, 만든 것, 배운 점, 도움받고 싶은 점을 담습니다. 다른 사람의 앱 링크를 열어 보면 내가 놓친 아이디어를 발견하게 됩니다. 올리기 전에는 개인정보, 비밀번호, API 키처럼 공개하면 안 되는 내용이 없는지 꼭 확인하세요.",
        terms: [
          { term: "Padlet", def: "글과 자료를 붙여 함께 보는 온라인 게시판." },
          { term: "공개 점검", def: "올리기 전에 비밀번호·키·개인정보가 없는지 확인하는 일." }
        ],
        discussion: [
          "다른 사람의 앱 링크를 열어 보면 무엇을 배울 수 있을까요?",
          "공유 전에 꼭 가려야 할 정보에는 어떤 게 있을까요?"
        ],
        steps: [
          "닉네임과 앱 제목을 씁니다.",
          "배포된 앱 링크를 기록합니다.",
          "배운 점과 도움받고 싶은 점을 정리합니다.",
          "공개 점검 체크 후 Padlet에 올립니다."
        ],
        externalGuide: "공유글을 복사한 뒤 루키리그 Padlet에 직접 올리세요. 배포 링크도 함께 붙여넣으세요.",
        practice: {
          kind: "share",
          fields: [
            { key: "nickname", label: "닉네임", input: "text" },
            { key: "title", label: "앱 제목", input: "text", placeholder: "예: 나의 첫 여행 준비 미니앱" },
            { key: "deployUrl", label: "배포된 앱 링크", input: "text", placeholder: "예: https://my-first-app.netlify.app" },
            { key: "learned", label: "배운 점" },
            { key: "help", label: "도움받고 싶은 점" }
          ]
        },
        checks: ["공유글에 적은 링크를 눌러 실제로 앱이 열린다", "공유글에 만든 것·배운 점·도움받고 싶은 점이 모두 있다", "공유글과 앱 화면에 비밀번호·키·개인정보가 없다"]
      },
      {
        id: "gemini",
        group: "AI 도구 연습",
        title: "Gemini Gems 만들기",
        visual: {
          type: "flow",
          caption: "Gems로 AI 코치 재사용하기",
          steps: [
            { label: "역할·지침 작성", sub: "쉬운 말·먼저 질문 등" },
            { label: "Gem으로 저장", sub: "한 번만 만들면 끝" },
            { label: "매번 호출", sub: "다시 타이핑 불필요" },
            { label: "일관된 도움", sub: "같은 규칙으로 응답" }
          ]
        },
        goal: "반복해서 쓸 나만의 AI 역할(Gems)을 만들 수 있다.",
        difficulty: "beginner",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["Gems 이름을 정했다", "Gems 지침을 작성했다"],
        summary: "Gemini Gems는 매번 다시 쓰기 번거로운 역할과 규칙을 저장해 두는 '나만의 AI 코치'입니다.",
        reading: "Gemini Gems는 Gemini 안에서 반복해 쓸 역할과 지침을 저장하는 공간입니다. 매번 '쉬운 말로 설명해 줘, 먼저 질문해 줘'를 다시 타이핑하지 않고, 한 번 만들어 두면 됩니다. 루키 단계에서는 완벽한 Gems보다 '초보자에게 쉬운 말로 설명하고, 만들기 전에 먼저 질문하고, 비밀 값 노출을 확인하는 도우미' 정도면 충분합니다. 이렇게 만든 코치를 내 앱을 만드는 내내 부르면 됩니다.",
        terms: [
          { term: "Gemini Gems", def: "Gemini에서 나만의 역할·지침을 저장해 반복해 쓰는 기능." },
          { term: "역할 지정", def: "AI에게 '너는 어떤 도우미다'라고 정해 주는 것." }
        ],
        discussion: [
          "매번 같은 규칙을 다시 적는 대신 저장해 두면 무엇이 편해질까요?",
          "내 코치에게 꼭 넣고 싶은 규칙 한 줄은 무엇인가요?"
        ],
        steps: [
          "Gems 이름과 역할, 지침을 아래 칸에 작성합니다.",
          "아래 링크를 눌러 Gemini Gems 만들기 페이지에 접속합니다.",
          "오른쪽 위 또는 중앙의 '새 Gem 만들기(+ New Gem)' 버튼을 클릭합니다.",
          "'이름(Name)' 칸에 작성한 Gem 이름을 입력합니다.",
          "'지침(Instructions)' 칸에 역할과 지침을 복사해 붙여넣습니다.",
          "'저장(Save)' 버튼을 클릭해 Gem을 생성합니다.",
          "목록에 나타난 Gem을 클릭하면 저장한 규칙이 적용된 대화를 시작할 수 있습니다."
        ],
        externalGuide: "gemini.google.com/gems/create 접속 → '새 Gem 만들기' 클릭 → 이름·지침 붙여넣기 → 저장 → Gem 클릭해 대화 시작.",
        links: [
          { label: "Gemini Gems 만들기", url: "https://gemini.google.com/gems/create" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "gemName", label: "Gems 이름", input: "text", placeholder: "예: 바이브코딩 코치" },
            { key: "gemRole", label: "Gems 역할(한 줄)", input: "text", placeholder: "예: 필요한 정보를 먼저 묻고, 안전하게 앱 만들기를 돕는다." },
            { key: "gemRules", label: "Gems 지침", placeholder: "예:\n코딩을 모르는 사람에게 쉬운 말로 설명한다.\n바로 만들지 말고 필요한 정보를 먼저 묻는다.\n비밀번호·키·개인정보 노출을 먼저 확인한다." }
          ]
        },
        checks: ["Gems 목록에 내가 만든 Gem이 보인다", "그 Gem을 열어 대화하면 지침대로 먼저 묻거나 쉬운 말로 답한다"]
      },
      {
        id: "canva",
        group: "AI 도구 연습",
        title: "Canva AI로 화면 초안 만들기",
        goal: "Canva Magic Design으로 다음 버전 화면 초안을 만들어 AI 수정 요청에 활용할 수 있다.",
        difficulty: "beginner",
        estimatedMinutes: 20,
        updatedAt: "2026-06-22",
        completionRequirements: ["화면에 들어갈 요소를 정했다", "Canva Magic Design 요청문을 만들었다", "초안을 생성하거나 스크린샷을 저장했다"],
        summary: "이미 만든 앱의 다음 버전을 구상하는 단계입니다. Magic Design으로 원하는 화면 그림을 만들어 AI에게 보여 주면 말로 설명할 때보다 훨씬 정확하게 고쳐 줍니다.",
        reading: "여러분은 이미 앱을 만들어 배포했습니다. 이 강의는 그 앱의 다음 버전을 위한 것입니다.\n\n화면을 고치고 싶을 때 말로만 설명하면 AI가 엉뚱하게 바꾸기 쉽습니다. '버튼을 좀 더 잘 보이게'는 사람마다 다르게 이해합니다. 그림 한 장을 보여 주면 이 문제가 대부분 사라집니다.\n\nCanva의 Magic Design은 텍스트로 원하는 화면을 설명하면 디자인 초안을 자동으로 만들어 주는 AI 기능입니다. 여기서 나오는 건 동작하는 앱이 아니라 '이런 모양이면 좋겠다'는 그림입니다. 이 그림을 ChatGPT나 Claude에 첨부하고 '지금 내 앱을 이 화면처럼 바꿔 줘'라고 요청하면 수정 결과가 훨씬 정확해집니다.\n\n흐름은 이렇습니다. ① 아래에 요청문 작성 → ② canva.com의 Magic Design에 붙여넣기 → ③ 마음에 드는 초안 선택 → ④ 스크린샷 저장 → ⑤ AI에게 첨부해 수정 요청 → ⑥ 받은 코드를 다시 붙여넣어 확인. 아직 앱을 만들지 않았다면 이 강의를 먼저 봐도 됩니다. 그때는 초안을 첫 코드 요청에 첨부하면 됩니다.",
        terms: [
          { term: "Magic Design", def: "텍스트 설명을 입력하면 Canva가 디자인 초안을 자동 생성하는 AI 기능." },
          { term: "화면 초안(목업)", def: "실제로 동작하진 않지만 생김새를 미리 보여 주는 화면 그림." },
          { term: "레이아웃", def: "제목·버튼·목록 같은 요소를 화면 어디에 둘지 정한 배치." }
        ],
        visual: {
          type: "flow",
          caption: "Canva AI 활용 흐름",
          steps: [
            { label: "화면 요소 정하기", sub: "제목·버튼·목록 등" },
            { label: "요청문 작성", sub: "설명문으로 정리" },
            { label: "Magic Design에 붙여넣기", sub: "canva.com" },
            { label: "초안 선택 & 저장", sub: "스크린샷 보관" },
            { label: "AI에 첨부해 수정 요청", sub: "다음 버전 반영" }
          ]
        },
        discussion: [
          "Canva로 만든 화면 그림을 AI에게 보여 주면 수정 요청이 왜 더 정확해질까요?",
          "지금 만든 앱에서 다음 버전에 가장 먼저 바꾸고 싶은 화면 요소는 무엇인가요?"
        ],
        steps: [
          "화면에 꼭 들어갈 요소를 적습니다.",
          "아래 Canva AI 요청문 칸에 완성된 요청문을 작성합니다.",
          "canva.com에 접속해 로그인합니다.",
          "'디자인 만들기'를 클릭하고 검색창에 '앱 스크린샷' 또는 '휴대폰 목업'을 입력해 규격을 선택합니다.",
          "편집 화면 왼쪽 패널에서 'Magic Design'을 찾아 클릭합니다. (보이지 않으면 왼쪽 검색창에 'Magic Design' 입력)",
          "작성한 요청문을 Magic Design 입력창에 붙여넣고 생성합니다.",
          "마음에 드는 초안을 선택 후 스크린샷으로 저장하거나 공유 링크를 복사합니다.",
          "저장한 화면을 ChatGPT나 Claude에 업로드하고, 지금 쓰고 있는 HTML 코드와 함께 '이 그림처럼 화면만 바꿔 줘. 기능은 그대로 둬'라고 요청합니다.",
          "받은 코드를 'AI에게 코드 받아 실행하기' 강의의 미리보기 칸에 다시 붙여넣어 확인하고, 좋으면 배포를 갱신합니다."
        ],
        externalGuide: "canva.com → 디자인 만들기 → 앱 스크린샷/휴대폰 목업 선택 → 왼쪽 패널 Magic Design → 요청문 붙여넣기 → 초안 선택 → 스크린샷 저장.",
        links: [
          { label: "Canva 열기", url: "https://www.canva.com" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "canvaParts", label: "다음 버전 화면에 넣을 요소", input: "text", placeholder: "예: 여행 제목, 준비물 체크, 코스 뽑기 버튼, 예산 입력칸, 총액 표시", chips: ["제목과 날짜", "체크리스트", "큰 실행 버튼", "합계 표시 영역", "결과 카드"] },
            { key: "canvaPrompt", label: "Canva Magic Design 요청문", placeholder: "예: 여행 준비 미니앱의 모바일 첫 화면. 준비물 체크리스트, 오늘 갈 코스 랜덤 뽑기, 교통비·식비·숙소비 예산 합계가 보이는 깔끔한 한국어 UI." }
          ]
        },
        checks: ["Canva에서 초안이 생성됐고 스크린샷이나 링크로 저장했다", "초안에 내 앱의 핵심 요소가 들어 있다", "초안을 AI에 첨부해 화면 수정 요청을 보내 봤다"]
      }
    ]
  },

  /* ============================== 프로리그 ============================== */
  pro: {
    name: "프로리그",
    theme: "#1a8754",
    label: "보안 가드레일 안에서 날씨·쇼핑 API 여행 준비 앱을 만든다",
    description: "시나리오: 루키 미니앱을 API 연동 여행 준비 앱으로 확장합니다. 여행지·날짜 입력, Open-Meteo 날씨 확인, 네이버 쇼핑 API 구조 설계, 준비물·예산 정리를 연결합니다. 교사 연수라면 '학교 행사 준비 앱'으로 바꾸세요 — 현장학습·운동회 날짜의 날씨를 확인하고, 필요한 물품 구매 후보와 가격을 찾고, 행사 예산을 정리하는 흐름이 그대로 대응합니다. 캠핑·출장 준비 앱으로 바꿔도 됩니다.",
    tags: ["여행 준비 앱", "Open-Meteo", "네이버 쇼핑 API", "API 보안", "예산 정리"],
    padletUrl: "https://padlet.com/dungstme/_-othnocro968oryg4",
    competency: "외부 API를 보안 기준에 맞게 연동하고, 화면·서버 역할을 구분해 실제 데이터로 동작하는 앱을 배포한다",
    finalOutput: "실시간 외부 데이터(날씨·쇼핑 등)를 연동한 배포 앱 + API 보안 점검 기록",
    prerequisites: "루키리그 수료(앱 1개 배포 경험) 또는 동등한 HTML/AI 코드 받기 경험",
    graduationRequirements: [
      "화면·기능·데이터를 정리한 프로 PRD를 완성했다",
      "최소 1개 이상의 외부 API를 연동했다",
      "Secret이 필요한 API와 직접 호출 가능한 API를 구분해 처리했다",
      "Repository·Branch·Commit으로 코드를 관리하며 배포했다"
    ],
    capstone: {
      deliverable: "실시간 날씨·가격 정보를 보여주는 여행 준비 앱(또는 같은 구조의 자기 아이디어 앱)",
      doneCriteria: [
        "배포 링크에서 실제 외부 API 데이터가 화면에 표시된다",
        "API 키 등 비밀 값이 브라우저 코드에 노출되지 않는다",
        "준비물·예산 같은 핵심 기능이 배포 링크에서 그대로 동작한다"
      ],
      useInDailyLife: "여행 갈 때마다 날씨를 다시 검색하지 않고 이 링크 하나로 확인하고, 같은 구조를 바꿔 출장·캠핑 준비용으로 계속 쓸 수 있습니다."
    },
    facilitatorIntro: "4차시 안팎(또는 하루 연수)으로 운영하기 좋습니다. 루키리그 수료자를 전제로 하며, 핵심은 'Secret이 필요한 API'와 '브라우저에서 직접 호출 가능한 API'를 구분하는 보안 감각입니다. 참가자가 API 키를 코드에 그대로 박아 넣는 실수를 가장 많이 하므로, 보안 강의(api-security-pro)에서 시간을 더 배정하는 것을 권장합니다.",
    runPlan: [
      {
        name: "6차시 표준형(차시당 45~50분)",
        note: "api-security-pro는 분량을 줄이지 말고 prd-product와 함께 한 차시를 온전히 쓴다. 결과물 공유(share, 25분)는 과제로 돌리고 다음 만남 시작에 5분씩 발표시킨다. 1차시는 설치가 막히는 참가자가 나오므로 여유를 두고 시작한다.",
        sessions: [
          { title: "1차시 — 환경과 제작 방향 (50분)", pages: ["setup-pro", "package-choice"] },
          { title: "2차시 — 문제·화면·기능 (45분)", pages: ["problem", "screens", "features"] },
          { title: "3차시 — 데이터와 API (50분)", pages: ["data", "frontend-backend", "api"] },
          { title: "4차시 — 보안과 PRD (50분)", pages: ["api-security-pro", "prd-product"] },
          { title: "5차시 — 에이전트로 만들기 (45분)", pages: ["cursor", "build-pro"] },
          { title: "6차시 — 저장소와 배포 (45분)", pages: ["github", "deploy"] }
        ]
      },
      {
        name: "하루 연수형(6시간 안팎)",
        note: "오전·오후 사이 점심시간을 경계로 둔다. 오전 170분·오후 140분이므로 각 블록에 10분 휴식을 두 번 넣어도 3시간 안에 들어온다.",
        sessions: [
          { title: "오전 — 기획부터 보안까지 (170분)", pages: ["setup-pro", "package-choice", "problem", "screens", "features", "data", "frontend-backend", "api", "api-security-pro"] },
          { title: "오후 — 제작부터 배포까지 (140분)", pages: ["prd-product", "cursor", "build-pro", "github", "deploy", "share"] }
        ]
      }
    ],
    pages: [
      {
        id: "setup-pro",
        group: "환경 준비",
        title: "프로 환경 준비하기",
        goal: "내 PC의 설치 가능 여부를 판단해 작업 환경을 정하고, AI 코딩 에이전트 하나를 프로젝트 폴더에 연결할 수 있다.",
        difficulty: "intermediate",
        estimatedMinutes: 30,
        updatedAt: "2026-09-04",
        completionRequirements: ["설치 가능·불가 중 내 작업 환경을 정했다", "에이전트를 하나만 골라 프로젝트 폴더를 열었다", "GitHub 계정을 만들고 Git 사용자 정보를 설정했다"],
        summary: "프로의 핵심 스택은 AI 에이전트 + Git + GitHub입니다. 에이전트가 코드를 만들고, Git이 기록하고, GitHub가 보관·배포합니다. 세 에이전트를 다 설치할 필요는 없고 하나만 고르면 됩니다.",
        reading: "프로리그부터는 AI 에이전트가 파일 하나가 아니라 프로젝트 폴더 전체를 읽고 고칩니다.\n\n먼저 내 PC가 어느 쪽인지 정하세요. 프로그램을 설치할 수 있는 개인 PC라면 Claude Code·Codex·Antigravity 중 하나를 설치해 로컬에서 작업합니다. 학교·교무실 PC처럼 관리자 권한이 없어 설치가 막힌다면 브라우저만으로 진행할 수 있습니다. GitHub 저장소 화면에서 마침표(.) 키를 누르면 github.dev 웹 편집기가 열려 파일을 만들고 고칠 수 있고, 코드는 루키리그처럼 AI 웹 채팅에서 받아 붙여넣으면 됩니다. 설치 여부와 상관없이 이 리그의 학습 목표는 모두 달성할 수 있으니, 설치가 막혔다고 여기서 멈추지 마세요.\n\n세 에이전트는 제공 형태가 다릅니다. Claude Code는 터미널에서 쓰는 명령줄 도구이면서 VS Code·JetBrains 확장과 데스크톱 앱, 웹(claude.ai/code)으로도 씁니다. Codex는 명령줄 도구와 IDE 확장, 웹으로 제공됩니다. Antigravity는 에디터형 앱을 설치해 씁니다. 셋 다 설치할 필요는 없고 하나만 골라 끝까지 쓰면 됩니다.\n\n마지막으로 Node.js가 필요한지 판단합니다. HTML·CSS·JS 파일만 쓰는 앱이라면 필요 없습니다. 에이전트가 React나 Vite 같은 구조로 프로젝트를 만들어 package.json 파일이 생겼다면 그때 Node.js를 설치하면 됩니다. 미리 설치할 필요는 없습니다.",
        terms: [
          { term: "Claude Code", def: "Anthropic의 AI 코딩 에이전트. 터미널 명령줄 도구가 기본이고 VS Code·JetBrains 확장, 데스크톱 앱, 웹으로도 쓴다." },
          { term: "Codex", def: "OpenAI의 AI 코딩 에이전트. 명령줄 도구와 IDE 확장, 웹으로 제공된다." },
          { term: "Antigravity", def: "에디터형으로 설치해 쓰는 AI 개발 도구. 화면 흐름과 여러 단계 작업을 이어서 맡기기 좋다." },
          { term: "Git", def: "파일 변경을 저장하고 GitHub에 올리는 버전 관리 도구." },
          { term: "프로젝트 폴더", def: "에이전트가 읽고 수정할 HTML·CSS·JS 파일이 들어 있는 작업 폴더." },
          { term: "설치 제한 환경", def: "관리자 권한이 없어 프로그램을 설치할 수 없는 PC. 학교·교무실 PC가 대개 여기 해당하며, 브라우저 경로로 우회한다." },
          { term: "Node.js", def: "JavaScript를 브라우저 밖에서 실행하는 도구. package.json이 있는 프로젝트에서만 필요하다." }
        ],
        visual: {
          type: "layers",
          caption: "프로 개발 환경 스택",
          layers: [
            { label: "☁️ GitHub (클라우드)", desc: "코드 저장·배포·협업의 중심" },
            { label: "⬆️ Git (버전 관리)", desc: "변경 기록 → commit → push로 GitHub에 업로드" },
            { label: "🤖 AI 에이전트 (Claude Code · Codex · Antigravity)", desc: "코드 생성·수정·테스트를 자율 처리" },
            { label: "📁 내 프로젝트 폴더", desc: "HTML·CSS·JS 파일이 담긴 로컬 작업 디렉터리" }
          ]
        },
        discussion: [
          "내 PC는 설치가 가능한가요, 브라우저 경로로 가야 하나요? 그 판단 근거는 무엇인가요?",
          "에이전트가 Git 커밋까지 자율로 처리하게 하려면 어떤 조건을 먼저 설정해야 할까요?"
        ],
        steps: [
          "먼저 내 PC에 프로그램을 설치할 수 있는지 확인합니다. 아무 설치 파일이나 실행했을 때 관리자 비밀번호를 요구하며 막히면 '설치 불가'입니다.",
          "[설치 가능] git-scm.com/downloads 에서 Git을 내려받아 설치합니다. 설치 마법사는 기본값 그대로 Next를 눌러도 됩니다.",
          "[설치 가능] PowerShell이나 Git Bash를 열고 `git --version` 을 입력해 버전이 나오는지 확인합니다.",
          "[설치 가능] 커밋에 기록될 내 정보를 설정합니다. `git config --global user.name \"내이름\"` 과 `git config --global user.email \"내메일@example.com\"` 을 차례로 입력합니다.",
          "[설치 가능] Claude Code·Codex·Antigravity 중 하나만 골라 각 공식 페이지의 안내대로 설치하고 실행한 뒤, 내 프로젝트 폴더를 엽니다.",
          "[설치 불가] 설치를 건너뛰고 브라우저로 진행합니다. GitHub 저장소 화면에서 마침표(.) 키를 누르면 github.dev 웹 편집기가 열립니다. 코드는 AI 웹 채팅에서 받아 이 편집기에 붙여넣습니다.",
          "[공통] github.com 에서 계정을 만듭니다(Sign up). 이메일·비밀번호·사용자 이름을 입력합니다.",
          "[공통] 프로젝트 폴더가 아직 없다면 바탕화면에 폴더를 하나 만들고 그 안에 빈 index.html 파일을 둡니다. 이 폴더가 앞으로의 작업 공간입니다.",
          "package.json 파일이 생기기 전까지는 Node.js를 설치하지 않습니다. 생기면 그때 nodejs.org에서 LTS 버전을 받아 설치하고 `node -v` 로 확인합니다."
        ],
        externalGuide: "설치 가능한 PC: ① git-scm.com → Git 설치 ② `git --version` 확인 ③ `git config --global user.name`·`user.email` 설정 ④ 에이전트 하나 설치·실행 ⑤ 프로젝트 폴더 열기 ⑥ github.com → Sign up.  설치 불가한 PC: ① github.com → Sign up ② 저장소 만들기 ③ 저장소 화면에서 마침표(.) 키 → github.dev 웹 편집기 ④ AI 웹 채팅에서 코드를 받아 붙여넣기.",
        links: [
          { label: "Git 다운로드", url: "https://git-scm.com/downloads" },
          { label: "Claude Code", url: "https://claude.ai/code" },
          { label: "Antigravity", url: "https://antigravity.dev" },
          { label: "Codex", url: "https://github.com/openai/codex" },
          { label: "GitHub 가입", url: "https://github.com/signup" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "workEnv", label: "내 작업 환경", input: "choice", value: "설치 가능(로컬 에이전트)", choices: [
              { value: "설치 가능(로컬 에이전트)", desc: "개인 PC — Git과 에이전트를 설치해 프로젝트 폴더에서 작업" },
              { value: "설치 불가(브라우저)", desc: "학교·교무실 PC — github.dev 웹 편집기 + AI 웹 채팅으로 진행" }
            ] },
            { key: "gitVersion", label: "git --version 결과(설치한 경우)", input: "text", placeholder: "예: git version 2.44.0", chips: ["git version 2.44.0", "설치 불가라 건너뜀"] },
            { key: "agentChoice", label: "끝까지 쓸 에이전트 하나", input: "select", options: ["Claude Code", "Codex", "Antigravity", "AI 웹 채팅(설치 불가)"], value: "Claude Code" },
            { key: "githubUsername", label: "GitHub 사용자 이름", input: "text", placeholder: "예: myusername" },
            { key: "projectFolder", label: "프로젝트 폴더 위치(또는 저장소 이름)", input: "text", placeholder: "예: C:\\Users\\내이름\\Desktop\\travel-prep-app 또는 github.com/myusername/travel-prep-app" },
            { key: "setupNote", label: "막힌 부분 메모", input: "text", placeholder: "예: 설치가 관리자 권한으로 막혀 브라우저 경로로 전환함", chips: ["설치 완료, 이상 없음", "관리자 권한으로 설치 막힘 → 브라우저 경로", "프로젝트 폴더 열기 어려움", "GitHub 연결 오류"] }
          ]
        },
        checks: ["설치 가능·불가 중 내 경로를 정했다", "에이전트(또는 웹 편집기)에서 내 프로젝트 폴더·저장소가 화면에 보인다", "github.com에 로그인하면 내 사용자 이름이 보인다"]
      },
      {
        id: "package-choice",
        group: "제작 방향",
        title: "웹앱과 exe 방향 정하기",
        goal: "여행 준비 앱을 웹앱으로 만들지 exe로 만들지 미리 판단한다.",
        difficulty: "intermediate",
        estimatedMinutes: 20,
        updatedAt: "2026-06-22",
        completionRequirements: ["웹앱과 exe의 장단점을 비교했다", "이번 과정에서 만들 앱 형태를 선택했다", "선택 이유를 적었다"],
        summary: "초반에 앱 형태를 정해야 화면 구성, 파일 구조, 배포 방식, 보안 안내가 흔들리지 않습니다.",
        reading: "웹앱과 exe 중 무엇을 고를지는 사용자 상황에 달려 있습니다. 웹앱은 링크로 공유하기 쉽고, 수정하면 바로 업데이트할 수 있으며, 모바일에서도 접근하기 좋고 API 연동 실습과 잘 맞습니다. 대신 인터넷 연결과 브라우저 환경의 영향을 받습니다. exe는 파일로 전달하거나 오프라인에서 실행하기 좋고 설치형 앱처럼 느껴지지만, 패키징 과정이 필요하고 용량이 커질 수 있으며 업데이트가 번거롭고 Windows 보안 경고나 코드 서명 문제가 생길 수 있습니다. 프로리그의 여행 준비 앱은 날씨·쇼핑·예산을 함께 다루므로 기본 추천은 웹앱입니다. 다만 인터넷이 불안정한 현장에서 쓰거나 데스크톱 프로그램처럼 배포해야 한다면 exe 방향을 검토할 수 있습니다.",
        terms: [
          { term: "PyInstaller", def: "Python 프로그램을 exe로 묶어 주는 도구." },
          { term: "Electron·Tauri", def: "웹 기술로 만든 앱을 데스크톱 앱으로 묶는 도구." }
        ],
        visual: {
          type: "compare",
          caption: "웹앱과 exe 선택 기준",
          columns: [
            { label: "웹앱이 좋은 경우", items: ["링크 공유가 중요함", "수정 후 빠른 업데이트 필요", "모바일에서도 열어야 함", "API 연동 실습 중심"] },
            { label: "exe가 필요한 경우", items: ["파일로 전달해야 함", "오프라인 실행이 중요함", "데스크톱 앱처럼 써야 함", "보안 경고 안내 준비 가능"] }
          ]
        },
        discussion: [
          "내 여행 준비 앱은 링크로 공유하는 편이 좋을까요, 파일로 전달하는 편이 좋을까요?",
          "오프라인 실행, 모바일 접근, 업데이트 편의성 중 무엇이 가장 중요한가요?"
        ],
        steps: [
          "내 앱을 실제로 사용할 상황을 적습니다.",
          "웹앱과 exe의 장단점을 비교합니다.",
          "이번 프로리그에서 만들 앱 형태를 선택하고 이유를 적습니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "useCase", label: "앱을 사용할 상황", placeholder: "예: 여행 전 가족과 링크를 공유해 준비물과 예산을 함께 확인한다." },
            { key: "kind", label: "앱 유형", input: "select", options: ["웹앱", "exe", "아직 모르겠음"], value: "웹앱" },
            { key: "choice", label: "이번 과정에서 만들 형태", input: "choice", value: "웹앱", choices: [
              { value: "웹앱", desc: "링크 공유·빠른 수정·모바일 접근에 유리" },
              { value: "exe", desc: "오프라인 실행·파일 전달에 유리" },
              { value: "나중에 결정", desc: "사용 상황을 더 확인한 뒤 선택" }
            ] },
            { key: "reason", label: "선택 이유", placeholder: "예: 날씨와 쇼핑 정보를 API로 불러오고 가족에게 링크로 공유해야 하므로 웹앱으로 만든다." }
          ]
        },
        checks: ["웹앱·exe 중 하나를 골랐고 그 이유가 실제 사용 상황과 연결돼 있다", "고른 형태가 앞으로의 배포 방식과 모순되지 않는다"]
      },
      {
        id: "problem",
        group: "설계",
        title: "문제와 사용자 정의",
        goal: "앱이 해결할 문제와 사용자를 정한다.",
        difficulty: "intermediate",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["문제를 적었다", "사용자를 적었다"],
        summary: "좋은 앱은 기능보다 먼저 '누구의 어떤 문제'를 분명히 합니다.",
        reading: "프로 단계는 '무엇을 만들까'보다 '누가 어떤 불편을 겪고, 이 앱이 어떻게 돕는가'에서 출발합니다. 이번 리그의 예시 앱은 'API 연동 여행 준비 앱'입니다. 여행지와 날짜를 입력하면 날씨를 확인하고, 준비물을 정리하고, 네이버 쇼핑 검색으로 구매 후보와 가격을 확인하며, 예산까지 한곳에서 정리합니다. 예시 그대로 따라 해도 되고, 캠핑 준비·출장 준비·이사 준비처럼 자기 앱으로 바꿔도 됩니다. 핵심은 날씨 API처럼 바로 호출 가능한 API와, 네이버 쇼핑 API처럼 키 보안이 필요한 API의 차이를 이해하는 것입니다.",
        terms: [
          { term: "사용자(타깃)", def: "이 앱을 실제로 쓸 사람." },
          { term: "문제 정의", def: "사용자가 겪는 불편을 한 문장으로 정리한 것." }
        ],
        visual: {
          type: "flow",
          caption: "문제 정의 흐름",
          steps: [
            { label: "사용자", sub: "누가 쓰는가" },
            { label: "불편", sub: "무엇이 흩어졌나" },
            { label: "해결", sub: "앱이 어떻게 돕나" },
            { label: "API 역할", sub: "무엇을 불러오나" },
            { label: "보안 기준", sub: "무엇을 숨기나" }
          ]
        },
        discussion: [
          "내 앱의 사용자를 더 좁히면 누구인가요?",
          "그 사람이 겪는 가장 큰 불편 하나는 무엇인가요?"
        ],
        steps: [
          "해결할 문제를 적습니다.",
          "대상 사용자를 적습니다.",
          "왜 필요한지 한 문장으로 정리합니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "problem", label: "해결할 문제", placeholder: "예: 여행 준비물이 메모, 쇼핑 검색, 날씨 확인, 예산표에 흩어져 빠뜨리기 쉽다.", chips: ["준비물·날씨·쇼핑·예산이 흩어져 있다", "날씨에 맞는 준비물을 고르기 어렵다", "구매 후보 가격을 예산에 반영하기 번거롭다", "현장학습 날씨와 준비물·예산이 따로 논다(교사)", "행사 물품 견적을 매번 다시 찾는다(교사)", "내 앱 주제의 정보가 여러 곳에 흩어져 있다"] },
            { key: "user", label: "대상 사용자", input: "text", placeholder: "예: 여행 전에 준비물과 구매 예산을 한 번에 정리하고 싶은 사람", chips: ["가족 여행 준비자", "혼자 여행을 준비하는 사람", "현장학습을 준비하는 교사", "학교 행사 담당 교사", "출장 준비를 자주 하는 직장인", "내 앱의 실제 사용자"] },
            { key: "why", label: "왜 필요한가(한 문장)", placeholder: "예: 날씨와 쇼핑 정보를 함께 보며 필요한 준비물과 예산을 빠르게 정리하기 위해.", chips: ["날씨에 맞는 준비물을 바로 정하기 위해", "구매 후보와 예산을 한 화면에서 보기 위해", "준비 누락을 줄이기 위해", "API 정보와 내 체크리스트를 연결하기 위해"] }
          ]
        },
        checks: ["문제 문장에 '누가'와 '무엇이 불편한지'가 둘 다 들어 있다", "사용자를 한 사람으로 좁혀 말할 수 있다"]
      },
      {
        id: "screens",
        group: "설계",
        title: "화면 목록 만들기",
        visual: {
          type: "cards",
          caption: "자주 쓰는 화면",
          items: [
            { label: "홈", text: "앱을 여는 첫 화면" },
            { label: "목록", text: "내용을 모아 보는 화면" },
            { label: "상세", text: "하나를 자세히 보는 화면" },
            { label: "작성", text: "새로 추가하는 화면" },
            { label: "설정", text: "환경을 바꾸는 화면" }
          ]
        },
        goal: "필요한 화면을 목록으로 나눈다.",
        difficulty: "intermediate",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["화면 목록을 적었다", "각 화면 목적을 적었다"],
        summary: "화면 목록은 앱의 목차입니다. 사용자가 보게 될 단위로 나누면 구조가 보입니다.",
        reading: "화면 목록은 앱의 지도이자 목차입니다. 홈, 작성, 목록, 상세, 설정처럼 사용자가 이동할 장소를 나누면 앱의 구조가 드러나고, AI에게 '어떤 화면부터 만들지'를 설명하기 쉬워집니다. 단순한 앱은 메인 화면 하나로도 시작할 수 있고, 나중에 다른 화면을 더할 수 있습니다.",
        terms: [
          { term: "화면(스크린)", def: "사용자가 한 번에 보는 한 페이지 단위." },
          { term: "화면 목록", def: "앱에 필요한 화면들을 나열한 목차." }
        ],
        discussion: [
          "내 앱을 한 화면으로 만들 수 있을까요, 아니면 더 필요할까요?",
          "각 화면은 사용자에게 무엇을 보여 주기 위한 것인가요?"
        ],
        steps: [
          "필요한 화면을 적습니다.",
          "각 화면의 목적을 적습니다.",
          "가장 먼저 만들 화면을 정합니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "screenList", label: "화면 목록", placeholder: "예: 여행 정보 입력, 날씨 확인, 준비물 체크리스트, 쇼핑 검색 결과, 예산 정리", chips: ["여행 정보 입력", "날씨 확인", "준비물 체크리스트", "쇼핑 검색 결과", "예산 정리", "요약 대시보드", "행사 정보 입력(교사)", "행사 물품·예산 정리(교사)"] },
            { key: "eachPurpose", label: "각 화면의 목적", placeholder: "예: 날씨 확인은 여행지·날짜별 기온과 강수확률을 보여 주고, 쇼핑 검색은 우비·보조배터리 같은 구매 후보를 보여 준다.", chips: ["입력 화면: 여행지와 날짜를 받는다", "날씨 화면: 기온과 강수확률을 보여 준다", "준비물 화면: 챙긴 항목을 체크한다", "쇼핑 화면: 구매 후보와 가격을 보여 준다", "예산 화면: 총액과 남은 예산을 보여 준다"] },
            { key: "firstScreen", label: "가장 먼저 만들 화면", input: "text", placeholder: "예: 여행 정보 입력 + 준비물 대시보드", chips: ["여행 정보 입력 + 대시보드", "준비물 체크리스트 먼저", "날씨 결과 화면 먼저", "예산 합계 화면 먼저", "내 아이디어의 핵심 화면 먼저"] }
          ]
        },
        checks: ["화면마다 '여기서 사용자가 무엇을 하는지' 한 줄로 답할 수 있다", "가장 먼저 만들 화면 하나를 골랐다"]
      },
      {
        id: "features",
        group: "설계",
        title: "기능 목록 만들기",
        visual: {
          type: "compare",
          caption: "기능 우선순위 나누기",
          columns: [
            { label: "꼭 필요한 것(먼저)", items: ["핵심 동작 한두 개", "없으면 앱이 안 됨", "예: 추가·완료 체크"] },
            { label: "나중에 할 것(미루기)", items: ["있으면 좋은 부가 기능", "없어도 핵심은 동작", "예: 검색·정렬·테마"] }
          ]
        },
        goal: "화면마다 필요한 기능을 정리한다.",
        difficulty: "intermediate",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["핵심 기능을 적었다", "우선순위를 정했다"],
        summary: "기능은 사용자가 눌러서 얻는 동작입니다. 필수와 나중을 나눠야 길을 잃지 않습니다.",
        reading: "기능은 사용자가 실제로 할 수 있는 행동의 목록입니다. 추가하기, 완료 체크, 삭제, 검색처럼 동작을 적고 '꼭 필요한 것'과 '나중에 할 것'을 나눕니다. 모든 기능을 한 번에 만들려 하면 AI도 사람도 방향을 잃습니다. 핵심 기능 몇 개를 먼저 두고, 부가 기능은 나중으로 미루는 식이 좋습니다.",
        terms: [
          { term: "기능", def: "사용자가 눌러 얻는 하나의 동작." },
          { term: "우선순위", def: "먼저 만들 것과 나중에 만들 것의 순서." }
        ],
        discussion: [
          "내 앱의 필수 기능과 나중에 추가할 기능을 어떤 기준으로 구분하겠습니까?",
          "한 가지 기능만 먼저 만든다면 무엇일까요?"
        ],
        steps: [
          "기능을 목록으로 적습니다.",
          "필수와 나중을 구분합니다.",
          "기능별 완료 기준을 적습니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "featureList", label: "기능 목록", placeholder: "예: 여행지·날짜 입력, 날씨 불러오기, 준비물 체크, 네이버 쇼핑 검색, 구매 후보 추가, 예산 합계", chips: ["여행지·날짜 입력", "Open-Meteo 날씨 불러오기", "준비물 체크", "네이버 쇼핑 샘플 결과 표시", "구매 후보를 예산에 추가", "예산 합계 계산", "행사 날짜 날씨 확인(교사)", "행사 물품 견적 정리(교사)"] },
            { key: "priority", label: "우선순위(필수/나중)", placeholder: "예: 필수 - 날씨 확인·준비물 체크·예산 합계 / 나중 - 쇼핑 이미지, 정렬, 저장", chips: ["필수 - 입력·날씨·준비물·예산", "필수 - Secret 없는 기능만", "나중 - 실제 네이버 쇼핑 호출", "나중 - 로그인 저장", "나중 - 동행자 공유", "나중 - 결제·예약은 제외"] },
            { key: "doneCriteria", label: "완료 기준", placeholder: "예: 여행지를 입력하면 날씨가 보이고, 준비물을 체크하고, 쇼핑 후보 가격을 예산에 더할 수 있다.", chips: ["날씨가 화면에 표시된다", "준비물 체크가 유지된다", "쇼핑 샘플 가격을 예산에 더한다", "Secret이 코드에 없다", "모바일에서 주요 버튼이 보인다"] }
          ]
        },
        checks: ["기능이 필수와 나중으로 갈려 있다", "필수 기능마다 '무엇을 하면 무엇이 보인다'는 완료 기준이 있다"]
      },
      {
        id: "data",
        group: "설계",
        title: "데이터 목록 만들기",
        goal: "앱이 저장할 데이터를 정한다.",
        difficulty: "intermediate",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["저장할 데이터를 적었다", "공개하면 안 되는 값을 구분했다"],
        summary: "데이터는 앱이 기억해야 하는 정보입니다. 저장할 것과 공개하면 안 되는 것을 함께 가립니다.",
        reading: "데이터는 앱이 기억해야 하는 정보입니다. 여행 준비 앱이라면 여행지, 여행 날짜, 준비물명, 체크 여부, 쇼핑 검색어, 상품명, 가격, 구매 예정 여부, 예산 합계가 데이터가 됩니다. 데이터 목록을 만들 때는 '저장할 것'과 '절대 공개하면 안 되는 것'을 함께 구분해야 안전합니다. 네이버 쇼핑 API의 Client Secret 같은 값은 데이터가 아니라 비밀 설정이므로 화면이나 공개 코드에 넣으면 안 됩니다. 프로리그에서도 실습 데이터에는 실제 주소·전화번호·여권번호 같은 개인정보를 넣지 않고, 공개 가능한 샘플 데이터만 사용합니다.",
        terms: [
          { term: "데이터", def: "앱이 저장해 기억하는 정보." },
          { term: "민감 정보", def: "공개되면 위험한 값(비밀번호, 키, 개인정보 등)." }
        ],
        visual: {
          type: "compare",
          caption: "데이터 구분 기준",
          columns: [
            { label: "저장해도 되는 데이터", items: ["여행지·날짜", "준비물명·체크 여부", "상품명·가격 샘플", "예산 항목·합계"] },
            { label: "공개하면 안 되는 데이터", items: ["Client Secret", "API 키", "로그인 토큰", "전화번호·여권번호", "정확한 숙소 주소"] }
          ]
        },
        discussion: [
          "내 앱이 기억해야 하는 정보는 무엇무엇인가요?",
          "지금은 없지만 나중에 생길 수 있는 민감 정보는 무엇일까요?"
        ],
        steps: [
          "저장할 데이터를 적습니다.",
          "공개하면 안 되는 데이터를 구분합니다.",
          "DB가 필요한지 판단합니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "saveData", label: "저장할 데이터", placeholder: "예: 여행지, 날짜, 준비물명, 체크 여부, 쇼핑 검색어, 상품명, 가격, 예산 합계", chips: ["여행지", "여행 날짜", "준비물명", "체크 여부", "쇼핑 검색어", "상품명·가격", "예산 항목·합계", "내 앱의 관리 항목"] },
            { key: "secretData", label: "공개하면 안 되는 데이터", input: "text", placeholder: "예: 네이버 Client Secret, Gemini API 키, 로그인 정보", chips: ["네이버 Client Secret", "API 키", "로그인 토큰", "실제 전화번호", "여권번호", "정확한 숙소 주소", "결제 정보"] },
            { key: "dbNeeded", label: "DB가 필요한가?", input: "text", placeholder: "예: 프로에서는 브라우저 저장 또는 샘플 데이터로 충분, 로그인 저장은 마스터에서 처리", chips: ["프로에서는 샘플 데이터로 충분", "브라우저 저장만 사용", "로그인 저장은 마스터에서 처리", "여러 사용자가 쓰면 DB 필요", "동행자 공유가 필요하면 DB 필요"] }
          ]
        },
        checks: ["저장할 데이터 목록과 공개 금지 목록이 따로 적혀 있다", "공개 금지 목록에 Secret·API 키·개인정보가 들어 있다"]
      },
      {
        id: "frontend-backend",
        group: "설계",
        title: "프론트엔드와 백엔드 나누기",
        goal: "화면과 서버의 역할을 구분한다.",
        difficulty: "intermediate",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["프론트엔드 역할을 적었다", "백엔드 역할을 적었다"],
        summary: "프론트엔드는 사용자가 보는 화면, 백엔드는 뒤에서 데이터를 처리하는 부분입니다.",
        reading: "역할을 나누면 AI에게 어떤 일을 맡길지 또렷해집니다. 프론트엔드는 사용자가 보고 누르는 화면이고, 백엔드는 저장·계산·권한 확인처럼 뒤에서 처리하는 부분입니다. 앱을 브라우저 안에만 두면 백엔드 없이도 동작하지만, 비밀 키가 필요한 API를 호출하거나 여러 기기에서 같은 데이터를 보려면 백엔드가 필요해집니다. 프로리그에서는 프론트에서 안전하게 할 수 있는 Open-Meteo 호출과 샘플 쇼핑 응답을 다루고, Secret이 필요한 실제 쇼핑 호출은 서버 프록시가 필요하다고 설계에 표시합니다.",
        terms: [
          { term: "프론트엔드", def: "사용자가 보고 누르는 화면 쪽." },
          { term: "백엔드", def: "저장·계산·권한을 뒤에서 처리하는 서버 쪽." }
        ],
        discussion: [
          "내 앱은 백엔드가 꼭 필요할까요? 언제 필요해질까요?",
          "화면과 서버를 나눠 맡기면 무엇이 편해지나요?"
        ],
        steps: [
          "프론트엔드 역할을 적습니다.",
          "백엔드 역할을 적습니다.",
          "AI에게 나눠 맡길 기준을 적습니다."
        ],
        visual: {
          type: "layers",
          caption: "프론트엔드 ↔ 백엔드 구조",
          layers: [
            { label: "사용자 (브라우저)", desc: "화면을 보고 버튼을 누르는 영역" },
            { label: "프론트엔드", desc: "HTML·CSS·JS — 화면 렌더링" },
            { label: "API (통신 계층)", desc: "요청·응답을 주고받는 약속" },
            { label: "백엔드 (서버)", desc: "데이터 저장·계산·권한 확인" }
          ]
        },
        practice: {
          kind: "form",
          fields: [
            { key: "frontRole", label: "프론트엔드 역할", placeholder: "예: 여행 정보 입력, 날씨 결과 표시, 준비물 체크, 예산 합계 표시" },
            { key: "backRole", label: "백엔드 역할", placeholder: "예: 네이버 쇼핑 API Secret을 숨기고 안전하게 상품 검색 결과를 가져오기" },
            { key: "splitCriteria", label: "AI에게 나눠 맡길 기준", placeholder: "예: 프로에서는 화면, Open-Meteo 호출, 샘플 쇼핑 결과까지만 구현하고 Secret이 필요한 실제 호출은 서버 프록시 필요 항목으로 남긴다." }
          ]
        },
        checks: ["내 앱 기능을 화면 쪽과 서버 쪽으로 하나씩 갈라 놓을 수 있다", "서버가 필요해지는 지점(비밀 키·여러 기기 공유)을 짚었다"]
      },
      {
        id: "api",
        group: "설계",
        title: "API 요청·응답 읽기",
        goal: "화면과 서버가 주고받는 대화 예시를 만든다.",
        difficulty: "intermediate",
        estimatedMinutes: 20,
        updatedAt: "2026-06-22",
        completionRequirements: ["요청 예시를 만들었다", "응답 예시를 만들었다", "Secret이 필요한 API를 구분했다"],
        summary: "API는 화면과 외부 서비스가 주고받는 약속입니다. 프로리그에서는 날씨 API와 네이버 쇼핑 API의 요청·응답을 여행 준비 앱에 연결합니다.",
        reading: "API는 화면과 외부 서비스가 대화하는 약속입니다. 여행 준비 앱에서는 두 종류의 API를 구분합니다. Open-Meteo 날씨 API는 API 키 없이 바로 호출할 수 있어 프로리그에서 실제 요청을 실습하기 좋습니다. 네이버 쇼핑 검색 API는 여행 준비물의 상품명, 가격, 링크, 이미지를 찾을 수 있지만 Client ID와 Client Secret이 필요합니다. Secret은 브라우저 코드에 직접 넣으면 노출되므로, 프로리그에서는 실제 Secret 없이 요청 구조와 샘플 응답을 설계합니다. 프로 결과물에도 '실제 네이버 호출은 서버 프록시 필요'라는 보안 조건을 남겨 두고, 브라우저 코드는 Open-Meteo처럼 공개 호출 가능한 API와 샘플 데이터만 사용합니다.",
        toolGuides: ["openMeteo", "naverShopping"],
        terms: [
          { term: "API", def: "화면과 외부 서비스가 정보를 주고받기로 한 약속." },
          { term: "Open-Meteo", def: "API 키 없이 날씨 예보를 불러올 수 있는 공개 날씨 API." },
          { term: "네이버 쇼핑 검색 API", def: "상품 검색 결과를 가져오는 네이버 검색 API. Client ID와 Secret이 필요하다." },
          { term: "Secret", def: "외부에 공개하면 안 되는 인증 값. 브라우저 코드에 직접 넣지 않는다." }
        ],
        discussion: [
          "날씨 API와 네이버 쇼핑 API는 어떤 점에서 난이도가 다를까요?",
          "네이버 Client Secret을 브라우저 코드에 직접 넣으면 어떤 문제가 생길까요?"
        ],
        steps: [
          "Open-Meteo 날씨 요청 예시를 적습니다.",
          "네이버 쇼핑 검색 요청 형식과 샘플 응답을 적습니다.",
          "브라우저에서 직접 호출 가능한 API와 서버가 대신 호출해야 하는 API를 구분합니다.",
          "화면에 보여 줄 날씨·상품·예산 값을 고릅니다."
        ],
        visual: {
          type: "flow",
          caption: "화면 ↔ 서버 대화 흐름",
          steps: [
            { label: "여행지 입력", sub: "도시·날짜" },
            { label: "날씨 요청", sub: "Open-Meteo" },
            { label: "쇼핑 검색", sub: "네이버 API 구조 설계" },
            { label: "응답 정리", sub: "날씨·상품·가격" },
            { label: "예산 반영", sub: "구매 후보 추가" }
          ]
        },
        practice: {
          kind: "form",
          fields: [
            { key: "reqExample", label: "API 요청 예시", placeholder: "예: Open-Meteo 요청 - 제주 좌표와 여행 날짜로 기온·강수확률 조회 / 네이버 쇼핑 요청 - '여행용 우비' 검색" },
            { key: "resExample", label: "API 응답 예시", placeholder: "예: 날씨 응답 { 기온: 18, 강수확률: 70 } / 쇼핑 샘플 { 상품명: 여행용 우비, 가격: 12900, 링크: ... }" },
            { key: "showValues", label: "화면에 보여 줄 값", input: "text", placeholder: "예: 여행지, 날짜, 기온, 강수확률, 상품명, 가격, 예산 합계" }
          ]
        },
        checks: ["요청 예시에 어떤 값을 보내는지가 적혀 있다", "응답 예시에서 화면에 쓸 값을 골라냈다", "키가 필요한 API와 필요 없는 API가 갈려 있다"]
      },
      {
        id: "api-security-pro",
        group: "보안",
        title: "프로 API 보안 가드레일",
        goal: "프로리그 앱을 만들 때 지켜야 할 API 보안 기준을 정한다.",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        updatedAt: "2026-06-22",
        completionRequirements: ["직접 호출 가능한 API를 적었다", "Secret 필요 API를 브라우저 코드에서 제외했다", "샘플 응답을 정했다", "배포 전 검색어를 적었다"],
        summary: "프로리그에서도 보안은 적용됩니다. 공개 가능한 API는 직접 호출하고, Secret이 필요한 API는 샘플 응답이나 서버 프록시 설계로 다룹니다.",
        reading: "프로리그는 마스터리그처럼 로그인·DB·서버를 완성하는 단계는 아니지만, 보안을 미루는 단계도 아닙니다. 여행 준비 앱에서 Open-Meteo처럼 키가 없는 공개 API는 브라우저에서 직접 호출할 수 있습니다. 반대로 네이버 쇼핑 API처럼 Client Secret이 필요한 API는 브라우저 코드에 넣지 않습니다. 프로 실습에서는 실제 Secret 대신 샘플 응답을 사용하거나, 서버 프록시가 필요하다는 구조를 PRD와 작업 지시서에 명시합니다. 또한 여행지·예산·준비물 정도의 샘플 데이터만 쓰고, 실제 연락처·여권번호·정확한 숙소 주소 같은 개인정보는 넣지 않습니다. 배포 전에는 코드와 공유글에 키, 비밀번호, 개인정보가 없는지 확인합니다.",
        toolGuides: ["openMeteo", "naverShopping"],
        terms: [
          { term: "보안 가드레일", def: "실습 중 지켜야 할 금지사항과 확인 기준." },
          { term: "공개 API", def: "API 키 없이 브라우저에서 호출해도 되는 API. 예: Open-Meteo." },
          { term: "Secret 필요 API", def: "Client Secret이나 API 키가 필요해 브라우저 코드에 직접 넣으면 안 되는 API." },
          { term: "샘플 응답", def: "실제 API 키 없이 화면과 흐름을 구현하기 위한 예시 데이터." }
        ],
        visual: {
          type: "compare",
          caption: "프로리그 API 보안 기준",
          columns: [
            { label: "프로에서 직접 가능", items: ["Open-Meteo 날씨 호출", "공개 샘플 데이터", "준비물·예산 화면", "Secret 없는 요청"] },
            { label: "프로에서 금지", items: ["브라우저 코드에 Client Secret 입력", "API 키를 GitHub에 올리기", "개인 연락처·여권번호 입력", "예약·결제 기능 구현"] },
            { label: "마스터로 넘길 것", items: ["서버 프록시", "환경변수 관리", "로그인별 DB 저장", "Gemini API 키 보호"] }
          ]
        },
        discussion: [
          "내 앱에서 브라우저가 직접 호출해도 되는 API와 서버가 대신 호출해야 하는 API는 무엇인가요?",
          "샘플 데이터로 구현해도 사용자가 실제 흐름을 이해할 수 있으려면 무엇이 필요할까요?",
          "배포 전 어떤 단어를 검색해 보면 키 노출을 줄일 수 있을까요?"
        ],
        steps: [
          "직접 호출 가능한 API를 적습니다.",
          "Secret이 필요한 API를 적고 브라우저 코드에서 제외합니다.",
          "샘플 응답으로 구현할 데이터를 정합니다.",
          "배포 전 보안 검색어를 정합니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "publicApi", label: "브라우저에서 직접 호출할 API", input: "text", placeholder: "예: Open-Meteo 날씨 API" },
            { key: "serverOnlyApi", label: "브라우저 코드에서 제외할 API", input: "text", placeholder: "예: 네이버 쇼핑 API 실제 호출, Client Secret이 필요한 API" },
            { key: "sampleData", label: "샘플 응답으로 구현할 데이터", placeholder: "예: 여행용 우비 12900원, 보조배터리 19900원, 방수팩 7900원" },
            { key: "privacyRule", label: "개인정보 규칙", input: "text", placeholder: "예: 실제 전화번호, 여권번호, 정확한 숙소 주소는 입력하지 않는다." },
            { key: "preDeploySearch", label: "배포 전 검색어", input: "text", placeholder: "예: SECRET, API_KEY, CLIENT_SECRET, password, token" }
          ]
        },
        checks: ["브라우저에서 직접 부를 API와 제외할 API가 갈려 있다", "제외한 API를 대신할 샘플 응답을 정했다", "배포 전에 검색할 단어 목록을 만들었다", "실습 데이터에 실제 연락처·여권번호·주소가 없다"]
      },
      {
        id: "prd-product",
        group: "제작 지시",
        title: "프로 PRD 작성하기",
        goal: "AI에게 제작을 맡길 수 있는 앱 PRD를 완성한다.",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        updatedAt: "2026-06-22",
        completionRequirements: ["문제 정의를 넣었다", "화면·기능·데이터를 넣었다", "프로 보안 기준을 넣었다", "완료 기준을 넣었다"],
        summary: "프로 PRD는 화면·기능·데이터·API·보안·배포 기준까지 담은 '제작용 설명서'입니다.",
        reading: "프로 PRD는 아이디어를 'AI가 바로 작업할 수 있는 설계'로 바꾼 문서입니다. 문제·사용자·화면·기능·데이터·API·보안·배포 기준이 들어가면, AI는 막연한 부탁이 아니라 구체적인 작업으로 이해합니다. 지금까지 프로리그에서 적어 온 내 앱 내용을 한곳에 모으면 그대로 프로 PRD가 됩니다. 특히 API를 쓰는 앱에서는 '브라우저 코드에 넣으면 안 되는 값'과 '샘플 응답으로 처리할 범위'를 PRD에 넣어야 합니다.",
        terms: [
          { term: "프로 PRD", def: "화면·기능·데이터·API·배포까지 담아 제작을 맡기는 설명서." },
          { term: "완료 기준", def: "어디까지 되면 이 작업이 끝났다고 볼지 정한 선." }
        ],
        visual: {
          type: "mindmap",
          caption: "프로 PRD 구성",
          center: "PRD",
          branches: [
            { label: "문제·사용자", items: ["해결할 문제", "대상 사용자", "사용 시나리오"] },
            { label: "설계", items: ["화면 목록", "기능 목록", "데이터 구조", "API 예시"] },
            { label: "기준", items: ["보안 가드레일", "완료 기준", "배포 방식"] }
          ]
        },
        discussion: [
          "이 PRD만 보고 다른 사람이 같은 앱을 만들 수 있을까요? 빠진 건 없나요?",
          "'완료 기준'을 한 문장으로 적는다면 무엇인가요?"
        ],
        steps: [
          "문제와 사용자를 정리합니다.",
          "화면·기능·데이터·API·보안 기준을 채웁니다.",
          "완료 기준과 배포 방식을 적습니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "problem", label: "문제 정의", placeholder: "예: 여행 준비물이 메모, 쇼핑 검색, 날씨 확인, 예산표에 흩어져 빠뜨리기 쉽다.", chips: ["준비물·날씨·쇼핑·예산이 흩어져 있다", "날씨에 맞는 준비물을 고르기 어렵다", "가격 후보를 예산에 반영하기 번거롭다", "내 앱 주제의 정보가 여러 곳에 흩어져 있다"] },
            { key: "user", label: "대상 사용자", input: "text", placeholder: "예: 여행 전에 준비물과 예산을 한 번에 정리하고 싶은 사람", chips: ["가족 여행 준비자", "혼자 여행을 준비하는 사람", "캠핑 준비자", "출장 준비자", "행사 준비 담당자"] },
            { key: "scenario", label: "사용자 시나리오", placeholder: "예: 여행지와 날짜를 입력하고, 날씨를 확인한 뒤 준비물·쇼핑 후보·예산을 한 화면에서 정리한다.", chips: ["여행지와 날짜 입력 → 날씨 확인 → 준비물 추천 → 쇼핑 후보 확인 → 예산 합계", "캠핑 날짜 입력 → 날씨 확인 → 장비 체크 → 구매 후보 정리", "출장지 입력 → 날씨 확인 → 짐 체크 → 예상 비용 정리"] },
            { key: "screens", label: "화면 목록", placeholder: "예: 여행 정보 입력, 날씨 확인, 준비물 체크리스트, 쇼핑 검색 결과, 예산 정리", chips: ["입력 화면", "요약 대시보드", "날씨 카드", "준비물 체크리스트", "쇼핑 후보 목록", "예산 합계", "보안 안내"] },
            { key: "features", label: "기능 목록", placeholder: "예: 날씨 조회, 준비물 체크, 네이버 쇼핑 샘플 결과 표시, 예산 합계 계산", chips: ["Open-Meteo 날씨 조회", "준비물 체크", "네이버 쇼핑 샘플 결과", "가격을 예산에 추가", "예산 합계 계산", "API 실패 안내", "Secret 노출 점검"] },
            { key: "data", label: "데이터 목록", placeholder: "예: 여행지, 날짜, 준비물명, 체크 여부, 상품명, 가격, 예산 항목", chips: ["여행지", "날짜", "기온·강수확률", "준비물명·체크 여부", "상품명·가격", "예산 항목", "샘플 응답", "내 앱 데이터명"] },
            { key: "api", label: "API 필요 여부", input: "text", placeholder: "예: Open-Meteo는 직접 호출, 네이버 쇼핑 API는 Secret 보호가 필요하므로 샘플 응답과 서버 프록시 구조만 설계", chips: ["Open-Meteo는 브라우저 직접 호출", "네이버 쇼핑은 샘플 응답으로 구현", "Secret 필요 API는 서버 프록시 필요", "API 실패 시 대체 문구 표시", "내 앱 API도 키 필요 여부를 구분"] },
            { key: "security", label: "프로 보안 기준", placeholder: "예: 브라우저 코드에 Client Secret·API 키·개인정보를 넣지 않는다. 네이버 쇼핑은 샘플 응답으로 구현하고 실제 호출은 서버 프록시 필요 항목으로 남긴다.", chips: ["브라우저 코드에 Secret 금지", "GitHub에 API 키 업로드 금지", "개인정보 입력칸 제외", "예약·결제 기능 제외", "샘플 데이터만 사용", "배포 전 SECRET/API_KEY 검색"] },
            { key: "deploy", label: "배포 방식", input: "text", placeholder: "예: 웹 배포", chips: ["웹앱으로 배포", "GitHub Pages", "Netlify", "Vercel", "exe는 이번 단계에서 제외", "나중에 마스터에서 검토"] },
            { key: "done", label: "완료 기준", placeholder: "예: 날씨가 표시되고, 준비물을 체크할 수 있으며, 쇼핑 후보 가격을 예산에 더해 합계가 바르게 표시된다. 네이버 Secret은 브라우저 코드에 없다.", chips: ["날씨 표시 통과", "준비물 체크 통과", "쇼핑 샘플 표시 통과", "예산 합계 통과", "Secret 검색 통과", "모바일 확인 통과"] }
          ]
        },
        checks: ["PRD에 화면·기능·데이터·API·보안·완료 기준이 모두 들어 있다", "'브라우저 코드에 넣지 말 것'이 PRD에 명시돼 있다", "이 PRD를 그대로 복사해 에이전트에 붙여넣을 수 있다"]
      },
      {
        id: "cursor",
        group: "제작 지시",
        title: "AI 에이전트 선택과 작업 지시서",
        goal: "어떤 AI 에이전트를 쓸지 선택하고, 해당 도구에 붙여넣을 작업 지시서를 만든다.",
        difficulty: "intermediate",
        estimatedMinutes: 20,
        updatedAt: "2026-06-22",
        completionRequirements: ["작업 지시서를 만들었다", "보안 금지사항을 넣었다", "먼저 질문하라는 문구를 넣었다"],
        summary: "Claude Code·Codex·Antigravity는 제공 형태와 강점이 다릅니다. 어느 것을 쓰든 '이번에 이만큼, 이 범위 안에서'라는 명확한 지시서가 핵심입니다.",
        reading: "프로리그에서 소개하는 AI 에이전트는 세 가지입니다. Claude Code는 프로젝트 폴더 전체를 읽어 여러 파일을 함께 수정하고 테스트 흐름을 점검하는 데 강하며, 터미널 명령줄 도구가 기본이고 IDE 확장·데스크톱 앱·웹으로도 씁니다. Codex는 기존 코드를 읽고 문제를 찾거나 수정 방향을 빠르게 제안받을 때 좋으며, 명령줄 도구·IDE 확장·웹으로 제공됩니다. Antigravity는 에디터형 앱으로, 화면 흐름을 보며 여러 단계의 작업을 이어서 맡기기 좋습니다. 앞 강의에서 설치가 막혀 브라우저 경로를 택했다면 AI 웹 채팅을 에이전트 자리에 놓고 그대로 진행하면 됩니다.\n\n중요한 것은 도구 선택이 아니라 지시서입니다. 어느 도구를 쓰든 작업 지시서의 뼈대는 같습니다 — PRD 요약, 이번 작업 범위, 손대지 말 것, 먼저 물어볼 조건. 범위를 좁게 자를수록 결과를 검증하기 쉬워집니다.",
        terms: [
          { term: "AI 에이전트", def: "단순 답변이 아닌 코드 작성·파일 수정·실행까지 직접 처리하는 AI 도구." },
          { term: "Claude Code", def: "여러 파일 수정과 테스트 점검에 강한 AI 코딩 에이전트. 터미널 명령줄 도구가 기본이며 IDE 확장·데스크톱 앱·웹으로도 쓴다." },
          { term: "Codex", def: "코드 분석, 수정 제안, 구현 보조에 쓰는 AI 코딩 에이전트. 명령줄 도구·IDE 확장·웹으로 제공된다." },
          { term: "Antigravity", def: "화면 흐름과 여러 단계 작업을 이어서 맡기기 좋은 에디터형 AI 개발 도구." },
          { term: "작업 지시서", def: "PRD에서 이번 작업 범위를 잘라낸 실행 요청 문서." }
        ],
        visual: {
          type: "compare",
          caption: "AI 에이전트 비교",
          columns: [
            { label: "Claude Code", items: ["터미널·IDE 확장·웹", "프로젝트 폴더 전체 읽기", "파일·Git·테스트 흐름 점검", "복잡한 리팩터링에 강함"] },
            { label: "Codex", items: ["터미널·IDE 확장·웹", "자연어 → 코드 수정", "기존 코드 분석·수정", "빠른 문제 해결"] },
            { label: "Antigravity", items: ["에디터형 앱 설치", "화면 흐름 기반 작업", "멀티스텝 작업 위임", "빠른 프로토타이핑"] }
          ]
        },
        discussion: [
          "Claude Code·Codex·Antigravity 중 현재 프로젝트에 어떤 도구가 가장 적합할까요?",
          "작업 범위를 좁혀서 지시하면 어떤 이점이 생기나요?"
        ],
        steps: [
          "사용할 AI 에이전트를 선택합니다 (Claude Code·Codex·Antigravity).",
          "선택한 도구에서 프로젝트 폴더를 엽니다. 브라우저 경로라면 github.dev 편집기와 AI 웹 채팅 탭을 함께 엽니다.",
          "아래 실습칸에 PRD 요약을 붙여넣습니다.",
          "이번 작업에서 구현할 범위를 구체적으로 적습니다.",
          "손대지 말아야 할 부분을 명시합니다.",
          "지시서 끝에 '이해 안 되는 부분이 있으면 구현 전에 먼저 물어봐 줘'를 추가합니다.",
          "선택한 AI 에이전트에 지시서를 붙여넣고 질문이 오면 답한 뒤 '이제 구현해 줘'를 요청합니다."
        ],
        externalGuide: "① 에이전트 선택 ② 지시서 완성 ③ 에이전트 입력창에 붙여넣기 ④ '먼저 물어봐 줘' 추가 ⑤ 질문 답변 후 '이제 구현해 줘' ⑥ 코드 확인 → 수정 반복",
        links: [
          { label: "Claude Code", url: "https://claude.ai/code" },
          { label: "Antigravity", url: "https://antigravity.dev" },
          { label: "Codex", url: "https://github.com/openai/codex" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "workorder", label: "작업 지시서", placeholder: "예: 여행 준비 앱에 여행지·날짜 입력, Open-Meteo 날씨 표시, 준비물 체크, 쇼핑 샘플 결과, 예산 합계를 구현해 줘. 브라우저 코드에는 어떤 Secret도 넣지 마.", chips: ["Open-Meteo 날씨 패널 구현", "준비물 체크리스트 구현", "네이버 쇼핑 샘플 결과 표시", "예산 항목 추가와 합계 계산", "API 실패 안내 표시", "내 앱 주제로 문구 바꾸기"] },
            { key: "scope", label: "작업 범위(건드릴 것/말 것)", placeholder: "예: 프론트 화면과 Open-Meteo 호출만. 네이버 Client Secret은 브라우저 코드에 넣지 말 것.", chips: ["브라우저에 Secret 넣지 않기", "예약·결제·항공권 구매 제외", "네이버 쇼핑은 샘플 응답으로 표시", "개인정보 입력칸 만들지 않기", "저장·로그인은 마스터리그에서 처리"] },
            { key: "askFirst", label: "먼저 물어볼 질문", input: "text", placeholder: "예: 여행지 좌표를 직접 입력할지, 도시 선택 목록으로 시작할지 먼저 물어봐 줘.", chips: ["도시 입력 방식 먼저 확인", "쇼핑 샘플 데이터 먼저 확인", "예산 항목 기준 먼저 확인", "모바일 우선 레이아웃 확인", "내 앱 주제의 용어 확인"] }
          ]
        },
        checks: ["지시서에 이번 작업 범위와 손대지 말 것이 둘 다 있다", "지시서에 보안 금지사항이 들어 있다", "지시서 끝에 '먼저 물어봐 줘'가 들어 있다"]
      },
      {
        id: "build-pro",
        group: "제작",
        title: "AI 에이전트로 프로젝트 구현하기",
        goal: "선택한 AI 에이전트로 여러 파일 프로젝트를 수정하고, 기능·보안·실행 결과를 점검한다.",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        updatedAt: "2026-06-22",
        completionRequirements: ["변경된 파일을 기록했다", "실행 위치를 기록했다", "PRD의 기능이 모두 동작한다", "Secret·개인정보 노출을 점검했다"],
        summary: "프로리그 앱은 단일 HTML 붙여넣기가 아니라 프로젝트 폴더에서 구현합니다. 변경 파일, 실행 주소, 기능 점검, 보안 점검을 기록합니다.",
        reading: "이 단계에서는 앞에서 만든 작업 지시서를 실제로 AI 에이전트에 넣어 프로젝트를 수정합니다. 프로리그 앱은 Open-Meteo 호출, 샘플 쇼핑 응답, 예산 계산, 보안 점검이 함께 들어가므로 파일이 여러 개로 늘어납니다.\n\n루키리그와 가장 크게 달라지는 점은 '내가 직접 실행해 봐야 한다'는 것입니다. 실행 방법은 프로젝트 모양에 따라 셋 중 하나입니다. 파일이 index.html 하나뿐이면 그 파일을 더블클릭해 브라우저로 엽니다. HTML·CSS·JS 파일이 여러 개면 VS Code의 Live Server 확장으로 열어 http://127.0.0.1:5500 같은 주소에서 확인합니다. 폴더에 package.json이 생겼다면 그 폴더에서 `npm install` 을 한 번 실행한 뒤 `npm run dev` 로 띄우고, 터미널에 뜬 주소(예: http://localhost:5173)를 브라우저에 엽니다.\n\n화면이 하얗게 뜨거나 버튼이 안 먹으면 F12를 눌러 Console 탭의 빨간 글자를 확인하세요. 그 문구가 원인을 좁히는 가장 빠른 단서입니다. 에이전트가 어떤 파일을 만들거나 고쳤는지, 어떤 주소에서 확인했는지, 어떤 기능이 통과했는지를 기록하고, 코드에 Secret·API_KEY·password·token 같은 값이 들어가지 않았는지 함께 확인합니다. '기능 A는 동작하지만 B가 안 된다'처럼 구체적으로 재요청하는 것이 포인트입니다.",
        terms: [
          { term: "AI 에이전트", def: "코드 생성뿐 아니라 파일 수정·실행·테스트까지 처리하는 AI 도구." },
          { term: "구현(Implementation)", def: "설계한 기능을 실제로 동작하게 코드로 만드는 과정." },
          { term: "이터레이션", def: "'지시 → 결과 확인 → 수정 요청'을 한 번 순환하는 사이클." },
          { term: "로컬 서버", def: "내 컴퓨터에서만 열리는 임시 주소(http://localhost:...). 여러 파일로 나뉜 앱을 제대로 실행할 때 쓴다." },
          { term: "개발자 도구(F12)", def: "브라우저에 내장된 점검 창. Console 탭의 빨간 글자가 오류 원인을 알려 준다." }
        ],
        visual: {
          type: "flow",
          caption: "프로 구현 점검 흐름",
          steps: [
            { label: "프로젝트 열기", sub: "에이전트·편집기" },
            { label: "지시서 입력", sub: "범위·금지사항" },
            { label: "파일 변경 확인", sub: "무엇이 바뀌었나" },
            { label: "기능 검증", sub: "PRD 기준" },
            { label: "보안 검색", sub: "Secret 미노출" }
          ]
        },
        discussion: [
          "AI가 처음 만든 코드가 기대와 다를 때, 어떻게 재요청을 구성하겠습니까?",
          "기능을 하나씩 검증하는 방식이 한꺼번에 확인하는 것보다 나은 이유는 무엇인가요?"
        ],
        steps: [
          "앞에서 선택한 AI 에이전트를 엽니다.",
          "선택한 도구에서 프로젝트 폴더를 열고 작업 지시서를 붙여넣습니다.",
          "에이전트가 수정한 파일 목록을 확인합니다.",
          "로컬 실행 주소나 열어 본 파일 경로를 기록합니다.",
          "코드에서 SECRET, API_KEY, CLIENT_SECRET, password, token 같은 단어를 검색합니다.",
          "PRD의 기능 목록을 하나씩 체크하며 동작을 검증합니다.",
          "동작하지 않는 기능은 'OO 기능이 작동하지 않습니다. 원인을 찾아 수정해 줘'처럼 구체적으로 재요청합니다.",
          "모든 기능과 보안 기준을 확인한 결과를 아래 실습 칸에 기록합니다."
        ],
        externalGuide: "① 에이전트 실행 ② 프로젝트 폴더 열기 ③ 지시서 붙여넣기 ④ 변경 파일 확인 ⑤ 브라우저에서 실행 확인 ⑥ 보안 검색 ⑦ 미동작 기능 구체적 재요청 ⑧ 작업 기록 정리",
        links: [
          { label: "Claude Code", url: "https://claude.ai/code" },
          { label: "Antigravity", url: "https://antigravity.dev" },
          { label: "Codex", url: "https://github.com/openai/codex" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "builtFeatures", label: "구현한 기능 목록", placeholder: "예: ✅ 여행지·날짜 입력  ✅ 날씨 표시  ✅ 준비물 체크  ✅ 쇼핑 샘플 후보 표시  ✅ 예산 합계  ✅ Secret 미노출 — 각각 확인 완료", chips: ["✅ Open-Meteo 날씨 표시 — 동작 확인", "✅ 준비물 체크 — 동작 확인", "✅ 쇼핑 샘플 결과 — 동작 확인", "✅ 예산 합계 — 동작 확인", "✅ 개인정보 입력 없음 — 확인", "✅ Secret 미노출 — 확인"] },
            { key: "changedFiles", label: "변경된 파일", placeholder: "예: index.html, styles.css, app.js, data/sample-products.js" },
            { key: "runTarget", label: "실행 확인 위치", input: "text", placeholder: "예: http://localhost:5173 또는 file:///.../index.html" },
            { key: "securityScan", label: "보안 검색 결과", placeholder: "예: SECRET, API_KEY, CLIENT_SECRET, password, token 검색 결과 실제 키 없음. 네이버 쇼핑은 샘플 응답만 사용." },
            { key: "fixRequests", label: "다시 요청한 수정", placeholder: "예: 예산 합계가 갱신되지 않아 원인 확인과 수정 요청. 수정 후 정상 동작 확인." }
          ]
        },
        checks: ["브라우저에서 내 앱을 열어 PRD의 기능이 모두 동작한다", "에이전트가 바꾼 파일 목록을 확인했다", "코드에서 SECRET·API_KEY·password·token을 검색해 실제 값이 없다", "동작하지 않던 기능을 구체적으로 재요청해 고쳤다"]
      },
      {
        id: "github",
        group: "배포",
        title: "GitHub 저장소·브랜치·커밋 관리",
        goal: "Repository·Branch·Commit의 역할을 이해하고 안전하게 코드를 관리한다.",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        updatedAt: "2026-06-22",
        completionRequirements: ["Repository를 만들었다", "기능 브랜치를 사용했다", "커밋 메시지를 만들었다", "민감 정보 점검을 했다"],
        summary: "GitHub는 코드를 버전별로 기록하는 공간입니다. Repository는 보관함, Branch는 작업 분리선, Commit은 변경 기록 단위입니다.",
        reading: "GitHub로 코드를 관리하면 '언제 무엇을 바꿨는지' 기록이 남고, 실수해도 이전 상태로 되돌릴 수 있습니다. Repository(저장소)는 프로젝트 파일 전체를 담는 보관함이고, main 브랜치는 항상 잘 동작하는 안전한 버전을 유지하는 기본 줄기입니다. Branch(브랜치)는 main을 건드리지 않고 새 기능을 시험하는 별도 작업 공간입니다. 기능 브랜치를 만들어 작업하고, 잘 되면 main에 합칩니다(Merge). Commit은 '이 시점의 변경을 저장한다'는 기록 단위로, 메시지는 '예산 합계 기능 추가'처럼 사람이 읽고 알 수 있게 적습니다. Push는 내 컴퓨터의 기록을 GitHub에 올리는 것이고, Pull은 GitHub의 최신 상태를 내 컴퓨터로 내려받는 것입니다.\n\n이 강의는 개념만 읽고 넘어가는 곳이 아닙니다. 아래 따라하기의 명령을 실제로 한 번 쳐 보세요. 명령어를 외울 필요는 없습니다. 각 명령을 클릭하면 복사되고, 처음 한 번만 순서대로 실행하면 그다음부터는 add → commit → push 세 개만 반복합니다.\n\n명령줄이 부담스럽거나 설치가 막힌 환경이라면 명령 없이 할 수도 있습니다. 에이전트에게 '변경 사항을 커밋하고 푸시해 줘'라고 맡기거나, GitHub Desktop 프로그램의 버튼으로 하거나, 브라우저의 github.dev 편집기에서 왼쪽 소스 제어 아이콘으로 커밋할 수 있습니다. 어느 쪽이든 남는 기록은 같습니다.\n\n올리기 전에는 반드시 API 키·비밀번호·개인정보가 없는지 확인하세요. 한 번 GitHub에 올라간 값은 나중에 지워도 기록에 남습니다.",
        terms: [
          { term: "Repository(저장소)", def: "한 프로젝트의 파일 전체와 변경 기록을 담는 보관함." },
          { term: "Branch(브랜치)", def: "main을 건드리지 않고 새 기능을 만드는 별도 작업 공간." },
          { term: "Commit(커밋)", def: "특정 시점의 변경을 메시지와 함께 저장한 기록 단위." },
          { term: "Push / Pull", def: "Push는 내 컴퓨터 → GitHub, Pull은 GitHub → 내 컴퓨터." },
          { term: "Merge", def: "기능 브랜치에서 완성한 코드를 main에 합치는 일." },
          { term: ".gitignore", def: "GitHub에 올리지 않을 파일 목록을 적어 두는 파일. 여기 적힌 파일은 커밋에 포함되지 않는다." }
        ],
        discussion: [
          "main 브랜치를 직접 수정하지 않고 별도 브랜치를 나눠 쓰면 무엇이 안전해질까요?",
          "좋은 커밋 메시지와 나쁜 커밋 메시지의 차이는 무엇일까요?"
        ],
        steps: [
          "github.com 오른쪽 위 '+' → 'New repository' → 이름 입력 → 'Create repository'를 눌러 빈 저장소를 만듭니다. 다음 화면에 나오는 저장소 주소(https://github.com/…)를 복사해 둡니다.",
          "프로젝트 폴더에 .gitignore 파일을 만들고 올리지 않을 것을 한 줄에 하나씩 적습니다. 보통 이 세 줄이면 시작으로 충분합니다 — .env / .env.local / node_modules/",
          "프로젝트 폴더에서 터미널을 엽니다. VS Code라면 상단 메뉴 Terminal → New Terminal, 탐색기라면 폴더 주소창에 cmd를 입력하고 Enter를 누릅니다.",
          "저장소를 처음 연결할 때만 다음을 순서대로 실행합니다. `git init` → `git add .` → `git commit -m \"첫 커밋\"` → `git branch -M main` → `git remote add origin 복사한주소` → `git push -u origin main`",
          "새 기능을 시작할 때는 기능 브랜치를 만듭니다. `git switch -c feature/weather-panel`",
          "작업이 끝날 때마다 세 개만 반복합니다. `git add .` → `git commit -m \"예산 합계 기능 추가\"` → `git push`",
          "지금 무엇이 올라갈 상태인지 헷갈리면 `git status` 를 실행해 확인합니다.",
          "Push 전에 코드에서 SECRET, API_KEY, CLIENT_SECRET, password, token 을 검색해 실제 값이 없는지 확인합니다.",
          "GitHub 저장소 페이지를 새로고침해 내 파일이 올라갔는지 눈으로 확인합니다.",
          "기능이 잘 동작하면 GitHub에서 'Compare & pull request' → 'Merge pull request'로 main에 합칩니다.",
          "명령줄을 쓰지 않는 경우: 에이전트에게 '변경 사항을 커밋하고 푸시해 줘'라고 요청하거나, GitHub Desktop 또는 github.dev 편집기의 소스 제어 화면에서 버튼으로 커밋합니다."
        ],
        visual: {
          type: "tree",
          caption: "GitHub 저장소 구조",
          root: "Repository (저장소)",
          children: [
            { label: "main 브랜치 (항상 동작하는 버전)", children: [
              { label: "Commit: v1.0 초기 배포" },
              { label: "Commit: 기능 브랜치 Merge" }
            ]},
            { label: "feature/weather-shopping-budget (기능 작업 공간)", children: [
              { label: "Commit: 여행 날씨와 예산 기능 구현" },
              { label: "Commit: 버그 수정" }
            ]}
          ]
        },
        externalGuide: "처음 한 번: `git init` → `git add .` → `git commit -m \"첫 커밋\"` → `git branch -M main` → `git remote add origin 저장소주소` → `git push -u origin main`.  그다음부터 매번: `git add .` → `git commit -m \"바꾼 내용\"` → `git push`.  상태 확인은 `git status`.  명령이 부담스러우면 에이전트에게 커밋·푸시를 맡기거나 GitHub Desktop·github.dev의 소스 제어 버튼을 씁니다.",
        links: [
          { label: "GitHub 열기", url: "https://github.com" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "repoName", label: "Repository 이름", input: "text", placeholder: "예: travel-prep-app" },
            { key: "branchName", label: "기능 브랜치 이름", input: "text", placeholder: "예: feature/weather-shopping-budget" },
            { key: "commitMsg", label: "커밋 메시지", input: "text", placeholder: "예: 여행 날씨와 예산 기능 구현" },
            { key: "gitignoreLines", label: ".gitignore에 적은 것", input: "text", placeholder: "예: .env, .env.local, node_modules/", chips: [".env", ".env.local", "node_modules/", "*.key"] },
            { key: "beforeUpload", label: "업로드 전 확인", placeholder: "예: SECRET·API_KEY·CLIENT_SECRET·password·token 검색 결과 실제 값 없음. .gitignore에 .env 포함 확인. GitHub 저장소 페이지에서 파일 목록 확인 완료." }
          ]
        },
        checks: ["GitHub 저장소 페이지에 내 파일 목록이 보인다", "커밋이 2개 이상 있고 메시지만 보고 무엇을 바꿨는지 알 수 있다", ".gitignore에 .env가 있고 저장소에 비밀 값 파일이 올라가 있지 않다"]
      },
      {
        id: "deploy",
        group: "배포",
        title: "웹 배포 준비하기",
        visual: {
          type: "flow",
          caption: "배포하고 확인하기",
          steps: [
            { label: "플랫폼 선택", sub: "Vercel·Netlify 등" },
            { label: "배포", sub: "파일 올리기" },
            { label: "링크 열기", sub: "직접 접속" },
            { label: "기능·모바일 확인", sub: "실제로 동작?" }
          ]
        },
        goal: "웹 배포 플랫폼과 확인 기준을 정한다.",
        difficulty: "intermediate",
        estimatedMinutes: 20,
        updatedAt: "2026-06-22",
        completionRequirements: ["배포 플랫폼을 골랐다", "실제 배포 URL이 열린다", "주요 기능을 배포 URL에서 확인했다"],
        summary: "배포는 만든 앱을 남이 접속할 수 있게 공개하는 일입니다. '버튼을 눌렀다'가 아니라 '링크가 실제로 열린다'가 기준입니다.",
        reading: "배포는 앱을 다른 사람이 열어 볼 수 있게 공개하는 단계입니다. GitHub Pages, Vercel, Netlify, Cloudflare Pages 같은 서비스를 씁니다. 배포가 끝났다는 건 링크가 열리고 주요 기능이 동작하며 모바일에서도 깨지지 않는다는 뜻입니다. 실패할 때를 대비해 플랫폼, 에러 화면, 파일 구조를 기록해 두면 도움을 받기 쉽습니다. 배포 후 링크를 직접 열어 주요 기능이 되는지 확인해 봅니다.",
        terms: [
          { term: "배포", def: "앱을 인터넷에 올려 링크로 접속하게 만드는 일." },
          { term: "배포 플랫폼", def: "앱을 손쉽게 올려 주는 서비스(Vercel 등)." }
        ],
        discussion: [
          "'배포 완료'를 무엇으로 확인하면 진짜 끝난 걸까요?",
          "배포가 실패했을 때 문제를 좁히기 위해 어떤 정보를 먼저 수집하겠습니까?"
        ],
        steps: [
          "배포 플랫폼을 고릅니다.",
          "배포 URL(또는 목표 URL)을 기록합니다.",
          "실패 시 도움 요청문을 만듭니다."
        ],
        externalGuide: "① 아래에서 플랫폼을 선택합니다. ② 해당 링크를 클릭해 접속합니다. ③ Netlify: 'Add new site → Deploy manually' → 프로젝트 폴더 드래그&드롭. Vercel: 'Add New → Project' → GitHub 저장소 연결 또는 폴더 업로드. GitHub Pages: 저장소 → Settings → Pages → Branch 선택 → Save. ④ 생성된 URL을 아래에 기록합니다. ⑤ URL을 직접 열어 주요 기능이 동작하는지, 모바일에서 깨지지 않는지 확인합니다.",
        links: [
          { label: "Netlify 열기", url: "https://app.netlify.com" },
          { label: "Vercel 열기", url: "https://vercel.com" },
          { label: "GitHub Pages 안내", url: "https://pages.github.com" },
          { label: "Cloudflare Pages", url: "https://pages.cloudflare.com" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "platform", label: "배포 플랫폼", input: "select", options: ["GitHub Pages", "Vercel", "Netlify", "Cloudflare Pages"], value: "GitHub Pages" },
            { key: "deployUrl", label: "실제 배포된 URL", input: "text", placeholder: "예: https://username.github.io/my-app" },
            { key: "deployCheck", label: "배포 후 확인 결과", placeholder: "예: 첫 화면 정상, 날씨 표시·준비물 체크·예산 합계 동작, Secret 노출 없음, 모바일 확인 완료" },
            { key: "deployHelp", label: "배포 중 어려웠던 점 / 해결 방법", placeholder: "예: 경로 오류가 났는데 index.html 위치를 루트로 옮기니 해결됐다." }
          ]
        },
        checks: ["배포 URL을 시크릿 창에서 열어도 앱이 뜬다", "배포된 화면에서 주요 기능이 동작하고 모바일에서 깨지지 않는다"]
      },
      {
        id: "share",
        group: "공유",
        title: "프로 결과물 공유하기",
        visual: {
          type: "cards",
          caption: "프로 공유글에 담을 것",
          items: [
            { label: "배포 링크", text: "남이 직접 써 볼 주소" },
            { label: "PRD 요약", text: "무엇을 왜 만들었는지" },
            { label: "구현 소감", text: "어렵던 점·배운 점" }
          ]
        },
        goal: "완성된 앱의 배포 링크와 PRD를 Padlet에 공유한다.",
        difficulty: "intermediate",
        estimatedMinutes: 25,
        updatedAt: "2026-06-22",
        completionRequirements: ["배포 링크가 실제로 열린다", "공유글을 만들었다", "보안 점검 메모를 넣었다", "공개 점검을 했다"],
        summary: "프로리그를 마친 여러분은 실제로 배포된 앱을 갖게 되었습니다. 링크·PRD 요약·도움받고 싶은 점을 함께 공유해 피드백을 받아 보세요.",
        reading: "프로 단계 공유글에는 배포된 앱 링크, PRD 요약, 구현 소감을 담습니다. 다른 사람이 링크를 열어 직접 써 보고 피드백을 줄 수 있도록 핵심을 추립니다. 앱 링크를 공유할 때는 개인정보·API 키가 코드와 화면에 없는지 먼저 확인하세요. 네이버 쇼핑은 실제 Secret 호출이 아니라 샘플 응답 또는 서버 프록시 설계로 처리했다는 점도 적어 두면 안전합니다. 배포가 안 됐다면 가장 완성된 상태의 코드 스크린샷이라도 담아 공유합니다.",
        terms: [
          { term: "PRD 요약", def: "긴 설명서에서 핵심만 추린 짧은 요지." },
          { term: "피드백", def: "남이 내 결과물을 써 보고 주는 의견." }
        ],
        discussion: [
          "다른 사람이 내 앱 링크를 열어 바로 쓸 수 있도록 무엇을 안내하면 좋을까요?",
          "지금 가장 도움받고 싶은 점은 무엇인가요?"
        ],
        steps: [
          "닉네임과 앱 제목을 씁니다.",
          "배포된 앱 링크를 기록합니다.",
          "PRD 요약과 배운 점을 정리합니다.",
          "공개 점검과 보안 점검 후 Padlet에 올립니다."
        ],
        externalGuide: "공유글을 복사한 뒤 프로리그 Padlet에 직접 올리세요. 배포 링크도 함께 붙여넣으세요.",
        practice: {
          kind: "share",
          fields: [
            { key: "nickname", label: "닉네임", input: "text" },
            { key: "title", label: "앱 제목", input: "text", placeholder: "예: API 연동 여행 준비 앱" },
            { key: "deployUrl", label: "배포된 앱 링크", input: "text", placeholder: "예: https://username.github.io/my-app" },
            { key: "learned", label: "배운 점" },
            { key: "securityCheck", label: "보안 점검 메모", placeholder: "예: Secret 없음, 개인정보 없음, 네이버 쇼핑은 샘플 응답으로 처리" },
            { key: "help", label: "도움받고 싶은 점" }
          ]
        },
        checks: ["공유글의 링크를 눌러 앱이 실제로 열린다", "공유글에 PRD 요약과 보안 점검 메모가 들어 있다", "공유글과 배포 화면에 키·개인정보가 없다"]
      }
    ]
  },

  /* ============================== 마스터리그 ============================== */
  master: {
    name: "마스터리그",
    theme: "#c47800",
    label: "로그인·DB·AI를 연결한 여행 플래너로 완성한다",
    description: "시나리오: API 연동 여행 준비 앱을 운영형 여행 플래너로 확장합니다. 로그인, 사용자별 DB 저장, 동행자 공유, 서버/환경변수 기반 API 보안, Gemini API 요약 추천을 연결합니다. 교사 연수라면 '학급 기록 서비스'로 바꾸세요 — 교사별로 로그인해 자기 반 데이터만 보이게 하고, 동학년 교사에게만 공유하는 구조가 그대로 대응합니다. 사용자별 데이터가 필요한 앱이면 무엇이든 같은 구조입니다.",
    tags: ["여행 플래너", "DB·로그인", "Gemini API", "API 보안"],
    padletUrl: "https://padlet.com/dungstme/_-6tfn9vwj7wv8p4f",
    competency: "로그인·데이터베이스·AI API를 연결해 사용자별 데이터를 안전하게 다루는 운영형 서비스를 릴리즈한다",
    finalOutput: "로그인·DB가 연결된 다중 사용자 서비스 v1.0 릴리즈 + 운영 점검 체크리스트",
    prerequisites: "프로리그 수료(API 연동 앱 배포 경험) 또는 동등한 백엔드 연동 경험",
    graduationRequirements: [
      "릴리즈·운영까지 포함한 PRD를 완성했다",
      "로그인과 사용자별 데이터 저장 구조를 설계하고 연결했다",
      "정상·실패 테스트 케이스를 만들어 점검했다",
      "v1.0으로 공식 릴리즈하고 운영 체크리스트를 작성했다"
    ],
    capstone: {
      deliverable: "로그인하면 내 데이터만 보이는 다중 사용자 여행 플래너(또는 같은 구조의 자기 아이디어 서비스)",
      doneCriteria: [
        "로그인한 사용자마다 자신의 데이터만 저장·조회된다",
        "v1.0 릴리즈 링크가 실제로 동작하며 운영 체크리스트가 존재한다",
        "API 키·DB 접근 권한 등 비밀 값이 서버/환경변수로 분리되어 있다"
      ],
      useInDailyLife: "가족·친구와 계정을 나눠 로그인해 각자의 여행 계획을 따로 저장하고 동행자와 공유하면서, 실제 다음 여행부터 이 서비스를 계속 운영해 쓸 수 있습니다."
    },
    facilitatorIntro: "다회차 연수(주 1회 × 4주 등)에 적합한 분량입니다. 로그인·DB·릴리즈를 처음 다루는 참가자가 많으므로, 강의 순서를 건너뛰지 않고 release-harness(릴리즈 전 점검 구조)부터 차례로 짚어 주는 것이 중요합니다. 마지막 차시는 반드시 실제 v1.0 배포까지 마치고 끝내야 '완성 경험'이 남습니다.",
    runPlan: [
      {
        name: "5주 연수형(주 1회, 회당 90분)",
        note: "매회 시작 5분은 직전 주 산출물(배포 링크·로그)을 함께 확인한다. 2주차의 서버 프록시와 3주차의 로그인·DB가 이 리그의 두 고비이므로, 이 두 주는 다른 강의를 끼워 넣지 말고 실습 시간을 남겨 둔다. 마지막 주는 반드시 실제 v1.0 배포까지 마치고 끝낸다.",
        sessions: [
          { title: "1주차 — 도구와 점검 체계 (70분)", pages: ["setup-master", "agentic-tools", "release-harness", "tests"] },
          { title: "2주차 — 보안과 서버 프록시 (75분)", pages: ["security", "env", "travel-api-gemini"] },
          { title: "3주차 — 로그인과 DB (85분)", pages: ["auth", "db-auth-integration", "prd-release"] },
          { title: "4주차 — 배포와 점검 (60분)", pages: ["deploy-check", "logs", "cicd", "exe"] },
          { title: "5주차 — 릴리즈와 운영 (75분)", pages: ["releases", "warning", "ops", "share"] }
        ]
      }
    ],
    pages: [
      {
        id: "setup-master",
        group: "환경 준비",
        title: "마스터 환경 준비하기",
        goal: "Claude Code·Antigravity·Codex 중 어떤 도구로 마스터 작업을 진행할지 정한다.",
        difficulty: "advanced",
        estimatedMinutes: 20,
        updatedAt: "2026-06-22",
        completionRequirements: ["세 도구의 역할을 구분했다", "맡길 첫 작업을 정했다", "사람이 확인할 기준을 적었다"],
        summary: "이번 리그의 예시 앱은 로그인·DB·AI 연동 여행 플래너입니다. 프로리그에서 남겨 둔 Secret 보안 문제를 해결하며 운영형 앱으로 키웁니다.",
        reading: "마스터리그에서는 Claude Code, Antigravity, Codex 세 가지 도구만 다룹니다. 이번 예시 앱은 '로그인·DB·AI 연동 여행 플래너'입니다. 프로리그에서 브라우저에 넣지 않았던 네이버 쇼핑 Secret과 Gemini API 키를 서버와 환경변수로 안전하게 분리하고, 로그인한 사용자별로 여행 계획·준비물·예산·동행자 공유 데이터를 저장합니다. Claude Code는 프로젝트 구조를 읽고 긴 코드 수정과 리팩터링을 맡길 때 좋습니다. Antigravity는 브라우저에서 화면 흐름을 보며 여러 단계를 이어서 작업시키기 좋습니다. Codex는 기존 코드의 문제를 찾고 수정 방향을 빠르게 제안받을 때 씁니다. 예시 그대로 따라 해도 되고, 출장·캠핑·이사 준비처럼 자기 앱의 사용자별 데이터 저장 구조로 바꿔도 됩니다.",
        terms: [
          { term: "Claude Code", def: "프로젝트 파일을 읽고 큰 범위의 코드 수정·정리·검증을 맡길 수 있는 AI 개발 도구." },
          { term: "Antigravity", def: "브라우저 기반으로 여러 단계의 작업 흐름을 이어서 맡기기 좋은 AI 개발 도구." },
          { term: "Codex", def: "코드 분석, 수정 제안, 구현 보조에 쓰는 OpenAI의 개발 도구." },
          { term: "사람의 확인", def: "AI가 만든 결과를 기능·보안·사용자 관점에서 직접 점검하는 단계." }
        ],
        visual: {
          type: "flow",
          caption: "마스터 작업 도구 선택 흐름",
          steps: [
            { label: "작업 파악", sub: "DB·로그인·보안 중 무엇인가" },
            { label: "도구 선택", sub: "Claude Code·Antigravity·Codex" },
            { label: "작업 범위 지정", sub: "손댈 파일과 금지사항" },
            { label: "AI 작업", sub: "수정안 또는 구현안 받기" },
            { label: "사람 확인", sub: "기능·보안 직접 점검" }
          ]
        },
        discussion: [
          "여행 플래너의 DB 연동, 로그인 연동, API 키 보안 점검 중 어떤 작업을 어떤 도구에 맡기면 좋을까요?",
          "AI에게 맡기더라도 사람이 반드시 직접 확인해야 하는 부분은 무엇일까요?"
        ],
        steps: [
          "Claude Code, Antigravity, Codex의 역할을 비교합니다.",
          "내 여행 플래너에서 마스터리그에 맡길 핵심 작업을 하나 고릅니다.",
          "AI에게 줄 작업 범위와 금지사항을 적습니다.",
          "AI 결과를 사람이 확인할 기준을 적습니다."
        ],
        externalGuide: "마스터리그에서는 명령어 설치 순서보다 작업 분배가 중요합니다. Claude Code는 큰 코드 수정, Antigravity는 브라우저 흐름 점검, Codex는 코드 분석·수정 제안에 우선 배정해 보세요.",
        links: [
          { label: "Claude Code", url: "https://claude.ai/code" },
          { label: "Antigravity", url: "https://antigravity.dev" },
          { label: "Codex", url: "https://github.com/openai/codex" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "masterTool", label: "주로 사용할 도구", input: "select", options: ["Claude Code", "Antigravity", "Codex"], value: "Claude Code" },
            { key: "masterTask", label: "맡길 첫 작업", placeholder: "예: 로그인 후 사용자별 데이터만 보이도록 구조를 점검해 줘.", chips: ["로그인 후 내 여행만 보이게 하기", "여행 계획을 DB에 저장하기", "동행자 공유 권한 설계하기", "교사별로 자기 반 기록만 보이게 하기(교사)", "동학년 교사에게만 공유하기(교사)", "API 키 환경변수 점검하기"] },
            { key: "humanCheck", label: "사람이 직접 확인할 기준", placeholder: "예: 다른 사용자의 데이터가 보이지 않는지 직접 테스트한다.", chips: ["A 계정 데이터가 B 계정에 보이지 않는다", "초대된 동행자만 공유 여행을 볼 수 있다", "API 키가 화면과 코드에 없다", "Gemini 응답 실패 시 안내가 나온다", "모바일에서 로그인 흐름이 깨지지 않는다"] }
          ]
        },
        checks: ["고른 도구 하나에서 프로젝트가 열려 있다", "맡길 첫 작업이 한 문장으로 적혀 있다", "사람이 확인할 기준이 '무엇을 보면 통과'로 적혀 있다"]
      },
      {
        id: "agentic-tools",
        group: "환경 준비",
        title: "Claude Code·Antigravity·Codex 활용",
        goal: "세 도구에 맡길 작업과 사람이 확인할 작업을 나눌 수 있다.",
        difficulty: "advanced",
        estimatedMinutes: 20,
        updatedAt: "2026-06-22",
        completionRequirements: ["세 도구 중 하나를 선택했다", "위임할 작업 범위를 정의했다", "사람이 확인할 테스트를 적었다"],
        summary: "마스터 단계에서는 세 도구를 기능 구현보다 운영형 점검에 연결합니다. DB·로그인·보안처럼 위험한 부분은 AI에게 맡기되 사람이 끝까지 확인합니다.",
        reading: "Claude Code, Antigravity, Codex는 모두 코딩을 돕지만 맡기기 좋은 일이 다릅니다. Claude Code는 여러 파일을 함께 읽고 구조를 정리하거나 큰 수정 계획을 세울 때 좋습니다. Antigravity는 실제 브라우저 화면과 사용자 흐름을 보며 로그인, 입력, 저장 같은 과정을 점검할 때 좋습니다. Codex는 기존 코드에서 문제를 찾고 수정안을 빠르게 만들어 볼 때 좋습니다. 마스터리그에서는 이 세 도구를 단순 기능 추가가 아니라 데이터베이스 연동, 로그인 흐름, 권한 분리, 보안 점검, 릴리즈 준비에 연결합니다. 단, 비밀번호·API 키·개인정보 같은 값은 AI에게 붙여넣지 않습니다.",
        terms: [
          { term: "Claude Code", def: "여러 파일의 구조를 읽고 큰 수정·정리·검토를 맡기기 좋은 AI 개발 도구." },
          { term: "Antigravity", def: "브라우저 화면과 작업 흐름을 보며 여러 단계를 이어서 점검하기 좋은 AI 개발 도구." },
          { term: "Codex", def: "코드 분석, 오류 원인 찾기, 수정안 작성에 쓰는 AI 개발 도구." },
          { term: "위임 범위", def: "AI에게 맡길 파일·기능·금지사항을 미리 정한 작업 범위." }
        ],
        visual: {
          type: "mindmap",
          caption: "마스터 AI 에이전트 활용 영역",
          center: "AI 에이전트",
          branches: [
            { label: "Claude Code", items: ["프로젝트 구조 파악", "큰 수정 계획", "DB·로그인 코드 검토", "리팩터링 제안"] },
            { label: "Antigravity", items: ["브라우저 흐름 점검", "로그인 시나리오 확인", "사용자 관점 테스트", "멀티스텝 작업"] },
            { label: "Codex", items: ["코드 문제 찾기", "수정안 작성", "테스트 기준 제안", "보안 위험 점검"] }
          ]
        },
        discussion: [
          "DB와 로그인 연동에서 AI에게 맡길 수 있는 일과 사람이 직접 확인해야 하는 일은 각각 무엇인가요?",
          "세 도구 중 실제 화면 흐름 확인에 가장 잘 맞는 도구는 무엇이고, 이유는 무엇인가요?"
        ],
        steps: [
          "세 도구 중 오늘 사용할 도구를 하나 고릅니다.",
          "AI에게 맡길 작업 범위를 한 문단으로 씁니다.",
          "손대면 안 되는 파일·값·개인정보를 적습니다.",
          "작업 결과를 사람이 확인할 테스트를 적습니다."
        ],
        externalGuide: "예시 지시문: '이 프로젝트에서 로그인 후 사용자별 데이터만 보이도록 필요한 파일을 점검해 줘. 비밀값은 만들지 말고, 수정 전 먼저 위험한 부분과 확인할 테스트를 목록으로 보여 줘.'",
        links: [
          { label: "Claude Code 문서", url: "https://claude.ai/code" },
          { label: "Antigravity", url: "https://antigravity.dev" },
          { label: "Codex GitHub", url: "https://github.com/openai/codex" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "primaryAgent", label: "주로 사용할 도구", input: "select", options: ["Claude Code", "Antigravity", "Codex"], value: "Claude Code" },
            { key: "delegatedTask", label: "도구에 위임할 작업", placeholder: "예: 로그인 후 내 데이터만 보이는지 확인할 테스트 목록을 만들어 줘.", chips: ["DB 테이블 구조 점검하기", "로그인 흐름 점검하기", "권한 분리 테스트 만들기", "민감 정보 노출 점검하기"] },
            { key: "guardrails", label: "손대면 안 되는 것", placeholder: "예: 실제 비밀번호·API 키를 입력하지 말 것, 기존 디자인은 크게 바꾸지 말 것." }
          ]
        },
        checks: ["위임할 작업 범위와 손대면 안 되는 것이 둘 다 적혀 있다", "AI 결과를 검증할 테스트가 실행 가능한 문장으로 적혀 있다", "AI에 붙여넣을 내용에 실제 비밀번호·키가 없다"]
      },
      {
        id: "release-harness",
        group: "릴리즈 설계",
        title: "릴리즈 하네스 설계",
        goal: "릴리즈 전에 통과해야 할 제어·점검 구조를 만든다.",
        difficulty: "advanced",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["릴리즈 통과 기준을 적었다", "사용자 관점 확인을 넣었다"],
        summary: "릴리즈 하네스는 내보내기 전에 AI·코드가 정해진 기준 안에서 움직이는지 제어·감시하고, 문제를 걸러 내는 운용 구조입니다.",
        reading: "마스터리그의 하네스는 루키에서 배운 Harness(제어·감시·개선)를 릴리즈 단계로 키운 것입니다. 기능 테스트, 보안 점검, 배포 URL 확인, 사용자 안내가 매 릴리즈마다 같은 순서로 통과되도록 묶습니다. 사람이 매번 기억해서 확인하는 대신, '이 단계들을 통과하지 못하면 내보내지 않는다'는 틀을 만드는 것이 핵심입니다. 그러면 '대충 되는 것 같다'가 아니라 '사용자에게 내보낼 준비가 됐다'고 판단할 수 있습니다.",
        terms: [
          { term: "릴리즈", def: "완성한 버전을 사용자에게 정식으로 내보내는 일." },
          { term: "릴리즈 하네스", def: "릴리즈 전 테스트·보안·배포 확인을 반복 가능한 순서로 묶은 제어·점검 구조." }
        ],
        discussion: [
          "릴리즈 하네스가 '확인 한 줄'이 아니라 '제어·점검 구조'라는 건 무슨 뜻일까요?",
          "내 앱을 내보내기 전 반드시 통과해야 할 항목은 무엇인가요?"
        ],
        steps: [
          "릴리즈 통과 기준을 적습니다.",
          "사용자 관점 확인을 넣습니다.",
          "배포·다운로드 확인을 넣습니다."
        ],
        visual: {
          type: "flow",
          caption: "릴리즈 하네스 흐름",
          steps: [
            { label: "기능 테스트", sub: "모든 기능 동작 확인" },
            { label: "보안 점검", sub: "키·개인정보 노출 없음" },
            { label: "배포 확인", sub: "링크 실제로 열림" },
            { label: "사용자 안내", sub: "안내문 준비 완료" },
            { label: "릴리즈 ✓", sub: "출시 완료" }
          ]
        },
        practice: {
          kind: "form",
          fields: [
            { key: "releaseCriteria", label: "릴리즈 통과 기준", placeholder: "예: 주요 기능 동작, 키 노출 없음, 배포 링크 열림, 사용자 안내 준비." },
            { key: "userCheck", label: "사용자 관점 확인", placeholder: "예: 처음 링크를 연 사람이 설명 없이 핵심 기능을 쓸 수 있는가." },
            { key: "deployCheck", label: "배포·다운로드 확인", input: "text", placeholder: "예: 배포 URL 접속, 새로고침, 모바일 확인." }
          ]
        },
        checks: ["릴리즈 통과 기준이 하나씩 확인 가능한 항목으로 나뉘어 있다", "기준에 기능·보안·배포·사용자 안내가 모두 들어 있다"]
      },
      {
        id: "tests",
        group: "릴리즈 설계",
        title: "테스트 케이스 만들기",
        goal: "주요 기능의 테스트 케이스를 만든다.",
        difficulty: "advanced",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["정상 테스트를 적었다", "실패 테스트를 적었다"],
        summary: "테스트 케이스는 '무엇을 하면 무엇이 나와야 한다'를 적은 확인표입니다. 성공뿐 아니라 실패 상황도 적습니다.",
        reading: "테스트 케이스는 기능이 맞게 동작하는지 확인하는 문장입니다. 여행 플래너라면 '로그인한 뒤 여행을 만들면 내 계정에만 보인다', '날씨 API가 실패하면 대체 안내가 보인다', 'Gemini 요약이 준비물·예산·날씨를 반영한다'처럼 행동과 기대 결과를 함께 씁니다. 마스터 단계에서는 정상 상황만이 아니라 로그인 만료, API 실패, 권한 없는 공유 접근 같은 실패·예외 상황도 함께 적어야 합니다. 이렇게 적어 두면 AI에게 '이 케이스들이 통과하게 고쳐 줘'라고 정확히 맡길 수 있습니다.",
        terms: [
          { term: "테스트 케이스", def: "어떤 행동을 하면 어떤 결과가 나와야 하는지 적은 확인 항목." },
          { term: "예외 상황", def: "정상이 아닌 입력이나 흐름(빈 입력, 실패 등)." }
        ],
        visual: {
          type: "compare",
          caption: "테스트 케이스 종류",
          columns: [
            { label: "정상 동작", items: ["로그인 후 내 여행 생성", "준비물·예산 저장", "Gemini 요약 생성", "동행자 공유 확인"] },
            { label: "실패·예외", items: ["API 실패 안내", "로그인 만료", "권한 없는 접근 차단", "빈 입력 안내"] }
          ]
        },
        discussion: [
          "여행지나 날짜가 비어 있을 때 앱은 어떻게 안내해야 할까요?",
          "성공 케이스만 적으면 무엇을 놓치게 되나요?"
        ],
        steps: [
          "정상 동작 테스트를 적습니다.",
          "실패·예외 상황 테스트를 적습니다.",
          "릴리즈 전 확인 순서를 정합니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "successTest", label: "정상 동작 테스트", placeholder: "예: 로그인 후 여행을 만들고, 준비물·예산을 저장하면 내 계정에서 다시 불러온다." },
            { key: "failTest", label: "실패·예외 테스트", placeholder: "예: 날씨 API나 Gemini API가 실패하면 빈 화면 대신 대체 안내가 보인다." },
            { key: "testOrder", label: "릴리즈 전 확인 순서", input: "text", placeholder: "예: 로그인 → 여행 생성 → 날씨 확인 → 예산 저장 → Gemini 요약 → 동행자 권한 확인" }
          ]
        },
        checks: ["정상 테스트가 '무엇을 하면 무엇이 나온다' 형태로 적혀 있다", "실패·예외 테스트가 하나 이상 있다", "이 목록을 그대로 AI에게 '통과하게 고쳐 줘'로 넘길 수 있다"]
      },
      {
        id: "security",
        group: "보안",
        title: "보안 위험 찾기",
        goal: "공개하면 안 되는 정보와 위험한 흐름을 찾는다.",
        difficulty: "advanced",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["민감 정보 점검을 했다", "권한 위험을 적었다"],
        summary: "보안은 나중에 붙이는 장식이 아니라 처음부터 지켜야 할 기준입니다. 최종 확인은 사람이 직접 합니다.",
        reading: "보안 위험은 앱이 커진 뒤에만 생기는 게 아닙니다. 여행 플래너도 네이버 Client Secret, Gemini API 키, 로그인 토큰, 비공개 여행 일정이 노출되면 문제가 됩니다. 마스터 단계에서는 AI에게도 보안 점검을 맡기되, 최종 확인은 사람이 체크리스트로 직접 합니다. 앱에 로그인을 붙인다면 초대받지 않은 사람이 남의 여행 데이터나 예산을 볼 수 있는지 같은 위험을 미리 살펴야 합니다.",
        terms: [
          { term: "민감 정보", def: "키·비밀번호·개인정보처럼 새면 위험한 값." },
          { term: "권한 없는 접근", def: "허락받지 않은 사용자가 남의 데이터에 닿는 것." }
        ],
        visual: {
          type: "mindmap",
          caption: "보안 위험 지도",
          center: "보안 위험",
          branches: [
            { label: "민감 정보", items: ["네이버 Secret 코드 노출", "Gemini API 키 노출", "비공개 여행 일정 공개 저장소 업로드"] },
            { label: "권한 문제", items: ["초대받지 않은 여행 데이터 접근", "인증 없이 API 호출"] },
            { label: "코드 위험", items: ["하드코딩된 시크릿", "검증 없는 사용자 입력"] }
          ]
        },
        discussion: [
          "내 앱에 로그인을 붙이면 어떤 보안 위험이 새로 생길까요?",
          "AI의 보안 점검을 그대로 믿으면 안 되는 이유는요?"
        ],
        steps: [
          "민감 정보를 찾습니다.",
          "권한 위험을 적습니다.",
          "외부 공개 전에 확인합니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "sensitive", label: "민감 정보", placeholder: "예: 네이버 Client Secret, Gemini API 키, 로그인 토큰, 비공개 여행 일정. 코드·공개 저장소에 직접 두지 않는다." },
            { key: "permissionRisk", label: "권한 위험", placeholder: "예: 초대받지 않은 사람이 내 여행 일정·예산·동행자 메모를 볼 수 없도록 사용자별로 분리한다." },
            { key: "beforePublic", label: "공개 전 확인", input: "text", placeholder: "예: API 키 노출 검색, ownerId 권한 분리, 동행자 공유 범위 확인" }
          ]
        },
        checks: ["민감 정보 목록에 키·토큰·개인정보가 빠짐없이 들어 있다", "초대받지 않은 사람이 남의 데이터를 볼 수 있는지 직접 확인했다"]
      },
      {
        id: "env",
        group: "보안",
        title: "환경변수 이해하기",
        goal: "브라우저에 노출돼도 되는 키와 서버에만 둬야 하는 키를 구분하고, 비밀 값을 환경변수로 분리할 수 있다.",
        difficulty: "advanced",
        estimatedMinutes: 20,
        updatedAt: "2026-09-06",
        completionRequirements: ["공개 가능 키와 비밀 키를 구분했다", "환경변수 이름을 정했다", ".env.local과 .gitignore를 설정했다"],
        summary: "모든 키를 숨겨야 하는 것은 아닙니다. 브라우저에 나가도 되는 공개 키와, 서버에만 둬야 하는 비밀 키를 구분하는 것이 이 강의의 핵심입니다.",
        reading: "지금까지는 '키는 무조건 숨긴다'로 배웠습니다. 여기서 한 단계 정확해집니다. 키에는 두 종류가 있습니다.\n\n공개 키는 브라우저에 나가도 되는 값입니다. Supabase의 anon key가 대표적입니다. 이 키는 '우리 서비스의 어느 프로젝트인지'만 알려 줄 뿐, 무엇을 읽고 쓸 수 있는지는 뒤에서 배울 RLS 규칙이 따로 통제합니다. 그래서 화면 코드에 들어가는 것이 정상 설계입니다. 반대로 비밀 키는 그 값을 가진 사람이 무엇이든 할 수 있게 되는 값입니다. 네이버 Client Secret, Gemini API 키, Supabase service_role 키, DB 연결 문자열이 여기 해당합니다. 이런 값은 브라우저에 절대 내려보내지 않고 서버에서만 읽습니다.\n\n구분 기준은 간단합니다. 그 값을 남이 알았을 때 남의 데이터를 보거나 내 요금을 쓸 수 있다면 비밀 키입니다. service_role 키가 특히 위험합니다. 이름이 anon key와 비슷해 헷갈리기 쉬운데, 이 키는 RLS 규칙을 통째로 무시하므로 새어 나가면 전체 데이터가 열립니다.\n\n비밀 값은 코드가 아니라 두 곳에 둡니다. 내 컴퓨터에서는 프로젝트 폴더의 .env.local 파일에 두고, 그 파일 이름을 반드시 .gitignore에 넣어 GitHub에 올라가지 않게 합니다. 배포 서비스에서는 Vercel이나 Netlify 설정 화면의 환경변수 항목에 같은 이름으로 등록합니다. 코드에서는 값을 직접 쓰지 않고 이름으로 불러 씁니다.",
        toolGuides: ["naverShopping", "geminiApi"],
        terms: [
          { term: "환경변수", def: "비밀 값을 코드 밖에 보관해 두고 이름으로 불러 쓰는 설정." },
          { term: "공개 키(anon key)", def: "브라우저에 나가도 되는 키. 어느 프로젝트인지만 알려 주며, 권한은 RLS 규칙이 따로 통제한다." },
          { term: "비밀 키(service_role·Secret)", def: "가진 사람이 무엇이든 할 수 있게 되는 키. 권한 규칙을 무시하므로 서버에서만 읽는다." },
          { term: ".env.local", def: "내 컴퓨터에만 두는 비밀 값 파일. 반드시 .gitignore에 넣어 업로드를 막는다." },
          { term: "공개 저장소", def: "누구나 볼 수 있는 GitHub 저장소. 비밀 값을 올리면 안 됨." }
        ],
        visual: {
          type: "layers",
          caption: "환경변수로 비밀값 분리",
          layers: [
            { label: "화면 코드 (공개 저장소 OK)", desc: "로직·화면·공개 키(anon key) — GitHub에 올려도 됨" },
            { label: ".env.local (내 컴퓨터 전용)", desc: ".gitignore에 추가 필수 — 절대 업로드 금지" },
            { label: "배포 서비스 환경변수", desc: "Vercel·Netlify 설정 화면에 같은 이름으로 등록 (비공개)" },
            { label: "서버에서만 읽는 비밀 키", desc: "Secret·service_role·DB 연결 정보 — 브라우저로 내려보내지 않음" }
          ]
        },
        discussion: [
          "Supabase anon key는 브라우저에 나가도 되는데 service_role 키는 왜 안 될까요?",
          "내 앱의 키 목록에서 공개 가능한 것과 비밀인 것을 어떤 기준으로 갈랐나요?",
          "키를 코드에 직접 적으면 어떤 경로로 노출될 수 있을까요?"
        ],
        steps: [
          "내 앱이 쓰는 키를 모두 적고, 각각 공개 가능한지 비밀인지 나눕니다. 판단 기준은 '남이 이 값을 알면 남의 데이터를 보거나 내 요금을 쓸 수 있는가'입니다.",
          "프로젝트 폴더에 .env.local 파일을 만들고 비밀 값을 이름=값 형태로 한 줄에 하나씩 적습니다. 예: GEMINI_API_KEY=발급받은값",
          ".gitignore를 열어 `.env.local` 이 들어 있는지 확인합니다. 없으면 한 줄 추가합니다. 이 한 줄을 빠뜨리면 다음 커밋에 비밀 값이 그대로 올라갑니다.",
          "`git status` 를 실행해 .env.local이 목록에 나타나지 않는지 확인합니다. 나타나면 .gitignore가 적용되지 않은 것입니다.",
          "배포 서비스에 같은 이름으로 등록합니다. Vercel은 프로젝트 → Settings → Environment Variables, Netlify는 Site configuration → Environment variables입니다.",
          "등록 후 배포를 다시 실행합니다. 환경변수는 기존 배포에 소급 적용되지 않습니다.",
          "공개 키(anon key 등)는 숨기려 애쓰지 않습니다. 대신 다음 강의의 권한 규칙으로 통제한다는 것을 기억합니다."
        ],
        externalGuide: "① 로컬: 프로젝트 폴더에 .env.local 생성 → 비밀 값을 이름=값으로 기록 → .gitignore에 `.env.local` 추가 → `git status` 로 목록에 안 뜨는지 확인. ② 배포: Vercel은 프로젝트 → Settings → Environment Variables, Netlify는 Site configuration → Environment variables에서 같은 이름으로 등록 후 Save. ③ 서버 코드에서는 process.env.변수이름으로 읽습니다. 화면 코드에서 이 값을 읽으면 브라우저로 나가므로 넣지 않습니다. ④ 배포를 다시 실행해야 적용됩니다.",
        links: [
          { label: "Vercel 환경변수 설정", url: "https://vercel.com/dashboard" },
          { label: "Netlify 환경변수 설정", url: "https://app.netlify.com" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "publicKeys", label: "브라우저에 나가도 되는 공개 키", input: "text", placeholder: "예: Supabase anon key, Supabase 프로젝트 URL", chips: ["Supabase anon key", "Supabase 프로젝트 URL", "Open-Meteo(키 없음)", "공개 키 없음"] },
            { key: "envName", label: "서버에만 둘 비밀 키의 환경변수 이름", input: "text", placeholder: "예: NAVER_CLIENT_SECRET, GEMINI_API_KEY, SUPABASE_SERVICE_ROLE_KEY", chips: ["NAVER_CLIENT_ID", "NAVER_CLIENT_SECRET", "GEMINI_API_KEY", "SUPABASE_SERVICE_ROLE_KEY", "DATABASE_URL"] },
            { key: "secretValue", label: "비밀로 분류한 이유", placeholder: "예: service_role 키는 RLS 규칙을 무시하므로 새어 나가면 모든 사용자의 여행 데이터가 열린다. Gemini 키는 남이 쓰면 내 요금이 청구된다." },
            { key: "gitignoreCheck", label: ".gitignore·git status 확인 결과", input: "text", placeholder: "예: .gitignore에 .env.local 추가함. git status 목록에 .env.local 안 나타남.", chips: [".env.local 추가 완료", "git status에 안 나타남 확인", "이미 올라간 적 없음 확인"] },
            { key: "deployLocation", label: "배포 서비스 등록 위치·재배포 여부", input: "text", placeholder: "예: Vercel → Settings → Environment Variables에 3개 등록 후 재배포함" }
          ]
        },
        checks: ["내 키 목록이 공개 가능 / 비밀 두 칸으로 나뉘어 있다", ".gitignore에 .env.local이 있고 `git status` 목록에 .env.local이 나타나지 않는다", "배포 서비스 환경변수 화면에 등록한 이름이 보이고 재배포를 마쳤다"]
      },
      {
        id: "travel-api-gemini",
        group: "API·AI 연동",
        title: "일반 API와 Gemini API 연동",
        goal: "서버 프록시를 실제로 만들어 비밀 키를 브라우저에 노출하지 않고 외부 API와 Gemini API를 호출할 수 있다.",
        difficulty: "advanced",
        estimatedMinutes: 40,
        updatedAt: "2026-09-06",
        completionRequirements: ["api 폴더에 중계 파일을 만들었다", "환경변수를 등록하고 재배포했다", "화면 코드의 호출 대상을 /api로 바꿨다", "배포본에 키가 노출되지 않음을 확인했다", "API 실패 대체 안내를 넣었다"],
        summary: "프로리그에서 미뤄 둔 숙제를 여기서 끝냅니다. 서버가 대신 호출하는 통로를 만들면, 네이버 쇼핑 API를 키 노출 없이 실제로 부를 수 있습니다.",
        reading: "프로리그에서 네이버 쇼핑 API는 샘플 응답으로만 다뤘습니다. Client Secret을 브라우저에 넣을 수 없어서였습니다. 그 숙제를 이번 강의에서 끝냅니다.\n\n해법은 통로를 하나 두는 것입니다. 브라우저가 네이버에 직접 묻는 대신 내 서버에 묻고, 내 서버가 키를 붙여 네이버에 물어본 뒤 결과만 돌려줍니다. 이 중계자를 서버 프록시라고 합니다. 키는 서버에만 있으므로 브라우저 어디를 뒤져도 나오지 않습니다.\n\n예전에는 서버를 따로 빌려야 했지만, 지금은 Vercel에 배포하는 프로젝트라면 폴더 하나로 끝납니다. 프로젝트 루트에 api 라는 폴더를 만들고 그 안에 파일을 하나 두면, 그 파일이 곧 서버 주소가 됩니다. api/shopping.js 파일은 /api/shopping 주소로 열립니다. 화면 코드는 네이버 주소 대신 이 주소를 부르면 됩니다.\n\n역할을 정리하면 이렇습니다. 일반 API(Open-Meteo 날씨, 네이버 쇼핑, 환율)는 사실 데이터를 가져오고, Gemini API는 그 데이터를 묶어 '비가 올 가능성이 높으니 우비와 방수팩을 챙기세요'처럼 사람이 읽을 문장을 만듭니다. Open-Meteo는 키가 없으니 화면에서 직접 불러도 됩니다. 네이버와 Gemini는 키가 있으니 반드시 프록시를 거칩니다.\n\n한 가지 더. Gemini에 보낼 때 사용자의 실제 연락처나 숙소 주소를 함께 보내지 않습니다. 여행지, 날짜, 날씨, 예산, 준비물 목록이면 좋은 요약을 만들기에 충분합니다.",
        toolGuides: ["openMeteo", "naverShopping", "geminiApi"],
        terms: [
          { term: "일반 API", def: "날씨·쇼핑·환율·장소처럼 정해진 데이터를 요청하고 응답받는 외부 서비스." },
          { term: "Gemini API", def: "여행 데이터와 사용자 조건을 바탕으로 요약·추천 문구를 생성하는 AI API." },
          { term: "서버 프록시", def: "브라우저 대신 서버가 외부 API를 호출해 Secret을 숨기는 중계 구조." },
          { term: "서버리스 함수", def: "서버를 따로 빌리지 않고 파일 하나로 만드는 서버 코드. Vercel에서는 api 폴더의 파일 하나가 주소 하나가 된다." },
          { term: "환경변수", def: "API 키와 Secret을 코드 밖에 보관하고 서버에서만 읽는 설정." },
          { term: "Network 탭", def: "개발자 도구(F12)에서 브라우저가 주고받은 요청을 보는 곳. 키가 새는지 여기서 확인한다." }
        ],
        visual: {
          type: "flow",
          caption: "여행 API 연동 흐름",
          steps: [
            { label: "화면", sub: "/api/shopping 호출" },
            { label: "api 폴더 파일", sub: "환경변수에서 키 읽기" },
            { label: "외부 API", sub: "네이버·Gemini에 요청" },
            { label: "결과만 반환", sub: "키는 응답에 넣지 않음" },
            { label: "확인", sub: "Network 탭에 키 없음" }
          ]
        },
        discussion: [
          "Open-Meteo는 화면에서 바로 불러도 되는데 네이버 쇼핑은 왜 프록시를 거쳐야 할까요?",
          "Gemini가 만들면 좋은 문구는 단순 요약일까요, 추천 행동일까요?",
          "프록시를 만들었는데도 키가 샐 수 있는 경우는 어떤 상황일까요?"
        ],
        steps: [
          "먼저 API를 두 칸으로 나눕니다. 키가 없는 것(Open-Meteo)은 화면에서 직접 호출하고, 키가 있는 것(네이버 쇼핑, Gemini)은 프록시를 거치도록 정합니다.",
          "프로젝트 루트에 api 라는 폴더를 만듭니다. 루트란 index.html이나 package.json이 있는 최상위 폴더입니다.",
          "에이전트에게 중계 파일을 만들게 합니다. 지시문에 다음을 그대로 넣으세요. 'api 폴더에 shopping 중계 파일을 만들어 줘. 키는 process.env에서만 읽고, 응답 본문에는 절대 포함하지 마. 화면에서 넘어온 검색어만 외부 API에 전달하고, 실패하면 상태 코드와 짧은 메시지만 돌려줘.'",
          "앞 강의에서 만든 .env.local에 필요한 키를 넣고, 배포 서비스 환경변수에도 같은 이름으로 등록합니다.",
          "화면 코드에서 외부 API 주소를 부르던 부분을 내 프록시 주소로 바꿉니다. 예를 들어 네이버 주소 대신 /api/shopping 을 부릅니다.",
          "배포합니다. 환경변수는 기존 배포에 소급 적용되지 않으므로 반드시 다시 배포해야 합니다.",
          "배포된 페이지에서 검색을 한 번 해 실제 결과가 뜨는지 확인합니다. 샘플 데이터가 아니라 진짜 응답이어야 합니다.",
          "키가 새지 않는지 두 가지로 확인합니다. 첫째, 페이지에서 마우스 오른쪽 → '페이지 소스 보기'를 열고 Ctrl+F로 SECRET, API_KEY, CLIENT_SECRET을 검색해 아무것도 안 나오는지 봅니다.",
          "둘째, F12 → Network 탭을 열고 검색을 다시 실행합니다. /api/shopping 요청을 클릭해 Headers와 Response 어디에도 키 값이 없는지 확인합니다.",
          "Gemini 연동도 같은 방식으로 파일을 하나 더 만듭니다. 보낼 데이터는 여행지·날짜·날씨·예산·준비물까지만으로 제한하고, 실제 연락처나 숙소 주소는 넣지 않습니다.",
          "API가 실패했을 때 화면이 비어 버리지 않도록 대체 안내 문구를 넣습니다. 실패는 반드시 일어납니다."
        ],
        externalGuide: "① 프로젝트 루트에 api 폴더 생성 ② 에이전트에 중계 파일 요청 — '키는 process.env에서만 읽고 응답에 포함하지 마' ③ .env.local과 배포 서비스 환경변수에 같은 이름으로 등록 ④ 화면 코드의 호출 대상을 외부 주소 → /api/… 로 교체 ⑤ 재배포 ⑥ 검증: 페이지 소스 보기에서 SECRET·API_KEY 검색 0건, F12 Network 탭의 /api 요청 Headers·Response에 키 없음.",
        practice: {
          kind: "form",
          fields: [
            { key: "generalApis", label: "사용할 일반 API", placeholder: "예: Open-Meteo 날씨, 네이버 쇼핑, 환율 API", chips: ["Open-Meteo 날씨", "네이버 쇼핑", "환율 API", "장소 검색 API", "내 앱에 필요한 외부 데이터", "처음엔 하나만 선택"] },
            { key: "geminiUse", label: "Gemini API 사용 목적", placeholder: "예: 날씨·예산·준비물을 바탕으로 여행 준비 요약과 추천 문구 생성", chips: ["비 오는 여행 준비 요약", "예산 초과 위험 안내", "날씨 기반 준비물 추천", "동행자에게 보낼 준비 메시지", "여행 전 체크리스트 요약", "내 앱 데이터 기반 추천 문구"] },
            { key: "envKeys", label: "환경변수 이름", input: "text", placeholder: "예: NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, GEMINI_API_KEY", chips: ["NAVER_CLIENT_ID", "NAVER_CLIENT_SECRET", "GEMINI_API_KEY", "DATABASE_URL", "AUTH_SECRET"] },
            { key: "proxyRoutes", label: "만든 프록시 주소와 파일", input: "text", placeholder: "예: api/shopping.js → /api/shopping, api/summary.js → /api/summary", chips: ["api/shopping.js → /api/shopping", "api/summary.js → /api/summary", "api/weather.js는 불필요(키 없음)"] },
            { key: "leakCheck", label: "키 노출 검증 결과", placeholder: "예: 배포 URL에서 페이지 소스 보기 → SECRET·API_KEY·CLIENT_SECRET 검색 0건. F12 Network 탭에서 /api/shopping 요청의 Headers·Response 확인 — 키 값 없음. 응답에는 상품명·가격만 있음." },
            { key: "safePrompt", label: "Gemini에 보낼 안전한 요청", placeholder: "예: 개인 연락처 없이 여행지·날짜·날씨·예산·준비물만 보내 준비 요약을 만들어 달라고 요청한다.", chips: ["개인정보 없이 요약 요청", "여행지·날짜·날씨·예산만 전달", "실제 전화번호·주소 제외", "추천 문구만 생성", "결정은 사용자가 하도록 안내"] },
            { key: "fallback", label: "API 실패 시 대체 안내", placeholder: "예: 날씨 API가 실패하면 '날씨를 불러오지 못했습니다. 준비물은 직접 확인해 주세요.'라고 보여 준다.", chips: ["날씨를 불러오지 못했습니다", "쇼핑 후보를 불러오지 못했습니다", "AI 요약을 생성하지 못했습니다", "잠시 후 다시 시도해 주세요", "기본 준비물 목록을 먼저 보여 줍니다"] }
          ]
        },
        checks: ["배포된 앱에서 검색하면 샘플이 아니라 실제 API 결과가 화면에 뜬다", "페이지 소스 보기에서 SECRET·API_KEY·CLIENT_SECRET 검색 결과가 0건이다", "F12 Network 탭의 /api 요청 Headers·Response 어디에도 키 값이 없다", "API를 일부러 실패시켜도 빈 화면 대신 안내 문구가 보인다"]
      },
      {
        id: "db-auth-integration",
        group: "DB·로그인",
        title: "데이터베이스와 로그인 연동",
        goal: "Supabase로 로그인과 데이터베이스를 실제로 연결하고, RLS 규칙으로 사용자별 데이터를 분리할 수 있다.",
        difficulty: "advanced",
        estimatedMinutes: 45,
        updatedAt: "2026-09-06",
        completionRequirements: ["Supabase 프로젝트와 테이블을 만들었다", "이메일 로그인을 켰다", "RLS를 켜고 정책을 만들었다", "앱에서 로그인·저장·조회가 동작한다", "A 계정 데이터가 B 계정에 안 보이는 것을 확인했다"],
        summary: "이 강의에서 앱이 서비스가 됩니다. 로그인을 붙이고 사용자마다 자기 데이터만 보이게 만드는 것이 마스터리그의 분기점입니다.",
        reading: "데이터베이스와 로그인을 연결하면 여행 플래너는 '모두가 같은 데이터를 보는 화면'에서 '각 사용자가 자기 계획만 보는 서비스'로 바뀝니다.\n\n이 강의는 Supabase 하나로 끝까지 갑니다. 로그인과 데이터베이스를 한 곳에서 다루고 무료로 시작할 수 있어서입니다. Firebase나 Clerk도 같은 일을 하지만, 처음에는 도구를 비교하는 것보다 하나를 끝까지 완성해 보는 편이 훨씬 많이 남습니다. 나중에 옮기더라도 개념은 그대로 통합니다.\n\n핵심 개념은 두 가지입니다. 첫째, 모든 데이터 줄에 주인을 적어 둡니다. trips 테이블에 owner_id 컬럼을 두고, 여행을 만들 때 지금 로그인한 사람의 ID를 함께 저장합니다. 둘째, 주인만 볼 수 있게 데이터베이스가 직접 막습니다. 이것을 RLS(Row Level Security, 행 수준 보안)라고 합니다.\n\nRLS가 왜 중요한지 짚고 가야 합니다. 화면 코드에서 '내 것만 보여 줘'라고 걸러 내는 것만으로는 안전하지 않습니다. 브라우저 코드는 누구나 열어 고칠 수 있어서, 조건을 지우고 전체를 요청하면 남의 데이터가 그대로 나옵니다. RLS는 데이터베이스 쪽에 규칙을 걸어 두는 방식이라, 요청이 어디서 오든 규칙에 맞지 않으면 빈 결과를 돌려줍니다. 그래서 앞 강의에서 배운 anon key가 브라우저에 나가도 괜찮은 것입니다. 열쇠는 공개돼도 문은 RLS가 지킵니다.\n\n동행자 공유가 필요하면 collaborators 테이블을 하나 더 두고, 정책을 '내가 주인이거나 collaborators에 내가 들어 있으면 읽기 허용'으로 넓히면 됩니다. 다만 처음에는 내 것만 보이는 것까지 완성하고, 공유는 그다음에 붙이세요.",
        terms: [
          { term: "데이터베이스", def: "앱의 데이터를 저장하고 다시 불러오는 공간." },
          { term: "사용자 ID", def: "로그인한 사용자를 구분하기 위해 인증 시스템이 부여하는 고유 값." },
          { term: "소유자 필드", def: "데이터가 어떤 사용자에게 속하는지 나타내는 owner_id 또는 user_id 같은 컬럼." },
          { term: "RLS(행 수준 보안)", def: "데이터베이스가 줄 단위로 접근을 막는 기능. 화면 코드가 아니라 DB가 직접 거르므로 코드를 고쳐도 뚫리지 않는다." },
          { term: "정책(Policy)", def: "RLS에서 '어떤 조건이면 읽기·쓰기를 허용할지' 적어 둔 규칙 한 줄." },
          { term: "auth.uid()", def: "Supabase 정책 안에서 '지금 로그인한 사용자의 ID'를 뜻하는 값." },
          { term: "접근 규칙", def: "누가 어떤 데이터를 읽고 수정할 수 있는지 정한 보안 규칙." }
        ],
        visual: {
          type: "flow",
          caption: "로그인과 DB 연결 흐름",
          steps: [
            { label: "로그인", sub: "사용자 확인" },
            { label: "사용자 ID", sub: "현재 사용자 식별" },
            { label: "DB 저장", sub: "데이터에 ownerId 연결" },
            { label: "권한 규칙", sub: "내 데이터만 접근" },
            { label: "화면 표시", sub: "사용자별 목록 출력" }
          ]
        },
        discussion: [
          "로그인 없이 저장하던 데이터와 로그인 후 저장하는 데이터는 무엇이 달라질까요?",
          "다른 사용자의 데이터가 보이지 않게 하려면 코드와 DB 규칙에서 각각 무엇을 확인해야 할까요?"
        ],
        steps: [
          "supabase.com에 가입하고 'New project'로 프로젝트를 만듭니다. 데이터베이스 비밀번호는 따로 안전한 곳에 적어 둡니다.",
          "왼쪽 메뉴 Table Editor → 'New table'로 trips 테이블을 만듭니다. 컬럼은 id(기본 생성), owner_id(타입 uuid), title(text), start_date(date) 정도로 시작합니다.",
          "테이블을 만들 때 'Enable Row Level Security' 체크를 켠 상태로 둡니다. 껐다면 나중에 Authentication → Policies에서 켤 수 있습니다.",
          "왼쪽 메뉴 Authentication → Providers에서 Email을 켭니다. 연습 단계에서는 'Confirm email'을 꺼 두면 테스트 계정을 빠르게 만들 수 있습니다.",
          "Authentication → Policies에서 trips 테이블에 정책을 추가합니다. 'Enable read access for users based on user_id' 같은 템플릿을 고르고 조건을 `owner_id = auth.uid()` 로 둡니다. 읽기(SELECT)와 쓰기(INSERT·UPDATE·DELETE)를 각각 만듭니다.",
          "Project Settings → API에서 Project URL과 anon key를 복사합니다. 이 두 값은 화면 코드에 넣어도 되는 공개 값입니다. 같은 화면의 service_role 키는 절대 복사해 쓰지 않습니다.",
          "에이전트에게 연결을 맡깁니다. 지시문 예: 'Supabase 클라이언트를 붙여 이메일 로그인 화면과 로그아웃을 만들어 줘. 여행을 저장할 때 owner_id에 현재 로그인 사용자 id를 넣고, 목록은 로그인한 사용자 것만 조회해 줘. URL과 anon key는 환경변수로 빼 줘. service_role 키는 쓰지 마.'",
          "배포하고 계정 A로 가입해 여행을 하나 만듭니다. 새로고침해도 남아 있는지 확인합니다.",
          "브라우저 시크릿 창을 열고 계정 B로 가입합니다. 계정 A가 만든 여행이 보이지 않아야 합니다. 보인다면 RLS 정책이 꺼져 있거나 조건이 잘못된 것입니다.",
          "로그아웃한 상태에서 저장 화면 주소로 직접 접속해 봅니다. 로그인 화면으로 막히는지 확인합니다.",
          "여기까지 되면 동행자 공유를 붙입니다. collaborators 테이블(trip_id, user_id)을 만들고, 읽기 정책을 '내가 주인이거나 collaborators에 내가 있으면 허용'으로 넓힙니다."
        ],
        externalGuide: "① supabase.com → New project ② Table Editor → trips 테이블(owner_id uuid 포함), RLS 켜기 ③ Authentication → Providers → Email 켜기(연습 중엔 Confirm email 끄기) ④ Authentication → Policies → 조건 `owner_id = auth.uid()` 로 읽기·쓰기 정책 추가 ⑤ Project Settings → API에서 Project URL·anon key 복사(service_role은 쓰지 않음) ⑥ 에이전트에 연결 요청 ⑦ 검증: 계정 A로 저장 → 시크릿 창에서 계정 B로 로그인 → A의 데이터가 안 보이면 성공.  AI에게 실제 비밀번호나 service_role 키를 붙여넣지 마세요.",
        links: [
          { label: "Supabase", url: "https://supabase.com" },
          { label: "Firebase", url: "https://firebase.google.com" },
          { label: "Clerk", url: "https://clerk.com" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "authProvider", label: "사용한 로그인 서비스", input: "select", options: ["Supabase Auth", "Firebase Auth", "Clerk"], value: "Supabase Auth" },
            { key: "dbProvider", label: "사용한 데이터베이스", input: "select", options: ["Supabase Database", "Firebase Firestore", "기존 DB"], value: "Supabase Database" },
            { key: "tableSchema", label: "만든 테이블과 컬럼", placeholder: "예: trips(id, owner_id uuid, title text, start_date date) / packing_items(id, trip_id, name, checked) / collaborators(trip_id, user_id)", chips: ["trips(id, owner_id, title, start_date)", "packing_items(id, trip_id, name, checked)", "budget_items(id, trip_id, label, amount)", "collaborators(trip_id, user_id)"] },
            { key: "rlsPolicy", label: "작성한 RLS 정책 조건", input: "text", placeholder: "예: SELECT·INSERT·UPDATE·DELETE 모두 owner_id = auth.uid()", chips: ["owner_id = auth.uid()", "읽기·쓰기 정책 각각 생성", "공유 읽기는 collaborators 포함 조건으로 확장"] },
            { key: "userData", label: "사용자별로 저장할 데이터", placeholder: "예: trips, itineraryItems, packingItems, budgetItems, ownerId, collaborators", chips: ["trips", "packing_items", "budget_items", "collaborators", "owner_id", "(교사) classes + owner_id", "(교사) student_records + class_id", "내 앱의 사용자별 데이터"] },
            { key: "accessRule", label: "접근 규칙", placeholder: "예: 로그인한 사용자는 ownerId가 자기 ID이거나 collaborators에 포함된 여행만 읽고 수정할 수 있다.", chips: ["ownerId가 현재 사용자일 때만 읽기", "초대된 동행자만 보기", "소유자만 삭제 가능", "관리자는 운영 데이터만 확인", "공개 여행과 비공개 여행 구분"] },
            { key: "authTest", label: "연동 테스트", placeholder: "예: A 계정으로 만든 여행이 B 계정에서 보이지 않고, 초대된 동행자에게만 공유되는지 확인한다.", chips: ["A 계정 여행이 B 계정에 보이지 않음", "동행자 초대 후에만 보임", "로그아웃하면 저장 화면 접근 불가", "권한 없는 수정 요청 차단", "새로고침 후에도 내 데이터 유지"] }
          ]
        },
        checks: ["Supabase Table Editor에 내 테이블과 owner_id 컬럼이 보인다", "Authentication → Policies에 정책이 등록되어 있고 RLS가 켜져 있다", "배포된 앱에서 로그인 후 저장한 데이터가 새로고침해도 남아 있다", "시크릿 창의 다른 계정으로 로그인하면 앞 계정의 데이터가 보이지 않는다", "로그아웃 상태에서 저장 화면에 직접 접속하면 로그인 화면으로 막힌다"]
      },
      {
        id: "auth",
        group: "DB·로그인",
        title: "인증과 권한",
        goal: "로그인과 권한의 차이를 설명한다.",
        difficulty: "advanced",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["사용자 역할을 정했다", "권한 규칙을 적었다"],
        summary: "인증은 '누구인지' 확인하는 것, 권한은 '무엇을 할 수 있는지' 정하는 것입니다.",
        reading: "인증과 권한은 비슷해 보이지만 다릅니다. 인증은 사용자가 누구인지 확인하는 것이고, 권한은 그 사용자가 무엇을 할 수 있는지 정하는 것입니다. 운영할 앱이라면 관리자, 일반 사용자, 비로그인 사용자가 볼 수 있는 화면과 데이터가 달라야 합니다. 앱에 로그인을 붙이면, 인증으로 '내가 나임'을 확인하고, 권한으로 '나는 내 데이터만 볼 수 있음'을 정합니다.",
        terms: [
          { term: "인증", def: "사용자가 누구인지 확인하는 일(로그인)." },
          { term: "권한", def: "그 사용자가 무엇을 할 수 있는지 정하는 규칙." }
        ],
        discussion: [
          "내 앱에서 인증과 권한은 각각 무엇을 막아 주나요?",
          "관리자와 일반 사용자의 권한을 어떻게 구분해 설계하겠습니까?"
        ],
        steps: [
          "사용자 역할을 정합니다.",
          "역할별 권한을 적습니다.",
          "보면 안 되는 데이터를 구분합니다."
        ],
        visual: {
          type: "compare",
          caption: "인증 vs 권한",
          columns: [
            { label: "인증 (Authentication)", items: ["\"너 누구야?\"", "로그인으로 본인 확인", "토큰·세션 발급", "비밀번호 검증"] },
            { label: "권한 (Authorization)", items: ["\"무엇을 할 수 있어?\"", "역할(Role) 기반 제어", "내 데이터만 접근", "관리자 vs 일반 사용자"] }
          ]
        },
        practice: {
          kind: "form",
          fields: [
            { key: "roles", label: "사용자 역할", input: "text", placeholder: "예: 여행 소유자, 동행자, 관리자", chips: ["여행 소유자", "동행자", "관리자", "비로그인 사용자", "담임 교사(교사)", "동학년 교사(교사)"] },
            { key: "rolePermissions", label: "역할별 권한", placeholder: "예: 소유자 - 여행 수정·공유 관리 / 동행자 - 초대된 여행 보기·일부 수정 / 관리자 - 신고·운영 관리", chips: ["소유자 - 여행 수정·공유 관리", "동행자 - 초대된 여행 보기", "관리자 - 운영 데이터 확인", "비로그인 - 로그인 화면만 보기", "일반 사용자 - 자기 데이터만 수정"] },
            { key: "hiddenData", label: "보면 안 되는 데이터", input: "text", placeholder: "예: 초대받지 않은 여행 일정, 예산, 동행자 메모", chips: ["초대받지 않은 여행 일정", "다른 사람의 예산", "비공개 준비물 메모", "로그인 토큰", "API 키", "관리자 전용 데이터"] }
          ]
        },
        checks: ["역할별로 할 수 있는 일과 없는 일이 갈려 있다", "비로그인 사용자가 볼 수 없어야 할 것이 명시돼 있다"]
      },
      {
        id: "prd-release",
        group: "운영형 PRD",
        title: "운영형 PRD 작성하기",
        goal: "릴리즈와 운영까지 포함한 PRD를 만든다.",
        difficulty: "advanced",
        estimatedMinutes: 25,
        updatedAt: "2026-06-22",
        completionRequirements: ["DB 설계를 넣었다", "로그인 연동 기준을 넣었다", "보안 요구사항을 넣었다", "테스트 기준을 넣었다"],
        summary: "운영형 PRD는 기능뿐 아니라 DB·로그인·보안·테스트·배포·운영 기준까지 담는 문서입니다.",
        reading: "운영형 PRD는 '무엇을 만들지'를 넘어 '어떻게 안전하게 내보내고 계속 운영할지'까지 담습니다. 마스터리그에서는 프로리그의 화면·기능 설계를 확장해 데이터베이스, 로그인 시스템, 사용자별 권한, 보안 기준, 통과할 테스트, 배포 방식, 릴리즈 조건, 운영 점검을 함께 적습니다. 이것은 AI에게 기능 구현만이 아니라 운영까지 고려한 작업을 맡기는 기준 문서입니다. 지금까지 마스터리그에서 내 앱에 대해 점검한 내용을 한곳에 모으면 운영형 PRD가 됩니다.",
        terms: [
          { term: "운영형 PRD", def: "기능에 더해 DB·로그인·보안·테스트·배포·운영 기준까지 담은 설명서." },
          { term: "운영", def: "배포 후에도 앱이 문제없이 쓰이도록 살피는 일." }
        ],
        visual: {
          type: "mindmap",
          caption: "운영형 PRD 구성",
          center: "운영형 PRD",
          branches: [
            { label: "기능", items: ["핵심 플로우", "우선순위", "예외 상황"] },
            { label: "데이터", items: ["DB 설계", "로그인 연동", "사용자별 권한"] },
            { label: "안전", items: ["보안 요구사항", "테스트 기준", "릴리즈 기준"] },
            { label: "운영", items: ["배포 확인", "오류 보고", "업데이트 주기"] }
          ]
        },
        discussion: [
          "기능 PRD와 운영형 PRD의 가장 큰 차이는 무엇일까요?",
          "내 앱을 진짜 서비스로 운영한다면 무엇을 더 적어야 할까요?"
        ],
        steps: [
          "목표와 범위를 적습니다.",
          "DB·로그인·보안·테스트·릴리즈 기준을 적습니다.",
          "운영 체크리스트를 만듭니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "scope", label: "목표와 범위", placeholder: "예: 여행 플래너를 로그인·DB·API·Gemini 연동까지 포함해 안전하게 배포·운영한다.", chips: ["로그인·DB·AI 연동 여행 플래너", "교사별 학급 기록 서비스(교사)", "사용자별 데이터 저장 앱", "동행자 공유가 있는 준비 앱", "API 키를 서버에서 보호하는 앱", "내 아이디어의 운영형 앱"] },
            { key: "roles", label: "사용자 역할", input: "text", placeholder: "예: 여행 소유자, 동행자, 관리자", chips: ["여행 소유자", "동행자", "관리자", "비로그인 사용자", "담임 교사(교사)", "동학년 교사(교사)"] },
            { key: "flow", label: "핵심 플로우", placeholder: "예: 로그인 → 여행 생성 → 날씨·쇼핑 확인 → 준비물·예산 저장 → Gemini 요약 생성 → 동행자 공유", chips: ["로그인 → 여행 생성 → 준비물 저장 → Gemini 요약", "로그인 → 내 데이터 조회 → 수정 → 저장", "여행 생성 → 동행자 초대 → 권한 확인", "API 호출 → 서버 프록시 → 화면 표시"] },
            { key: "database", label: "데이터베이스 설계", placeholder: "예: trips, packing_items, budget_items, collaborators 테이블에 owner_id와 trip_id를 두고, 모든 테이블에 RLS를 켠다.", chips: ["trips + owner_id", "packing_items + trip_id", "budget_items + amount", "collaborators + user_id", "전 테이블 RLS 켜기", "내 앱 테이블명"] },
            { key: "authIntegration", label: "로그인 연동 기준", placeholder: "예: 저장할 때 owner_id에 auth.uid()를 넣고, 조회는 RLS 정책이 자동으로 거르게 한다. 화면 필터에 의존하지 않는다.", chips: ["owner_id에 auth.uid() 저장", "화면 필터가 아닌 RLS로 차단", "초대받은 데이터만 조회", "로그아웃 시 보호 화면 차단", "권한 없는 수정 차단"] },
            { key: "priority", label: "기능 우선순위", placeholder: "예: 필수 - 로그인·여행 저장·예산 합계·Secret 보호 / 다음 - 동행자 공유·Gemini 추천", chips: ["필수 - 로그인·DB 저장·Secret 보호", "필수 - 사용자별 데이터 분리", "다음 - 동행자 공유", "다음 - Gemini 추천", "제외 - 결제·예약·항공권 구매"] },
            { key: "exceptions", label: "예외 상황", placeholder: "예: API 실패, 로그인 만료, 여행지 없음, 초대 권한 없음", chips: ["API 실패", "로그인 만료", "여행지 없음", "초대 권한 없음", "DB 저장 실패", "Gemini 응답 실패"] },
            { key: "security", label: "보안 요구사항", placeholder: "예: 네이버 Secret·Gemini 키는 api 폴더의 서버 프록시에서만 읽고, 사용자별 데이터는 RLS 정책(owner_id = auth.uid())으로 분리한다. anon key는 화면에 두되 권한은 RLS가 통제한다.", chips: ["비밀 키는 서버 프록시에서만 읽기", "anon key는 공개, 권한은 RLS로 통제", "service_role 키는 브라우저에 금지", "RLS 정책으로 사용자별 데이터 분리", "동행자 권한 확인", "공개 전 키 검색"] },
            { key: "tests", label: "테스트 기준", placeholder: "예: 시크릿 창 B 계정에서 A 데이터 안 보임, 페이지 소스·Network 탭에 키 없음, API 실패 시 안내 표시, 새로고침 후 데이터 유지", chips: ["시크릿 창 A/B 계정 데이터 분리", "페이지 소스·Network에 키 없음", "권한 없는 접근 차단", "API 실패 안내 표시", "새로고침 후 데이터 유지", "모바일 화면 확인"] },
            { key: "deploy", label: "배포·패키징 기준", input: "text", placeholder: "예: 웹 배포, 링크 접속·모바일 확인", chips: ["웹 배포", "Vercel", "Netlify", "환경변수 등록 후 배포", "배포 URL 직접 확인", "exe는 필요할 때만 검토"] },
            { key: "release", label: "릴리즈 기준", placeholder: "예: 테스트·보안 통과 후 릴리즈 노트와 함께 공개", chips: ["테스트 통과 후 공개", "보안 점검 통과 후 공개", "사용자용 변경점만 작성", "다운로드·보안 경고 안내 포함", "v1.0 기준 정리"] },
            { key: "ops", label: "운영 체크리스트", placeholder: "예: 오류 보고 확인, 업데이트 주기, 보안 재점검", chips: ["오류 보고 확인", "API 실패 로그 확인", "사용자 피드백 수집", "보안 재점검", "업데이트 주기 정하기", "다음 버전 개선 목록"] }
          ]
        },
        checks: ["PRD에 DB 설계·로그인 연동·보안·테스트·릴리즈·운영 기준이 모두 있다", "보안 항목에 anon/service 키 구분과 RLS가 들어 있다", "완료 기준이 '무엇을 하면 무엇이 보인다'로 적혀 있다"]
      },
      {
        id: "deploy-check",
        group: "배포·점검",
        title: "배포 URL 점검하기",
        visual: {
          type: "cards",
          caption: "사용자 관점 점검 4가지",
          items: [
            { label: "첫 화면", text: "링크 열면 바로 뜨나" },
            { label: "주요 버튼", text: "핵심 기능이 동작하나" },
            { label: "모바일", text: "폰에서 안 깨지나" },
            { label: "새로고침", text: "다시 열어도 유지되나" }
          ]
        },
        goal: "사용자 관점에서 배포 URL을 확인한다.",
        difficulty: "advanced",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["배포 URL을 기록했다", "사용자 관점 확인을 했다"],
        summary: "'내 컴퓨터에선 됨'은 끝이 아닙니다. 배포된 링크에서 첫 화면·새로고침·모바일까지 직접 확인합니다.",
        reading: "배포 URL 점검은 사용자가 실제로 겪을 첫 경험을 확인하는 일입니다. 내 컴퓨터에서는 잘 되더라도 배포된 링크에서는 경로·환경변수·새로고침 문제가 생길 수 있습니다. 반드시 배포 URL을 직접 열어 첫 화면이 뜨는지, 주요 버튼이 동작하는지, 모바일에서 깨지지 않는지, 새로고침해도 유지되는지 확인합니다.",
        terms: [
          { term: "사용자 관점 확인", def: "개발자가 아니라 처음 접속한 사람 입장에서 점검하는 것." },
          { term: "새로고침 점검", def: "페이지를 다시 불러와도 정상 동작·유지되는지 보는 것." }
        ],
        discussion: [
          "'내 컴퓨터에선 되는데 배포하면 안 되는' 일은 왜 생길까요?",
          "내 앱에서 새로고침했을 때 무엇이 유지돼야 할까요?"
        ],
        steps: [
          "배포 URL을 기록합니다.",
          "첫 화면·주요 버튼·모바일을 확인합니다.",
          "새로고침 후에도 유지되는지 확인합니다."
        ],
        externalGuide: "① 아래에 배포 URL을 기록합니다. ② 브라우저에서 URL을 직접 엽니다. ③ 첫 화면이 정상 로드되는지, 주요 버튼이 동작하는지 확인합니다. ④ 주소창의 URL을 그대로 새로고침(F5)해도 화면이 유지되는지 확인합니다. ⑤ 스마트폰이나 브라우저 개발자 도구(F12 → 모바일 뷰)로 모바일 깨짐 여부를 확인합니다. ⑥ 문제가 있으면 배포 플랫폼의 로그 화면을 열어 에러 메시지를 확인합니다.",
        practice: {
          kind: "form",
          fields: [
            { key: "deployUrl", label: "배포 URL", input: "text", placeholder: "예: https://example.github.io/my-app" },
            { key: "userCheck", label: "사용자 관점 확인 결과", placeholder: "예: 첫 화면 정상, 주요 버튼 동작, 모바일 깨짐 없음" },
            { key: "issues", label: "발견한 문제", input: "text", placeholder: "예: 새로고침 시 데이터가 사라지는지 확인 필요" }
          ]
        },
        checks: ["배포 URL을 시크릿 창에서 열어 첫 화면이 뜬다", "새로고침해도 로그인 상태와 데이터가 유지된다", "모바일 화면에서 주요 버튼이 눌린다"]
      },
      {
        id: "logs",
        group: "배포·점검",
        title: "로그와 에러 보고",
        visual: {
          type: "cards",
          caption: "좋은 에러 보고 4요소",
          items: [
            { label: "언제", text: "어느 시점에 생겼나" },
            { label: "어디서", text: "어떤 화면·기능에서" },
            { label: "무엇을", text: "어떤 버튼을 눌렀나" },
            { label: "어떤 메시지", text: "화면에 뜬 문구" }
          ]
        },
        goal: "문제가 생겼을 때 AI에게 줄 정보를 정리한다.",
        difficulty: "advanced",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["에러 보고 템플릿을 만들었다", "로그에서 볼 항목을 적었다"],
        summary: "'안 돼요' 대신 언제·어디서·무엇을 눌렀고 어떤 메시지가 나왔는지를 묶어야 원인을 좁힐 수 있습니다.",
        reading: "로그는 앱이 남기는 상황 기록이고, 에러 보고는 문제를 해결하기 위한 Context입니다. 그냥 '안 돼요'라고 하면 AI도 사람도 어디부터 봐야 할지 모릅니다. 언제, 어디서, 무엇을 눌렀고, 어떤 메시지가 나왔는지를 묶어야 원인을 좁힐 수 있습니다. 예를 들어 'Gemini 요약 생성 버튼을 눌렀을 때 화면 하단에 빨간 메시지가 떴다'처럼 적어 두는 식입니다.",
        terms: [
          { term: "로그", def: "앱이 동작하며 남기는 상황 기록." },
          { term: "에러 보고", def: "문제 상황을 재현 가능하게 정리한 메모." }
        ],
        discussion: [
          "좋은 에러 보고와 '그냥 안 돼요'의 차이는 무엇인가요?",
          "특정 동작이 실패했을 때, 원인을 좁히기 위해 어떤 정보를 수집하겠습니까?"
        ],
        steps: [
          "에러 상황을 적습니다.",
          "로그에서 볼 항목을 적습니다.",
          "AI에게 줄 보고 문장을 만듭니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "errorSituation", label: "에러 상황", placeholder: "예: Gemini 요약 생성 버튼을 눌렀는데 추천 문구가 나타나지 않는다." },
            { key: "logItems", label: "로그에서 볼 항목", input: "text", placeholder: "예: 언제, 어떤 버튼, 화면에 뜬 메시지, 콘솔 빨간 글자" },
            { key: "reportSentence", label: "AI에게 줄 보고 문장", placeholder: "예: 오후 3시, Gemini 요약 생성 버튼을 누르자 추천 문구가 안 나오고 콘솔에 '...' 메시지가 떴습니다. 원인을 좁혀 주세요." }
          ]
        },
        checks: ["에러 보고에 언제·어디서·무엇을 눌렀고 어떤 메시지가 떴는지가 모두 있다", "이 보고문을 그대로 복사해 AI에게 붙여넣을 수 있다"]
      },
      {
        id: "cicd",
        group: "배포·점검",
        title: "CI/CD 쉽게 이해하기",
        goal: "자동 검사와 자동 배포의 흐름을 이해한다.",
        difficulty: "advanced",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["CI 단계를 적었다", "CD 단계를 적었다"],
        summary: "CI는 올릴 때 자동으로 검사, CD는 검사 후 자동으로 배포 — 사람이 반복하던 일을 자동 흐름으로 바꾸는 것입니다.",
        reading: "CI/CD는 반복되는 확인과 배포를 자동화하는 흐름입니다. CI는 코드를 올릴 때 자동으로 테스트·검사를 돌리는 것, CD는 검사를 통과하면 배포까지 이어지는 것으로 이해하면 됩니다. 처음에는 개념만 알아도 충분하지만, 릴리즈가 잦아질수록 중요한 운영 도구가 됩니다. 'GitHub에 올리면 테스트가 자동으로 돌고, 통과하면 자동 배포'가 목표 그림입니다.",
        terms: [
          { term: "CI", def: "코드를 올릴 때 자동으로 검사·테스트하는 단계." },
          { term: "CD", def: "검사를 통과하면 자동으로 배포까지 잇는 단계." }
        ],
        discussion: [
          "자동 검사가 있으면 어떤 실수를 막을 수 있을까요?",
          "검사에 실패하면 배포를 멈춰야 하는 이유는요?"
        ],
        steps: [
          "자동 검사(CI) 단계를 적습니다.",
          "자동 배포(CD) 단계를 적습니다.",
          "실패 시 멈출 기준을 정합니다."
        ],
        visual: {
          type: "flow",
          caption: "CI/CD 자동화 흐름",
          steps: [
            { label: "코드 작성", sub: "기능 구현" },
            { label: "GitHub Push", sub: "변경 올리기" },
            { label: "CI 자동 검사", sub: "테스트 자동 실행" },
            { label: "검사 통과 ✓", sub: "모든 테스트 통과" },
            { label: "CD 자동 배포", sub: "배포 플랫폼 반영" }
          ]
        },
        practice: {
          kind: "form",
          fields: [
            { key: "ciStep", label: "자동 검사(CI) 단계", placeholder: "예: 올리면 주요 기능 테스트를 자동으로 돌린다." },
            { key: "cdStep", label: "자동 배포(CD) 단계", placeholder: "예: 테스트를 통과하면 배포 플랫폼에 자동으로 올린다." },
            { key: "failCriteria", label: "실패 시 멈출 기준", input: "text", placeholder: "예: 테스트가 하나라도 실패하면 배포하지 않는다." }
          ]
        },
        checks: ["CI에서 무엇을 검사할지 한 줄로 말할 수 있다", "검사 실패 시 배포를 멈출 기준이 정해져 있다"]
      },
      {
        id: "exe",
        group: "패키징·릴리즈",
        title: "exe 패키징 준비",
        visual: {
          type: "compare",
          caption: "내 앱 기술에 맞는 패키징 도구",
          columns: [
            { label: "Python 앱", items: ["PyInstaller로 묶기", "스크립트 → 실행 파일", "데이터·자동화 앱"] },
            { label: "웹 기술 앱", items: ["Electron·Tauri로 묶기", "HTML·JS → 데스크톱", "보통 웹앱은 exe 불필요"] }
          ]
        },
        goal: "exe 배포 전 필요한 정보를 정리한다.",
        difficulty: "advanced",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["exe 파일명을 정했다", "보안 경고 안내를 적었다"],
        summary: "exe 패키징은 사용자가 파일로 받아 실행하게 묶는 일입니다. 파일명·아이콘·버전·보안 안내가 필요합니다.",
        reading: "exe 패키징은 사용자가 앱을 파일로 받아 실행할 수 있게 묶는 과정입니다. 파일명, 아이콘, 버전, 포함할 파일, 보안 경고 안내를 준비합니다. 실제 빌드 도구는 앱 기술에 따라 다르므로, 먼저 내 앱이 Python인지(PyInstaller) 웹 기술 기반인지(Electron·Tauri) 판단해야 합니다. 웹앱은 보통 exe가 필요 없지만, 굳이 데스크톱 앱으로 만든다면 이 항목들을 채웁니다.",
        terms: [
          { term: "패키징", def: "앱과 필요한 파일을 하나로 묶어 실행 가능하게 만드는 것." },
          { term: "버전", def: "이 배포가 몇 번째 판인지 나타내는 표시(예: 1.0.0)." }
        ],
        discussion: [
          "내 앱을 굳이 exe로 만든다면 어떤 상황일까요?",
          "exe로 내보낼 때 사용자에게 꼭 안내해야 할 점은 무엇인가요?"
        ],
        steps: [
          "exe 파일명을 정합니다.",
          "버전·아이콘 메모를 적습니다.",
          "보안 경고 안내문을 만듭니다."
        ],
        externalGuide: "Python 앱이라면 PyInstaller, 웹 기술 기반이라면 Electron 또는 Tauri를 사용합니다. 각 공식 문서를 참고해 진행하세요.",
        links: [
          { label: "PyInstaller 문서", url: "https://pyinstaller.org" },
          { label: "Electron 문서", url: "https://www.electronjs.org" },
          { label: "Tauri 문서", url: "https://tauri.app" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "exeName", label: "exe 파일명", input: "text", placeholder: "예: my-app-1.0.0.exe" },
            { key: "versionIcon", label: "버전·아이콘 메모", input: "text", placeholder: "예: 버전 1.0.0, 앱 아이콘" },
            { key: "securityNotice", label: "보안 경고 안내문", placeholder: "예: 처음 실행 시 Windows 경고가 뜰 수 있습니다. 파일 출처와 이름을 확인하고 실행하세요." }
          ]
        },
        checks: ["내 앱이 Python인지 웹 기술인지 판단해 도구를 골랐다", "파일명·버전·아이콘이 정해져 있다", "보안 경고가 뜰 때 보여 줄 안내문이 있다"]
      },
      {
        id: "releases",
        group: "패키징·릴리즈",
        title: "GitHub Releases 안내문",
        visual: {
          type: "compare",
          caption: "릴리즈 노트, 무엇을 적나",
          columns: [
            { label: "담을 것(사용자용)", items: ["이번에 바뀐 점", "다운로드·실행 방법", "주의사항"] },
            { label: "빼는 것(내부용)", items: ["커밋 해시", "검증 명령·로그", "개발 메모"] }
          ]
        },
        goal: "사용자에게 보여 줄 릴리즈 안내문을 작성한다.",
        difficulty: "advanced",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["릴리즈 노트를 작성했다", "다운로드 안내를 넣었다"],
        summary: "릴리즈 노트는 개발 기록이 아니라, 사용자에게 필요한 '변화 안내'입니다.",
        reading: "GitHub Releases는 사용자에게 배포 파일과 변경 내용을 제공하는 공간입니다. 릴리즈 노트에는 내부 개발 기록(커밋 해시, 검증 명령 등)보다 사용자가 알아야 할 변화, 다운로드 방법, 주의사항을 적습니다. 예를 들어 '이번 버전부터 새 기능이 추가되었습니다, 아래 파일을 받아 실행하세요'처럼 사용자 언어로 씁니다.",
        terms: [
          { term: "릴리즈 노트", def: "이번 버전에서 무엇이 바뀌었는지 사용자에게 알리는 글." },
          { term: "변경점", def: "이전 버전과 달라진 내용." }
        ],
        discussion: [
          "사용자에게 필요 없는 '내부 기록'에는 어떤 게 있을까요?",
          "내 앱의 이번 변경점을 한 줄로 적으면 무엇인가요?"
        ],
        steps: [
          "사용자용 변경 내용을 적습니다.",
          "다운로드 안내를 적습니다.",
          "내부 정보가 섞이지 않았는지 확인합니다."
        ],
        externalGuide: "① github.com에서 내 저장소로 이동합니다. ② 오른쪽 'Releases' → 'Create a new release'를 클릭합니다. ③ 'Choose a tag'에서 'v1.0' 입력 후 'Create new tag'를 선택합니다. ④ Release title에 버전과 이름을 씁니다(예: v1.0 — 첫 번째 출시). ⑤ 아래 설명칸에 사용자용 변경 내용을 붙여넣습니다. ⑥ 배포 파일이 있으면 'Attach binaries'에 추가합니다. ⑦ 'Publish release'를 눌러 공개합니다.",
        links: [
          { label: "GitHub 열기", url: "https://github.com" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "changeNotes", label: "사용자용 변경 내용", placeholder: "예: 이번 버전부터 '상세 보기'가 추가되고 속도가 빨라졌습니다." },
            { key: "downloadGuide", label: "다운로드 안내", placeholder: "예: 아래 파일을 내려받아 실행하세요. 첫 실행 시 보안 경고가 뜰 수 있습니다." },
            { key: "removeInternal", label: "내부 정보 제거 확인", input: "text", placeholder: "예: 커밋 해시·내부 URL·환경변수 이름·DB 테이블명 없음 확인", chips: ["커밋 해시 없음", "내부 URL 없음", "환경변수 이름 없음", "키·토큰 없음"] }
          ]
        },
        checks: ["릴리즈 노트에 사용자가 알아야 할 변화와 다운로드 방법이 있다", "커밋 해시·내부 URL 같은 내부 기록이 섞여 있지 않다"]
      },
      {
        id: "warning",
        group: "패키징·릴리즈",
        title: "Windows 보안 경고 안내",
        goal: "보안 경고를 줄이는 방법과 사용자 안내문을 함께 만든다.",
        difficulty: "advanced",
        estimatedMinutes: 25,
        updatedAt: "2026-06-22",
        completionRequirements: ["경고를 줄이는 방법을 적었다", "공식 다운로드 위치를 적었다", "사용자 확인 문구를 넣었다", "보안 경고 안내문을 만들었다"],
        summary: "Windows 경고는 완전히 무시할 대상이 아닙니다. 배포 전에는 경고를 줄이고, 배포 후에는 사용자가 출처를 확인하도록 안내합니다.",
        reading: "Windows는 새로 만든 exe나 다운로드 수가 적은 실행 파일에 보안 경고를 띄울 수 있습니다. 경고를 줄이려면 먼저 배포 파일의 출처를 분명하게 만들어야 합니다. 공식 GitHub Releases나 공식 웹사이트처럼 한 곳에서만 배포하고, 파일명과 버전을 일정하게 쓰며, 가능하면 코드 서명 인증서로 exe에 서명합니다. 설치형 앱이라면 Microsoft Store, 신뢰할 수 있는 설치 프로그램, 백신 오탐 신고 절차도 검토할 수 있습니다. 그래도 개인·소규모 프로젝트에서는 처음 배포할 때 경고가 남을 수 있으므로 사용자 안내문이 필요합니다. 안내문에는 '무조건 실행하세요'가 아니라 다운로드 위치, 파일명, 버전, 게시자, 실행 전 확인할 점을 적습니다. 사용자가 다른 곳에서 받은 파일이거나 이름이 다르면 실행하지 말라고 안내해야 합니다.",
        terms: [
          { term: "보안 경고", def: "출처나 신뢰도가 충분히 확인되지 않은 파일에 운영체제가 띄우는 알림." },
          { term: "코드 서명", def: "exe 파일에 제작자 정보를 붙여 파일이 변조되지 않았음을 확인하게 하는 절차." },
          { term: "공식 배포 경로", def: "사용자가 파일을 받아야 하는 정해진 위치. 예: GitHub Releases, 공식 웹사이트, Microsoft Store." }
        ],
        visual: {
          type: "flow",
          caption: "Windows 보안 경고 대응 흐름",
          steps: [
            { label: "배포 경로 고정", sub: "공식 Releases" },
            { label: "파일 정보 안내", sub: "이름·버전" },
            { label: "가능하면 서명", sub: "신뢰도 높이기" },
            { label: "사용자 확인", sub: "출처 먼저 점검" },
            { label: "다른 파일 차단", sub: "이름 다르면 실행 금지" }
          ]
        },
        discussion: [
          "보안 경고를 줄이기 위해 배포 전에 준비할 수 있는 일은 무엇일까요?",
          "'무시하고 실행하세요'라고만 안내하면 어떤 문제가 생길까요?",
          "사용자가 안심하면서도 안전하게 실행하게 하려면 다운로드 위치와 파일 정보를 어떻게 알려 줘야 할까요?"
        ],
        steps: [
          "경고를 줄이기 위한 배포 전 조치를 적습니다.",
          "사용자가 확인할 공식 다운로드 위치를 적습니다.",
          "파일명·버전·게시자 확인 문구를 적습니다.",
          "경고가 뜰 때 보여 줄 안내문을 만듭니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "reduceWarning", label: "경고를 줄이는 방법", placeholder: "예: GitHub Releases에서만 배포하고, 파일명·버전을 고정하며, 가능하면 코드 서명을 적용한다." },
            { key: "officialSource", label: "공식 다운로드 위치", placeholder: "예: https://github.com/사용자명/저장소명/releases 에서만 다운로드하도록 안내한다." },
            { key: "sourceCheck", label: "사용자 확인 문구", placeholder: "예: 파일명이 my-app-1.0.0.exe이고, 다운로드 위치가 공식 GitHub Releases인지 확인하세요." },
            { key: "warningGuide", label: "보안 경고 안내문", placeholder: "예: Windows 경고가 뜨면 파일 출처와 이름을 먼저 확인하세요. 다른 사이트에서 받은 파일이면 실행하지 마세요." }
          ]
        },
        checks: ["공식 다운로드 위치를 한 곳으로 정했다", "안내문에 파일명·버전·게시자 확인 방법이 있다", "안내문이 '무조건 실행하세요'가 아니라 출처 확인을 먼저 요구한다"]
      },
      {
        id: "ops",
        group: "운영",
        title: "운영 체크리스트 만들기",
        visual: {
          type: "cards",
          caption: "릴리즈 후 운영 점검",
          items: [
            { label: "사용자 문의", text: "무엇을 불편해하나" },
            { label: "오류 보고", text: "새로 생긴 문제 확인" },
            { label: "업데이트", text: "고치거나 더할 것" },
            { label: "보안 재점검", text: "비밀 값·권한 확인" }
          ]
        },
        goal: "릴리즈 이후에도 확인할 운영 항목을 만든다.",
        difficulty: "advanced",
        estimatedMinutes: 15,
        updatedAt: "2026-06-22",
        completionRequirements: ["운영 체크리스트를 만들었다", "업데이트 기준을 적었다"],
        summary: "운영은 배포 후 사용자가 문제없이 계속 쓰도록 살피는 일입니다. 릴리즈는 끝이 아니라 다음 개선의 시작입니다.",
        reading: "운영은 배포 이후에도 앱을 계속 살피는 일입니다. 사용자 문의, 오류 보고, 업데이트 필요성, 보안 재점검을 주기적으로 확인해야 합니다. 마스터리그에서는 릴리즈가 끝이 아니라 다음 개선을 준비하는 시작점이라는 관점을 배웁니다. 앱을 내보낸 뒤에도 '오류는 없는지, 사용자가 무엇을 불편해하는지'를 정해진 주기로 점검하는 체크리스트를 둡니다.",
        terms: [
          { term: "운영", def: "배포 후에도 앱이 잘 쓰이도록 지속적으로 살피는 일." },
          { term: "업데이트 주기", def: "얼마나 자주 점검·개선할지 정한 간격." }
        ],
        discussion: [
          "실제 서비스로 운영한다면 가장 먼저 모니터링할 지표는 무엇인가요?",
          "릴리즈를 '끝'이 아니라 '시작'으로 보면 무엇이 달라지나요?"
        ],
        steps: [
          "운영 체크 항목을 만듭니다.",
          "업데이트 기준을 적습니다.",
          "사용자 문의 대응 방법을 적습니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "opsChecklist", label: "운영 체크 항목", placeholder: "예: 주 1회 오류 보고 확인, 월 1회 보안 재점검(RLS 정책·환경변수·키 노출), 사용자 피드백 모으기", chips: ["주 1회 오류 보고 확인", "월 1회 RLS 정책 재확인", "환경변수·키 노출 재점검", "API 실패 로그 확인", "사용자 피드백 수집"] },
            { key: "updateCriteria", label: "업데이트 기준", input: "text", placeholder: "예: 같은 오류가 반복되거나 요청이 쌓이면 업데이트" },
            { key: "inquiryResponse", label: "사용자 문의 대응", placeholder: "예: 문의 창구를 정하고, 받은 문의를 에러 보고 형식으로 정리한다." }
          ]
        },
        checks: ["운영 체크 항목마다 확인 주기가 정해져 있다", "재점검 항목에 RLS 정책과 키 노출이 들어 있다"]
      },
      {
        id: "share",
        group: "운영",
        title: "마스터 결과물 공유하기",
        visual: {
          type: "cards",
          caption: "마스터 공유글에 담을 것",
          items: [
            { label: "v1.0 링크", text: "배포 또는 Releases 주소" },
            { label: "운영형 PRD", text: "운영까지 고려한 요약" },
            { label: "릴리즈 회고", text: "가장 어려웠던 점" }
          ]
        },
        goal: "v1.0으로 공식 릴리즈된 앱 링크와 운영형 PRD를 Padlet에 공유한다.",
        difficulty: "advanced",
        estimatedMinutes: 20,
        updatedAt: "2026-06-22",
        completionRequirements: ["v1.0 배포 링크가 실제로 열린다", "공유글을 만들었다", "공개 점검을 했다"],
        summary: "마스터리그를 마친 여러분은 보안·테스트·릴리즈를 모두 거친 v1.0 앱을 갖게 되었습니다. 링크와 회고를 공유해 서로 배웁니다.",
        reading: "마스터 단계 공유글에는 v1.0 배포 링크(또는 GitHub Releases URL), 운영형 PRD 요약, 릴리즈를 준비하며 가장 어려웠던 점을 담습니다. 다른 사람이 보고 운영 관점까지 배울 수 있도록 핵심을 추리고, 막힌 부분도 솔직히 적어 두면 좋은 피드백을 받습니다. 올리기 전에는 민감 정보와 내부 URL이 없는지 반드시 확인하세요.",
        terms: [
          { term: "v1.0", def: "첫 번째 정식 릴리즈 버전을 나타내는 표시." },
          { term: "회고", def: "이번 작업에서 배운 점과 다음에 바꿀 점을 돌아보는 것." }
        ],
        discussion: [
          "루키·프로·마스터를 거치며 내 앱이 어떻게 달라졌나요?",
          "다음 버전에서 가장 먼저 개선하고 싶은 것은 무엇인가요?"
        ],
        steps: [
          "닉네임과 앱 제목·버전을 씁니다.",
          "v1.0 배포 링크 또는 GitHub Releases URL을 기록합니다.",
          "운영형 PRD 요약과 릴리즈 회고를 정리합니다.",
          "공개 점검 후 Padlet에 올립니다."
        ],
        externalGuide: "공유글을 복사한 뒤 마스터리그 Padlet에 직접 올리세요. v1.0 배포 링크도 함께 붙여넣으세요.",
        practice: {
          kind: "share",
          fields: [
            { key: "nickname", label: "닉네임", input: "text" },
            { key: "title", label: "앱 제목 · 버전", input: "text", placeholder: "예: 여행 플래너 v1.0" },
            { key: "deployUrl", label: "v1.0 배포 링크 또는 GitHub Releases URL", input: "text", placeholder: "예: https://username.github.io/my-app  또는  https://github.com/user/repo/releases/tag/v1.0" },
            { key: "learned", label: "배운 점 · 회고" },
            { key: "help", label: "도움받고 싶은 점" }
          ]
        },
        checks: ["v1.0 링크를 눌러 실제로 열린다", "다른 계정으로 로그인하면 내 데이터가 보이지 않는다", "공유글에 민감 정보와 내부 URL이 없다"]
      }
    ]
  }
};

/*
 * 현장·일상 프로젝트 트랙 (Phase 5)
 * --------------------------------------------------------------
 * 세 리그(rookie/pro/master)를 "무엇을 만들지" 관점에서 묶은 아이디어 메뉴.
 * 학생은 일상 앱을, 교사(연수 참가자)는 교실에서 바로 쓰는 도구를 하나 골라
 * 같은 리그 흐름으로 만들 수 있도록 안내한다. 강의 진행과 독립적인 참고 자료이며,
 * app.js의 renderProjectTracks가 읽어 '현장 프로젝트 아이디어' 패널로 보여 준다.
 * 각 아이디어: { title, summary, league, useFor }  (league는 COURSE 키와 일치)
 */
const PROJECT_TRACKS = [
  {
    name: "수업 도구",
    intro: "수업 중 바로 띄워 쓰는 작은 도구. 루키리그의 '수업 준비 미니앱' 병기 예시가 바로 이 갈래입니다.",
    ideas: [
      { title: "랜덤 발표자 뽑기", summary: "이름 목록에서 무작위로 한 명을 뽑아 보여 주는 한 화면 앱.", league: "rookie", useFor: "발표·질문 순서를 공정하게 정할 때 칠판 대신 띄워 사용합니다." },
      { title: "수업 타이머·스톱워치", summary: "남은 시간을 크게 표시하고 끝나면 알려 주는 타이머.", league: "rookie", useFor: "모둠 활동·시험 시간을 학생들이 함께 보도록 화면에 띄웁니다." },
      { title: "모둠 편성기", summary: "전체 인원을 입력하면 원하는 인원수로 모둠을 자동으로 나눠 주는 앱.", league: "pro", useFor: "매번 손으로 짜던 모둠을 한 번에 편성하고 결과를 그대로 공유합니다." }
    ]
  },
  {
    name: "학급 운영",
    intro: "한 학기 동안 반복해서 쓰는 학급 관리용 화면.",
    ideas: [
      { title: "1인 1역 당번표", summary: "역할과 담당 학생을 정리해 보여 주고 주마다 돌리는 당번표.", league: "rookie", useFor: "교실 뒤에 붙이던 종이 당번표를 링크 하나로 대체합니다." },
      { title: "자리 배치도", summary: "자리 위치에 학생 이름을 배치해 한눈에 보는 좌석표.", league: "pro", useFor: "자리를 바꿀 때마다 새로 그리지 않고 화면에서 바로 수정합니다." },
      { title: "학급 투표기", summary: "안건과 보기를 올리고 학생들이 고른 결과를 집계하는 앱.", league: "master", useFor: "현장학습 장소·반 규칙을 학생들이 직접 투표해 정하도록 운영합니다." }
    ]
  },
  {
    name: "학생 기록",
    intro: "학생별 활동을 차곡차곡 모으는 기록용 앱. 데이터를 다루는 흐름과 잘 맞습니다.",
    ideas: [
      { title: "독서 기록장", summary: "읽은 책·날짜·한 줄 감상을 모아 목록으로 보여 주는 앱.", league: "rookie", useFor: "학생이 스스로 독서 이력을 쌓고, 학기 말에 그대로 출력해 모읍니다." },
      { title: "칭찬 스티커 누적판", summary: "학생별로 받은 칭찬 수를 더해 순위·합계로 보여 주는 보드.", league: "pro", useFor: "교실 칭찬판을 디지털로 옮겨 어디서든 확인하고 갱신합니다." },
      { title: "상담 메모(내 기기 저장)", summary: "학생별 상담 내용을 이 브라우저에만 저장해 다시 찾아보는 메모.", league: "master", useFor: "민감한 기록은 서버 없이 교사 기기에만 남겨 안전하게 관리합니다." }
    ]
  },
  {
    name: "교무 업무",
    intro: "행사·문서·예산처럼 매번 손이 가던 업무를 자동화하는 도구.",
    ideas: [
      { title: "행사 준비물 체크리스트", summary: "준비물과 담당·완료 여부를 표시하는 점검 앱(루키 '수업 준비 미니앱'과 같은 구조).", league: "rookie", useFor: "현장학습·학예회 준비를 한 화면에서 빠짐없이 챙깁니다. 날씨·견적까지 붙이면 프로리그의 '학교 행사 준비 앱'이 됩니다." },
      { title: "가정통신문 생성기", summary: "제목·날짜·내용을 넣으면 정해진 양식으로 글을 만들어 주는 앱.", league: "pro", useFor: "반복되는 통신문을 매번 새로 쓰지 않고 양식에 맞춰 빠르게 작성합니다." },
      { title: "일정 카운트다운", summary: "시험·행사까지 남은 날짜를 자동으로 세어 보여 주는 화면.", league: "rookie", useFor: "교실 앞에 띄워 학생·학부모와 중요한 일정을 함께 공유합니다." }
    ]
  },
  {
    name: "데이터 활용",
    intro: "설문·성적·출결처럼 모인 숫자를 보기 좋게 정리·요약하는 앱. 마스터리그 흐름과 잘 맞습니다.",
    ideas: [
      { title: "설문 결과 요약 보드", summary: "보기별 응답 수를 입력하면 비율과 막대로 정리해 주는 앱.", league: "pro", useFor: "반 설문·만족도 조사 결과를 회의·통신문에 바로 쓸 형태로 만듭니다." },
      { title: "급식·활동 만족도 집계", summary: "항목별 점수를 모아 평균과 순위로 보여 주는 집계 앱.", league: "pro", useFor: "주간 만족도를 누적해 변화 추이를 한눈에 확인합니다." },
      { title: "출결·참여 통계", summary: "로그인한 사용자별로 데이터를 따로 저장·집계하는 다중 사용자 앱(마스터 '학급 기록 서비스'와 같은 구조).", league: "master", useFor: "여러 교사가 각자 학급 데이터를 입력하고, RLS 규칙으로 자기 반 통계만 보도록 운영합니다." }
    ]
  }
];
