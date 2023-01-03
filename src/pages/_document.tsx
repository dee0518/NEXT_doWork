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
          <meta property="og:image" content="gs://dowork-bd9d9.appspot.com/images/siteInfo/og_doWork.png" />
          <meta property="og:description" content="함께 일해보아요:)" />
          <meta property="og:site_name" content="doWork" />
          <meta property="og:locale" content="en_US" />
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
