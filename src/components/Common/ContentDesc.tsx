import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';

const ContentDesc = styled.p`
  margin-top: 20px;
  font-size: 1.8rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color_gray_70};

  ${mediaQuery768} {
    font-size: 2rem;

    span {
      display: block;
    }
  }
`;

export default ContentDesc;
