import type { NextPage } from 'next';
import Head from 'next/head';
import HomeFooter from 'components/Common/HomeFooter';
import HomeHeader from 'components/Common/HomeHeader';
import HomeMain from 'components/Home/HomeMain';

const Home: NextPage = () => (
  <>
    <Head>
      <title>doWork : 같이 일해 보아요:)</title>
      <meta name="keywords" content="doWork, work, together, 같이, 일, 협업, 동료, 스케쥴, 일정, 관리" />
      <meta name="description" content="일정 관리를 하면서 같이 일해보아요. 함께 즐거움을 쌓아 나가요." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <HomeHeader />
    <HomeMain />
    <HomeFooter />
  </>
);

export default Home;
