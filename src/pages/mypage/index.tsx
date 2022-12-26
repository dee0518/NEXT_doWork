import { NextPage } from 'next';
import Head from 'next/head';
import GlobalNavBar from 'components/Common/GlobalNavBar';
import MypageMain from 'components/Mypage/MypageMain';
import MypagePannel from 'components/Mypage/MypagePannel';

const Mypage: NextPage = () => (
  <>
    <Head>
      <title>마이페이지 : doWork</title>
    </Head>
    <GlobalNavBar />
    <MypagePannel />
    <MypageMain />
  </>
);

export default Mypage;
