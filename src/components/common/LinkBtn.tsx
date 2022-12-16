import Link from 'next/link';
import styled from 'styled-components';

type TProps = {
  type?: string;
  fontSize?: string;
  lineheight?: string;
};

const LinkBtn = styled(Link)<TProps>`
  display: block;
  padding: 0 16px;
  border: ${({ type, theme }) => (type === 'secondary' ? `1px solid ${theme.color_purple_50}` : 'none')};
  border-radius: 6px;
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  line-height: ${({ lineheight }) => lineheight || '50px'};
  color: ${({ type, theme }) => (type === 'secondary' ? theme.color_purple_50 : theme.white)};
  background: ${({ type, theme }) => {
    if (type === 'cancel') return theme.color_gray_70;
    if (type === 'disabeled') return theme.color_gray_90;
    if (type === 'secondary') return theme.white;
    return theme.color_purple_50;
  }};
  text-align: center;
  text-transform: capitalize;
`;

export default LinkBtn;
