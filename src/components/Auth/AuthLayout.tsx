import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import useAuth from 'hooks/useAuth';
import Button from 'components/Common/Button';
import InputForm from 'components/Common/InputForm';
import styled from 'styled-components';
import { mediaQuery768 } from 'styles/mediaQuery';
import { flexbox } from 'styles/mixin';
import logo from 'images/common/logo.svg';
import { AuthType, iDefaultUserInfo } from 'types/auth';
import { HOME } from 'constants/navigation';

type TProps<M> = {
  initialUserInfo: Array<M>;
  LinkHref: string;
  LinkBtnName: string;
  submitName: string;
  children?: ReactNode;
};

const AuthLayout = <T extends AuthType, M extends iDefaultUserInfo>({
  initialUserInfo,
  submitName,
  LinkHref,
  LinkBtnName,
  children,
}: TProps<M>) => {
  const { error, userInfo, onChange, onSubmit } = useAuth<T, M>(initialUserInfo);

  return (
    <Container>
      <H1>
        <LogoLink href={HOME}>
          <Logo src={logo} alt="do work" />
          <Title aria-hidden="true">doWork</Title>
        </LogoLink>
      </H1>
      <Message className={error ? 'error' : ''}>{(error && error.message) || '우리 같이 일해 보아요:)'}</Message>
      <Inner>
        <AuthForm onSubmit={onSubmit}>
          {userInfo.map(({ id, type, value, placeholder, labelClass, labelChildren }) => (
            <InputForm
              key={id}
              input={{
                id,
                type,
                className: error && error.id === id ? 'error' : '',
                name: id,
                placeholder,
                value,
                onChange,
              }}
              label={{ htmlFor: id, className: labelClass, children: labelChildren }}
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
  );
};

export default AuthLayout;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  ${flexbox('column', 'nowrap', 'center', 'center')}
  ${({ theme }) => `background: linear-gradient(to bottom, ${theme.color_purple_80}, ${theme.color_purple_50})`};
`;

const H1 = styled.h1`
  margin-bottom: 5px;

  ${mediaQuery768} {
    margin-bottom: 15px;
  }
`;

const LogoLink = styled(Link)`
  ${flexbox('row', 'nowrap', 'normal', 'center')}
  gap: 10px;

  ${mediaQuery768} {
    gap: 15px;
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

    &::-webkit-input-placeholder {
      color: ${({ theme }) => theme.color_purple_30};
    }

    &:-ms-input-placeholder {
      color: ${({ theme }) => theme.color_purple_30};
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
