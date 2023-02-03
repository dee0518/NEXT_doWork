import ContentDesc from 'components/Common/ContentDesc';
import Title from 'components/Common/Title';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';

const Schedule = () => {
  return (
    <>
      <Title className="docs__title">Schedule</Title>
      <ContentDesc>
        서비스의 메인 페이지로 일정을 관리할 수 있어요. 내가 생성한 일정, 그리고 내가 참여자로 있는 일정을 캘린더에서
        확인할 수 있어요. 해당 페이지에서 프로젝트와 관련된 일정들을 확인해보아요.
      </ContentDesc>
      <Article>
        <h3>add schedule</h3>
        <p>
          스케쥴을 추가해볼까요?! 캘린더 상단 오른쪽의 add 버튼이나 서브 패널의 일자를 클릭하면 스케쥴을 추가할 수 있는
          모달창이 나타나요. 타입, 제목, 날짜, 참석자, 내용을 입력할 수 있어요. 기본 타입으로 to do가 설정되어있어요.
          제목만 입력해도 스케쥴을 추가할 수 있어요. 날짜같은 경우, add 버튼을 클릭했을 때는 오늘 날짜로 설정되어있으며
          서브 패널의 일자를 선택했을 때는 해당 일자가 기본 날짜로 설정되어 있어요.
        </p>
        <p>
          참석자의 경우 메일을 검색하여 추가할 수 있어요. 온전한 메일을 입력해야 검색이 된다는 점 알아두세요. 메일
          검색하면 doWork의 회원일 경우 검색 결과가 보여지고 추가할 수 있습니다. 또한 추가한 후 삭제 버튼을 클릭하면
          참석자 리스트에서 제거할 수 있어요.
        </p>
      </Article>
      <Article>
        <h3>schedule detail</h3>
        <p>
          캘린더에 공유된 스케쥴과 내가 생성한 스케쥴을 확인할 수 있어요. 각 스케쥴을 클릭하면 상세 내용들을 확인할 수
          있어요. 내가 생성한 스케쥴이라면 편집하거나 삭제할 수 있어요. 스케쥴의 상세 내용들을 보며 일정을 관리하세요.
        </p>
      </Article>
      <Article>
        <h3>edit Schedule</h3>
        <p>
          편집하려는 스케쥴을 클릭하세요. Schedule Detail 팝업창 하단을 보면 편집 버튼이 있어요. 이 편집 버튼을 클릭하면
          스케쥴을 추가할 때와 같은 모달창이 나타나요. 각 입력창에 기존의 스케쥴 정보가 보여져요. 해당 폼으로 원하는
          내용으로 정보를 업데이트하세요. &#40;* 단, doWorker 본인이 생성한 스케쥴에 한해서 편집 가능해요.&#41;
        </p>
      </Article>
      <Article>
        <h3>delete Schedule</h3>
        <p>
          삭제하려는 스케쥴을 클릭하세요. 그러면 Schedule Detail 팝업창을 보여져요. 팝업창 하단 가장 오른쪽에 삭제
          버튼이 있어요. 삭제 버튼을 클릭하면 캘린더에서 선택한 스케쥴이 없어진 것을 볼 수 있어요. &#40;* 단, doWorker
          본인이 생성한 스케쥴에 한해서 삭제 가능해요.&#41;
        </p>
      </Article>
    </>
  );
};

export default Schedule;

const Article = styled.article`
  margin-top: 50px;

  h3 {
    margin-bottom: 10px;
    font-size: 2rem;
    text-transform: capitalize;
  }

  p {
    font-size: 1.6rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.color_gray_70};
  }

  ${mediaQuery768} {
    margin-top: 80px;

    h3 {
      margin-bottom: 15px;
      font-size: 2.4rem;
    }

    p {
      font-size: 1.8em;
    }
  }
`;
