# TourGoo(투어고~)

한국관광공사 TourAPI 기반 대한민국 여행정보 정적 웹앱입니다.

## 주요 기능

- 17개 시도 선택
- 시군구 필터
- 관광지 / 맛집 / 문화시설 / 축제행사 / 숙박 / 둘레길 / 레포츠 필터
- 장소 카드 목록
- 상세 화면
- 카카오맵 / 네이버지도 링크
- 모바일 반응형
- GitHub Pages 배포 가능

## 사용 방법

1. 공공데이터포털에서 한국관광공사 TourAPI 서비스키를 발급받습니다.
2. `js/config.js` 파일을 엽니다.
3. 아래 값을 본인 키로 변경합니다.

```javascript
const SERVICE_KEY = "여기에_본인_한국관광공사_TourAPI_서비스키";
```

4. `index.html`을 브라우저에서 실행합니다.

## GitHub Pages 배포

```bash
git init
git add .
git commit -m "Initial TourGoo project"
git branch -M main
git remote add origin https://github.com/본인아이디/TourGoo.git
git push -u origin main
```

GitHub 저장소에서:

```text
Settings → Pages → Branch: main → /root → Save
```

배포 주소:

```text
https://본인아이디.github.io/TourGoo/
```

## 참고

GitHub Pages는 정적 웹사이트라 JavaScript에 API 키가 노출됩니다. 포트폴리오나 개인 테스트 용도에는 사용할 수 있지만, 실서비스에서는 별도 백엔드 프록시 서버를 두는 방식을 권장합니다.
