import { AuthError, iDefaultUserInfo } from 'types/auth';

type TValidation = {
  [key: string]: RegExp;
  email: RegExp;
  password: RegExp;
  name: RegExp;
  career: RegExp;
};

type TCheckError = AuthError | null;

const validation: TValidation = {
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
  password: /^[A-Za-z0-9]{6,12}$/,
  name: /[^\s]/,
  career: /[^\s]/,
};

const testValidation = (id: string, value: string, userInfo: iDefaultUserInfo[]): boolean => {
  const isError =
    id === 'passwordCheck'
      ? value !== (userInfo.find(info => info.id === 'password') as iDefaultUserInfo).value
      : !new RegExp(validation[id]).test(value);
  return isError;
};

const checkOneValidation = (name: string, userInfo: iDefaultUserInfo[]): TCheckError => {
  const checkedTarget = userInfo.find(info => info.id === name);
  const { id, value, error } = checkedTarget as iDefaultUserInfo;

  return testValidation(id, value, userInfo) ? { id, message: error } : null;
};

const checkAllValidation = (userInfo: iDefaultUserInfo[]): TCheckError => {
  const errorTarget = userInfo.find(({ id, value }) => testValidation(id, value, userInfo));
  return errorTarget ? { id: errorTarget.id, message: errorTarget.error } : null;
};

export { checkOneValidation, checkAllValidation };
