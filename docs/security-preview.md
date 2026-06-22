# 코드 미리보기 보안 (Code Preview Security)

AI가 생성한 HTML·JavaScript를 학습자가 앱 안에서 실행해 보는 "빌드 미리보기"의 보안 설계.

## 적용한 격리

빌드 미리보기 iframe(`#miniPreview`, `practice.kind === "build"`):

```html
<iframe sandbox="allow-scripts" allow="" referrerpolicy="no-referrer" ...></iframe>
```

- `srcdoc`로 코드 주입(외부 URL 로드 없음).
- `sandbox="allow-scripts"`만 허용 → **`allow-same-origin` 제외**. 미리보기는 고유 불투명 출처에서 실행되어 부모 앱의 `document`·`localStorage`·쿠키에 접근할 수 없다.
- `allow-popups`·`allow-downloads` 미허용 → 팝업·강제 다운로드 차단.
- `allow=""` → 카메라·마이크·위치 등 권한 기능 차단.
- `referrerpolicy="no-referrer"` → 리퍼러 유출 방지.
- 입력이 바뀔 때마다 `srcdoc`를 교체하므로 이전 실행 문맥은 폐기된다. "미리보기 중지" 버튼으로 빈 화면으로 되돌릴 수 있다.

## 정적 민감정보 경고

`detectSensitiveStrings(code)`가 다음 패턴을 검사해 경고 배너를 띄운다(실행은 막지 않음, **확정이 아닌 점검 안내**):

- `AIza…`(Google API 키), `sk-…`(OpenAI), `ghp_…`(GitHub), `xoxb-…`(Slack)
- `SUPABASE_SERVICE_ROLE`, `client_secret`, 코드에 박힌 `apiKey: "..."`

목적: 학습자가 키를 브라우저 코드에 두고 배포·공유하는 사고를 예방.

## 남은 한계 (주석으로도 표기)

- `allow-scripts` 환경에서도 무한 루프 등 자원 과다 사용은 완전히 막을 수 없다 → 사용자가 탭을 닫거나 ‘미리보기 중지’로 대응.
- 정적 문자열 분석은 난독화·동적 조립된 키를 탐지하지 못한다(오탐·미탐 가능). 어디까지나 보조 경고다.
- 인쇄용 `#printFrame`은 **완전히 이스케이프된** 포트폴리오 HTML만 주입하므로(스크립트 없음) 동일 출처로 두어 `print()`를 호출한다. 사용자 코드를 이 프레임에 넣지 않는다.
