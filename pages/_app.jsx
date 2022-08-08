//* LAYOUTS
import MainLayout from '../layouts/MainLayout';

//* TRANSLATION
import { NextIntlProvider, IntlErrorCode } from 'next-intl'

//* STYLES
import '@/styles/globals.scss';

//* NEXTJS INTL FN
// function onError(error) {
//   if (process.env.NODE_ENV !== 'production') {
//     if (error.code === IntlErrorCode.MISSING_MESSAGE) {
//       console.warn(error);
//     } else {
//       console.error(error);
//     }
//   }
// }

// function getMessageFallback({ namespace, key, error }) {
//   const path = [namespace, key].filter((part) => part != null).join('.');

//   if (error.code === IntlErrorCode.MISSING_MESSAGE) {
//     return `${path} is not yet translated`;
//   }
//   return `Fix translation message at: ${path}`;
// }

function MyApp({ Component, pageProps }) {
  
  return <NextIntlProvider 
            messages={pageProps.messages} 
            // onError={onError}
            // getMessageFallback={getMessageFallback}
            >
              <MainLayout translation={{...pageProps.messages}}>
                <Component {...pageProps} />
              </MainLayout>
          </NextIntlProvider>
}

export default MyApp
