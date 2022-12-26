import { ReactNode, MouseEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { buttonNone } from 'styles/mixin';

type TProps = {
  type: string;
  title: string;
  children: ReactNode;
  onClose: (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
};

const ModalBody = ({ type, title, children, onClose }: TProps) => {
  const onClickBackDrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    onClose(e);
  };

  return (
    <BackDrop tabIndex={0} onClick={onClickBackDrop}>
      <Body>
        <ModalHeader className={type}>
          <H2>{title}</H2>
          <CloseBtn aria-label="close modal" onClick={onClose} />
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </Body>
    </BackDrop>
  );
};

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
  z-index: 1000;
  background: ${({ theme }) => theme.black_transparent_15};
`;

const Body = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 500px;
  border-radius: 10px;
  background: ${({ theme }) => theme.white};
  transform: translate3d(-50%, -50%, 0);
`;

const ModalHeader = styled.div`
  position: relative;
  padding: 16px 40px 16px 20px;
  border-radius: 10px 10px 0 0;
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
  ${buttonNone};
  position: absolute;
  right: 0;
  top: 1px;
  width: 50px;
  height: 50px;
  background: url(/images/common/close_white.svg) no-repeat;
  background-position: center;
`;

const ModalContent = styled.div`
  min-height: 150px;
  padding: 20px;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color_gray_100};
`;
