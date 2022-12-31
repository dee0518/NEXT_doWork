import { NextPage } from 'next';
import Head from 'next/head';
import useCheckSession from 'hooks/useCheckSession';
import GlobalNavBar from 'components/Common/GlobalNavBar';
import MypagePannel from 'components/Mypage/MypagePannel';
import MypageDeleteForm from 'components/Mypage/MypageDeleteForm';
import SkeletonMypageEdit from 'components/Skeleton/Mypage/SkeletonMypageEdit';

const DeleteAccount: NextPage = () => {
  const { user } = useCheckSession();

  if (!user) return <SkeletonMypageEdit />;

  return (
    <>
      <Head>
        <title>마이페이지 - 계정 삭제 : doWork</title>
      </Head>
      <GlobalNavBar />
      <MypagePannel />
      <MypageDeleteForm />
    </>
  );
};

export default DeleteAccount;
