import { NextPage } from 'next';
import Head from 'next/head';
import useCheckSession from 'hooks/useCheckSession';
import GlobalNavBar from 'components/Common/GlobalNavBar';
import MypageMain from 'components/Mypage/MypageMain';
import MypagePannel from 'components/Mypage/MypagePannel';
import SkeletonMypage from 'components/Skeleton/Mypage/SkeletonMypage';

const Mypage: NextPage = () => {
  const { user } = useCheckSession();

  return (
    <>
      <Head>
        <title>마이페이지 : doWork</title>
      </Head>
      {user ? (
        <>
          <GlobalNavBar />
          <MypagePannel />
          <MypageMain />
        </>
      ) : (
        <SkeletonMypage />
      )}
    </>
  );
};

export default Mypage;
