import { useEffect } from 'react';
import { useRouter } from 'next/router';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/style.scss';
import * as gtag from '../lib/gtag';

const isProduction = process.env.NODE_ENV === 'production';

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    document.body.classList.add('active-dark-mode');
    document.body.classList.remove('active-light-mode');
    const handleRouteChange = (url) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
