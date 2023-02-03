import ContentDesc from 'components/Common/ContentDesc';
import LinkBtn from 'components/Common/LinkBtn';
import Title from 'components/Common/Title';
import { DOCSSCHEDULE } from 'constants/navigation';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';
import { flexbox } from 'styles/mixin';

const GettingStart = () => {
  return (
    <>
      <Title className="docs__title">Getting Start</Title>
      <ContentDesc>doWork에 오신 걸 환영합니다.</ContentDesc>
      <ContentDesc>
        2022년 12월에 일정 관리를 할 수 있는 v.1 출시를 했으며, doWorker들이 편리하게 서비스를 이용할 수 있도록 계획된
        3개의 기능을 꾸준히 업데이트하고 있습니다. docs도 조금씩 업데이트를 하며 doWork의 기능들을 자세하게
        알려드릴께요.
      </ContentDesc>
      <ContentDesc>
        doWork는 언제나 doWorker들이 사람들과 소통하며 재밌게 일하는 것을 최우선으로 생각하고 있어요. 어떻게 하면
        doWorker의 생각을 100%로 전달하며 발전시킬 수 있을지를 매일 고민하며 서비스에 반영할께요.
      </ContentDesc>
      <ContentDesc>즐겁게 이용해주시고 많은 관심 부탁드려요.</ContentDesc>
      <BtnWrapper>
        <NextBtn href={DOCSSCHEDULE} type="text__arrow__right">
          Schedule
        </NextBtn>
      </BtnWrapper>
    </>
  );
};

export default GettingStart;

const BtnWrapper = styled.div`
  ${flexbox('row-reverse')}
  margin-top: 50px;

  ${mediaQuery768} {
    margin-top: 80px;
  }
`;

const NextBtn = styled(LinkBtn)`
  width: 150px;
`;
