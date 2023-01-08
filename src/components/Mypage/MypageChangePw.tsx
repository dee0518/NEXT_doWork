import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useMemo, useState, useRef, useEffect, ChangeEvent, useCallback } from 'react';
import { patchUser } from 'lib/user';
import { useReduxSelector } from 'hooks/useRedux';
import InputForm from 'components/Common/InputForm';
import ServiceMain from 'components/Common/ServiceMain';
import ButtonGroup from 'components/Mypage/ButtonGroup';
import Wrapper from 'components/Common/Wrapper';
import Loading from 'components/Common/Loading';
import Confirm from 'components/Mypage/Confirm';
import styled from 'styled-components';
import { MYPAGE } from 'constants/navigation';

const MypageChangePw = () => {
  const targetRef = useRef<string>('');
  const guide = useMemo(() => ['우리 모두 안전하게 서비스를 이용해보아요', '주기적으로 비밀번호를 변경해주세요'], []);
  const router = useRouter();
  const { user } = useReduxSelector(state => state.auth);
  const [error, setError] = useState<boolean>(false);
  const [isShowCard, setIsShowCard] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [newPwError, setNewPwError] = useState<string>('');
  const [newPw, setNewPw] = useState({
    newPw: '',
    newPwCheck: '',
  });

  const onCancel = useCallback(() => {
    router.push(MYPAGE);
  }, []);

  const onSubmit = async () => {
    const isPass = /^[A-Za-z0-9]{6,12}$/.test(newPw.newPw);

    if (!isPass || newPw.newPw !== newPw.newPwCheck) return;

    try {
      setIsLoading(true);
      const response = await patchUser(user.id, { password: newPw.newPw });

      if (response && response.result) {
        router.push(MYPAGE);
      }
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onConfirmUser = async () => {
    if (isShowCard) {
      onSubmit();
      return;
    }

    try {
      setIsLoading(true);
      const res = await signIn('credentials', { email: user.email, password, redirect: false });

      if (res && res.ok) {
        setIsShowCard(true);
        setError(false);
      } else setError(true);
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setPassword(value);
  }, []);

  const onChangePw = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    targetRef.current = name;
    setNewPw(prev => ({ ...prev, [name]: value }));
  }, []);

  useEffect(() => {
    if (targetRef.current === 'newPw' && !/^[A-Za-z0-9]{6,12}$/.test(newPw.newPw))
      setNewPwError('영문이나 숫자를 6~12자 입력해주세요.');
    else if (targetRef.current === 'newPwCheck' && newPw.newPw !== newPw.newPwCheck)
      setNewPwError('비밀번호가 일치하지 않아요');
    else {
      targetRef.current = '';
      setNewPwError('');
    }
  }, [newPw]);

  return (
    <>
      {isLoading && <Loading />}

      <PwWrapper>
        <Confirm
          title="Change Password"
          subTitle="내 정보를 안전하게 지켜요"
          guide={guide}
          error={error}
          pwValue={password}
          onChange={onChange}
          isEdit={isShowCard}
        />
        {isShowCard && (
          <NewPasswordWrapper>
            <H3>비밀번호를 변경할까요?</H3>
            <Guide className={newPwError ? 'error' : ''}>{newPwError || '새로운 비밀번호를 입력해주세요.'}</Guide>
            <InputForm
              id="newPw"
              type="password"
              name="newPw"
              title="new Password"
              value={newPw.newPw}
              className={targetRef.current === 'newPw' ? 'error' : ''}
              placeholder="새로운 비밀번호를 입력해주세요."
              onChange={onChangePw}
              isBlindLabel={true}
            />
            <InputForm
              id="newPwCheck"
              type="password"
              name="newPwCheck"
              title="new Password Check"
              value={newPw.newPwCheck}
              className={targetRef.current === 'newPwCheck' ? 'error' : ''}
              placeholder="비밀번호를 다시 한 번 입력해주세요."
              onChange={onChangePw}
              isBlindLabel={true}
            />
          </NewPasswordWrapper>
        )}
        <ButtonGroup onCancel={onCancel} onConfirm={onConfirmUser} />
      </PwWrapper>
    </>
  );
};

export default MypageChangePw;

const PwWrapper = styled(ServiceMain)`
  padding-top: 35px;
`;

const NewPasswordWrapper = styled(Wrapper)`
  margin-top: 20px;
  padding: 30px;

  .input__form {
    float: left;
    width: calc(50% - 10px);

    &:last-child {
      margin-left: 20px;
    }
  }

  &::after {
    content: '';
    display: block;
    clear: both;
  }
`;

const H3 = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 10px;
`;

const Guide = styled.p`
  margin-bottom: 20px;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.color_gray_60};

  &.error {
    color: ${({ theme }) => theme.point_pink};
  }

  span {
    display: block;
  }
`;
