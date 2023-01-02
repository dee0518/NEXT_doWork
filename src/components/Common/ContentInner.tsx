import styled from 'styled-components';
import { mediaQuery1024 } from 'styles/mediaQuery';

const ContentInner = styled.div`
  width: 90%;
  margin: 0 auto;

  ${mediaQuery1024} {
    max-width: 1280px;
  }
`;

export default ContentInner;
