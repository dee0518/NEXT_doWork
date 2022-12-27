import { NextPage } from 'next';
import Head from 'next/head';
import useCheckSession from 'hooks/useCheckSession';
import GlobalNavBar from 'components/Common/GlobalNavBar';
import SchedulePannel from 'components/Schedule/SchedulePannel';
import ScheduleMain from 'components/Schedule/ScheduleMain';

const Main: NextPage = () => {
  const { session, user } = useCheckSession();

  if (!user && session) return <div>loading...</div>;
  if (!session) {
    return null;
  }

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
