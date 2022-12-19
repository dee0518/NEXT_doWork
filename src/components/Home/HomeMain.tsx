import Image from 'next/image';
import ContentInner from 'components/Common/ContentInner';
import LinkBtn from 'components/Common/LinkBtn';
import ProcessSection from 'components/Home/ProcessSection';
import styled from 'styled-components';
import { mediaQuery1024, mediaQuery768 } from 'styles/mediaQuery';
import { blind, flexbox } from 'styles/mixin';
import visualBg from 'images/home/visual_bg.svg';
import { LOGIN } from 'constants/navigation';

const HomeMain = () => (
  <Main>
    <Visual>
      <BlindH2>Visual</BlindH2>
      <VisualInner>
        <VisualImageGroup>
          <VisualBgImage src={visualBg} alt="work together" />
        </VisualImageGroup>
        <MainTextGroup>
          <p>
            <Span>doWork</Span>
            <Span>Enojoy working together.</Span>
          </p>
          <LoginLink href={LOGIN}>start doWork</LoginLink>
        </MainTextGroup>
      </VisualInner>
    </Visual>
    <ProcessSection />
  </Main>
);

export default HomeMain;

const Main = styled.main`
  padding-top: 70px;
`;

const Visual = styled.section`
  padding: 50px 0 130px;

  ${mediaQuery1024} {
    padding: 100px 0 130px;
  }
`;

const BlindH2 = styled.h2`
  ${blind}
`;

const VisualInner = styled(ContentInner)`
  ${mediaQuery1024} {
    ${flexbox('row-reverse', 'nowrap', 'space-between', 'center')}
  }
`;

const VisualImageGroup = styled.div`
  margin-bottom: 10px;
  text-align: right;

  ${mediaQuery1024} {
    width: 50%;
    margin-bottom: 0px;
  }
`;

const VisualBgImage = styled(Image)`
  width: 100%;
  max-width: 700px;
  height: auto;

  ${mediaQuery1024} {
    max-width: 510px;
  }
`;

const MainTextGroup = styled.div`
  ${mediaQuery1024} {
    padding-top: 160px;
  }
`;

const Span = styled.span`
  display: block;
  font-size: 4.8rem;
  font-weight: bold;

  &:last-child {
    font-size: 1.8rem;
    font-weight: normal;
    color: ${({ theme }) => theme.color_gray_70};
  }

  ${mediaQuery768} {
    font-size: 8rem;

    &:last-child {
      font-size: 3.2rem;
    }
  }
`;

const LoginLink = styled(LinkBtn)`
  width: 150px;
  margin-top: 50px;
  line-height: 45px;

  ${mediaQuery768} {
    margin-top: 80px;
  }
`;
