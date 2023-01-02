import styled, { keyframes } from 'styled-components';

const Shimmer = () => (
  <Wrapper>
    <ShimmerContent />
  </Wrapper>
);

export default Shimmer;

const loading = keyframes`
 0% {
    transform: translateX(-150%);
  }
  50% {
    transform: translateX(-60%);
  }
  100% {
    transform: translate(150%);
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: ${loading} 2.5s infinite;
`;

const ShimmerContent = styled.div`
  width: 50%;
  height: 100%;
  background-color: rgba(178, 162, 243, 0.2);
  transform: skewX(-10deg);
  box-shadow: 0 0 30px 30px rgba(178, 162, 243, 0.2);
`;
