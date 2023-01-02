import { ReactNode } from 'react';
import styled from 'styled-components';

type TProps = {
  title: string;
  children: ReactNode;
};

const SubPannel = ({ title, children }: TProps) => (
  <Section>
    <Title>{title}</Title>
    {children}
  </Section>
);

export default SubPannel;

const Section = styled.section`
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

const Title = styled.h2`
  padding-bottom: 8px;
  margin-bottom: 30px;
  border-bottom: 1px solid ${({ theme }) => theme.point_orange};
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.point_orange};
  line-height: 1.5;
  text-transform: capitalize;
`;
