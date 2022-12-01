import { useEffect } from 'react'
import { useRouter } from 'next/router'

//* REDUX
import { wrapper } from '../store'

//* GA4
import Script from 'next/script'
import * as gtag from '../config/gtag'

//* LAYOUTS
import MainLayout from '../layouts/MainLayout';

//* HOOKS
import useWCHooks from '@/hooks/WCHooks'

//* TRANSLATION
import { NextIntlProvider, IntlErrorCode } from 'next-intl'

//* STYLES
import '@/styles/globals.scss';

//* FONTAWESOME
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

//* NEXTJS INTL FN
function onError(error) {
  if (process.env.NODE_ENV !== 'production') {
    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
      console.warn(error);
    } else {
      console.error(error);
    }
  }
}

function getMessageFallback({ namespace, key, error }) {
  const path = [namespace, key].filter((part) => part != null).join('.');

  if (error.code === IntlErrorCode.MISSING_MESSAGE) {
    return `${path} is not yet translated`;
  }
  return `Fix translation message at: ${path}`;
}

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  useWCHooks()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  
  return <>
  <Script
    async
    strategy="afterInteractive"
    src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
    id="gtag-manager"
  />
  <Script
    async
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
    id="gtag-datalayer-allow"
  />
  <Script
    async
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtag.GA_TRACKING_ID}')
      `,
    }}
    id="gtag-event-test"
  />
  <NextIntlProvider 
    messages={pageProps.messages} 
    onError={onError}
    getMessageFallback={getMessageFallback}
    >
      <MainLayout translation={{...pageProps.messages}}>
        <Component {...pageProps} />
      </MainLayout>
  </NextIntlProvider>
  </>
  
}

export default wrapper.withRedux(MyApp)
