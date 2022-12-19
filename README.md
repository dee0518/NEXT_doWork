# NEXT_doWork

<img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/-react-61DAFB?style=flat&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/redux-764ABC?style=flat&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/-styled--components-DB7093?style=flat&logo=styledComponents&logoColor=white">

<br>

## 소개

doWork는 협업을 위해 스케쥴을 관리할 수 있는 서비스로 맨 처음 React로만 개발되어있었다. 하지만 점차 서비스를 확장해나가고 진짜 서비스를 한다는 생각으로 docs와 소개 웹페이지가 필요하다가 느껴고 SEO 최적화를 위해 SSR 방식의 Next.js를 사용하고자 한다. 또한 CSR과 SSR을 유동적으로 선택하여 사용할 수 있기 때문에 SEO가 필요없는 서비스 부분에서는 CSR로 개발하고자 한다.

<br>

## Issue & Solve === 배운점

1. Portal 생성시 `document is not defined`문제

- 원인
  1. Next.js는 SSR로 pre-rendering되면서 클라이언트의 document를 모르기 때문.
  2. pre-rendering된 React tree와 브라우저에서 Rendering하는 동안 Rendering된 React tree과 mismatch됐기 때문.
- 해결 방법 : DOM mount된 이후에 useEffect로 element 상태를 바꿔 createPortal하도록 함.

🧷 [해당 문제 블로그가기](https://velog.io/@dee0518/Next.js-react-hydration-error)

2. Typescript Generic 적용

- 원인 : 제네릭 extends 하는 타입에 id가 없어 해당 키를 못 찾음 (잘못된 타입을 extends 함)
- 해결 : 제네릭 extends를 적절하고 명확한 것으로 타입 지정.
  🧷 [해당 문제 블로그가기](https://velog.io/@dee0518/Typescript-%EA%B8%B0%EC%B4%88-%EB%8B%A4%EC%A7%80%EA%B8%B0-4)
