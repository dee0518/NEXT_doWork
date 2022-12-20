import { css } from 'styled-components';

export const flexbox = (direction = 'row', wrap = 'nowrap', justify = 'normal', align = 'flex-start') => css`
  display: flex;
  flex-flow: ${direction} ${wrap};
  justify-content: ${justify};
  align-items: ${align};
`;

export const buttonNone = css`
  border: 0;
  background: transparent;
`;

export const blind = css`
  display: block;
  width: 1px;
  height: 1px;
  overflow: hidden;
  text-indent: -9999px;
`;

export const buttonStyle = (bgColor: string, textColor: string, border: string) => css`
  ${buttonNone}
  width: 150px;
  height: 45px;
  border: 1px solid ${border};
  border-radius: 6px;
  background: ${bgColor};
  color: ${textColor};
  font-size: 1.6rem;
`;
