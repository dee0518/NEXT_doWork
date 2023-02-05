import type { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Footer from 'components/Common/Footer';
import Header from 'components/Common/Header';
import NoticesMain from 'components/Notices/NoticesMain';
import { iNoticePromise } from 'types/notices';

export const getStaticProps = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/notices?page=1`);
    const notices = await response.json();

    if (!notices.result) {
      return {
        props: {
          notices: [],
        },
      };
    }

    return {
      props: {
        notices: notices.data.map((notice: iNoticePromise) => ({ ...notice, _id: notice._id.toString() })),
      },
    };
  } catch (e) {
    console.log(e);
  }
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
