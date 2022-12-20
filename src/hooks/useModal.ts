import { useState } from 'react';

const useModal = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const onToggleModal = () => {
    setIsShowModal(prev => !prev);
  };

  return {
    isShowModal,
    onToggleModal,
  };
};

export default useModal;
