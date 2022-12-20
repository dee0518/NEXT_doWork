import { ReactNode } from 'react';
import styled from 'styled-components';

type TProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: TProps) => <Div>{children}</Div>;

export default Wrapper;

const Div = styled.div`
  border-radius: 15px;
  border: ${({ theme }) => theme.color_gray_70};
  background: ${({ theme }) => theme.white};
  box-shadow: ${({ theme }) => theme.box_shadow_gray_1};
`;
