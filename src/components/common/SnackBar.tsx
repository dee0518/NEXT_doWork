import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';
import { buttonNone } from 'styles/mixin';

type TProps = {
  content: string;
  action?: string;
  onClickAction?: () => void;
};

const SnackBarContainer = ({ content, action, onClickAction }: TProps) => (
  <Container>
    {content}
    {action && <ActionBtn onClick={onClickAction}>{action}</ActionBtn>}
  </Container>
);

const SnackBar = (props: TProps) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById('snack__bar'));
  }, []);

  if (!element) {
    return null;
  }

  return createPortal(<SnackBarContainer {...props} />, element);
};

export default SnackBar;

const boxFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateX(0%);
  }
`;

const boxFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0%);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
`;

const Container = styled.div`
  position: fixed;
  right: 5%;
  bottom: 60px;
  z-index: 99;
  width: 300px;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.color_purple_50};
  box-shadow: ${({ theme }) => theme.color_purple_shadow};
  animation: ${boxFadeIn} 0.6s ease;

  &.off {
    animation: ${boxFadeOut} 0.6s ease;
  }

  ${mediaQuery768} {
    bottom: 100px;
    width: 400px;
    padding: 15px 20px;
    font-size: 1.6rem;
  }
`;

const ActionBtn = styled.button`
  ${buttonNone};
`;
