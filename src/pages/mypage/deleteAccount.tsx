import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState, ChangeEvent } from 'react';
import { useReduxSelector } from 'hooks/useRedux';
import useModal from 'hooks/useModal';
import Button from 'components/Common/Button';
import GlobalNavBar from 'components/Common/GlobalNavBar';
import Modal from 'components/Common/Modal';
import ServiceMain from 'components/Common/ServiceMain';
import Confirm from 'components/Mypage/Confirm';
import MypagePannel from 'components/Mypage/MypagePannel';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';
import { LOGIN, MYPAGE } from 'constants/navigation';
import { iUserInfo } from 'types/auth';

const DeleteAccount: NextPage = () => {
  const { data: session } = useSession();
  const { isShowModal, onToggleModal } = useModal();
  const { user } = useReduxSelector(state => state.auth);

  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');

  if (!session) {
    router.push(LOGIN);
    return null;
  }

  const onCancel = () => router.push(MYPAGE);

  const onConfirmUser = async () => {
    const { email } = user as iUserInfo;
    const res = await signIn('credentials', { email, password, redirect: false });

    if (res && res.ok) {
      onToggleModal();
      setError(false);
    } else setError(true);
  };

  const onDeleteAccount = async () => {
    const { userId } = session.user;
    const response = await fetch(`/api/auth/user/${userId}`, { method: 'DELETE' });
    const json = await response.json();

    if (json && json.result) {
      signOut({
        callbackUrl: LOGIN,
      });
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setPassword(value);
  };

  return (
    <>
      <Head>
        <title>마이페이지 - 계정 삭제 : doWork</title>
      </Head>
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
      <GlobalNavBar />
      <MypagePannel />
      <Wrapper>
        <Confirm
          title="Delete Account"
          subTitle="마지막 doWork"
          guide={['아직 doWork와의 즐거움을 차지 못했군요ㅠ.ㅠ', '떠나면 더 이상 같이 일할 수 없어요. 떠나실 건가요?']}
          error={error}
          pwValue={password}
          onChange={onChange}
        />
        <ButtonGroup>
          <Button type="button" category="cancel" onClick={onCancel}>
            취소
          </Button>
          <Button type="button" category="primary" onClick={onConfirmUser}>
            확인
          </Button>
        </ButtonGroup>
      </Wrapper>
    </>
  );
};

export default DeleteAccount;

const Wrapper = styled(ServiceMain)`
  padding-top: 35px;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
  ${flexbox('row', 'nowrap', 'flex-end', 'center')}
  gap:10px;

  button {
    width: 180px;
  }
`;

const ModalButtonGroup = styled.div`
  text-align: right;
`;

const ConfirmBtn = styled(Button)`
  width: 150px;
  margin-top: 50px;
`;
