import { useEffect } from 'react'
import { useRouter } from 'next/router'

//* REDUX
import { useDispatch } from 'react-redux'
import { wrapper } from '../store'
import { cartSlice } from '@/slices/cartSlice'
import { productsSlice } from '@/slices/productSlice'
import { invoiceSlice } from '@/slices/invoiceSlice'

//* GA4
import Script from 'next/script'
import * as gtag from '../config/gtag'

//* LAYOUTS
import MainLayout from '../layouts/MainLayout';

//* WooCommerceApi
import WCApi from '../config/WooCommerceApi'

//* DATA
import { wc_details } from '@/products/filo-tag'

//* TRANSLATION
import { NextIntlProvider, IntlErrorCode } from 'next-intl'

//* STYLES
import '@/styles/globals.scss';

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
  const dispatch = useDispatch()
  const { setCart, setTotal } = cartSlice.actions
  const { setProducts } = productsSlice.actions
  const { setInvoice } = invoiceSlice.actions

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {

    const ISSERVER = typeof window === "undefined";

    if (!ISSERVER) {

      ( async () => { 
        const products = await WCApi.get('products');
        const FT = products.data.find( product => product.name === "Filo Tag");
        const ft_variations = await Promise.all(
            wc_details.map( async (wc_prod) => {
            const variation = await WCApi.get(`products/${FT.id}/variations/${wc_prod.id}`)
            const { price, id} = variation.data
            return {
              price, id
            }
          })
        )

        const ft_products = wc_details.map( product => {
          return{
            ...product,
            price: parseFloat(ft_variations.find( variant => variant.id === product.id).price),
            name: "Filo Tag - Bluetooth Tracker",
            product_id: FT.id
          }
        })
        dispatch(setProducts(ft_products))

      })();

      const cart_saved = JSON.parse(localStorage.getItem('cart'))
      const total_saved = parseFloat(localStorage.getItem('total'))
      const invoice = JSON.parse(localStorage.getItem('invoice'))
      if (cart_saved) {
        setTimeout(() => {
          dispatch(setCart(cart_saved));
          dispatch(setTotal(total_saved));
          dispatch(setInvoice(invoice));
        }, 1500);
      }
    }

    /* eslint-disable-next-line */
  },[])
  
  return <>
  <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-${gtag.GA_TRACKING_ID}`}
        id="gtag-manager"
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
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
