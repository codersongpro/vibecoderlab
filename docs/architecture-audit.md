# VibeCoder Lab — 구조 점검 (Architecture Audit)

> 고도화 작업의 기준 문서. 코드를 근거로 작성하며, 추측은 포함하지 않는다.

## 1. 파일별 역할

| 파일 | 역할 |
|---|---|
| `index.html` | 화면 골격(헤더·사이드바·강의 영역·결과물 저장소·발표 오버레이·온보딩·인쇄 iframe) |
| `styles.css` | 디자인 토큰(CSS 변수), 카드·진행률·발표 모드·고도화 컴포넌트 스타일, 반응형 |
| `content.js` | 단일 콘텐츠 출처. `const COURSE = { rookie, pro, master }`. 강의 데이터만 담는다 |
| `app.js` | 렌더링 엔진 + 상태 저장. `COURSE`만 읽어 화면을 그린다 |
| `docs/` | 점검·테스트·보안 문서 |

빌드 단계·번들러·npm 의존성 없음. 정적 파일을 그대로 브라우저에서 실행하며 Vercel로 배포한다(`vercel.json`).

## 2. 주요 전역 변수 (app.js)

- `storeKey = "vibecoder-lab-redesign-v2"` — localStorage 키
- `state` — 전체 학습 상태 객체
- `activeLevel` / `activePage` — 현재 리그·강의(재방문 시 저장값에서 복원)
- `presSlides` / `presIdx` / `presNotesVisible` — 발표 모드 상태
- `SENSITIVE_PATTERNS` — 코드 미리보기 민감정보 탐지 패턴
- `APP_VERSION` — 백업 파일에 기록하는 앱 버전

## 3. 상태 데이터 구조 (localStorage)

```jsonc
{
  "activeLevel": "rookie",
  "activePage": 2,
  "onboarded": true,
  "levels": {
    "rookie": { "pages": {
      "vibe": { "fields": { "appIdea": "..." }, "checks": { "0": true }, "complete": false }
    } },
    "pro": { "pages": {} },
    "master": { "pages": {} }
  }
}
```

- 스키마는 **필드 추가만**으로 확장한다(하위호환 유지). 키는 변경하지 않는다.
- 백업 파일 형식: `{ schemaVersion, appVersion, exportedAt, data: <위 state> }`.

## 4. 핵심 함수 흐름

- 렌더 파이프라인: `render()` → `renderLevels` · `renderPages` · `renderHeader`(+`renderLevelGraduation`) · `renderLesson`(+`renderLessonMeta`) · `renderPractice` · `renderChecks` · `renderNotebook` · `renderHelp` · `saveState`
- 상태 접근자: `level()` · `courseState()` · `currentPage()` · `pageState()` · `field()/setField()` · `clampPage()`
- 실습 입력: `practiceHtml`/`fieldHtml` → `bindPractice` → `updatePreview`/`updateResult`
- 결과물: `renderNotebook` · `buildShareText` · `summarizePrd`
- 백업/포트폴리오: `exportProgressFile`/`importProgressFile`, `collectPortfolioData`/`buildPortfolioMarkdown`/`buildPortfolioHtml`/`printPortfolio`, `downloadTextFile`
- 캡스톤: `findDeployUrl`/`renderCapstoneSummary`(리그 `capstone` 필드 + 저장된 `deployUrl` 입력이 있을 때만 결과물 저장소 최상단에 노출)
- 진행 코드(기기 이동): `exportProgressCode`/`importProgressCode`
- 발표 모드: `buildSlides` · `renderPresSlide` · `renderPresNotes` · `enterPresentation`/`exitPresentation` · `handlePresKey`
- 도움: `renderHelp`(상황별 AI 프롬프트 생성)

## 5. 사용자 입력 처리

- 입력은 `data-field`/`data-chip-field`/`data-choice-field`/`data-share-check`로 위임 바인딩.
- 출력 시 `escapeHtml`로 이스케이프. 인라인 코드(`` `명령` ``)만 `renderText`로 복사 가능한 `<code>`로 변환.

## 6. 동적 HTML 실행(미리보기) 보안

- 빌드 미리보기 iframe: `sandbox="allow-scripts"`(동일 출처 제외), `allow=""`, `referrerpolicy="no-referrer"`, `srcdoc` 사용 → 부모 앱의 DOM·localStorage 접근 차단.
- 입력 코드에 대해 `detectSensitiveStrings`로 API 키 의심 문자열 정적 경고. "미리보기 중지" 버튼 제공.
- 인쇄용 `#printFrame`은 **완전 이스케이프된** 포트폴리오 HTML만 주입(스크립트 없음)하므로 동일 출처로 두어 `print()` 호출.
- 자세한 내용: `docs/security-preview.md`.

## 7. 위험도 높은 변경 지점 / 리팩터링 우선순위

1. `state` 스키마: 키 변경 금지, 필드 추가만(데이터 소실 위험).
2. `render()` 호출 순서: 의존 관계 있음(상태 → 화면). 함수 추가는 파이프라인 끝/적절 위치에.
3. `app.js` 줄바꿈: 원본이 혼재(CRLF/LF). 편집 후 줄바꿈 보존에 유의(불필요한 대량 diff 방지).
4. 발표 모드 슬라이드 증가: practice/checks 추가로 슬라이드 수↑.
5. 미리보기 sandbox 완화 금지(`allow-same-origin` 재도입 시 취약).
