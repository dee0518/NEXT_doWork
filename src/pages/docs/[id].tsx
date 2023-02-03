import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from 'components/Common/Footer';
import Header from 'components/Common/Header';
import DocsMain from 'components/Docs/DocsMain';

const Docs: NextPage = () => (
  <>
    <Head>
      <title>doWork를 알아가요</title>
      <meta name="keywords" content="doWork, work, together, 같이, 일, 협업, 동료, 스케쥴, 일정, 관리" />
      <meta name="description" content="자세한 설명으로 doWork를 사용하는 방법을 알아가요" />
    </Head>
    <Header />
    <DocsMain />
    <Footer />
  </>
);

export default Docs;
