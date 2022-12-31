import { NextPage } from 'next';
import Head from 'next/head';
import useCheckSession from 'hooks/useCheckSession';
import GlobalNavBar from 'components/Common/GlobalNavBar';
import MypagePannel from 'components/Mypage/MypagePannel';
import MypageChangePw from 'components/Mypage/MypageChangePw';
import SkeletonMypageEdit from 'components/Skeleton/Mypage/SkeletonMypageEdit';

const ChangePw: NextPage = () => {
  const { user } = useCheckSession();

  if (!user) return <SkeletonMypageEdit />;

  return (
    <>
      <Head>
        <title>마이페이지 - 비밀번호 변경 : doWork</title>
      </Head>
      <GlobalNavBar />
      <MypagePannel />
      <MypageChangePw />
    </>
  );
};

export default ChangePw;
