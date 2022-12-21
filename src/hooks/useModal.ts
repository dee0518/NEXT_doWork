import { useEffect, useState } from 'react';

const useModal = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const onToggleModal = () => {
    setIsShowModal(prev => !prev);
  };

  useEffect(() => {
    if (isShowModal) document.querySelector('body')?.classList.add('hide');
    else document.querySelector('body')?.classList.remove('hide');
  }, [isShowModal]);

  return {
    isShowModal,
    onToggleModal,
  };
};

export default useModal;
