import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';

const HomeDesc = styled.p`
  margin-top: 20px;
  font-size: 2rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color_gray_70};

  ${mediaQuery768} {
    span {
      display: block;
    }
  }
`;

export default HomeDesc;
