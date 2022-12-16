import Image from 'next/image';
import ContentInner from 'components/Common/ContentInner';
import LinkBtn from 'components/Common/LinkBtn';
import styled from 'styled-components';
import { mediaQuery1024, mediaQuery768 } from 'styles/mediaQuery';
import { blind, flexbox } from 'styles/mixin';
import shapePurple from 'images/home/visual_shape_purple.svg';
import shapeYellow from 'images/home/visual_shape_yellow.svg';
import ProcessSection from './ProcessSection';

const HomeMain = () => (
  <Main>
    <Visual>
      <BlindH2>Visual</BlindH2>
      <VisualInner>
        <VisualImageGroup>
          <VisualBgImage src={shapePurple} aria-hidden="true" alt="shape purple" />
          <VisualBgImage src={shapeYellow} aria-hidden="true" alt="shape purple" />
        </VisualImageGroup>
        <MainTextGroup>
          <p>
            <Span>doWork</Span>
            <Span>Enojoy working together.</Span>
          </p>
          <LoginLink href="/login">Go Login</LoginLink>
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
  position: relative;
  height: 300px;

  ${mediaQuery1024} {
    width: 50%;
    height: 500px;
  }
`;

const VisualBgImage = styled(Image)`
  position: absolute;
  left: 50%;
  top: 0;
  width: 65%;
  max-width: 400px;
  height: auto;
  transform: translate3d(-65%, 0, 0);

  &:last-child {
    width: 60%;
    transform: translate3d(-25%, 100px, 0);
  }

  ${mediaQuery1024} {
    width: 400px;
    max-width: none;
    transform: translate3d(-75%, 0, 0);

    &:last-child {
      width: 300px;
      transform: translate3d(-15%, 200px, 0);
    }
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
