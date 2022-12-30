import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react';
import { postUser } from 'lib/user';
import { checkOneValidation, checkAllValidation } from 'utils/checkValidation';
import { LOGIN } from 'constants/navigation';
import { iDefaultUserInfo, iUserInfo, iLoginInfo, AuthType, AuthError } from 'types/auth';

const useAuth = <T extends AuthType>(defaultUserInfo: iDefaultUserInfo[]) => {
  const isSubmit = useRef<boolean>(false);
  const targetRef = useRef<string>('');
  const router = useRouter();
  const [error, setError] = useState<AuthError | null>(null);
  const [userInfo, setUserInfo] = useState<iDefaultUserInfo[]>(defaultUserInfo);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    targetRef.current = name;
    setUserInfo(prev => prev.map(info => (info.id === name ? { ...info, value } : info)));
  };

  const onCreateUser = async (data: iUserInfo): Promise<any> => {
    try {
      const response = await postUser(data);

      if (response.result) router.push(LOGIN);
      else setError({ id: 'all', message: response.error });
    } catch (e) {
      setError({ id: 'all', message: 'error' });
    }
  };

  const onSignIn = async (data: iLoginInfo) => {
    try {
      const response = await signIn('credentials', {
        redirect: false,
        ...data,
      });

      if (response && !response.ok) setError({ id: 'all', message: response.error as string });
    } catch (e) {
      setError({ id: 'all', message: 'error' });
    }
  };

  useEffect(() => {
    const errorMessage = isSubmit.current
      ? checkAllValidation(userInfo)
      : targetRef.current
      ? checkOneValidation(targetRef.current, userInfo)
      : null;

    if (error === errorMessage || (error && errorMessage && error.id === errorMessage.id)) return;

    setError(errorMessage);
  }, [userInfo]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorMessage = checkAllValidation(userInfo);
    if (errorMessage) {
      if (!isSubmit.current) isSubmit.current = true;

      setError(errorMessage);
      return;
    }

    const isSignUp = userInfo.find(info => info.id === 'passwordCheck');
    const data: T = userInfo.reduce((acc, cur) => {
      if (cur.id === 'passwordCheck') return acc;
      return { ...acc, [cur.id]: cur.value };
    }, {}) as T;

    if (isSignUp) onCreateUser({ ...data, profile: '', introduce: '' } as iUserInfo);
    else onSignIn(data as iLoginInfo);
  };

  return {
    error,
    userInfo,
    onChange,
    onSubmit,
  };
};

export default useAuth;
