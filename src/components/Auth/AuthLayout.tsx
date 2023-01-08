import Link from 'next/link';
import { ReactNode } from 'react';
import useAuth from 'hooks/useAuth';
import Logo from 'components/Auth/Logo';
import Button from 'components/Common/Button';
import Loading from 'components/Common/Loading';
import InputForm from 'components/Common/InputForm';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';
import { flexbox } from 'styles/mixin';
import { AuthType, iDefaultUserInfo } from 'types/auth';

type TProps = {
  initialUserInfo: iDefaultUserInfo[];
  LinkHref: string;
  LinkBtnName: string;
  submitName: string;
  children?: ReactNode;
};

const AuthLayout = <T extends AuthType>({ initialUserInfo, submitName, LinkHref, LinkBtnName, children }: TProps) => {
  const { error, userInfo, isLoading, onChange, onSubmit } = useAuth<T>(initialUserInfo);

  return (
    <>
      {isLoading && <Loading />}
      <Container>
        <Logo />
        <Message className={error ? 'error' : ''}>{(error && error.message) || '우리 같이 일해 보아요:)'}</Message>
        <Inner className="auth__inner">
          <AuthForm onSubmit={onSubmit}>
            {userInfo.map(({ id, type, value, placeholder, title }) => (
              <InputForm
                key={id}
                id={id}
                type={type}
                name={id}
                title={title}
                value={value}
                className={error && error.id === id ? 'error' : ''}
                placeholder={placeholder}
                onChange={onChange}
                labelClass={'blind'}
              />
            ))}
            <LinkBtn href={LinkHref}>{LinkBtnName}</LinkBtn>
            <Button type="submit" category="primary">
              {submitName}
            </Button>
            {children}
          </AuthForm>
        </Inner>
        <Copyright>&copy; deeWork {new Date().getFullYear()}</Copyright>
      </Container>
    </>
  );
};

export default AuthLayout;

const Container = styled.div`
  min-width: 360px;
  width: 100vw;
  height: 100vh;
  ${flexbox('column', 'nowrap', 'center', 'center')}
  ${({ theme }) => `background: linear-gradient(to bottom, ${theme.color_purple_80}, ${theme.color_purple_50})`};
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

const AuthForm = styled.form`
  text-align: right;

  div {
    margin-bottom: 15px;
  }

  input {
    height: 50px;
    padding: 15px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    font-size: 1.6rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.white};

    &::placeholder {
      color: ${({ theme }) => theme.color_purple_30};
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: ${({ theme }) => theme.white};
    }

    &.error {
      border-color: ${({ theme }) => theme.point_orange};
    }
  }
`;

const LinkBtn = styled(Link)`
  display: block;
  margin-bottom: 25px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color_purple_40};
`;

const Copyright = styled.p`
  position: absolute;
  bottom: 10px;
  color: ${({ theme }) => theme.color_purple_90};
  font-size: 1.2rem;
  line-height: 1.5;
  font-weight: 300;
`;
