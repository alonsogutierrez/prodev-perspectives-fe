import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import * as gtag from '../lib/gtag';

const Document = () => {
  return (
    <Html>
      <Head>
        <link
          rel='stylesheet'
          href={`${
            process.env.NODE_ENV === 'production'
              ? process.env.NEXT_PUBLIC_BASEPATH ?? ''
              : ''
          }/css/font-awesome.css`}
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500&display=swap'
          rel='stylesheet'
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          strategy='afterInteractive'
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
