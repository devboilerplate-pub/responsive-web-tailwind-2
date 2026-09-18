# 레시피 아카이브 (Recipe Archive)

매거진 느낌의 에디토리얼 디자인을 적용한 아름다운 정적(Static) 요리 아카이브 웹사이트입니다.
HTML, Tailwind CSS, 그리고 바닐라 JavaScript(Vanilla JS)의 조합을 학습하기 위한 초보자용 프로젝트로 제작되었습니다.

최근 성능 최적화를 위해 **Tailwind CSS CDN 방식에서 Node.js 기반 빌드 환경으로 성공적으로 마이그레이션** 되었습니다.

## 주요 기능

- **에디토리얼 디자인 (Editorial Design)**: 비대칭 그리드 레이아웃, 잡지 스타일 타이포그래피, 그리고 따뜻한 색감을 사용했습니다.
- **다이내믹 그리드 (Dynamic Grid)**: 바닐라 JS 로직을 사용하여 단조로운 3열 레이아웃을 피하고, 각 레시피 카드마다 다양한 크기와 비율을 자동으로 할당하여 매거진 스타일을 유지합니다.
- **필터링 및 검색**: 카테고리 탭을 통해 레시피를 필터링하거나, 검색창을 열어 제목과 재료를 검색할 수 있습니다.
- **즐겨찾기 (Favorites)**: 좋아하는 레시피를 저장할 수 있습니다. (Local Storage를 사용하여 브라우저를 닫아도 유지됩니다.)
- **레시피 상세 모달 (Modal)**: 화면 우측에서 부드럽게 열리는 전체 화면 모달을 통해 데스크톱에서는 2단(재료/조리법) 레이아웃으로, 모바일에서는 순차적인 레이아웃으로 우아하게 레시피를 확인할 수 있습니다.

## 사용된 기술

- **HTML5**: 시맨틱 태그 구조 및 단일 페이지(Single Page) 레이아웃 적용.
- **Tailwind CSS (NPM Build)**: 성능 최적화를 위해 직접 빌드 파이프라인을 구축하여 프로젝트에서 실제로 사용된 클래스만 포함된 가벼운 CSS를 생성합니다.
- **바닐라 JavaScript (Vanilla JS)**: 외부 라이브러리 없이 DOM 조작, 이벤트 핸들링, 정렬 기능, 상태 관리를 직접 구현.

## 로컬 실행 및 개발 방법

프로젝트에 최적화된 Tailwind CSS 빌드 환경이 적용되어 있으므로 Node.js가 필요합니다.

1. 이 저장소(Repository)를 클론(Clone)하거나 다운로드합니다.
2. 터미널에서 패키지를 설치합니다: `npm install`
3. CSS를 빌드합니다: `npm run build:css` (개발 중 실시간 컴파일을 원한다면 `npm run watch:css`를 켜둡니다.)
4. 브라우저에서 `index.html` 파일을 직접 열거나, VS Code의 "Live Server" 확장 프로그램을 통해 확인합니다.

## Vercel 배포 방법

Vercel 플랫폼 환경에 완벽하게 호환되며 추가 설정 없이도 자동화된 배포가 가능합니다. (`vercel.json` 및 `build` 스크립트가 이미 세팅되어 있습니다.)

1. 코드를 본인의 GitHub 저장소에 푸시(Push)합니다.
2. [Vercel](https://vercel.com/)에 로그인한 뒤 **Add New Project**를 클릭하여 GitHub 저장소를 임포트(Import)합니다.
3. Vercel이 자동으로 `package.json` 안의 `build` 명령어를 감지합니다.
4. **Deploy** 버튼을 클릭합니다. 몇 십 초 내에 Tailwind CSS가 클라우드에서 빌드된 뒤 웹사이트가 정적으로 배포됩니다.

## 폴더 구조

```
/
├─ index.html           # 메인 HTML 파일
├─ package.json         # npm 의존성 및 빌드 스크립트 정의
├─ tailwind.config.js   # 커스텀 색상/폰트 등 Tailwind 테마 설정
├─ vercel.json          # Vercel 라우팅(Clean URLs 등) 최적화 설정
├─ css/
│  ├─ input.css         # Tailwind 지시어 및 커스텀 스타일 원본
│  └─ output.css        # 빌드되어 브라우저에 서빙되는 최종 CSS (Git 반영 여부 선택)
├─ js/
│  ├─ data.js           # 12개의 샘플 요리 데이터가 들어있는 배열
│  └─ main.js           # 그리드 렌더링, 모달 제어, 필터링 등 핵심 자바스크립트 로직
├─ images/              # 프로젝트 내에서 사용되는 로컬 이미지 에셋들 모음
├─ docs/                # 프로젝트 분석, 배포 가이드, 에셋 등 각종 문서 폴더
└─ README.md            # 프로젝트 설명서 (현재 파일)
```
