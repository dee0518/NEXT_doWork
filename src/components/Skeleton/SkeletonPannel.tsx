import styled from 'styled-components';

const SkeletonPannel = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  width: 400px;
  height: 100%;
  padding: 30px 25px 50px 85px;
  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.box_shadow_gray_1};
  overflow-y: auto;
`;

export default SkeletonPannel;
