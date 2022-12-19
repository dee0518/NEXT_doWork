import { ChangeEvent, FormEvent, useState } from 'react';
import { iDefaultUserInfo, AuthType } from 'types/auth';

const useAuth = <T extends AuthType, M extends iDefaultUserInfo>(defaultUserInfo: Array<M>) => {
  const [error, setError] = useState<string>('');
  const [pass, setPass] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<Array<M>>(defaultUserInfo);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setUserInfo(prev => prev.map(info => (info.id === name ? { ...info, value } : info)));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!pass) return;
    // api 요청
    console.log(userInfo);
  };

  const onClickAuth = () => {};

  return {
    error,
    userInfo,
    onChange,
    onSubmit,
    onClickAuth,
  };
};

export default useAuth;
