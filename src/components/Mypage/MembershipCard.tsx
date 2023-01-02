import Wrapper from 'components/Common/Wrapper';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';

type TProps = {
  children: ReactNode;
};

const MembershipCard = ({ children }: TProps) => (
  <Wrapper className="membership__card">
    <Section>
      <H2>Member</H2>
      <ContentsGroup>{children}</ContentsGroup>
      <Brand>doWork</Brand>
    </Section>
  </Wrapper>
);

export default MembershipCard;

const Section = styled.section`
  position: relative;
`;

const H2 = styled.h2`
  padding: 15px 25px;
  border-radius: 15px 15px 0 0;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.white};
  ${({ theme }) => `background: linear-gradient(to right,${theme.linear_gradient_purple})`};
`;

const ContentsGroup = styled.div`
  ${flexbox('row', 'nowrap', 'space-between', 'flex-start')}
  padding: 25px 25px 35px;
`;

const Brand = styled.span`
  position: absolute;
  right: 20px;
  bottom: 15px;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color_purple_60};
`;
