import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import mongoDB from 'database/mongoDB';
import { ObjectId } from 'mongodb';
import Footer from 'components/Common/Footer';
import Header from 'components/Common/Header';
import NoticeDetail from 'components/Notices/NoticeDetail';

export const getStaticPaths: GetStaticPaths = async () => {
  const { client, db } = await mongoDB();
  const noticesCollection = db.collection('notices');

  const notices = await noticesCollection.find().sort({ created_at: -1 }).toArray();
  client.close();

  const paths = notices.map(notice => ({ params: { id: notice._id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { client, db } = await mongoDB();
  const noticesCollection = db.collection('notices');

  const notice = await noticesCollection.findOne({ _id: ObjectId(params.id) });
  client.close();

  return {
    props: {
      notice: { ...notice, _id: notice._id.toString() },
    },
  };
};

const Notice = ({ notice }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>doWork에서 알려드립니다.</title>
      </Head>
      <Header />
      <NoticeDetail notice={notice} />
      <Footer />
    </>
  );
};

export default Notice;
