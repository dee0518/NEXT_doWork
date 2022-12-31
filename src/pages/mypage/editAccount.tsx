import { NextPage } from 'next';
import Head from 'next/head';
import useCheckSession from 'hooks/useCheckSession';
import GlobalNavBar from 'components/Common/GlobalNavBar';
import MypagePannel from 'components/Mypage/MypagePannel';
import MypageEditForm from 'components/Mypage/MypageEditForm';
import SkeletonMypageEdit from 'components/Skeleton/Mypage/SkeletonMypageEdit';

const EditAccount: NextPage = () => {
  const { user } = useCheckSession();

  if (!user) return <SkeletonMypageEdit />;

  return (
    <>
      <Head>
        <title>마이페이지 - 정보 수정 : doWork</title>
      </Head>
      <GlobalNavBar />
      <MypagePannel />
      <MypageEditForm />
    </>
  );
};

export default EditAccount;
