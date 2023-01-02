import { NextPage } from 'next';
import Head from 'next/head';
import AuthLayout from 'components/Auth/AuthLayout';
import { signUpInfo } from 'constants/auth';
import { LOGIN } from 'constants/navigation';
import { iSignUpInfo } from 'types/auth';

const SignUp: NextPage = () => (
  <>
    <Head>
      <title>같이 일해 보아요 : doWork</title>
    </Head>
    <AuthLayout<iSignUpInfo>
      initialUserInfo={signUpInfo}
      submitName="회원가입"
      LinkHref={LOGIN}
      LinkBtnName="뒤로가기"
    />
  </>
);

export default SignUp;
