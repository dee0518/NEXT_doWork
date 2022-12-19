import Button from 'components/Common/Button';
import AuthLayout from 'components/Auth/AuthLayout';
import styled from 'styled-components';
import { iDefaultUserInfo, iLoginInfo } from 'types/auth';
import { SIGNUP } from 'constants/navigation';

const initialUserInfo: iDefaultUserInfo[] = [
  {
    id: 'email',
    type: 'text',
    placeholder: '이메일',
    value: '',
    labelClass: 'blind',
    labelChildren: '이메일',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: '비밀번호',
    value: '',
    labelClass: 'blind',
    labelChildren: '비밀번호',
  },
];

const Login = () => (
  <AuthLayout<iLoginInfo, iDefaultUserInfo>
    initialUserInfo={initialUserInfo}
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
