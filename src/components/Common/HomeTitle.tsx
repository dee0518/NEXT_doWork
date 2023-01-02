import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';

const HomeTitle = styled.h2`
  font-size: 2.8rem;
  font-weight: bold;

  ${mediaQuery768} {
    font-size: 3.6rem;
  }
`;

export default HomeTitle;
