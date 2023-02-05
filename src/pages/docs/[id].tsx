import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from 'components/Common/Footer';
import Header from 'components/Common/Header';
import DocsMain from 'components/Docs/DocsMain';

const Docs: NextPage = () => (
  <>
    <Head>
      <title>doWork를 알아가요</title>
    </Head>
    <Header />
    <DocsMain />
    <Footer />
  </>
);

export default Docs;
