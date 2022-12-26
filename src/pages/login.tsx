import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import Button from 'components/Common/Button';
import AuthLayout from 'components/Auth/AuthLayout';
import styled from 'styled-components';
import { iLoginInfo } from 'types/auth';
import { SIGNUP } from 'constants/navigation';
import { loginInfo } from 'constants/auth';
import Head from 'next/head';

const Login: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/main');
    return null;
  }

  const onClickGoogle = async () => {
    const result = await signIn('google', {
      redirect: false,
    });
    console.log(result);
    console.log(session);
    if (result && result.ok) router.push('/main');
  };

  return (
    <>
      <Head>
        <title>함께 해요 : doWork</title>
      </Head>
      <AuthLayout<iLoginInfo> initialUserInfo={loginInfo} submitName="로그인" LinkHref={SIGNUP} LinkBtnName="회원가입">
        <GoogleButton type="button" category="secondary" onClick={onClickGoogle}>
          Google 로그인
        </GoogleButton>
      </AuthLayout>
    </>
  );
};

export default Login;

const GoogleButton = styled(Button)`
  margin-top: 15px;
`;
