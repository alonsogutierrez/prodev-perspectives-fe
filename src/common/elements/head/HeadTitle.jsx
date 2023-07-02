import Head from 'next/head';

const HeadTitle = ({ pageTitle }) => {
  const title = 'ProDev Perspectives - Alonso G. Blog';
  return (
    <Head>
      <title>{`${pageTitle} | ${title}`}</title>
      <meta name='description' content={title} />
      <meta property='og:title' content={`${pageTitle} | ${title}`} />
      <meta charSet='utf-8' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, shrink-to-fit=no'
      />
      <link
        rel='icon'
        type='image/x-icon'
        href={`${
          process.env.NODE_ENV === 'production'
            ? process.env.NEXT_PUBLIC_BASEPATH ?? ''
            : ''
        }/favicon.ico`}
      />
    </Head>
  );
};

export default HeadTitle;
