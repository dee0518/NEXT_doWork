import AuthLayout from 'components/Auth/AuthLayout';
import { LOGIN } from 'constants/navigation';
import { iDefaultUserInfo, iSignUpInfo } from 'types/auth';

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
  {
    id: 'passwordCheck',
    type: 'password',
    placeholder: '비밀번호 확인',
    value: '',
    labelClass: 'blind',
    labelChildren: '비밀번호 확인',
  },
  {
    id: 'name',
    type: 'text',
    placeholder: '이름',
    value: '',
    labelClass: 'blind',
    labelChildren: '이름',
  },
  {
    id: 'career',
    type: 'text',
    placeholder: '직업',
    value: '',
    labelClass: 'blind',
    labelChildren: '직업',
  },
];

const SignUp = () => (
  <AuthLayout<iSignUpInfo, iDefaultUserInfo>
    initialUserInfo={initialUserInfo}
    submitName="회원가입"
    LinkHref={LOGIN}
    LinkBtnName="뒤로가기"
  />
);

export default SignUp;
