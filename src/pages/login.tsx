import Button from 'components/Common/Button';
import AuthLayout from 'components/Auth/AuthLayout';
import styled from 'styled-components';
import { iDefaultUserInfo, iLoginInfo } from 'types/auth';
import { SIGNUP } from 'constants/navigation';
import { loginInfo } from 'constants/auth';

const Login = () => (
  <AuthLayout<iLoginInfo, iDefaultUserInfo>
    initialUserInfo={loginInfo}
    submitName="로그인"
    LinkHref={SIGNUP}
    LinkBtnName="회원가입"
  >
    <GoogleButton type="button" category="secondary">
      Google 로그인
    </GoogleButton>
  </AuthLayout>
);

export default Login;

const GoogleButton = styled(Button)`
  margin-top: 15px;
`;
