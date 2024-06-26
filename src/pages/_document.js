import { Html, Head, Main, NextScript } from "next/document";

const isProduction = process.env.NODE_ENV === "production";

const Document = () => {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href={`${
            isProduction ? process.env.NEXT_PUBLIC_BASEPATH ?? "" : ""
          }/css/font-awesome.css`}
        />
        <link
          rel="stylesheet"
          href={`${
            isProduction ? process.env.NEXT_PUBLIC_BASEPATH ?? "" : ""
          }/css/prodev-styles.css`}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500&display=swap"
          rel="stylesheet"
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
