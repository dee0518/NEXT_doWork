import { memo } from 'react';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';
import { blind } from 'styles/mixin';

const Title = styled.h2`
  margin-bottom: 15px;
  font-size: 2.4rem;

  & .blind,
  &.blind {
    ${blind}
  }

  &.home__title {
    margin-bottom: 0;
    font-size: 2.8rem;
    font-weight: bold;

    ${mediaQuery768} {
      font-size: 3.6rem;
    }
  }
`;

export default memo(Title);
