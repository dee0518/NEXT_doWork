import styled from 'styled-components';

type TProps = {
  category?: string;
  fontSize?: string;
  lineheight?: string;
};

const Button = styled.button<TProps>`
  width: 100%;
  padding: 0 16px;
  border: ${({ category, theme }) => (category === 'secondary' ? `1px solid ${theme.color_purple_50}` : 'none')};
  border-radius: 6px;
  font-size: ${({ fontSize }) => fontSize || '1.6rem'};
  line-height: ${({ lineheight }) => lineheight || '50px'};
  color: ${({ category, theme }) => (category === 'secondary' ? theme.color_purple_50 : theme.white)};
  background: ${({ category, theme }) => {
    if (category === 'gray70') return theme.color_gray_70;
    if (category === 'disabeled') return theme.color_gray_90;
    if (category === 'secondary') return theme.white;
    return theme.color_purple_50;
  }};
  text-align: center;
  text-transform: capitalize;
`;

export default Button;
