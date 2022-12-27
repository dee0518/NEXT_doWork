import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { authActions } from 'store/modules/auth';
import { useReduxDispatch, useReduxSelector } from 'hooks/useRedux';

const useCheckSession = () => {
  const { data: session } = useSession();
  const { user } = useReduxSelector(state => state.auth);
  const dispatch = useReduxDispatch();

  const getUser = async (userId: string) => {
    try {
      const result = await fetch(`/api/auth/user/${userId}`, { method: 'GET' });
      const response = await result.json();

      if (response.result) {
        dispatch(authActions.setUser(response.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (session) {
      if (!user) {
        const { userId } = session.user;
        getUser(userId as string);
      }
    }
  }, [session]);

  return { session, user };
};

export default useCheckSession;
