import { useRef, useEffect } from 'react'

import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import {
    StripeCardCvcElementChangeEvent,
    StripeCardExpiryElementChangeEvent,
StripeCardNumberElementChangeEvent,
} from "@stripe/stripe-js";

//* UTILS
import { paymentIntenthandler } from '@/pages/api/checkout-stripe'

import CreateStripeSession from '@/pages/api/StripeApi'

import { loadStripe } from '@stripe/stripe-js';

import axios from 'axios';

//* REDUX
import { useSelector } from 'react-redux'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* STYLES
import styles from '../styles/CardPayment.module.scss';

const pk = process.env.STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(pk)

const CardPayment = () => {

    const t = useTranslations('checkout')

    const stripe = useStripe()
    const elements = useElements()

    // console.log(stripe)
    // console.log(elements)

    const { cart, total } = useSelector( state => state.cart)
    const { payment_try } = useSelector( state => state.stripe)

    const form = useRef()

    const handleSubmit = async () => {

      // e.preventDefault()

        // if(!stripe || !elements) return

        // // let paymentIntent = await paymentIntenthandler({body:{total: total}})

        // console.log("STRIPE INTENT", paymentIntent)

      const stripe = await stripePromise;

      console.log(stripe)

      const checkoutSession = await CreateStripeSession({body:{item: "Filo Tag"}})

      console.log(checkoutSession)

      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id
      })

      console.log(result)
    }

    useEffect(() => {
      if (payment_try) handleSubmit()
    
    }, [payment_try])
    

    return (
      <div 
        ref={form} 
        className={styles["card-payment-box"]}
        // onSubmit={(e)=>handleSubmit(e)}
        >
        <div className={styles["card-number-box"]}>
            <h4 className={styles["card-header"]}>{t('Payment.n_card')}</h4>
            <div className={styles["input-detail"]}>
                <CardNumberElement
                    options={CARD_NUMBER_OPTIONS}
                    />
            </div>
        </div>
        <div className={styles["card-details-box"]}>
            <div className={styles["detail"]}>
                <h4 className={styles["card-header"]}>{t('Payment.expiration')}</h4>
                <div className={styles["input-detail"]}>
                    <CardExpiryElement
                    options={CARD_ELEMENT_OPTIONS}
                    className={styles["card-expiry-number"]}
                    />
                </div>
            </div>
            <div className={styles["detail"]}>
                <h4 className={styles["card-header"]}>{t('Payment.cvc')}</h4>
                <div className={styles["input-detail"]}>
                    <CardCvcElement
                    options={CARD_ELEMENT_OPTIONS}
                    className={styles["card-cvc-number"]}
                    />
                </div>
            </div>
        </div>
     </div>
    )
  }
  
  // Stripe has a defined style object that you can use to style Elements
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        border: "1px solid rgb(160, 160, 160)",
        iconColor: "black",
        color: "black",
        fontSize: "16px",
        fontFamily: "Raleway, sans-serif",
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "rgb(160, 160, 160)",
        },
      },
      invalid: {
        iconColor: "#fa004f",
        color: "#fa004f",
      },
    },
  };

  const CARD_NUMBER_OPTIONS = {
    showIcon: true,
    style: {
      base: {
        iconColor: "black",
        color: "black",
        fontSize: "16px",
        fontFamily: "Raleway, sans-serif",
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: "black",
        },
      },
      invalid: {
        iconColor: "#fa004f",
        color: "#fa004f",
      },
    },
  };
  export default CardPayment;