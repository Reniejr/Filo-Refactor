import { useState, useEffect } from 'react'
//* TRANSLATION
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector, useDispatch } from 'react-redux'
import { stripeSlice } from '@/slices/stripeSlice'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';
import Coupon from '../modules/checkout/components/Coupon';
import CustomerInfo from '../modules/checkout/components/CustomerInfo'
import CostDetails from '../modules/checkout/components/CostDetails';
import PrivacyTerms from '../modules/checkout/components/PrivacyTerms';
import ProductList from 'modules/checkout/components/ProductList';
import StripeCheckout from '../modules/checkout/components/StripeCheckout';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../modules/checkout/styles/Checkout.module.scss';
import sPaymentBox from '../modules/checkout/styles/PaymentBox.module.scss';

const stripePromise = loadStripe(
  `${process.env.STRIPE_PUBLIC_KEY}`
);

const Checkout = () => {

    const t = useTranslations('checkout')
    const { cart, total } = useSelector( state => state.cart)
    const { products } = useSelector( state => state.products)
    const { billing, shipping, shipping_method, isCheck, privacy_accepted } = useSelector( state => state.order)

    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ method, setMethod ] = useState("stripe")

    const dispatch = useDispatch()
    const { setTry } = stripeSlice.actions

    const [stripe_intent, setStripeIntent] = useState({
      clientSecret: "",
      id: ""
    })

    useEffect(() => {
      fetch('/api/StripeApi', {
        method: 'POST',
        headers:{ "Content-Type": "application/json"},
        body: JSON.stringify({
          amount: shipping_method.total !== 0 ? (total * 100) + ( shipping_method.total * 100 ) : total * 100,
          payment_intent_id: "",
          payment_method_types: ['card']
        })
      }).then( res => {
        // console.log(res)
        return res.json()
      }).then(data => {
        console.log(data)
        setStripeIntent({
          clientSecret: data.client_secret,
          id: data.id
        })
      })
      /* eslint-disable-next-line */
    }, [shipping_method])

    const options = {
      clientSecret: stripe_intent.clientSecret
    }

  return (
    <>
        <CustomHead page="checkout"/>
        <div 
        className={globals["page"]}
        id={styles["checkout"]}
        >
            <CustomerInfo isSubmit={isSubmit}/>
            <div className={`${styles["order-container"]}`}>
                <ProductList/>
                <CostDetails/>
                <Coupon/>
                {
                  shipping_method.method_id === "cannot_ship" || shipping_method.method_id === "" ?
                    null : 
                    <div className={sPaymentBox["payment-box"]}>
                      <div className={`${sPaymentBox["payment-method"]} ${sPaymentBox["stripe-method"]}`}>
                          <div className={sPaymentBox["method-choose"]}>
                          <input 
                              type="radio" 
                              id="stripe" 
                              value="stripe"
                              checked={method === "stripe" ? true : false}
                              onChange={() => setMethod("stripe")}
                              />
                          <label htmlFor="stripe">{t('Payment.stripe')}</label>
                          </div>
                          {
                            method === "stripe" ?
                            <div className={sPaymentBox["payment-form"]}>
                                {
                                  stripe_intent.clientSecret && (
                                    <Elements stripe={stripePromise} options={options}>
                                      <StripeCheckout paymentIntent={stripe_intent}/>
                                    </Elements>
                                    )
                                }
                            </div>  : null
                          }
                      </div>
                      <div className={`${sPaymentBox["payment-method"]} ${sPaymentBox["paypal-method"]}`}>
                          <div className={sPaymentBox["method-choose"]}>
                          <input 
                              type="radio" 
                              id="paypal" 
                              value="paypal"
                              checked={method === "paypal" ? true : false}
                              onChange={() => setMethod("paypal")}
                              />
                          <label htmlFor="paypal">{t('Payment.paypal')}</label>
                          </div>
                          {
                          method === "paypal" ?
                          <div className={sPaymentBox["payment-form"]}>
                          </div> : null
                          }
                      </div>
                  </div>
                }
                <PrivacyTerms/>
                <button
                  // className={`${globals["btn"]} ${globals["btn-primary"]} ${styles["order-btn"]} ${!isCheck ? styles["disabled"] : null}`}
                  className={`${globals["btn"]} ${globals["btn-primary"]} ${styles["order-btn"]} ${styles["disabled"]}`}
                  onClick={() => dispatch(setTry())}
                >
                  {t("place_order")}
                </button>
            </div>
        </div>    
    </>
  )
}

export async function getStaticProps({locale}) {

    const messages = {
      header: (await import(`../translations/header/${locale}.json`)).default,
      footer:  (await import(`../translations/footer/${locale}.json`)).default,
      general: (await import(`../translations/common/${locale}.json`)).default,
      checkout: (await import(`../translations/checkout/${locale}.json`)).default,
      products: (await import(`../translations/products/${locale}.json`)).default,
    }
  
    return {
      props: {
        messages
      }
    };
}  

export default Checkout