import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { authActions } from 'redux/auth';
import { useReduxDispatch } from 'hooks/useRedux';
import GlobalNavBar from 'components/Common/GlobalNavBar';
import SchedulePannel from 'components/Schedule/SchedulePannel';
import ScheduleMain from 'components/Schedule/ScheduleMain';
import { LOGIN } from 'constants/navigation';

const Main: NextPage = () => {
  const { data: session } = useSession();
  const dispatch = useReduxDispatch();
  const router = useRouter();
  const getUser = async (userId: string) => {
    try {
      const result = await fetch(`api/auth/user/${userId}`, { method: 'GET' });
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
      const { userId } = session.user;
      console.log(userId);
      if (!userId) {
        router.push(LOGIN);
        return;
      }
      getUser(userId);
    } else {
      router.push(LOGIN);
    }
  }, []);

  return (
    <>
      <Head>
        <title>일정을 관리해 보아요: doWork</title>
      </Head>
      <GlobalNavBar />
      <SchedulePannel />
      <ScheduleMain />
    </>
  );
};

export default Main;
