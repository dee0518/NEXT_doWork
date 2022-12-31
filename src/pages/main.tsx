import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { scheduleActions } from 'store/modules/schedule';
import useCheckSession from 'hooks/useCheckSession';
import { useReduxDispatch } from 'hooks/useRedux';
import GlobalNavBar from 'components/Common/GlobalNavBar';
import SchedulePannel from 'components/Schedule/SchedulePannel';
import ScheduleMain from 'components/Schedule/ScheduleMain';
import SkeletonSchedule from 'components/Skeleton/Schedule/SkeletonSchedule';

const Main: NextPage = () => {
  const { user } = useCheckSession();
  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(scheduleActions.setStringSelectedDate(new Date().toString()));
  }, []);

  if (!user) return <SkeletonSchedule />;

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
