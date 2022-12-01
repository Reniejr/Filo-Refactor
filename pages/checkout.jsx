import React, { useState, useEffect } from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector, useDispatch } from 'react-redux'
import { stripeSlice } from '@/slices/stripeSlice'
import { checkout } from 'storage/checkout'

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

//* UTILITIES
import { numberToStringWithDecimals } from 'modules/checkout/utilities';
import { createOrder, onApprove } from '@/config/paypal';

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../modules/checkout/styles/Checkout.module.scss';
import sPaymentBox from '../modules/checkout/styles/PaymentBox.module.scss';

const stripePromise = loadStripe(
  `${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`
);

const Checkout = () => {

    const t = useTranslations('checkout')
    const { total, shipping_method, payment_method, billing, shipping, line_items, check_user_info } = useSelector( state => state.checkout)

    const [ isSubmit, setIsSubmit ] = useState(false)

    const dispatch = useDispatch()
    const { setTry } = stripeSlice.actions
    const { setPaymentMethod, resetCartItems } = checkout.actions

    const [stripe_intent, setStripeIntent] = useState({
      clientSecret: "",
      id: ""
    })

    useEffect(() => {

      if(payment_method === "stripe") {

        fetch('/api/StripeApi', {
          method: 'POST',
          headers:{ "Content-Type": "application/json"},
          body: JSON.stringify({
            amount: total,
            payment_intent_id: "",
            payment_method_types: ['card']
          })
        }).then( res => {
          // console.log(res)
          return res.json()
        }).then(data => {
          // console.log(data)
          setStripeIntent({
            clientSecret: data.client_secret,
            id: data.id
          })
        })
      }

      if(payment_method === "paypal" && check_user_info){

        const order = {
          "payment_method": "paypal",
          "payment_method_title": "PayPal",
            "set_paid": true,
            "billing": billing.data,
            "shipping": shipping.data.data,
            "line_items": line_items,
            "shipping_lines": [{
              ...shipping_method,
              total: shipping_method.total.toString()
            }]
          }

        paypal_sdk.Buttons({
          // Set up the transaction
          createOrder: createOrder(numberToStringWithDecimals(total)),
          // Finalize the transaction
          onApprove: onApprove(order, () => {
            dispatch(resetCartItems())
            document.location.href = '/thank-you-page'
          })  
        }).render('#paypal-button-container');
      }
      /* eslint-disable-next-line */
    }, [total, payment_method])

    const options = {
      clientSecret: stripe_intent.clientSecret
    }

    const handlePaymentMethod = (method) => {
      
      if(method === "stripe") dispatch(setPaymentMethod({
        "payment_method": "stripe",
        "payment_method_title": "Card"
      }))
      
      if (method === "paypal") dispatch(setPaymentMethod({
        "payment_method": "paypal",
        "payment_method_title": "Paypal"
      }))

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
                <div className={sPaymentBox["payment-box"]}>
                  <div className={`${sPaymentBox["payment-method"]} ${sPaymentBox["stripe-method"]}`}>
                      <div className={sPaymentBox["method-choose"]}>
                      <input 
                          type="radio" 
                          id="stripe" 
                          value="stripe"
                          checked={payment_method === "stripe" ? true : false}
                          onChange={() => handlePaymentMethod("stripe")}
                          />
                      <label htmlFor="stripe">{t('Payment.stripe')}</label>
                      </div>
                      {
                        payment_method === "stripe" && check_user_info ?
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
                      {
                        payment_method === "stripe" && !check_user_info ?
                        <p className={sPaymentBox["form-not-filled"]}>{t("form_not_filled")}</p> : null
                      }
                  </div>
                  <div className={`${sPaymentBox["payment-method"]} ${sPaymentBox["paypal-method"]}`}>
                      <div className={sPaymentBox["method-choose"]}>
                      <input 
                          type="radio" 
                          id="paypal" 
                          value="paypal"
                          checked={payment_method === "paypal" ? true : false}
                          onChange={() => handlePaymentMethod("paypal")}
                          />
                      <label htmlFor="paypal">{t('Payment.paypal')}</label>
                      </div>
                      {
                        payment_method === "paypal" && check_user_info ?
                        <div className={sPaymentBox["payment-form"]}>
                          <div id="paypal-button-container">
                          </div>
                        </div> : null
                      }
                      {
                        payment_method === "paypal" && !check_user_info ?
                        <p className={sPaymentBox["form-not-filled"]}>{t("form_not_filled")}</p> : null
                      }
                  </div>
              </div>
                <PrivacyTerms/>
                <button
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