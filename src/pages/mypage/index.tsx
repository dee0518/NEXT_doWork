import { NextPage } from 'next';
import Head from 'next/head';
import useCheckSession from 'hooks/useCheckSession';
import GlobalNavBar from 'components/Common/GlobalNavBar';
import MypageMain from 'components/Mypage/MypageMain';
import MypagePannel from 'components/Mypage/MypagePannel';

const Mypage: NextPage = () => {
  const { session, user } = useCheckSession();

  if (!user && session) return <div>loading...</div>;
  if (!session) return null;

  return (
    <>
      <Head>
        <title>마이페이지 : doWork</title>
      </Head>
      <GlobalNavBar />
      <MypagePannel />
      <MypageMain />
    </>
  );
};

export default Mypage;
