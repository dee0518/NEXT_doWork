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

- Process Flow

![doWorkFlow](https://user-images.githubusercontent.com/92196967/202952939-79eb0769-8bba-4759-9071-19644c2cbf3d.png)

- 디자인 : [doWork Figma](https://www.figma.com/file/sMXTsGVLePYJwoEsA1e26n/doWork?node-id=0%3A1&t=GqktNgDIHzG0dZMa-0)
- BDD : [doWork BDD 문서](https://docs.google.com/spreadsheets/d/1oldLpVJ2_0xkzbPWXVMnKgdTrgSqNU7gfqFhD9IPoQw/edit#gid=0)

<br>

### 주요 기능

- [홈](./src/pages/index.tsx)
- [로그인 & 회원가입 hooks](./src/hooks/useAuth.ts)
- [Next-auth 코드](./src/pages/api/auth/[...nextauth].ts)
- [메인](./src/pages/main.tsx)
  - [일정 검색](./src/components/Scheudle/ScheduleMain.tsx)
  - [status 필터](./src/components/Scheudle/StatusFilter.tsx)
  - [캘린더](./src/components/Calendar)
  - [타임라인](./src/components/Calendar/TimeLine.tsx)
  - [일정 추가, 수정 hooks](./src/hooks/useEditedScheduleModal.ts)
  - [일정 조회, 삭제](./src/components/Scheudle/ScheduleDetailModal.tsx)
- [마이페이지](./src/pages/mypage/index.tsx)
  - [사용자 정보 수정](./src/components/mypage/MypageEditForm.tsx)
  - [사용자 비밀번호 수정](./src/components/mypage/MypageChangePw.tsx)
  - [사용자 탈퇴](./src/components/mypage/MypageDeleteForm.tsx)
- [404](./src/pages/404.tsx)

<br>

## Folder Structure

```
📁 Next_doWork/
├── 📁 public/
|    └── 📁 images/
├── 📁 src/
|    ├── 📁 components/
|    ├── 📁 constants/
|    ├── 📁 lib/
|    ├── 📁 database/
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

3. Next-auth 및 MongoDB

- Next-auth를 쓴 이유
  Next.js에서 소셜 로그인 기능을 쉽게 연결할 수 있게 해준다. 또한 JWT를 발급하여 자동으로 쿠키에 저장해주는 로그인 인증 방식을 사용하여 세션 체크하기가 간편하여 사용하게 되었다.
- 인증 방식
JWT와 OAuth에 관한 내용을 연결하는 방법에 대해서 맛보기 정도로만 알고 있었다. 하지만 Next-auth를 쓰면서 어떤 식으로 동작해야하는지를 알 필요가 있었고 이에 대해 블로그로 정리를 해보았다.
  🧷 [인증 방식관련 내용 블로그가기](https://velog.io/@dee0518/%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%9D%B8%EC%A6%9D-%EB%B0%A9%EC%8B%9D)
- Next-auth & MongDB 연결 <br>
  🧷 [해당 문제 블로그가기](https://velog.io/@dee0518/Next.js-MongoDB-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85)

<br>

4. 타임라인 기능 구현
- 고민 : view를 그리기 위해 어떻게 데이터를 가공할 것인가.
- 방안 : 하루씩 데이터 구성 vs 주마다 데이터 구성 
    1. 1 번째 방안의 경우 일자마다 배열을 생성하다 보니 2 번째 주마다 배열을 생성하는 것보다 많은 배열로 데이터를 들고 있어야 한다.
    2. top 위치를 조정하기 위해 현재 같은 top값을 가진 일정이 있는지 확인을 해야한다. 이 때 2번째 방안은 해당 주의 배열만 체크를 하면 되지만 1번째 방안은 모든 일짜를 체크해야되는 경우가 생긴다.
    
    ![생각 다이어그램](https://user-images.githubusercontent.com/92196967/211206259-4049fc69-2114-44a3-86df-f4507d2ff1ec.png)
- 채택 : 적은 배열을 체크하여 복잡도가 줄 것이라 예상되는 2번째 방안을 선택.
- 구현
  - view를 그리기 위해 left, top, width값의 데이터가 필요.
  - 이에 각 일정이 주마다 시작하는 start와 끝나는 end를 구하여 저장. => left는 start가 되고 width는 end - start로 구할 수 있음.
  - top은 한 날짜에 총 5개의 일정을 보여줄 수 있으므로 해당 주의 top이 겹치는 부분이 있는지 확인하여 standard 배열에서 제거. 그 후 가장 첫번째 요소가 해당 일정의 top의 위치가 됨.
```javascript 
while (gapDay >= 0 && startWeekIdx < timeTable.length) {
      const start = isStarted ? fDay : 0;
      const end = isStarted ? (fDay + gapDay > 6 ? 6 : fDay + gapDay) : gapDay < 7 ? gapDay : 6;
      const standard = [0, 1, 2, 3, 4];

      timeTable[startWeekIdx].forEach(t => {
        if (!(t.start > end || t.end < start)) standard.splice(standard.indexOf(t.top), 1);
      });

      const top = standard[0] === undefined ? 5 : standard[0];
      if (top === 5) moreTop = true;

      timeTable[startWeekIdx] = [...timeTable[startWeekIdx], { _id, type: status, top, start, end, title }];
      startWeekIdx += 1;
      gapDay -= isStarted ? 7 - fDay : 7;
 }
```

<!-- 4. JWT와 Oauth 원리 5. 암호화
7. next.js와 redux의 관계 - next-redux-wrapper가 필요한 이유 -->

<br>

## 회고

자세한 내용은 회고록에서 👉[여기](https://velog.io/@dee0518/Memoir-%ED%95%A8%EA%BB%98-%EC%9D%BC%ED%95%B4%EC%9A%94-doWork-t8otrvg1)
