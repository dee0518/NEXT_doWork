import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import InputForm from 'components/Common/InputForm';
import styled from 'styled-components';
import { flexbox } from 'styles/mixin';
import { mediaQuery768 } from 'styles/mediaQuery';
import logo from 'images/common/logo.svg';
import { SIGNUP } from 'constants/navigation';
import Button from 'components/Common/Button';

const Login = () => {
  const [error, setError] = useState<string>('');
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const onChange = () => {};
  const onSubmit = () => {};
  const onClickAuth = () => {};

  return (
    <Container>
      <H1>
        <Logo src={logo} alt="do work" />
        <Title aria-hidden="true">doWork</Title>
      </H1>
      <Message className={error ? 'error' : ''}>{error || '우리 같이 일해 보아요:)'}</Message>
      <Inner>
        <LoginForm className="login__form" onSubmit={onSubmit}>
          <InputForm
            input={{
              id: 'email',
              type: 'text',
              name: 'email',
              placeholder: '이메일',
              value: userInfo.email,
              onChange,
            }}
            label={{ htmlFor: 'email', className: 'blind', children: '이메일' }}
          />
          <InputForm
            input={{
              id: 'password',
              type: 'password',
              name: 'password',
              placeholder: '비밀번호',
              autoComplete: 'off',
              value: userInfo.password,
              onChange,
            }}
            label={{ htmlFor: 'password', className: 'blind', children: '비밀번호' }}
          />
          <SignUpLinkBtn href={SIGNUP}>회원가입</SignUpLinkBtn>
          <Button type="submit" category="primary">
            로그인
          </Button>
          <GoogleButton type="button" category="secondary" onClick={onClickAuth}>
            Google 로그인
          </GoogleButton>
        </LoginForm>
      </Inner>
      <Copyright>&copy; deeWork {new Date().getFullYear()}</Copyright>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  ${flexbox('column', 'nowrap', 'center', 'center')}
  ${({ theme }) => `background: linear-gradient(to bottom, ${theme.color_purple_80}, ${theme.color_purple_50})`};
`;

const H1 = styled.h1`
  ${flexbox('row', 'nowrap', 'normal', 'center')}
  gap: 10px;
  margin-bottom: 5px;

  ${mediaQuery768} {
    gap: 15px;
    margin-bottom: 15px;
  }
`;

const Logo = styled(Image)`
  width: 28px;

  ${mediaQuery768} {
    width: 32px;
  }
`;

const Title = styled.span`
  font-size: 2.8rem;
  color: ${({ theme }) => theme.white};

  ${mediaQuery768} {
    font-size: 3.6rem;
  }
`;

const Message = styled.p`
  margin-bottom: 25px;
  color: ${({ theme }) => theme.white};
  font-size: 1.6rem;

  &.error {
    color: ${({ theme }) => theme.point_orange};
  }

  ${mediaQuery768} {
    margin-bottom: 40px;
  }
`;

const Inner = styled.div`
  max-width: 400px;
  width: 90%;
  padding: 24px;
  border-radius: 10px;
  background-color: rgba(51, 30, 148, 0.3);
  box-shadow: ${({ theme }) => theme.color_purple_shadow};

  ${mediaQuery768} {
    padding: 30px;
  }
`;

const LoginForm = styled.form`
  text-align: right;

  div {
    margin-bottom: 15px;
  }

  label {
    display: none;
  }

  input {
    height: 50px;
    padding: 15px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    font-size: 1.6rem;
    line-height: 1.5;
    color: $color-white;

    &::placeholder {
      color: ${({ theme }) => theme.color_purple_30};
    }

    &::-webkit-input-placeholder {
      color: ${({ theme }) => theme.color_purple_30};
    }

    &:-ms-input-placeholder {
      color: ${({ theme }) => theme.color_purple_30};
    }
  }
`;

const SignUpLinkBtn = styled(Link)`
  display: inline-block;
  margin-bottom: 25px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color_purple_40};
`;

const GoogleButton = styled(Button)`
  margin-top: 15px;
`;

const Copyright = styled.p`
  position: absolute;
  bottom: 10px;
  color: ${({ theme }) => theme.color_purple_90};
  font-size: 1.2rem;
  line-height: 1.5;
  font-weight: 300;
`;
