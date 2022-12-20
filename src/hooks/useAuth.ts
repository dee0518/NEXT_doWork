import { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react';
import { iDefaultUserInfo, AuthType, AuthError } from 'types/auth';
import checkValidation from 'utils/checkValidation';

const useAuth = <T extends AuthType, M extends iDefaultUserInfo>(defaultUserInfo: Array<M>) => {
  const isStart = useRef<boolean>(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [userInfo, setUserInfo] = useState<Array<M>>(defaultUserInfo);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isStart.current) isStart.current = true;
    const { name, value } = e.target as HTMLInputElement;
    setUserInfo(prev => prev.map(info => (info.id === name ? { ...info, value } : info)));
  };

  useEffect(() => {
    if (!isStart.current) return;

    const errorMessage = checkValidation(userInfo);
    setError(errorMessage);
  }, [userInfo]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (checkValidation(userInfo)) return;
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
