import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://next-do-work.vercel.app" />
          <meta property="og:title" content="doWork" />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/dowork-bd9d9.appspot.com/o/images%2FsiteInfo%2Fog_doWork.png?alt=media&token=465375b0-749a-4f71-9204-f0f7cb398e89"
          />
          <meta property="og:description" content="함께 일해보아요:)" />
          <meta property="og:site_name" content="doWork" />
          <meta property="og:locale" content="en_US" />
          <meta name="keywords" content="doWork, work, together, 같이, 일, 협업, 동료, 스케쥴, 일정, 관리" />
          <meta name="description" content="자세한 설명으로 doWork를 사용하는 방법을 알아가요" />
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&family=Poppins:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <div id="snack__bar" />
          <div id="modal__root" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
