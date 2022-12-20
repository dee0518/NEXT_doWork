import { iDefaultUserInfo } from 'types/auth';

type TValidation = {
  [key: string]: RegExp;
  email: RegExp;
  password: RegExp;
  name: RegExp;
  career: RegExp;
};

const validation: TValidation = {
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
  password: /^[A-Za-z0-9]{6,12}$/,
  name: /[^\s]/,
  career: /[^\s]/,
};

const checkValidation = (userInfo: iDefaultUserInfo[]) => {
  const errorTarget = userInfo.find(({ id, value }) =>
    id === 'passwordCheck'
      ? value !== (userInfo.find(info => info.id === 'password') as iDefaultUserInfo).value
      : !new RegExp(validation[id]).test(value),
  );

  return errorTarget ? { id: errorTarget.id, message: errorTarget.error } : null;
};

export default checkValidation;
