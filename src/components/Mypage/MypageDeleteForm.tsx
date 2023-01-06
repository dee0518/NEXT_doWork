import { useRouter } from 'next/router';
import { signIn, signOut } from 'next-auth/react';
import { useState, ChangeEvent } from 'react';
import useModal from 'hooks/useModal';
import { deleteUser } from 'lib/user';
import { useReduxSelector } from 'hooks/useRedux';
import Button from 'components/Common/Button';
import Modal from 'components/Common/Modal';
import ServiceMain from 'components/Common/ServiceMain';
import ButtonGroup from 'components/Mypage/ButtonGroup';
import Confirm from 'components/Mypage/Confirm';
import Loading from 'components/Common/Loading';
import styled from 'styled-components';
import { LOGIN, MYPAGE } from 'constants/navigation';

const MypageDeleteForm = () => {
  const router = useRouter();
  const { user } = useReduxSelector(state => state.auth);
  const { isShowModal, onToggleModal } = useModal();
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  const onCancel = () => router.push(MYPAGE);

  const onConfirmUser = async () => {
    if (user.provider) {
      onToggleModal();
      return;
    }

    try {
      setIsLoading(true);

      const res = await signIn('credentials', { email: user.email, password, redirect: false });

      if (res && res.ok) {
        onToggleModal();
        setError(false);
      } else setError(true);
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteAccount = async () => {
    try {
      setIsLoading(true);

      const response = await deleteUser(user.id);

      if (response && response.result) {
        signOut({
          callbackUrl: LOGIN,
        });
      }
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setPassword(value);
  };

  return (
    <>
      {isLoading && <Loading />}
      {isShowModal && (
        <Modal type="purple" title="Delete Account" onClose={onToggleModal}>
          <p>확인 버튼을 누르면 계정이 사라져요. 정말 삭제하시겠어요?ㅠ.ㅠ</p>
          <ModalButtonGroup>
            <ConfirmBtn type="button" category="primary" onClick={onDeleteAccount}>
              확인
            </ConfirmBtn>
          </ModalButtonGroup>
        </Modal>
      )}
      <Wrapper>
        <Confirm
          title="Delete Account"
          subTitle="마지막 doWork"
          guide={['아직 doWork와의 즐거움을 차지 못했군요ㅠ.ㅠ', '떠나면 더 이상 같이 일할 수 없어요. 떠나실 건가요?']}
          error={error}
          pwValue={password}
          onChange={onChange}
        />
        <ButtonGroup onCancel={onCancel} onConfirm={onConfirmUser} />
      </Wrapper>
    </>
  );
};

export default MypageDeleteForm;

const Wrapper = styled(ServiceMain)`
  padding-top: 35px;
`;

const ModalButtonGroup = styled.div`
  text-align: right;
`;

const ConfirmBtn = styled(Button)`
  width: 150px;
  margin-top: 50px;
`;
