import AuthLayout from 'components/Auth/AuthLayout';
import { signUpInfo } from 'constants/auth';
import { LOGIN } from 'constants/navigation';
import { iDefaultUserInfo, iSignUpInfo } from 'types/auth';

const SignUp = () => (
  <AuthLayout<iSignUpInfo, iDefaultUserInfo>
    initialUserInfo={signUpInfo}
    submitName="회원가입"
    LinkHref={LOGIN}
    LinkBtnName="뒤로가기"
  />
);

export default SignUp;
