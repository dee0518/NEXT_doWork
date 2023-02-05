import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import mongoDB from 'database/mongoDB';
import Footer from 'components/Common/Footer';
import Header from 'components/Common/Header';
import NoticesMain from 'components/Notices/NoticesMain';

export const getStaticProps = async () => {
  const { client, db } = await mongoDB();
  const noticesCollection = db.collection('notices');

  const notices = await noticesCollection.find().sort({ created_at: -1 }).toArray();
  client.close();

  return {
    props: {
      notices: notices.map(notice => ({ ...notice, _id: notice._id.toString() })),
    },
  };
};

const Notices = ({ notices }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>doWork에서 알려드립니다.</title>
      </Head>
      <Header />
      <NoticesMain notices={notices} />
      <Footer />
    </>
  );
};

export default Notices;
