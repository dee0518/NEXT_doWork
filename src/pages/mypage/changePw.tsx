import { NextPage } from 'next';
import Head from 'next/head';
import useCheckSession from 'hooks/useCheckSession';
import GlobalNavBar from 'components/Common/GlobalNavBar';
import MypagePannel from 'components/Mypage/MypagePannel';
import MypageChangePw from 'components/Mypage/MypageChangePw';
import SkeletonMypageEdit from 'components/Skeleton/Mypage/SkeletonMypageEdit';

const ChangePw: NextPage = () => {
  const { user } = useCheckSession();

  return (
    <>
      <Head>
        <title>마이페이지 - 비밀번호 변경 : doWork</title>
      </Head>
      {user ? (
        <>
          <GlobalNavBar />
          <MypagePannel />
          <MypageChangePw />
        </>
      ) : (
        <SkeletonMypageEdit />
      )}
    </>
  );
};

export default ChangePw;
