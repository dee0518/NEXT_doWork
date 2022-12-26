# Next_doWork

<img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/-react-61DAFB?style=flat&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/redux-764ABC?style=flat&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/-styled--components-DB7093?style=flat&logo=styledComponents&logoColor=white">

<br>

## 소개

doWork는 협업을 위해 스케쥴을 관리할 수 있는 서비스로 맨 처음 React로만 개발되어있었다. 하지만 점차 서비스를 확장해나가고 진짜 서비스를 한다는 생각으로 docs와 소개 웹페이지가 필요하다가 느껴고 SEO 최적화를 위해 SSR 방식의 Next.js를 사용하고자 한다. 또한 CSR과 SSR을 유동적으로 선택하여 사용할 수 있기 때문에 SEO가 필요없는 서비스 부분에서는 CSR로 개발하고자 한다.

<br>

## 기획

- 브레인 스토밍

![doWorkBrain](https://user-images.githubusercontent.com/92196967/202966960-321eff7a-012d-443c-9e1a-e53c7881b850.png)

- navigation

- Process Flow

![doWorkFlow](https://user-images.githubusercontent.com/92196967/202952939-79eb0769-8bba-4759-9071-19644c2cbf3d.png)

- 디자인 : [doWork Figma](https://www.figma.com/file/sMXTsGVLePYJwoEsA1e26n/doWork?node-id=0%3A1&t=GqktNgDIHzG0dZMa-0)

<br>

### 주요 기능

- 홈
- 로그인 / 회원가입
- 메인
  - 일정 검색
  - 타임라인
  - status 필터
  - 캘린더
  - 일정 CRUD
- 마이페이지
  - 사용자 CRUD
- 404

<br>

## Folder Structure

```
📁 Next_doWork/
├── 📁 public/
|    └── 📁 images/
├── 📁 src/
|    ├── 📁 components/
|    ├── 📁 constants/
|    ├── 📁 hooks/
|    ├── 📁 pages/
|    ├── 📁 redux/
|    ├── 📁 styles/
|    ├── 📁 types/
|    └── 📁 utils/
├── ⚙️ ts.confing.json
├── ⚙️ next.confing.js
└── 📦 package.json
```

<br>

## Issue & Solve === 배운점

1. Portal 생성시 `document is not defined`문제

- 원인
  1. Next.js는 SSR로 pre-rendering되면서 클라이언트의 document를 모르기 때문.
  2. pre-rendering된 React tree와 브라우저에서 Rendering하는 동안 Rendering된 React tree과 mismatch됐기 때문.
- 해결 방법 : DOM mount된 이후에 useEffect로 element 상태를 바꿔 createPortal하도록 함. <br>
  🧷 [해당 문제 블로그가기](https://velog.io/@dee0518/Next.js-react-hydration-error)

<br>

2. Typescript Generic 적용

- 원인 : 제네릭 extends 하는 타입에 id가 없어 해당 키를 못 찾음 (제약조건을 상속으로 잘못 이해)
- 해결 : 제네릭 extends를 적절하고 명확한 것으로 타입 지정. <br>
  🧷 [해당 문제 블로그가기](https://velog.io/@dee0518/Typescript-%EA%B8%B0%EC%B4%88-%EB%8B%A4%EC%A7%80%EA%B8%B0-4)

<br>

3. Typescript

```
A spread argument must either have a tuple type or be passed to a rest parameter.ts(2556)
// const tuple = userInfo.map(info => ({ [info.id]: info.value }));
    // const data = Object.assign(...tuple);
```

<br>

4. Next-auth 및 MongoDB

- Next-auth가 필요한 이유
- MongDB 연결
  🧷 [해당 문제 블로그가기] (https://velog.io/@dee0518/Next.js-MongoDB-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85)

<br>

5. 암호화

<br>

## 회고

Next_doWork 회고록 가기
