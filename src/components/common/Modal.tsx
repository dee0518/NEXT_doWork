import { ReactNode, MouseEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

type TProps = {
  type: string;
  title: string;
  children: ReactNode;
  onClose: (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
};

const ModalBody = ({ type, title, children, onClose }: TProps) => (
  <BackDrop tabIndex={0} onClick={onClose}>
    <Body>
      <ModalHeader className={type}>
        <H2>{title}</H2>
        <CloseBtn aria-label="close modal" onClick={onClose} />
      </ModalHeader>
      {children}
    </Body>
  </BackDrop>
);

const Modal = (props: TProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setElement(document.querySelector('#modal__root') as HTMLDivElement);
  }, []);

  if (!element) return null;

  return <>{createPortal(<ModalBody {...props} />, element)}</>;
};

export default Modal;

const BackDrop = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: ${({ theme }) => theme.black_transparent_15};
`;

const Body = styled.div`
  border-radius: 10px;
  background: ${({ theme }) => theme.white};
  overflow: hidden;
`;

const ModalHeader = styled.div`
  position: relative;
  padding: 18px 40px 18px 25px;
  ${({ theme }) => `background: linear-gradient(to right, ${theme.linear_gradient_purple})`};

  &.pink {
    ${({ theme }) => `background: linear-gradient(to right, ${theme.linear_gradient_pink})`};
  }

  &.orange {
    ${({ theme }) => `background: linear-gradient(to right, ${theme.linear_gradient_orange})`};
  }

  &.skyblue {
    ${({ theme }) => `background: linear-gradient(to right, ${theme.linear_gradient_skyblue})`};
  }

  &.green {
    ${({ theme }) => `background: linear-gradient(to right, ${theme.linear_gradient_green})`};
  }
`;

const H2 = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.white};
`;

const CloseBtn = styled.button`
  width: 30px;
  height: 30px;
  background: url(/images/common/close_white.svg) no-repeat;
  background-position: center;
`;
