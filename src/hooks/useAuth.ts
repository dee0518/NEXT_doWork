import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { ChangeEvent, FormEvent, useEffect, useState, useRef } from 'react';
import checkValidation from 'utils/checkValidation';
import { iDefaultUserInfo, AuthType, AuthError } from 'types/auth';
import { LOGIN } from 'constants/navigation';

const useAuth = <T extends AuthType>(defaultUserInfo: iDefaultUserInfo[]) => {
  const isStart = useRef<boolean>(false);
  const router = useRouter();
  const [error, setError] = useState<AuthError | null>(null);
  const [userInfo, setUserInfo] = useState<iDefaultUserInfo[]>(defaultUserInfo);

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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (checkValidation(userInfo)) return;

    const isSignUp = userInfo.find(info => info.id === 'passwordCheck');
    const data: T = userInfo.reduce((acc, cur) => {
      if (cur.id === 'passwordCheck') return acc;
      return { ...acc, [cur.id]: cur.value };
    }, {}) as T;

    let result = null;
    try {
      if (isSignUp) {
        const res = await fetch(`api/auth/signup`, {
          method: 'POST',
          body: JSON.stringify({ ...data, profile: '', introduce: '' }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        result = await res.json();
      } else {
        result = await signIn('credentials', {
          redirect: false,
          ...data,
        });
      }

      if (result.result || result.ok) {
        if (isSignUp) router.push(LOGIN);
      } else setError({ id: 'all', message: result.error });
    } catch {
      setError({ id: 'all', message: result.error });
    }
  };

  return {
    error,
    userInfo,
    onChange,
    onSubmit,
  };
};

export default useAuth;
