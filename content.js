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
 *
 * 학습자는 "내가 만들고 싶은 앱"을 정해 코스 전반에서 발전시킨다.
 * 본문/placeholder의 '할 일 목록 앱'은 이해를 돕는 예시일 뿐, 강제 주제가 아니다.
 */

const COURSE = {
  /* ============================== 루키리그 ============================== */
  rookie: {
    name: "루키리그",
    theme: "#0056d2",
    label: "AI에게 코드를 받아 내 첫 앱을 만들고 배포한다",
    description: "코딩 경험 없이도 시작할 수 있습니다. ChatGPT·Claude·Gemini 중 편한 AI를 골라 코드를 받고, Netlify로 배포해 실제로 열리는 첫 앱을 완성합니다.",
    tags: ["Prompt·Context·Harness", "AI 코드 받기", "Netlify/Vercel 배포", "첫 앱 완성"],
    padletUrl: "https://padlet.com/dungstme/_-guhr4cbmj43e82ew",
    pages: [
      {
        id: "setup-rookie",
        group: "환경 준비",
        title: "루키 환경 준비하기",
        goal: "루키리그 수업에 필요한 계정을 모두 만들어 준비한다.",
        summary: "설치 없이 브라우저만으로 모든 실습을 진행합니다. 아래 계정들이 준비되면 바로 시작할 수 있습니다.",
        reading: "루키리그는 별도 설치 없이 웹에서 모든 작업을 처리합니다. 필요한 것은 브라우저와 이메일 주소뿐입니다. 코드 작성에는 ChatGPT·Gemini·Claude 중 편한 것을 선택하면 됩니다. Gemini Gems는 나만의 전용 AI를 구성할 때 씁니다. Canva는 화면 초안을 빠르게 만들 때, Netlify는 파일을 드래그&드롭으로 배포할 때 사용합니다. 모두 무료 플랜으로 충분합니다.",
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
          "ChatGPT·Gemini·Claude 세 가지 AI 중 어떤 기준으로 선택할 것 같나요?"
        ],
        steps: [
          "chat.openai.com → 'Sign up'. Google·Microsoft 계정으로도 가입 가능합니다.",
          "claude.ai → 'Sign up'. Anthropic 계정을 만들거나 Google 계정으로 가입합니다.",
          "gemini.google.com → Google 계정으로 로그인합니다. Google 계정이 없다면 accounts.google.com/signup에서 먼저 만드세요.",
          "canva.com → 'Sign up for free'. 이메일 또는 Google 계정으로 가입합니다.",
          "app.netlify.com → 'Sign up'. GitHub 또는 이메일로 가입합니다.",
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
        checks: ["ChatGPT·Claude·Gemini 중 하나 이상 로그인했다", "Canva에 로그인했다", "Netlify에 로그인했다"]
      },
      {
        id: "vibe",
        group: "기초 개념",
        title: "바이브코딩 시작하기",
        goal: "바이브코딩이 무엇인지 내 말로 설명할 수 있다.",
        summary: "바이브코딩은 코드를 외우는 게 아니라, 만들고 싶은 것을 AI와 주고받으며 완성하는 방식입니다.",
        reading: "바이브코딩에서 가장 중요한 능력은 문법 암기가 아닙니다. 만들고 싶은 결과를 말로 또렷이 정리하고, AI에게 필요한 배경을 건네고, 나온 결과가 맞는지 직접 확인하는 습관입니다. 예를 들어 '할 일을 적고 완료를 체크하는 앱'처럼 한 문장이면 출발선으로 충분합니다. 처음부터 완벽한 앱을 노리지 말고, 만들고 싶은 것을 한 문장으로 정한 뒤 작은 한 조각부터 만들어 눈으로 확인해 보세요.",
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
            { key: "appIdea", label: "내가 만들고 싶은 것(한 문장)", placeholder: "예: 할 일을 적고 완료를 체크하는 앱", chips: ["할 일 체크 앱", "가계부 앱", "독서 기록 앱", "습관 트래커", "식단 기록 앱", "일정 관리 앱"] },
            { key: "user", label: "누가 사용하나요?", input: "text", placeholder: "예: 할 일을 자꾸 잊는 나 같은 사람", chips: ["나 자신", "직장 동료", "가족", "학생·수강생"] },
            { key: "firstQ", label: "AI에게 던질 첫 질문", placeholder: "예: 이 앱의 가장 간단한 첫 화면부터 만들어 주세요. 불명확한 부분이 있으면 먼저 물어봐 줘.", chips: ["불명확한 부분이 있으면 먼저 물어봐 줘", "한 화면짜리로 만들어 줘", "<!DOCTYPE html>부터 </html>까지 전체를 줘"] }
          ]
        },
        checks: ["바이브코딩을 내 말로 설명했다", "만들고 싶은 것을 한 문장으로 적었다"]
      },
      {
        id: "pch",
        group: "기초 개념",
        title: "Prompt · Context · Harness",
        goal: "P-C-H 세 가지의 역할을 구분해 설명할 수 있다.",
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
            { key: "prompt", label: "Prompt (요청)", placeholder: "예: 할 일을 입력하고 추가를 누르면 목록에 추가되게 해 줘.", chips: ["추가 버튼을 누르면 목록에 들어가게 해 줘", "완료 체크하면 취소선이 생기게 해 줘", "삭제 버튼을 추가해 줘", "불명확한 부분은 먼저 물어봐"] },
            { key: "context", label: "Context (배경 자료)", placeholder: "예: 입력칸·추가 버튼·목록이 있는 한 화면짜리 앱.", chips: ["한 화면짜리 앱", "모바일 우선 디자인", "HTML+CSS+JS 순수 코드", "흰 배경·파란 포인트 컬러"] },
            { key: "harness", label: "Harness (지킬 범위·확인 방법)", placeholder: "예: 추가/완료/삭제만 동작하게 하고, 미리보기로 확인해 안 되면 고친다.", chips: ["추가/완료/삭제 기능만 구현", "미리보기로 확인 후 다음 기능", "모르면 구현 전 먼저 물어봐", "기존 코드 건드리지 말 것"] }
          ]
        },
        checks: ["Prompt를 한 문장으로 적었다", "Context에 화면 구성을 적었다", "Harness에 지킬 범위·확인 방법을 적었다"]
      },
      {
        id: "rules",
        group: "기초 개념",
        title: "좋은 지침 만들기",
        goal: "AI가 지킬 작업 규칙(지침)을 만들 수 있다.",
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
        checks: ["해야 할 일을 적었다", "하면 안 되는 일을 적었다", "보안 규칙을 넣었다"]
      },
      {
        id: "chatgpt",
        group: "AI 도구 연습",
        title: "AI 도구로 질문 연습하기",
        goal: "ChatGPT·Claude·Gemini 중 하나로 목표·배경·형식을 담은 질문을 만들 수 있다.",
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
          "ChatGPT·Claude·Gemini 중 어느 도구가 본인의 작업 방식에 맞을 것 같은가요?"
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
            { key: "question", label: "AI에게 보낼 질문", placeholder: "예: 내 앱의 첫 화면을 HTML+CSS로 만들어 줘. 입력칸·추가 버튼·목록이 필요해. 불명확한 부분이 있으면 먼저 물어봐 줘.", chips: ["불명확한 부분이 있으면 먼저 물어봐 줘", "한 화면짜리로 만들어 줘", "<!DOCTYPE html>부터 완성본 전체를 줘", "모바일에서도 잘 보이게 해 줘"] },
            { key: "askFirst", label: "AI가 먼저 확인했으면 하는 점", input: "text", placeholder: "예: 화면 레이아웃 방향(세로/가로)을 먼저 확인해 줘.", chips: ["화면 레이아웃 방향 먼저 확인", "버튼 색상·개수 먼저 확인", "저장 방식 먼저 확인"] },
            { key: "format", label: "원하는 답변 형식", input: "text", placeholder: "예: 완성된 HTML 한 파일로 전체를 줘.", chips: ["완성된 HTML 한 파일로 전체", "코드블록으로 줘", "설명은 주석으로만"] }
          ]
        },
        checks: ["목표·배경·형식을 담은 질문을 만들었다", "AI가 먼저 되묻게 하는 문구를 넣었다"]
      },
      {
        id: "gemini",
        group: "AI 도구 연습",
        title: "Gemini Gems 만들기",
        goal: "반복해서 쓸 나만의 AI 역할(Gems)을 만들 수 있다.",
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
        checks: ["Gems 이름을 정했다", "Gems 지침을 작성했다"]
      },
      {
        id: "canva",
        group: "AI 도구 연습",
        title: "Canva AI로 화면 초안 만들기",
        goal: "Canva Magic Design에 붙여넣을 화면 요청문을 만들고, 생성된 초안을 저장할 수 있다.",
        summary: "Canva의 Magic Design에 한 문장을 붙여넣으면 앱 화면처럼 생긴 디자인 초안이 나옵니다. 코드는 없지만, 이 그림을 AI에게 보여 주면 훨씬 정확한 코드를 받을 수 있습니다.",
        reading: "Canva의 Magic Design은 텍스트로 원하는 화면을 설명하면 여러 디자인 초안을 자동으로 만들어 주는 AI 기능입니다. 여기서 만들어지는 건 실제로 동작하는 앱이 아니라, '이런 모양이면 좋겠다'는 화면 그림입니다. 하지만 이 그림이 있으면 ChatGPT나 Claude에 '이 화면처럼 만들어 줘'라고 보여 줄 수 있어, 코드 요청이 훨씬 정확해집니다. 사용 흐름은 이렇습니다: ① 아래에 요청문을 작성 → ② canva.com에서 Magic Design에 붙여넣기 → ③ 마음에 드는 초안 선택 → ④ 스크린샷 저장 → ⑤ AI 코드 요청 시 참고로 첨부.",
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
            { label: "AI 코드 요청 시 첨부", sub: "더 정확한 결과" }
          ]
        },
        discussion: [
          "Canva로 만든 화면 그림을 AI에게 보여 주면 코드 요청이 왜 더 정확해질까요?",
          "내 앱 첫 화면에 꼭 보여야 할 요소 세 가지는 무엇인가요?"
        ],
        steps: [
          "화면에 꼭 들어갈 요소를 적습니다.",
          "아래 Canva AI 요청문 칸에 완성된 요청문을 작성합니다.",
          "canva.com에 접속해 로그인합니다.",
          "'디자인 만들기'를 클릭하고 검색창에 '앱 스크린샷' 또는 '휴대폰 목업'을 입력해 규격을 선택합니다.",
          "편집 화면 왼쪽 패널에서 'Magic Design'을 찾아 클릭합니다. (보이지 않으면 왼쪽 검색창에 'Magic Design' 입력)",
          "작성한 요청문을 Magic Design 입력창에 붙여넣고 생성합니다.",
          "마음에 드는 초안을 선택 후 스크린샷으로 저장하거나 공유 링크를 복사합니다.",
          "저장한 화면을 ChatGPT나 Claude에 업로드하며 '이런 모양으로 HTML을 만들어 줘'라고 요청합니다."
        ],
        externalGuide: "canva.com → 디자인 만들기 → 앱 스크린샷/휴대폰 목업 선택 → 왼쪽 패널 Magic Design → 요청문 붙여넣기 → 초안 선택 → 스크린샷 저장.",
        links: [
          { label: "Canva 열기", url: "https://www.canva.com" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "canvaParts", label: "화면에 꼭 들어갈 요소", input: "text", placeholder: "예: 제목, 입력칸, 추가 버튼, 체크리스트 목록, 남은 개수" },
            { key: "canvaPrompt", label: "Canva Magic Design 요청문", placeholder: "예: 할 일 입력칸, 추가 버튼, 체크리스트 목록, 남은 개수 표시가 있는 깔끔한 모바일 첫 화면. 흰 배경에 파란 포인트 컬러. 한국어 UI." }
          ]
        },
        checks: ["화면에 들어갈 요소를 정했다", "Canva Magic Design 요청문을 만들었다", "초안을 생성하거나 스크린샷을 저장했다"]
      },
      {
        id: "build-rookie",
        group: "내 앱 만들기",
        title: "AI에게 코드 받아 실행하기",
        goal: "ChatGPT·Claude·Gemini 중 하나로 HTML 코드를 받아 직접 실행해 본다.",
        summary: "코드를 직접 작성할 필요가 없습니다. AI에게 앱 화면을 설명하고, 받은 코드를 붙여넣으면 바로 실행됩니다.",
        reading: "세 가지 AI 모두 HTML 코드를 만들 수 있습니다. ChatGPT·Claude는 chat.openai.com·claude.ai에서, Gemini는 gemini.google.com에서 사용합니다. 요청할 때는 원하는 화면 구성을 구체적으로 설명하고, 끝에 '<!DOCTYPE html>부터 </html>까지 전체 파일로 줘'를 추가합니다. 받은 코드를 아래 입력칸에 붙여넣으면 미리보기에서 즉시 실행됩니다. 결과가 마음에 안 들면 'OO 부분을 이렇게 바꿔 줘'라고 재요청하고 다시 붙여넣습니다. 한 번에 완성될 필요는 없습니다 — 반복이 핵심입니다.",
        terms: [
          { term: "HTML", def: "화면의 구조를 정의하는 코드. 제목·버튼·입력칸 등의 요소를 담습니다." },
          { term: "CSS", def: "HTML 요소의 색·크기·간격 등 시각적 스타일을 지정하는 코드." },
          { term: "JS(JavaScript)", def: "버튼 클릭·입력 처리 같은 동적 동작을 구현하는 코드." }
        ],
        discussion: [
          "AI가 만든 코드에서 수정하고 싶은 부분을 어떻게 구체적으로 설명할 수 있을까요?",
          "같은 요청을 ChatGPT와 Claude에 각각 보내면 결과가 다를까요? 어떻게 비교할 수 있을까요?"
        ],
        steps: [
          "아래 칸에 AI에 보낼 요청문을 작성합니다.",
          "ChatGPT(chat.openai.com)·Claude(claude.ai)·Gemini(gemini.google.com) 중 하나를 선택해 접속합니다.",
          "입력창에 요청문을 붙여넣고 끝에 '<!DOCTYPE html>부터 </html>까지 전체를 줘'를 추가합니다.",
          "받은 코드 전체를 아래 '코드 붙여넣기' 칸에 붙여넣어 미리보기로 확인합니다.",
          "수정할 부분을 AI에게 재요청하고 다시 붙여넣습니다.",
          "완성된 코드를 index.html 파일로 저장합니다."
        ],
        externalGuide: "① 요청문 작성 ② ChatGPT·Claude·Gemini 중 하나 접속 ③ 요청문 + '전체 HTML 파일로 줘' 전송 ④ 받은 코드를 아래 칸에 붙여넣어 실행 ⑤ 수정 요청 → 반복",
        links: [
          { label: "ChatGPT 열기", url: "https://chat.openai.com" },
          { label: "Claude 열기", url: "https://claude.ai" },
          { label: "Gemini 열기", url: "https://gemini.google.com" }
        ],
        practice: {
          kind: "build",
          fields: [
            { key: "aiRequest", label: "AI에게 보낼 요청문", placeholder: "예: 내 할 일 앱의 첫 화면을 HTML+CSS+JS로 만들어 줘. 입력칸, 추가 버튼, 체크리스트 목록이 있어야 해. 깔끔한 디자인으로 해 줘. <!DOCTYPE html>부터 </html>까지 전체를 줘." },
            { key: "htmlCode", label: "AI가 준 HTML 코드 붙여넣기", placeholder: "AI에게 받은 HTML 코드를 여기 전체 붙여넣으세요. 아래에서 바로 실행됩니다." }
          ]
        },
        checks: ["AI에게 요청해서 코드를 받았다", "붙여넣어 미리보기로 실행해 봤다", "한 가지 이상 수정을 요청해 봤다"]
      },
      {
        id: "deploy-rookie",
        group: "내 앱 만들기",
        title: "Netlify/Vercel로 배포하기",
        goal: "AI에게 받은 HTML 파일을 Netlify 또는 Vercel에 올려 인터넷 링크를 만든다.",
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
          "배포 링크를 아래에 기록합니다."
        ],
        externalGuide: "① Netlify에 접속해 로그인합니다. ② 'Sites' 탭의 점선 영역에 index.html 파일을 드래그&드롭합니다. ③ 몇 초 후 자동 생성된 URL을 복사해 아래에 기록합니다. ④ 브라우저에서 URL을 열어 앱이 정상 동작하는지 확인합니다.",
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
            { key: "platform", label: "사용한 배포 서비스", input: "select", options: ["Netlify", "Vercel"], value: "Netlify" },
            { key: "deployUrl", label: "배포된 링크(URL)", input: "text", placeholder: "예: https://my-first-app.netlify.app" },
            { key: "deployNote", label: "배포하며 어려웠던 점 / 해결 방법", placeholder: "예: 파일 이름을 index.html로 바꾸니 바로 열렸다." }
          ]
        },
        checks: ["Netlify 또는 Vercel에 파일을 올렸다", "배포 링크가 실제로 열린다", "배포 URL을 기록했다"]
      },
      {
        id: "prd-basic",
        group: "직접 만들기",
        title: "루키 PRD 만들기",
        goal: "내가 만들고 싶은 앱 설명서(PRD)를 완성한다.",
        summary: "루키 PRD는 어려운 회사 문서가 아니라, AI와 사람에게 내 앱을 설명하는 짧은 설명서입니다.",
        reading: "PRD는 '내가 만들고 싶은 것 설명서'입니다. 앱 이름, 사용할 사람, 해결할 문제, 꼭 필요한 기능 3개, 성공 확인 방법만 정리해도 AI에게 훨씬 정확히 일을 맡길 수 있습니다. 지금까지 적어 온 내 앱 내용을 한곳에 모으면 그대로 루키 PRD가 됩니다. 기능을 욕심내지 말고, 정말 필요한 3개만 골라 적는 게 핵심입니다.",
        terms: [
          { term: "PRD", def: "무엇을 왜 만드는지 적은 제품 설명서. 여기선 짧은 한 장이면 충분." },
          { term: "성공 기준", def: "'이게 되면 성공'이라고 말할 수 있는 확인 방법." }
        ],
        discussion: [
          "기능을 3개로 줄여야 한다면 무엇을 남기고 무엇을 뺄 기준이 되나요?",
          "이 앱이 성공했다고 판단할 수 있는 기준은 무엇인가요?"
        ],
        steps: [
          "앱 이름·사용자·문제를 적습니다.",
          "꼭 필요한 기능 3개를 적습니다.",
          "성공 확인 방법을 적습니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "app", label: "앱 이름", input: "text", placeholder: "예: 오늘 할 일" },
            { key: "user", label: "누구를 위한 앱인가요?", input: "text", placeholder: "예: 할 일을 자주 잊는 사람" },
            { key: "problem", label: "어떤 문제를 해결하나요?", placeholder: "예: 오늘 할 일을 한눈에 모아 보고 빠뜨리지 않게 한다." },
            { key: "features", label: "꼭 필요한 기능 3개", placeholder: "예: 1) 할 일 추가  2) 완료 체크  3) 남은 개수 보기" },
            { key: "success", label: "성공 확인 방법", placeholder: "예: 할 일을 추가하고 체크하면 남은 개수가 바르게 줄어든다." }
          ]
        },
        checks: ["앱 이름·사용자·문제를 적었다", "기능 3개를 적었다", "성공 확인 방법을 적었다"]
      },
      {
        id: "share",
        group: "공유",
        title: "루키 결과물 공유하기",
        goal: "내가 만든 앱의 배포 링크와 소감을 Padlet에 공유한다.",
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
            { key: "title", label: "앱 제목", input: "text", placeholder: "예: 나의 첫 할 일 앱" },
            { key: "deployUrl", label: "배포된 앱 링크", input: "text", placeholder: "예: https://my-first-app.netlify.app" },
            { key: "learned", label: "배운 점" },
            { key: "help", label: "도움받고 싶은 점" }
          ]
        },
        checks: ["배포 링크가 실제로 열린다", "공유글을 만들었다", "공개 점검을 했다"]
      }
    ]
  },

  /* ============================== 프로리그 ============================== */
  pro: {
    name: "프로리그",
    theme: "#1a8754",
    label: "설계부터 AI 에이전트 구현·배포까지 내 완성 앱을 만든다",
    description: "아이디어를 PRD로 정리하고, AI 에이전트에 작업 지시서를 넣어 실제 앱을 구현합니다. 기능이 모두 동작하는 앱을 배포해 링크를 완성합니다.",
    tags: ["앱 설계·PRD", "AI 에이전트 구현", "기능 테스트", "웹 배포"],
    padletUrl: "https://padlet.com/dungstme/_-othnocro968oryg4",
    pages: [
      {
        id: "setup-pro",
        group: "환경 준비",
        title: "프로 환경 준비하기",
        goal: "Git과 GitHub를 설정하고 AI 에이전트(Claude Code·Codex CLI·Antigravity) 중 하나를 골라 실행할 수 있다.",
        summary: "프로의 핵심 스택은 AI 에이전트 + Git + GitHub입니다. 에이전트가 코드를 만들고, Git이 기록하고, GitHub가 보관·배포합니다.",
        reading: "프로리그에서는 AI 에이전트가 코드를 직접 만들고 수정합니다. Claude Code는 터미널에서 파일·Git·테스트까지 자율로 처리하는 CLI 에이전트입니다(`npm install -g @anthropic-ai/claude-code`). Codex CLI는 명령 한 줄로 코드를 생성·수정합니다(`npm install -g @openai/codex`). Antigravity는 브라우저에서 멀티스텝 작업을 지시하는 에이전트입니다(설치 불필요). 세 가지 중 하나를 골라서 시작하면 됩니다. 공통으로 필요한 건 Git(변경 기록)과 GitHub(클라우드 저장·배포)입니다. 코드를 직접 열어 확인하고 싶다면 편집기를 추가로 설치하면 되지만, 에이전트가 파일을 직접 다루기 때문에 필수는 아닙니다.",
        terms: [
          { term: "Claude Code", def: "Anthropic CLI 에이전트. `npm install -g @anthropic-ai/claude-code` 로 설치 후 터미널에서 `claude` 실행." },
          { term: "Codex CLI", def: "OpenAI CLI 에이전트. `npm install -g @openai/codex` 로 설치 후 `codex '작업내용'` 형식으로 사용." },
          { term: "Antigravity", def: "브라우저 기반 에이전트. antigravity.dev 접속 후 바로 사용 가능." },
          { term: "Git", def: "파일 변경을 저장하고 GitHub에 올리는 버전 관리 도구." },
          { term: "Node.js", def: "Claude Code·Codex CLI 설치에 필요한 JavaScript 실행 환경. nodejs.org에서 LTS 버전 설치." }
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
          "Claude Code·Codex CLI·Antigravity 중 내 작업 방식에 가장 잘 맞는 에이전트는 무엇이고, 그 이유는?",
          "에이전트가 Git 커밋까지 자율로 처리하게 하려면 어떤 조건을 먼저 설정해야 할까요?"
        ],
        steps: [
          "git-scm.com/downloads 에서 Git을 다운로드해 설치합니다. 설치 마법사는 기본값 그대로 Next를 눌러도 됩니다.",
          "터미널(Windows: PowerShell, Mac: Terminal)을 열고 `git --version` 을 입력합니다. 버전 번호가 나오면 성공입니다.",
          "nodejs.org 에서 LTS 버전의 Node.js를 설치합니다. 설치 후 `node --version` 으로 확인합니다.",
          "에이전트를 선택합니다. Claude Code: `npm install -g @anthropic-ai/claude-code` → `claude` 실행 / Codex CLI: `npm install -g @openai/codex` → `codex '작업'` 실행 / Antigravity: antigravity.dev 접속(설치 불필요).",
          "github.com 에서 계정을 만듭니다(Sign up). 이메일·비밀번호·사용자 이름을 입력합니다.",
          "터미널에서 `git config --global user.name \"내이름\"` 과 `git config --global user.email \"이메일@example.com\"` 두 줄을 입력해 GitHub 연결 정보를 등록합니다."
        ],
        externalGuide: "① git-scm.com → 설치 → `git --version` 확인 ② nodejs.org LTS → 설치 → `node --version` 확인 ③ 에이전트 선택·설치 ④ github.com → Sign up ⑤ `git config` 로 이름·이메일 등록.",
        links: [
          { label: "Git 다운로드", url: "https://git-scm.com/downloads" },
          { label: "Node.js 다운로드", url: "https://nodejs.org" },
          { label: "Claude Code", url: "https://claude.ai/code" },
          { label: "Antigravity", url: "https://antigravity.dev" },
          { label: "Codex GitHub", url: "https://github.com/openai/codex" },
          { label: "GitHub 가입", url: "https://github.com/signup" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "gitVersion", label: "git --version 결과", input: "text", placeholder: "예: git version 2.44.0", chips: ["git version 2.44.0", "git version 2.43.0"] },
            { key: "agentChoice", label: "주로 사용할 에이전트", input: "select", options: ["Claude Code", "Codex CLI", "Antigravity"], value: "Claude Code" },
            { key: "githubUsername", label: "GitHub 사용자 이름", input: "text", placeholder: "예: myusername" },
            { key: "setupNote", label: "막힌 부분 메모", input: "text", placeholder: "예: node --version 입력 시 명령을 찾을 수 없음 오류", chips: ["설치 완료, 이상 없음", "PATH 오류 발생", "node --version 안 나옴", "git config 오류"] }
          ]
        },
        checks: ["git --version이 출력된다", "Node.js가 설치됐다", "AI 에이전트를 선택했다", "GitHub 계정을 만들었다", "git config로 이름·이메일을 등록했다"]
      },
      {
        id: "problem",
        group: "설계",
        title: "문제와 사용자 정의",
        goal: "앱이 해결할 문제와 사용자를 정한다.",
        summary: "좋은 앱은 기능보다 먼저 '누구의 어떤 문제'를 분명히 합니다.",
        reading: "프로 단계는 '무엇을 만들까'보다 '누가 어떤 불편을 겪고, 이 앱이 어떻게 돕는가'에서 출발합니다. 같은 앱이라도 대상이 바쁜 직장인인지 학생인지에 따라 화면과 기능이 달라집니다. 문제와 사용자를 또렷이 적어 두면 AI에게 '왜 만드는지'를 알려 주는 출발점이 됩니다.",
        terms: [
          { term: "사용자(타깃)", def: "이 앱을 실제로 쓸 사람." },
          { term: "문제 정의", def: "사용자가 겪는 불편을 한 문장으로 정리한 것." }
        ],
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
            { key: "problem", label: "해결할 문제", placeholder: "예: 할 일이 여러 곳에 흩어져 오늘 무엇을 해야 할지 한눈에 안 보인다." },
            { key: "user", label: "대상 사용자", input: "text", placeholder: "예: 할 일이 많아 자주 빠뜨리는 직장인·학생" },
            { key: "why", label: "왜 필요한가(한 문장)", placeholder: "예: 오늘 할 일을 한 화면에 모아 빠뜨림을 줄이기 위해." }
          ]
        },
        checks: ["문제를 적었다", "사용자를 적었다"]
      },
      {
        id: "screens",
        group: "설계",
        title: "화면 목록 만들기",
        goal: "필요한 화면을 목록으로 나눈다.",
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
            { key: "screenList", label: "화면 목록", placeholder: "예: 메인 화면(입력+목록), 상세 보기 화면" },
            { key: "eachPurpose", label: "각 화면의 목적", placeholder: "예: 메인은 추가·확인, 상세는 자세히 보기" },
            { key: "firstScreen", label: "가장 먼저 만들 화면", input: "text", placeholder: "예: 메인 화면" }
          ]
        },
        checks: ["화면 목록을 적었다", "각 화면 목적을 적었다"]
      },
      {
        id: "features",
        group: "설계",
        title: "기능 목록 만들기",
        goal: "화면마다 필요한 기능을 정리한다.",
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
            { key: "featureList", label: "기능 목록", placeholder: "예: 추가, 완료 체크, 삭제, 남은 개수 표시, (나중) 정렬" },
            { key: "priority", label: "우선순위(필수/나중)", placeholder: "예: 필수 - 추가·체크·삭제 / 나중 - 정렬·마감일" },
            { key: "doneCriteria", label: "완료 기준", placeholder: "예: 추가하면 목록에 보이고, 체크하면 상태가 바뀐다." }
          ]
        },
        checks: ["핵심 기능을 적었다", "우선순위를 정했다"]
      },
      {
        id: "data",
        group: "설계",
        title: "데이터 목록 만들기",
        goal: "앱이 저장할 데이터를 정한다.",
        summary: "데이터는 앱이 기억해야 하는 정보입니다. 저장할 것과 공개하면 안 되는 것을 함께 가립니다.",
        reading: "데이터는 앱이 기억해야 하는 정보입니다. 예를 들어 할 일 앱이라면 할 일 내용, 완료 여부, 만든 시간 정도가 데이터가 됩니다. 데이터 목록을 만들 때는 '저장할 것'과 '절대 공개하면 안 되는 것'을 함께 구분해야 안전합니다. 지금은 민감 정보가 없더라도, 나중에 로그인을 붙이면 비밀번호 같은 값이 생긴다는 점을 미리 의식해 둡니다.",
        terms: [
          { term: "데이터", def: "앱이 저장해 기억하는 정보." },
          { term: "민감 정보", def: "공개되면 위험한 값(비밀번호, 키, 개인정보 등)." }
        ],
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
            { key: "saveData", label: "저장할 데이터", placeholder: "예: 할 일 내용, 완료 여부, 만든 시간" },
            { key: "secretData", label: "공개하면 안 되는 데이터", input: "text", placeholder: "예: 지금은 없음(로그인 추가 시 비밀번호 발생)" },
            { key: "dbNeeded", label: "DB가 필요한가?", input: "text", placeholder: "예: 지금은 브라우저 저장으로 충분" }
          ]
        },
        checks: ["저장할 데이터를 적었다", "공개하면 안 되는 값을 구분했다"]
      },
      {
        id: "frontend-backend",
        group: "설계",
        title: "프론트엔드와 백엔드 나누기",
        goal: "화면과 서버의 역할을 구분한다.",
        summary: "프론트엔드는 사용자가 보는 화면, 백엔드는 뒤에서 데이터를 처리하는 부분입니다.",
        reading: "역할을 나누면 AI에게 어떤 일을 맡길지 또렷해집니다. 프론트엔드는 사용자가 보고 누르는 화면이고, 백엔드는 저장·계산·권한 확인처럼 뒤에서 처리하는 부분입니다. 앱을 브라우저 안에만 두면 백엔드 없이도 동작하지만, 여러 기기에서 같은 데이터를 보려면 백엔드(서버 저장)가 필요해집니다. 이 구분이 있으면 'AI야, 화면부터 만들어 줘' 또는 '저장 기능을 설계해 줘'처럼 정확히 맡길 수 있습니다.",
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
            { key: "frontRole", label: "프론트엔드 역할", placeholder: "예: 입력·목록 표시·체크 같은 화면 동작" },
            { key: "backRole", label: "백엔드 역할", placeholder: "예: 여러 기기에서 같은 데이터를 보도록 서버에 저장·불러오기" },
            { key: "splitCriteria", label: "AI에게 나눠 맡길 기준", placeholder: "예: 먼저 화면(프론트)부터 만들고, 저장이 필요해지면 백엔드를 붙인다." }
          ]
        },
        checks: ["프론트엔드 역할을 적었다", "백엔드 역할을 적었다"]
      },
      {
        id: "api",
        group: "설계",
        title: "API 요청·응답 읽기",
        goal: "화면과 서버가 주고받는 대화 예시를 만든다.",
        summary: "API는 화면과 서버가 주고받는 약속입니다. 요청은 부탁, 응답은 서버의 답장입니다.",
        reading: "API는 화면과 서버가 대화하는 약속입니다. 사용자가 '추가' 버튼을 누르면 화면은 서버에 '이걸 저장해 줘'라고 요청을 보내고, 서버는 '저장 완료'라는 응답을 돌려줍니다. 요청과 응답 예시를 미리 적어 두면 백엔드가 아직 없어도 데이터 흐름을 이해할 수 있습니다. 이 예시는 나중에 AI에게 저장 기능을 맡길 때 그대로 쓰입니다.",
        terms: [
          { term: "API", def: "화면과 서버가 정보를 주고받기로 한 약속." },
          { term: "요청/응답", def: "요청은 화면이 보내는 부탁, 응답은 서버가 주는 답장." }
        ],
        discussion: [
          "내 앱의 핵심 동작 하나를 API 대화로 표현하면 요청과 응답은 각각 무엇일까요?",
          "응답이 '실패'로 오면 화면은 사용자에게 뭐라고 보여 줘야 할까요?"
        ],
        steps: [
          "요청 예시를 적습니다.",
          "응답 예시를 적습니다.",
          "화면에 보여 줄 값을 고릅니다."
        ],
        visual: {
          type: "flow",
          caption: "화면 ↔ 서버 대화 흐름",
          steps: [
            { label: "사용자 액션", sub: "버튼 클릭 등" },
            { label: "API 요청", sub: "데이터 전송" },
            { label: "서버 처리", sub: "저장·계산" },
            { label: "API 응답", sub: "결과 반환" },
            { label: "화면 업데이트", sub: "결과 표시" }
          ]
        },
        practice: {
          kind: "form",
          fields: [
            { key: "reqExample", label: "API 요청 예시", placeholder: "예: 추가 요청 { 할 일: \"우유 사기\", 완료: false }" },
            { key: "resExample", label: "API 응답 예시", placeholder: "예: 응답 { 결과: \"성공\", id: 12 }" },
            { key: "showValues", label: "화면에 보여 줄 값", input: "text", placeholder: "예: 내용, 완료 여부, 남은 개수" }
          ]
        },
        checks: ["요청 예시를 만들었다", "응답 예시를 만들었다"]
      },
      {
        id: "prd-product",
        group: "제작 지시",
        title: "프로 PRD 작성하기",
        goal: "AI에게 제작을 맡길 수 있는 앱 PRD를 완성한다.",
        summary: "프로 PRD는 화면·기능·데이터·API·배포 기준까지 담은 '제작용 설명서'입니다.",
        reading: "프로 PRD는 아이디어를 'AI가 바로 작업할 수 있는 설계'로 바꾼 문서입니다. 문제·사용자·화면·기능·데이터·API·배포 기준이 들어가면, AI는 막연한 부탁이 아니라 구체적인 작업으로 이해합니다. 지금까지 프로리그에서 적어 온 내 앱 내용을 한곳에 모으면 그대로 프로 PRD가 됩니다. 전문 개발 문서라기보다, AI에게 정확히 일을 맡기기 위한 작업 설명서입니다.",
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
            { label: "기준", items: ["완료 기준", "배포 방식"] }
          ]
        },
        discussion: [
          "이 PRD만 보고 다른 사람이 같은 앱을 만들 수 있을까요? 빠진 건 없나요?",
          "'완료 기준'을 한 문장으로 적는다면 무엇인가요?"
        ],
        steps: [
          "문제와 사용자를 정리합니다.",
          "화면·기능·데이터·API를 채웁니다.",
          "완료 기준과 배포 방식을 적습니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "problem", label: "문제 정의", placeholder: "예: 오늘 할 일이 흩어져 빠뜨리기 쉽다." },
            { key: "user", label: "대상 사용자", input: "text", placeholder: "예: 할 일이 많은 직장인·학생" },
            { key: "scenario", label: "사용자 시나리오", placeholder: "예: 아침에 앱을 열어 할 일을 적고, 끝낼 때마다 체크한다." },
            { key: "screens", label: "화면 목록", placeholder: "예: 메인(입력+목록), 상세 보기" },
            { key: "features", label: "기능 목록", placeholder: "예: 추가, 완료 체크, 삭제, 남은 개수 표시" },
            { key: "data", label: "데이터 목록", placeholder: "예: 내용, 완료 여부, 만든 시간" },
            { key: "api", label: "API 필요 여부", input: "text", placeholder: "예: 지금은 불필요, 다기기 동기화 시 필요" },
            { key: "deploy", label: "배포 방식", input: "text", placeholder: "예: 웹 배포" },
            { key: "done", label: "완료 기준", placeholder: "예: 추가·체크·삭제가 동작하고 남은 개수가 바르게 표시된다." }
          ]
        },
        checks: ["문제 정의를 넣었다", "화면·기능·데이터를 넣었다", "완료 기준을 넣었다"]
      },
      {
        id: "cursor",
        group: "제작 지시",
        title: "AI 에이전트 선택과 작업 지시서",
        goal: "어떤 AI 에이전트를 쓸지 선택하고, 해당 도구에 붙여넣을 작업 지시서를 만든다.",
        summary: "Claude Code·Codex CLI·Antigravity, 세 에이전트는 각각 강점이 다릅니다. 어느 것을 쓰든 '이번에 이만큼, 이 범위 안에서'라는 명확한 지시서가 핵심입니다.",
        reading: "프로리그에서 사용하는 AI 에이전트는 세 가지입니다. Claude Code(claude.ai/code)는 Anthropic의 CLI 기반 에이전트로, 터미널에서 파일·테스트·Git을 직접 다루며 복잡한 작업을 반복 처리하는 데 강합니다. OpenAI Codex CLI는 터미널 명령 한 줄로 코드를 생성·실행하는 가벼운 도구입니다. Antigravity는 브라우저 기반 에이전트로, 설치 없이 웹에서 멀티스텝 작업을 지시할 수 있습니다. 어느 도구를 선택하든 작업 지시서는 같습니다 — PRD 요약, 이번 작업 범위, 손대지 말 것, 먼저 물어볼 조건.",
        terms: [
          { term: "AI 에이전트", def: "단순 답변이 아닌 코드 작성·파일 수정·실행까지 직접 처리하는 AI 도구." },
          { term: "Claude Code", def: "Anthropic의 CLI 에이전트. 터미널에서 파일·Git·테스트를 직접 처리합니다." },
          { term: "Codex CLI", def: "OpenAI의 터미널 기반 코드 생성 도구. 명령 한 줄로 코드를 만들고 실행합니다." },
          { term: "Antigravity", def: "브라우저 기반 AI 에이전트. 설치 없이 웹에서 멀티스텝 작업을 지시할 수 있습니다." },
          { term: "작업 지시서", def: "PRD에서 이번 작업 범위를 잘라낸 실행 요청 문서." }
        ],
        visual: {
          type: "compare",
          caption: "AI 에이전트 비교",
          columns: [
            { label: "Claude Code", items: ["Anthropic CLI 에이전트", "터미널에서 직접 실행", "파일·Git·테스트 자율 처리", "복잡한 리팩터링에 강함"] },
            { label: "Codex CLI", items: ["OpenAI 터미널 에이전트", "자연어 → 코드 변환", "기존 코드 분석·수정", "간단한 자동화 작업"] },
            { label: "Antigravity", items: ["브라우저 기반 에이전트", "설치 없이 바로 사용", "멀티스텝 작업 위임", "빠른 프로토타이핑"] }
          ]
        },
        discussion: [
          "Claude Code·Codex CLI·Antigravity 중 현재 프로젝트에 어떤 도구가 가장 적합할까요?",
          "작업 범위를 좁혀서 지시하면 어떤 이점이 생기나요?"
        ],
        steps: [
          "사용할 AI 에이전트를 선택합니다 (Claude Code·Codex CLI·Antigravity).",
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
          { label: "Codex GitHub", url: "https://github.com/openai/codex" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "workorder", label: "작업 지시서", placeholder: "예: 내 앱에 '추가' 기능을 구현해 줘. 입력칸에 글을 쓰고 추가를 누르면 목록에 추가되어야 한다.", chips: ["추가 버튼 클릭 시 목록에 항목 추가", "완료 체크하면 취소선 표시", "삭제 버튼으로 항목 제거", "localStorage로 데이터 저장"] },
            { key: "scope", label: "작업 범위(건드릴 것/말 것)", placeholder: "예: 추가 기능만. 기존 디자인과 다른 화면은 건드리지 말 것.", chips: ["이번 기능만, 다른 화면 건드리지 말 것", "기존 CSS 변경 금지", "새 파일 추가 금지", "API·서버 연동 제외"] },
            { key: "askFirst", label: "먼저 물어볼 질문", input: "text", placeholder: "예: 데이터를 어디에 저장할지 먼저 물어봐 줘.", chips: ["데이터 저장 방식 먼저 확인", "UI 레이아웃 먼저 확인", "구현 전 모호한 부분 먼저 물어봐"] }
          ]
        },
        checks: ["작업 지시서를 만들었다", "먼저 질문하라는 문구를 넣었다"]
      },
      {
        id: "build-pro",
        group: "제작",
        title: "AI 에이전트로 앱 구현하기",
        goal: "선택한 AI 에이전트로 작업 지시서를 실행해 PRD의 모든 기능을 동작시킨다.",
        summary: "어느 에이전트를 쓰든 흐름은 같습니다. 지시서 입력 → 코드 확인 → 미흡한 부분 재요청 → 반복.",
        reading: "이 단계에서는 앞에서 만든 작업 지시서를 실제로 AI 에이전트에 넣어 코드를 받습니다. Claude Code를 쓴다면 터미널에서 claude 명령으로 실행하고, Codex CLI는 codex 명령으로, Antigravity는 브라우저 인터페이스에서 사용합니다. 받은 코드를 브라우저로 열어 PRD의 기능을 하나씩 검증합니다. '기능 A는 동작하지만 B가 안 된다'처럼 구체적으로 재요청하는 것이 포인트입니다. 전체를 한꺼번에 수정하려 하지 말고, 기능 단위로 확인하고 맡기는 방식이 훨씬 효율적입니다.",
        terms: [
          { term: "AI 에이전트", def: "코드 생성뿐 아니라 파일 수정·실행·테스트까지 처리하는 AI 도구." },
          { term: "구현(Implementation)", def: "설계한 기능을 실제로 동작하게 코드로 만드는 과정." },
          { term: "이터레이션", def: "'지시 → 결과 확인 → 수정 요청'을 한 번 순환하는 사이클." },
          { term: "Claude Code", def: "터미널 기반 Anthropic AI 에이전트. 파일·Git·테스트를 직접 처리합니다." }
        ],
        discussion: [
          "AI가 처음 만든 코드가 기대와 다를 때, 어떻게 재요청을 구성하겠습니까?",
          "기능을 하나씩 검증하는 방식이 한꺼번에 확인하는 것보다 나은 이유는 무엇인가요?"
        ],
        steps: [
          "앞에서 선택한 AI 에이전트를 엽니다.",
          "Claude Code: 터미널에서 claude 실행 후 지시서 입력 / Codex CLI: codex '지시서' 명령 실행 / Antigravity: 브라우저 입력창에 붙여넣기",
          "코드를 받아 파일에 저장한 후 브라우저로 열어 확인합니다.",
          "PRD의 기능 목록을 하나씩 체크하며 동작을 검증합니다.",
          "동작하지 않는 기능은 'OO 기능이 작동하지 않습니다. 원인을 찾아 수정해 줘'처럼 구체적으로 재요청합니다.",
          "모든 기능이 동작하는 최종 코드를 아래에 붙여넣어 미리보기로 최종 확인합니다."
        ],
        externalGuide: "① 에이전트 선택 후 접속 ② 지시서 붙여넣기 ③ 코드 저장 → 브라우저 확인 ④ 미동작 기능 구체적 재요청 ⑤ 전 기능 동작 확인 후 완료",
        links: [
          { label: "Claude Code", url: "https://claude.ai/code" },
          { label: "Antigravity", url: "https://antigravity.dev" },
          { label: "Codex GitHub", url: "https://github.com/openai/codex" }
        ],
        practice: {
          kind: "build",
          fields: [
            { key: "builtFeatures", label: "구현한 기능 목록", placeholder: "예: ✅ 할 일 추가  ✅ 완료 체크  ✅ 삭제  ✅ 남은 개수 표시 — 각각 동작 확인 완료", chips: ["✅ 할 일 추가 — 동작 확인", "✅ 완료 체크 — 동작 확인", "✅ 삭제 — 동작 확인", "✅ 남은 개수 표시 — 동작 확인", "✅ localStorage 저장 — 동작 확인"] },
            { key: "htmlCode", label: "완성된 앱 코드 붙여넣기", placeholder: "AI 에이전트에서 받은 최종 완성 코드를 여기 붙여넣으면 아래에서 실행됩니다." }
          ]
        },
        checks: ["AI 에이전트에서 코드를 받았다", "PRD의 기능이 모두 동작한다", "미리보기로 최종 확인했다"]
      },
      {
        id: "github",
        group: "배포",
        title: "GitHub 저장소·브랜치·커밋 관리",
        goal: "Repository·Branch·Commit의 역할을 이해하고 안전하게 코드를 관리한다.",
        summary: "GitHub는 코드를 버전별로 기록하는 공간입니다. Repository는 보관함, Branch는 작업 분리선, Commit은 변경 기록 단위입니다.",
        reading: "GitHub로 코드를 관리하면 '언제 무엇을 바꿨는지' 기록이 남고, 실수해도 이전 상태로 되돌릴 수 있습니다. Repository(저장소)는 프로젝트 파일 전체를 담는 보관함이고, main 브랜치는 항상 잘 동작하는 안전한 버전을 유지하는 기본 줄기입니다. Branch(브랜치)는 main을 건드리지 않고 새 기능을 시험하는 별도 작업 공간입니다. 기능 브랜치를 만들어 작업하고, 잘 되면 main에 합칩니다(Merge). Commit은 '이 시점의 변경을 저장한다'는 기록 단위로, 메시지는 '추가 기능 구현'처럼 사람이 읽고 알 수 있게 적습니다. Push는 내 컴퓨터의 기록을 GitHub에 올리는 것이고, Pull은 GitHub의 최신 상태를 내 컴퓨터로 내려받는 것입니다. 올리기 전엔 반드시 API 키·비밀번호·개인정보가 없는지 확인하세요.",
        terms: [
          { term: "Repository(저장소)", def: "한 프로젝트의 파일 전체와 변경 기록을 담는 보관함." },
          { term: "Branch(브랜치)", def: "main을 건드리지 않고 새 기능을 만드는 별도 작업 공간." },
          { term: "Commit(커밋)", def: "특정 시점의 변경을 메시지와 함께 저장한 기록 단위." },
          { term: "Push / Pull", def: "Push는 내 컴퓨터 → GitHub, Pull은 GitHub → 내 컴퓨터." },
          { term: "Merge", def: "기능 브랜치에서 완성한 코드를 main에 합치는 일." }
        ],
        discussion: [
          "main 브랜치를 직접 수정하지 않고 별도 브랜치를 나눠 쓰면 무엇이 안전해질까요?",
          "좋은 커밋 메시지와 나쁜 커밋 메시지의 차이는 무엇일까요?"
        ],
        steps: [
          "GitHub에서 새 Repository를 만들고 이름을 정합니다.",
          "올리면 안 되는 파일을 .gitignore에 적어 둡니다(API 키 파일, 비밀번호 파일 등).",
          "새 기능을 만들 땐 main이 아닌 기능 브랜치를 만들어 작업합니다.",
          "작업이 끝날 때마다 '무엇을 바꿨는지' 알 수 있는 Commit 메시지를 적습니다.",
          "Push로 GitHub에 올리기 전, API 키·비밀번호가 없는지 다시 확인합니다.",
          "잘 동작하면 main 브랜치에 Merge합니다."
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
            { label: "feature/add-task (기능 작업 공간)", children: [
              { label: "Commit: 할 일 추가 구현" },
              { label: "Commit: 버그 수정" }
            ]}
          ]
        },
        externalGuide: "① github.com에 접속해 로그인합니다. ② 오른쪽 위 '+' → 'New repository' → 이름 입력 → 'Create repository'를 누릅니다. ③ 로컬에서 기능 브랜치를 만들고 작업 후 커밋합니다. ④ Push 전에 API 키·비밀번호·개인정보가 없는지 파일을 열어 직접 확인합니다. ⑤ Push 후 GitHub에서 파일이 정상 올라갔는지 확인합니다.",
        links: [
          { label: "GitHub 열기", url: "https://github.com" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "repoName", label: "Repository 이름", input: "text", placeholder: "예: my-todo-app" },
            { key: "branchName", label: "기능 브랜치 이름", input: "text", placeholder: "예: feature/add-task" },
            { key: "commitMsg", label: "커밋 메시지", input: "text", placeholder: "예: 할 일 추가 기능 구현" },
            { key: "beforeUpload", label: "업로드 전 확인", placeholder: "예: API 키·비밀번호·개인정보 없음, .gitignore 설정 확인" }
          ]
        },
        checks: ["Repository를 만들었다", "기능 브랜치를 사용했다", "커밋 메시지를 만들었다", "민감 정보 점검을 했다"]
      },
      {
        id: "deploy",
        group: "배포",
        title: "웹 배포 준비하기",
        goal: "웹 배포 플랫폼과 확인 기준을 정한다.",
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
            { key: "deployCheck", label: "배포 후 확인 결과", placeholder: "예: 첫 화면 정상, 추가·체크·삭제 동작, 모바일 확인 완료" },
            { key: "deployHelp", label: "배포 중 어려웠던 점 / 해결 방법", placeholder: "예: 경로 오류가 났는데 index.html 위치를 루트로 옮기니 해결됐다." }
          ]
        },
        checks: ["배포 플랫폼을 골랐다", "실제 배포 URL이 열린다", "주요 기능을 배포 URL에서 확인했다"]
      },
      {
        id: "package-choice",
        group: "배포",
        title: "웹앱과 exe 선택하기",
        goal: "내 앱에 맞는 배포 방식을 고른다.",
        summary: "모든 앱이 exe가 필요한 건 아닙니다. 먼저 웹앱으로 충분한지 판단하고, 이유를 말할 수 있어야 합니다.",
        reading: "웹앱과 exe 중 무엇을 고를지는 사용자 상황에 달려 있습니다. 웹앱은 공유가 쉽고 업데이트가 빠르지만 인터넷이 필요하고, exe는 설치형으로 전달하기 좋지만 보안 경고와 패키징 관리가 따릅니다. PyInstaller는 Python 앱을, Electron·Tauri는 웹 기술로 만든 데스크톱 앱을 exe로 묶을 때 씁니다. 가벼운 웹앱은 보통 웹 배포로 충분합니다. 무조건 exe를 목표로 삼지 말고, 고른 이유를 적어 두세요.",
        terms: [
          { term: "PyInstaller", def: "Python 프로그램을 exe로 묶어 주는 도구." },
          { term: "Electron·Tauri", def: "웹 기술로 만든 앱을 데스크톱 앱으로 묶는 도구." }
        ],
        discussion: [
          "내 앱에 exe가 꼭 필요할까요? 어떤 경우엔 필요해질까요?",
          "방식을 고른 '이유'를 적어 두면 무엇이 좋아지나요?"
        ],
        steps: [
          "앱 유형을 고릅니다.",
          "배포 방식을 선택합니다.",
          "선택 이유를 적습니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "kind", label: "앱 유형", input: "select", options: ["정적 웹앱", "Python 앱", "웹 기술 데스크톱 앱", "아직 모르겠음"], value: "정적 웹앱" },
            { key: "choice", label: "배포 방식 선택", input: "choice", value: "웹 배포", choices: [
              { value: "웹 배포", desc: "브라우저로 접속" },
              { value: "PyInstaller", desc: "Python을 exe로" },
              { value: "Electron/Tauri", desc: "웹 기술을 앱으로" }
            ] },
            { key: "reason", label: "선택 이유", placeholder: "예: 가벼운 웹앱이라 링크 공유가 가장 쉽고 업데이트도 빠르다." }
          ]
        },
        checks: ["배포 방식을 선택했다", "선택 이유를 적었다"]
      },
      {
        id: "share",
        group: "공유",
        title: "프로 결과물 공유하기",
        goal: "완성된 앱의 배포 링크와 PRD를 Padlet에 공유한다.",
        summary: "프로리그를 마친 여러분은 실제로 배포된 앱을 갖게 되었습니다. 링크·PRD 요약·도움받고 싶은 점을 함께 공유해 피드백을 받아 보세요.",
        reading: "프로 단계 공유글에는 배포된 앱 링크, PRD 요약, 구현 소감을 담습니다. 다른 사람이 링크를 열어 직접 써 보고 피드백을 줄 수 있도록 핵심을 추립니다. 앱 링크를 공유할 때는 개인정보·API 키가 코드에 없는지 먼저 확인하세요. 배포가 안 됐다면 가장 완성된 상태의 코드 스크린샷이라도 담아 공유합니다.",
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
          "공개 점검 후 Padlet에 올립니다."
        ],
        externalGuide: "공유글을 복사한 뒤 프로리그 Padlet에 직접 올리세요. 배포 링크도 함께 붙여넣으세요.",
        practice: {
          kind: "share",
          fields: [
            { key: "nickname", label: "닉네임", input: "text" },
            { key: "title", label: "앱 제목", input: "text", placeholder: "예: 내 할 일 관리 앱" },
            { key: "deployUrl", label: "배포된 앱 링크", input: "text", placeholder: "예: https://username.github.io/my-app" },
            { key: "learned", label: "배운 점" },
            { key: "help", label: "도움받고 싶은 점" }
          ]
        },
        checks: ["배포 링크가 실제로 열린다", "공유글을 만들었다", "공개 점검을 했다"]
      }
    ]
  },

  /* ============================== 마스터리그 ============================== */
  master: {
    name: "마스터리그",
    theme: "#c47800",
    label: "보안·테스트·릴리즈를 거쳐 v1.0을 공식 출시한다",
    description: "프로리그에서 만든 앱을 보안·테스트·CI/CD로 다듬고, GitHub Releases로 v1.0을 공식 출시합니다. 운영 체계까지 갖춘 앱의 완전한 출시를 경험합니다.",
    tags: ["보안·테스트", "환경변수", "GitHub Releases", "v1.0 출시"],
    padletUrl: "https://padlet.com/dungstme/_-6tfn9vwj7wv8p4f",
    pages: [
      {
        id: "setup-master",
        group: "환경 준비",
        title: "마스터 환경 준비하기",
        goal: "GitHub CLI와 Vercel/Netlify CLI를 설치하고 .env 파일 관리 환경을 갖춘다.",
        summary: "마스터는 CLI 도구로 배포·릴리즈를 자동화합니다. GitHub CLI와 배포 CLI 설치가 핵심입니다.",
        reading: "마스터리그는 보안·테스트·CI/CD·릴리즈를 다룹니다. 이를 위해 세 가지를 추가로 준비합니다. 첫째, GitHub CLI(gh)는 터미널에서 릴리즈·PR·이슈를 명령 한 줄로 처리하게 해 줍니다. 둘째, Vercel CLI 또는 Netlify CLI는 터미널에서 바로 배포하거나 환경변수를 관리할 수 있게 해 줍니다. 셋째, .env 파일은 비밀 키를 코드와 분리해 보관하는 파일입니다. Node.js가 설치돼 있어야 CLI 도구를 설치할 수 있으니, node -v 명령으로 먼저 확인합니다. 없으면 nodejs.org 에서 LTS 버전을 설치하세요.",
        terms: [
          { term: "CLI (Command Line Interface)", def: "마우스 대신 텍스트 명령으로 도구를 제어하는 방식." },
          { term: "GitHub CLI (gh)", def: "터미널에서 GitHub의 릴리즈·PR·이슈 등을 제어하는 공식 도구." },
          { term: ".env 파일", def: "API 키 같은 비밀 값을 코드 밖에 보관하는 특별한 텍스트 파일." },
          { term: "Node.js", def: "JavaScript를 브라우저 밖에서 실행하게 해 주는 런타임. npm 패키지 설치에 필요함." }
        ],
        visual: {
          type: "flow",
          caption: "마스터 환경 구성 흐름",
          steps: [
            { label: "Node.js 설치", sub: "nodejs.org (LTS)" },
            { label: "GitHub CLI 설치", sub: "gh auth login" },
            { label: "배포 CLI 설치", sub: "Vercel 또는 Netlify" },
            { label: ".env 파일 생성", sub: "비밀값 분리 관리" },
            { label: "CI/CD 설정 준비", sub: "GitHub Actions 기반" }
          ]
        },
        discussion: [
          "CLI와 GUI(클릭 방식)의 차이는 무엇이고, CLI가 편리한 상황은 언제인가요?",
          ".env 파일을 실수로 GitHub에 올리면 어떤 일이 생길까요?"
        ],
        steps: [
          "터미널에서 `node -v` 를 입력합니다. 버전이 출력되면 이미 설치된 것입니다. 없으면 nodejs.org 에서 LTS 버전을 다운로드·설치합니다.",
          "설치 후 `node -v` 와 `npm -v` 를 다시 입력해 둘 다 버전이 나오는지 확인합니다.",
          "GitHub CLI 설치: Mac은 터미널에서 `brew install gh`, Windows는 `winget install --id GitHub.cli` 를 입력합니다. (winget 없으면 cli.github.com 에서 설치 파일을 다운로드)",
          "설치 후 `gh auth login` 을 입력합니다. 'GitHub.com' 선택 → 'HTTPS' 선택 → 'Login with a web browser' 선택 후 브라우저에서 코드를 입력해 인증합니다.",
          "Vercel CLI 설치: 터미널에서 `npm install -g vercel` 을 입력합니다. 완료 후 `vercel --version` 으로 확인합니다.",
          "또는 Netlify CLI 설치: `npm install -g netlify-cli` 를 입력합니다. 완료 후 `netlify --version` 으로 확인합니다.",
          "프로젝트 폴더 안에 .env 파일을 만듭니다(터미널: `touch .env` 또는 편집기로 생성). `MY_API_KEY=여기에값` 형식으로 작성합니다.",
          "`.gitignore` 파일을 열어(없으면 생성) `.env` 한 줄을 추가합니다. 이렇게 하면 `git add` 해도 `.env`가 GitHub에 올라가지 않습니다.",
          "`gh release --help` 를 입력해 릴리즈 명령 목록이 보이면 모든 준비가 완료된 것입니다."
        ],
        externalGuide: "설치 순서: ① nodejs.org → LTS 설치 ② cli.github.com → GitHub CLI 설치 → `gh auth login` ③ `npm install -g vercel` 또는 `netlify-cli` ④ 프로젝트 폴더에 `.env` 파일 생성 후 `.gitignore`에 `.env` 추가.",
        links: [
          { label: "Node.js 다운로드", url: "https://nodejs.org" },
          { label: "GitHub CLI 설치", url: "https://cli.github.com" },
          { label: "Vercel CLI 문서", url: "https://vercel.com/docs/cli" },
          { label: "Netlify CLI 문서", url: "https://docs.netlify.com/cli/get-started/" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "nodeVersion", label: "node -v 결과", input: "text", placeholder: "예: v20.11.0", chips: ["v20.11.0 확인 완료", "v18.x.x 확인 완료"] },
            { key: "ghVersion", label: "gh --version 결과", input: "text", placeholder: "예: gh version 2.47.0", chips: ["gh version 2.x.x 확인 완료", "설치 안 됨 — 재설치 필요"] },
            { key: "deployCliChoice", label: "설치한 배포 CLI", input: "select", options: ["Vercel CLI", "Netlify CLI", "둘 다"], value: "Vercel CLI" },
            { key: "envFileNote", label: ".env 파일 생성 여부", input: "text", placeholder: "예: .env 생성 완료, .gitignore에 추가됨", chips: [".env 생성 완료, .gitignore에 추가됨", ".env 아직 미생성", ".gitignore 업데이트 완료"] }
          ]
        },
        checks: ["node -v 버전이 출력된다", "gh auth login 인증이 됐다", "배포 CLI가 설치됐다", ".env 파일을 만들고 .gitignore에 추가했다"]
      },
      {
        id: "agentic-tools",
        group: "환경 준비",
        title: "고급 AI 에이전트 도구 활용",
        goal: "Claude Code·Codex CLI·Antigravity의 작동 방식과 각 도구의 적합한 사용 상황을 구분할 수 있다.",
        summary: "마스터 단계에서는 에디터를 넘어 CLI와 자율 에이전트로 작업합니다. 도구를 이해하고 선택적으로 활용하는 것이 핵심입니다.",
        reading: "마스터리그에서는 AI 에이전트가 단순 코드 생성을 넘어 파일 관리·테스트 실행·Git 작업까지 자율적으로 처리합니다. Claude Code는 터미널에서 실행하는 Anthropic 공식 에이전트입니다. 프로젝트 파일을 직접 읽고 수정하며, 테스트를 실행하고 Git 커밋까지 처리할 수 있습니다. 복잡한 리팩터링이나 버그 추적에 특히 강합니다. OpenAI Codex CLI는 codex 명령 하나로 자연어를 코드로 바꾸거나, 기존 코드를 분석·수정합니다. Antigravity는 브라우저에서 멀티스텝 작업을 자율로 처리하는 에이전트로, 복잡한 작업 흐름을 설계해 한 번에 위임할 수 있습니다. 마스터 단계에서는 이 도구들을 보안·테스트·릴리즈 작업에 연결해서 씁니다.",
        terms: [
          { term: "Claude Code", def: "Anthropic의 터미널 기반 AI 에이전트. 파일·Git·테스트를 자율로 처리합니다. `npm install -g @anthropic-ai/claude-code` 로 설치." },
          { term: "Codex CLI", def: "OpenAI의 터미널 에이전트. `npm install -g @openai/codex` 로 설치 후 `codex '작업 내용'` 형식으로 사용." },
          { term: "Antigravity", def: "웹 기반 자율 에이전트. 복잡한 멀티스텝 작업을 브라우저에서 직접 위임할 수 있습니다." },
          { term: "자율 에이전트", def: "사람의 개입 없이 여러 단계의 작업을 순서대로 실행하는 AI 시스템." }
        ],
        visual: {
          type: "mindmap",
          caption: "마스터 AI 에이전트 활용 영역",
          center: "AI 에이전트",
          branches: [
            { label: "Claude Code", items: ["npm install -g @anthropic-ai/claude-code", "파일·Git 자율 처리", "복잡한 리팩터링·버그 추적", "보안 점검 자동화"] },
            { label: "Codex CLI", items: ["npm install -g @openai/codex", "자연어 → 코드 변환", "기존 코드 분석·수정"] },
            { label: "Antigravity", items: ["브라우저 기반, 설치 불필요", "멀티스텝 작업 위임", "antigravity.dev"] }
          ]
        },
        discussion: [
          "보안 점검, 테스트 실행, 릴리즈 준비 중 AI 에이전트에 위임할 수 있는 작업과 사람이 직접 확인해야 하는 작업은 각각 무엇인가요?",
          "Claude Code가 Git 커밋까지 자율로 처리하게 할 때 어떤 조건과 범위를 지정하겠습니까?"
        ],
        steps: [
          "Claude Code 설치: 터미널에서 `npm install -g @anthropic-ai/claude-code` 를 실행합니다.",
          "`claude --version` 으로 설치를 확인합니다.",
          "프로젝트 폴더에서 `claude` 를 실행하고 '이 프로젝트의 주요 기능을 한 줄로 설명해 줘'로 먼저 파악시킵니다.",
          "Codex CLI: `npm install -g @openai/codex` 설치 후 `codex '작업 설명'` 형식으로 사용합니다.",
          "Antigravity: antigravity.dev 접속 후 작업 흐름을 자연어로 입력해 실행합니다.",
          "각 도구로 보안 점검(민감 정보 검색)을 실제로 실행해 봅니다."
        ],
        externalGuide: "Claude Code: `npm install -g @anthropic-ai/claude-code` → `claude` 실행. Codex CLI: `npm install -g @openai/codex` → `codex '작업'`. Antigravity: antigravity.dev 접속.",
        links: [
          { label: "Claude Code 문서", url: "https://claude.ai/code" },
          { label: "Antigravity", url: "https://antigravity.dev" },
          { label: "Codex GitHub", url: "https://github.com/openai/codex" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "claudeCodeVersion", label: "claude --version 결과", input: "text", placeholder: "예: claude 1.x.x", chips: ["claude 1.x.x 확인 완료", "설치 안 됨 — 재설치 필요"] },
            { key: "primaryAgent", label: "주로 사용할 에이전트", input: "select", options: ["Claude Code", "Codex CLI", "Antigravity"], value: "Claude Code" },
            { key: "delegatedTask", label: "에이전트에 위임할 첫 작업", placeholder: "예: 프로젝트 전체에서 API 키가 하드코딩된 부분을 찾아 목록을 만들어 줘.", chips: ["API 키 하드코딩 부분 찾아 목록 만들기", "모든 파일에서 console.log 제거하기", "README.md 자동 작성하기", "테스트 실패 원인 분석하기"] }
          ]
        },
        checks: ["Claude Code 또는 Codex CLI를 설치했다", "에이전트로 프로젝트를 분석해 봤다", "위임할 작업 범위를 정의했다"]
      },
      {
        id: "release-harness",
        group: "릴리즈 설계",
        title: "릴리즈 하네스 설계",
        goal: "릴리즈 전에 통과해야 할 제어·점검 구조를 만든다.",
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
        checks: ["릴리즈 통과 기준을 적었다", "사용자 관점 확인을 넣었다"]
      },
      {
        id: "tests",
        group: "릴리즈 설계",
        title: "테스트 케이스 만들기",
        goal: "주요 기능의 테스트 케이스를 만든다.",
        summary: "테스트 케이스는 '무엇을 하면 무엇이 나와야 한다'를 적은 확인표입니다. 성공뿐 아니라 실패 상황도 적습니다.",
        reading: "테스트 케이스는 기능이 맞게 동작하는지 확인하는 문장입니다. 예를 들어 '내용을 적고 추가를 누르면 목록에 새 항목이 나타난다'처럼 행동과 기대 결과를 함께 씁니다. 마스터 단계에서는 정상 상황만이 아니라 '입력이 비어 있을 때', '같은 값을 두 번 넣을 때'처럼 실패·예외 상황도 함께 적어야 합니다. 이렇게 적어 두면 AI에게 '이 케이스들이 통과하게 고쳐 줘'라고 정확히 맡길 수 있습니다.",
        terms: [
          { term: "테스트 케이스", def: "어떤 행동을 하면 어떤 결과가 나와야 하는지 적은 확인 항목." },
          { term: "예외 상황", def: "정상이 아닌 입력이나 흐름(빈 입력, 실패 등)." }
        ],
        discussion: [
          "내 앱에서 빈 입력으로 버튼을 누르면 어떻게 동작해야 할까요?",
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
            { key: "successTest", label: "정상 동작 테스트", placeholder: "예: 내용을 적고 추가하면 목록에 보이고, 체크하면 상태가 바뀐다." },
            { key: "failTest", label: "실패·예외 테스트", placeholder: "예: 빈 입력으로 추가하면 아무것도 추가되지 않고 안내가 보인다." },
            { key: "testOrder", label: "릴리즈 전 확인 순서", input: "text", placeholder: "예: 추가 → 체크 → 삭제 → 빈 입력 순으로 확인" }
          ]
        },
        checks: ["정상 테스트를 적었다", "실패 테스트를 적었다"]
      },
      {
        id: "security",
        group: "보안",
        title: "보안 위험 찾기",
        goal: "공개하면 안 되는 정보와 위험한 흐름을 찾는다.",
        summary: "보안은 나중에 붙이는 장식이 아니라 처음부터 지켜야 할 기준입니다. 최종 확인은 사람이 직접 합니다.",
        reading: "보안 위험은 앱이 커진 뒤에만 생기는 게 아닙니다. 작은 앱도 API 키를 노출하거나 개인정보를 공개 저장소에 올리면 문제가 됩니다. 마스터 단계에서는 AI에게도 보안 점검을 맡기되, 최종 확인은 사람이 체크리스트로 직접 합니다. 앱에 로그인을 붙인다면 비밀번호 저장 방식, 남의 데이터를 볼 수 있는지 같은 위험을 미리 살펴야 합니다.",
        terms: [
          { term: "민감 정보", def: "키·비밀번호·개인정보처럼 새면 위험한 값." },
          { term: "권한 없는 접근", def: "허락받지 않은 사용자가 남의 데이터에 닿는 것." }
        ],
        visual: {
          type: "mindmap",
          caption: "보안 위험 지도",
          center: "보안 위험",
          branches: [
            { label: "민감 정보", items: ["API 키 코드 노출", "비밀번호 평문 저장", "개인정보 공개 저장소 업로드"] },
            { label: "권한 문제", items: ["다른 사용자 데이터 접근", "인증 없이 API 호출"] },
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
            { key: "sensitive", label: "민감 정보", placeholder: "예: 로그인 시 비밀번호. 코드·공개 저장소에 직접 두지 않는다." },
            { key: "permissionRisk", label: "권한 위험", placeholder: "예: 다른 사람의 데이터가 보이지 않도록 사용자별로 분리한다." },
            { key: "beforePublic", label: "공개 전 확인", input: "text", placeholder: "예: 키·비밀번호 노출 검색, 권한 분리 확인" }
          ]
        },
        checks: ["민감 정보 점검을 했다", "권한 위험을 적었다"]
      },
      {
        id: "env",
        group: "보안",
        title: "환경변수 이해하기",
        goal: "API 키를 코드 밖에서 관리하는 이유를 이해한다.",
        summary: "환경변수는 비밀 값을 코드에 직접 쓰지 않고 따로 보관하는 방법입니다.",
        reading: "환경변수는 비밀 값을 코드 밖에서 관리하는 방법입니다. API 키나 비밀번호를 코드에 직접 쓰면 GitHub나 배포 파일을 통해 노출될 수 있습니다. 배포 서비스마다 환경변수를 넣는 화면이 따로 있으니, 어떤 값이 필요한지와 어디에 등록할지를 문서로 남겨 둡니다. 앱에 외부 서비스를 붙여 키가 생기면, 그 키를 코드가 아니라 환경변수로 옮깁니다.",
        terms: [
          { term: "환경변수", def: "비밀 값을 코드 밖에 보관해 두고 불러 쓰는 설정." },
          { term: "공개 저장소", def: "누구나 볼 수 있는 GitHub 저장소. 비밀 값을 올리면 안 됨." }
        ],
        visual: {
          type: "layers",
          caption: "환경변수로 비밀값 분리",
          layers: [
            { label: "코드 (공개 저장소 OK)", desc: "로직·화면·기능 코드 — GitHub에 올릴 수 있음" },
            { label: ".env 파일 (로컬 전용)", desc: ".gitignore에 추가 필수 — 절대 업로드 금지" },
            { label: "배포 서비스 환경변수", desc: "Vercel·Netlify 설정 화면에 등록 (비공개)" },
            { label: "비밀 값 원본", desc: "API 키·비밀번호·DB 연결 정보 — 절대 코드에 넣지 않기" }
          ]
        },
        discussion: [
          "키를 코드에 직접 적으면 어떤 경로로 노출될 수 있을까요?",
          "환경변수로 옮기면 무엇이 안전해지나요?"
        ],
        steps: [
          "환경변수 이름을 정합니다.",
          "코드에 쓰면 안 되는 값을 구분합니다.",
          "배포 서비스 입력 위치를 확인합니다."
        ],
        externalGuide: "① 아래 배포 서비스 링크를 엽니다. ② Vercel: 프로젝트 선택 → Settings → Environment Variables → 이름·값 입력 → Save. Netlify: Site configuration → Environment variables → Add a variable → 이름·값 입력 → Save. ③ 코드에서는 process.env.변수이름 또는 import.meta.env.변수이름으로 읽습니다. ④ 배포를 다시 실행해 환경변수가 적용됐는지 확인합니다.",
        links: [
          { label: "Vercel 환경변수 설정", url: "https://vercel.com/dashboard" },
          { label: "Netlify 환경변수 설정", url: "https://app.netlify.com" }
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "envName", label: "환경변수 이름", input: "text", placeholder: "예: MY_API_KEY" },
            { key: "secretValue", label: "코드에 쓰면 안 되는 값", input: "text", placeholder: "예: 외부 서비스 API 키" },
            { key: "deployLocation", label: "배포 서비스 입력 위치 메모", input: "text", placeholder: "예: Vercel → Settings → Environment Variables" }
          ]
        },
        checks: ["환경변수 항목을 정했다", "공개 금지 값을 구분했다"]
      },
      {
        id: "auth",
        group: "보안",
        title: "인증과 권한",
        goal: "로그인과 권한의 차이를 설명한다.",
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
            { key: "roles", label: "사용자 역할", input: "text", placeholder: "예: 일반 사용자, 관리자" },
            { key: "rolePermissions", label: "역할별 권한", placeholder: "예: 일반 - 자기 데이터만 보기·수정 / 관리자 - 사용자 관리" },
            { key: "hiddenData", label: "보면 안 되는 데이터", input: "text", placeholder: "예: 다른 사용자의 데이터" }
          ]
        },
        checks: ["사용자 역할을 정했다", "권한 규칙을 적었다"]
      },
      {
        id: "prd-release",
        group: "운영형 PRD",
        title: "운영형 PRD 작성하기",
        goal: "릴리즈와 운영까지 포함한 PRD를 만든다.",
        summary: "운영형 PRD는 기능뿐 아니라 보안·테스트·배포·릴리즈·운영 기준까지 담는 문서입니다.",
        reading: "운영형 PRD는 '무엇을 만들지'를 넘어 '어떻게 안전하게 내보내고 계속 운영할지'까지 담습니다. 보안 기준, 통과할 테스트, 배포 방식, 릴리즈 조건, 운영 점검을 함께 적습니다. 이것은 AI에게 기능 구현만이 아니라 운영까지 고려한 작업을 맡기는 기준 문서입니다. 지금까지 마스터리그에서 내 앱에 대해 점검한 내용을 한곳에 모으면 운영형 PRD가 됩니다.",
        terms: [
          { term: "운영형 PRD", def: "기능에 더해 보안·테스트·배포·운영 기준까지 담은 설명서." },
          { term: "운영", def: "배포 후에도 앱이 문제없이 쓰이도록 살피는 일." }
        ],
        discussion: [
          "기능 PRD와 운영형 PRD의 가장 큰 차이는 무엇일까요?",
          "내 앱을 진짜 서비스로 운영한다면 무엇을 더 적어야 할까요?"
        ],
        steps: [
          "목표와 범위를 적습니다.",
          "보안·테스트·릴리즈 기준을 적습니다.",
          "운영 체크리스트를 만듭니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "scope", label: "목표와 범위", placeholder: "예: 내 앱을 로그인 포함해 안전하게 배포·운영한다." },
            { key: "roles", label: "사용자 역할", input: "text", placeholder: "예: 일반 사용자, 관리자" },
            { key: "flow", label: "핵심 플로우", placeholder: "예: 로그인 → 추가 → 체크 → 확인" },
            { key: "priority", label: "기능 우선순위", placeholder: "예: 필수 - 추가·체크·삭제 / 다음 - 로그인·동기화" },
            { key: "exceptions", label: "예외 상황", placeholder: "예: 네트워크 실패, 빈 입력, 중복 추가" },
            { key: "security", label: "보안 요구사항", placeholder: "예: 비밀번호는 환경변수·안전 저장, 사용자별 데이터 분리" },
            { key: "tests", label: "테스트 기준", placeholder: "예: 추가·체크·삭제·빈 입력 케이스 통과" },
            { key: "deploy", label: "배포·패키징 기준", input: "text", placeholder: "예: 웹 배포, 링크 접속·모바일 확인" },
            { key: "release", label: "릴리즈 기준", placeholder: "예: 테스트·보안 통과 후 릴리즈 노트와 함께 공개" },
            { key: "ops", label: "운영 체크리스트", placeholder: "예: 오류 보고 확인, 업데이트 주기, 보안 재점검" }
          ]
        },
        checks: ["보안 요구사항을 넣었다", "테스트 기준을 넣었다", "릴리즈 기준을 넣었다"]
      },
      {
        id: "deploy-check",
        group: "배포·점검",
        title: "배포 URL 점검하기",
        goal: "사용자 관점에서 배포 URL을 확인한다.",
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
        checks: ["배포 URL을 기록했다", "사용자 관점 확인을 했다"]
      },
      {
        id: "logs",
        group: "배포·점검",
        title: "로그와 에러 보고",
        goal: "문제가 생겼을 때 AI에게 줄 정보를 정리한다.",
        summary: "'안 돼요' 대신 언제·어디서·무엇을 눌렀고 어떤 메시지가 나왔는지를 묶어야 원인을 좁힐 수 있습니다.",
        reading: "로그는 앱이 남기는 상황 기록이고, 에러 보고는 문제를 해결하기 위한 Context입니다. 그냥 '안 돼요'라고 하면 AI도 사람도 어디부터 봐야 할지 모릅니다. 언제, 어디서, 무엇을 눌렀고, 어떤 메시지가 나왔는지를 묶어야 원인을 좁힐 수 있습니다. 예를 들어 '추가 버튼을 눌렀을 때 화면 하단에 빨간 메시지가 떴다'처럼 적어 두는 식입니다.",
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
            { key: "errorSituation", label: "에러 상황", placeholder: "예: 추가 버튼을 눌렀는데 목록에 아무것도 안 나타난다." },
            { key: "logItems", label: "로그에서 볼 항목", input: "text", placeholder: "예: 언제, 어떤 버튼, 화면에 뜬 메시지, 콘솔 빨간 글자" },
            { key: "reportSentence", label: "AI에게 줄 보고 문장", placeholder: "예: 오후 3시, 추가 버튼을 누르자 목록이 안 바뀌고 콘솔에 '...' 메시지가 떴습니다. 원인을 좁혀 주세요." }
          ]
        },
        checks: ["에러 보고 템플릿을 만들었다", "로그에서 볼 항목을 적었다"]
      },
      {
        id: "cicd",
        group: "배포·점검",
        title: "CI/CD 쉽게 이해하기",
        goal: "자동 검사와 자동 배포의 흐름을 이해한다.",
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
        checks: ["CI 단계를 적었다", "CD 단계를 적었다"]
      },
      {
        id: "exe",
        group: "패키징·릴리즈",
        title: "exe 패키징 준비",
        goal: "exe 배포 전 필요한 정보를 정리한다.",
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
        checks: ["exe 파일명을 정했다", "보안 경고 안내를 적었다"]
      },
      {
        id: "releases",
        group: "패키징·릴리즈",
        title: "GitHub Releases 안내문",
        goal: "사용자에게 보여 줄 릴리즈 안내문을 작성한다.",
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
            { key: "removeInternal", label: "내부 정보 제거 확인", input: "text", placeholder: "예: 커밋 해시·내부 URL 없음 확인" }
          ]
        },
        checks: ["릴리즈 노트를 작성했다", "다운로드 안내를 넣었다"]
      },
      {
        id: "warning",
        group: "패키징·릴리즈",
        title: "Windows 보안 경고 안내",
        goal: "다운로드 경고가 뜰 때 줄 사용자 안내문을 만든다.",
        summary: "Windows는 낯선 exe에 경고를 띄웁니다. '무시하세요' 대신 출처와 이름을 확인하도록 안내합니다.",
        reading: "Windows는 낯선 실행 파일에서 보안 경고를 자주 띄웁니다. '그냥 무시하라'고만 하면 사용자가 불안해하거나, 진짜 위험한 파일까지 무심코 실행하게 됩니다. 대신 파일 출처, 파일명, 다운로드 위치를 확인하고 실행하도록 안내해야 합니다. 예를 들어 '이 파일은 우리 GitHub Releases에서 받은 파일이 맞는지 확인하세요'처럼 적습니다.",
        terms: [
          { term: "보안 경고", def: "출처가 확인되지 않은 파일에 운영체제가 띄우는 알림." },
          { term: "출처 확인", def: "파일이 믿을 만한 곳에서 왔는지 확인하는 일." }
        ],
        discussion: [
          "'무시하고 실행하세요'라고만 안내하면 어떤 문제가 생길까요?",
          "사용자가 안심하면서도 안전하게 실행하게 하려면 무엇을 알려 줘야 할까요?"
        ],
        steps: [
          "경고가 뜨는 이유를 설명합니다.",
          "출처 확인 문구를 적습니다.",
          "실행 전 확인할 것을 적습니다."
        ],
        practice: {
          kind: "form",
          fields: [
            { key: "warnReason", label: "경고가 뜨는 이유", placeholder: "예: Windows가 아직 널리 알려지지 않은 파일을 자동으로 신뢰하지 않기 때문입니다." },
            { key: "sourceCheck", label: "출처 확인 문구", placeholder: "예: 이 파일이 우리 GitHub Releases에서 받은 파일이 맞는지 확인하세요." },
            { key: "beforeRun", label: "실행 전 확인할 것", input: "text", placeholder: "예: 파일명, 다운로드 위치, 버전" }
          ]
        },
        checks: ["경고 안내문을 만들었다", "출처 확인 문구를 넣었다"]
      },
      {
        id: "ops",
        group: "운영",
        title: "운영 체크리스트 만들기",
        goal: "릴리즈 이후에도 확인할 운영 항목을 만든다.",
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
            { key: "opsChecklist", label: "운영 체크 항목", placeholder: "예: 주 1회 오류 보고 확인, 월 1회 보안 재점검, 사용자 피드백 모으기" },
            { key: "updateCriteria", label: "업데이트 기준", input: "text", placeholder: "예: 같은 오류가 반복되거나 요청이 쌓이면 업데이트" },
            { key: "inquiryResponse", label: "사용자 문의 대응", placeholder: "예: 문의 창구를 정하고, 받은 문의를 에러 보고 형식으로 정리한다." }
          ]
        },
        checks: ["운영 체크리스트를 만들었다", "업데이트 기준을 적었다"]
      },
      {
        id: "share",
        group: "운영",
        title: "마스터 결과물 공유하기",
        goal: "v1.0으로 공식 릴리즈된 앱 링크와 운영형 PRD를 Padlet에 공유한다.",
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
            { key: "title", label: "앱 제목 · 버전", input: "text", placeholder: "예: 할 일 관리 앱 v1.0" },
            { key: "deployUrl", label: "v1.0 배포 링크 또는 GitHub Releases URL", input: "text", placeholder: "예: https://username.github.io/my-app  또는  https://github.com/user/repo/releases/tag/v1.0" },
            { key: "learned", label: "배운 점 · 회고" },
            { key: "help", label: "도움받고 싶은 점" }
          ]
        },
        checks: ["v1.0 배포 링크가 실제로 열린다", "공유글을 만들었다", "공개 점검을 했다"]
      }
    ]
  }
};
