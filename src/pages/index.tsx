import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from 'components/Common/Footer';
import Header from 'components/Common/Header';
import HomeMain from 'components/Home/HomeMain';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>doWork : 같이 일해 보아요:&#41;</title>
      </Head>
      <Header />
      <HomeMain />
      <Footer />
    </>
  );
};

export default Home;
