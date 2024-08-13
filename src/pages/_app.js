import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.scss";
import * as gtag from "../lib/gtag";

const isProduction = process.env.NODE_ENV === "production";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    // TODO: Add dark mode from initial load
    document.body.classList.add("active-dark-mode");
    document.body.classList.remove("active-light-mode");
    const handleRouteChange = (url) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      {/* enable analytics script only for production */}
      {isProduction && (
        <>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
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
          {/* Google AdSense */}
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${gtag.GADSENSE_CLIENT}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
            async
          />
          {/* Hotjar Tracking Code for Site 5092735 (name missing) */}
          <Script id="hotjar-snippet">
            {`
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:5092735,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `}
          </Script>
        </>
      )}
      <Component {...pageProps} />
    </>
  );
};

export default App;
