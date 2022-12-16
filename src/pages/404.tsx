import Image from 'next/image';
import HomeFooter from 'components/Common/HomeFooter';
import HomeHeader from 'components/Common/HomeHeader';
import styled, { keyframes } from 'styled-components';
import { mediaQuery1024 } from 'styles/mediaQuery';
import shape1 from 'images/404/shape_1.svg';
import shape2 from 'images/404/shape_2.svg';
import shape3 from 'images/404/shape_3.svg';
import bubble from 'images/404/bubble.svg';

const Custom404 = () => (
  <>
    <HomeHeader />
    <Section>
      <H2>404</H2>
      <P>페이지를 찾을 수 없어요:(</P>
      <Shape src={shape1} aria-hidden="true" alt="shape 1" />
      <Shape2 src={shape2} aria-hidden="true" alt="shape 2" />
      <Shape3 src={shape3} aria-hidden="true" alt="shape 3" />
      <Bubble1 src={bubble} aria-hidden="true" alt="bubble 1" />
      <Bubble2 src={bubble} aria-hidden="true" alt="bubble 2" />
      <Bubble3 src={bubble} aria-hidden="true" alt="bubble 3" />
      <Bubble4 src={bubble} aria-hidden="true" alt="bubble 3" />
      <Bubble5 src={bubble} aria-hidden="true" alt="bubble 3" />
    </Section>
    <HomeFooter />
  </>
);

export default Custom404;

const shapeRotate1 = keyframes`
  0%{
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }
  100%{
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
`;

const shapeRotate2 = keyframes`
  0%{
    transform: translate3d(-60%, -60%, 0) rotate(0deg);
  }
  100%{
    transform: translate3d(-60%, -60%, 0) rotate(-360deg);
  }
`;

const shapeRotate3 = keyframes`
  0%{
    transform: translate3d(-58%, -45%, 0) rotate(0deg);
  }
  100%{
    transform: translate3d(-58%, -45%, 0) rotate(360deg);
  }
`;

const bubbleAni = keyframes`
  0%{
    transform: translate3d(0, 0, 0);
  }
  20%{
    transform: translate3d(5px, 6px, 0);
  }
  40%{
    transform: translate3d(-3px, 1px, 0);
  }
  60%{
    transform: translate3d(3px, 4px, 0);
  }
  80%{
    transform: translate3d(-3px, 6px, 0);
  }
  100%{
    transform: translate3d(0, 0, 0);
  }
`;

const Section = styled.section`
  overflow: hidden;
  position: relative;
  padding: 280px 0;
  text-align: center;

  ${mediaQuery1024} {
    padding: 300px 0;
  }
`;

const H2 = styled.h2`
  font-size: 6rem;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.color_purple_60};

  ${mediaQuery1024} {
    font-size: 9.2rem;
  }
`;

const P = styled.p`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.color_purple_90};

  ${mediaQuery1024} {
    font-size: 4.8rem;
  }
`;

const Shape = styled(Image)`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 60%;
  transform: translate3d(-50%, -50%, 0);
  transform-origin: center;
  animation: ${shapeRotate1} 20s ease;
  animation-iteration-count: infinite;
  transform-origin: 55% 48%;

  ${mediaQuery1024} {
    width: auto;
  }
`;

const Shape2 = styled(Shape)`
  transform: translate3d(-60%, -60%, 0);
  animation: ${shapeRotate2} 10s ease;
  animation-iteration-count: infinite;
  transform-origin: 60% 55%;
`;

const Shape3 = styled(Shape)`
  transform: translate3d(-58%, -45%, 0);
  animation: ${shapeRotate3} 16s ease;
  animation-iteration-count: infinite;
  transform-origin: 55% 45%;
`;

const Bubble1 = styled(Image)`
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -120px;
  margin-top: -180px;
  animation: ${bubbleAni} 6s ease;
  animation-iteration-count: infinite;

  ${mediaQuery1024} {
    margin-left: -250px;
  }
`;

const Bubble2 = styled(Bubble1)`
  width: 30px;
  height: auto;
  margin-left: -150px;
  margin-top: 200px;
  animation-direction: alternate-reverse;
  animation-duration: 4s;

  ${mediaQuery1024} {
    margin-left: -350px;
  }
`;

const Bubble3 = styled(Bubble1)`
  width: 20px;
  height: auto;
  margin-left: 140px;
  margin-top: -200px;
  animation-direction: alternate;

  ${mediaQuery1024} {
    margin-left: 250px;
  }
`;

const Bubble4 = styled(Bubble1)`
  margin-left: 120px;
  margin-top: 160px;
  animation-direction: reverse;
  animation-duration: 8s;

  ${mediaQuery1024} {
    margin-left: 250px;
  }
`;

const Bubble5 = styled(Bubble3)`
  margin-top: 180px;
  animation-direction: reverse;
`;
