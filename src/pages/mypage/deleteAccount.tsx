import { NextPage } from 'next';
import Head from 'next/head';
import useCheckSession from 'hooks/useCheckSession';
import GlobalNavBar from 'components/Common/GlobalNavBar';
import MypagePannel from 'components/Mypage/MypagePannel';
import MypageDeleteForm from 'components/Mypage/MypageDeleteForm';

const DeleteAccount: NextPage = () => {
  const { session, user } = useCheckSession();

  if (!user && session) return <div>loading...</div>;
  if (!session) return null;

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
