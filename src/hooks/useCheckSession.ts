import { useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import { authActions } from 'store/modules/auth';
import { useReduxDispatch, useReduxSelector } from 'hooks/useRedux';

const useCheckSession = () => {
  const { data: session } = useSession();
  const { user } = useReduxSelector(state => state.auth);
  const dispatch = useReduxDispatch();

  const getUser = useCallback(
    async (userId: string) => {
      try {
        const result = await fetch(`/api/auth/user/${userId}`, { method: 'GET' });
        const response = await result.json();

        if (response.result) {
          dispatch(authActions.setUser(response.data));
        }
      } catch (e) {
        alert(e);
      }
<<<<<<< HEAD
    },
    [dispatch],
  );
=======
    } catch (e) {
      console.log(e);
    }
  };
>>>>>>> parent of 7fd3d6b (:art: 배포 위해 console 대신 alert으로 대체)

  useEffect(() => {
    if (session) {
      if (!user) {
        const { userId } = session.user;
        getUser(userId as string);
      }
    }
  }, [session, user, getUser]);

  return { session, user };
};

export default useCheckSession;
