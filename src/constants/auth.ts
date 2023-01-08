import { iDefaultUserInfo } from 'types/auth';

const loginInfo: iDefaultUserInfo[] = [
  {
    id: 'email',
    type: 'text',
    placeholder: '이메일',
    value: '',
    title: '이메일',
    error: '이메일 형식에 맞게 입력해 주세요.',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: '비밀번호',
    value: '',
    title: '비밀번호',
    error: '영문이나 숫자를 6~12자 입력해주세요.',
  },
];

const signUpInfo: iDefaultUserInfo[] = [
  ...loginInfo,
  {
    id: 'passwordCheck',
    type: 'password',
    placeholder: '비밀번호 확인',
    value: '',
    title: '비밀번호 확인',
    error: '비밀번호와 일치하지 않아요.',
  },
  {
    id: 'name',
    type: 'text',
    placeholder: '이름',
    value: '',
    title: '이름',
    error: '이름을 입력해주세요.',
  },
  {
    id: 'career',
    type: 'text',
    placeholder: '직업',
    value: '',
    title: '직업',
    error: '직업을 입력해주세요.',
  },
];

const EditUserInfo: iDefaultUserInfo[] = [
  {
    id: 'name',
    type: 'text',
    placeholder: '이름',
    value: '',
    title: 'name',
    error: '이름을 입력해주세요.',
  },
  {
    id: 'career',
    type: 'text',
    placeholder: '직업',
    value: '',
    title: 'career',
    error: '직업을 입력해주세요.',
  },
  {
    id: 'introduce',
    type: 'text',
    placeholder: '나를 소개해봐요:)',
    value: '',
    title: 'introduce',
    error: '',
  },
  {
    id: 'profile',
    type: 'file',
    placeholder: '',
    value: '',
    title: 'profile',
    error: '',
  },
];

export { loginInfo, signUpInfo, EditUserInfo };
