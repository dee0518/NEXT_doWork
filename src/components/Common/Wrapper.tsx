import styled from 'styled-components';

const Wrapper = styled.div`
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.color_gray_20};
  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.box_shadow_gray_1};
`;

export default Wrapper;
