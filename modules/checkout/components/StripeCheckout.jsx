import React, { useState, useEffect, useRef } from 'react'

//* WOOCOMMERCE
import axios from 'axios'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector, useDispatch } from 'react-redux';
import { checkout } from 'storage/checkout';

//* ROUTER
import { useRouter } from 'next/router';

//* STRIPE
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

//* STYLES
import styles from '../styles/StripeCheckout.module.scss';

const StripeCheckout = ({paymentIntent}) => {

  //* TRANSLATION
  const t = useTranslations('checkout')
  
  //* REDUX STATE
  const { payment_try } = useSelector( state => state.stripe)
  const { line_items, billing, shipping, shipping_method } = useSelector( state => state.checkout)
    //* REDUX ACTIONS
  const dispatch = useDispatch()
  const { resetCartItems, setIsCardFilled, checkUserInfo } = checkout.actions

  //* ROUTER
  const router = useRouter()

  //* REF
  const submitBtn = useRef(null)

  //* STATES
  const [ message, setMessage ] = useState("")
  const [ elEmpty, setElEmpty ] = useState(-2)

  //* STRIPE
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (elEmpty === -2) {
      dispatch(setIsCardFilled(false))
      dispatch(checkUserInfo())
    }
    
    return () => {
      dispatch(setIsCardFilled(false))
      dispatch(checkUserInfo())
    }
    
    /* eslint-disable-next-line */
  },[])
  useEffect(() => {
    if (elEmpty === 0) {
      dispatch(setIsCardFilled(true))
      dispatch(checkUserInfo())
    } else {
      dispatch(setIsCardFilled(false))
      dispatch(checkUserInfo())
    }
    
    /* eslint-disable-next-line */
  },[elEmpty])

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = paymentIntent.clientSecret

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
    
    /* eslint-disable-next-line */
  }, [stripe])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log('not loaded');
      return;
    }

    // setIsLoading(true);

    const paymentMethod = {
      payment_method: {
        card: elements.getElement(CardNumberElement)
      }
    }

    const payment = await stripe.confirmCardPayment(paymentIntent.clientSecret, paymentMethod);
    
    if (payment.paymentIntent && payment.paymentIntent.status === "succeeded") {
      //* CREATE WOOCOMMERCE ORDER
      const order = {
        "payment_method": "stripe",
        "payment_method_title": "Card",
        "set_paid": true,
        "billing": billing.data,
        "shipping": shipping.data.data,
        "line_items": line_items,
        "shipping_lines": [{
          ...shipping_method,
          total: shipping_method.total.toString()
        }]
      }
      axios.post(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/wc/v3/orders?consumer_key=${process.env.NEXT_PUBLIC_WOO_CK}&consumer_secret=${process.env.NEXT_PUBLIC_WOO_CS}`, order)
      .then((response) => {
        // console.log(response.data)
      })

      dispatch(resetCartItems())
      router.push("/thank-you-page")
    }

    // setIsLoading(false);
  };
  
  useEffect(() => {
    if(payment_try === true) {
      submitBtn.current.click()
    }
  }, [payment_try])
  
  const handleValidation = (e) => {
    if (e.error) {
      console.log(e.error.message);
      // dispatch(handleCheck(false));
    } else {
      // dispatch(handleCheck(true));
      console.log("");
    }
    setElEmpty(document.querySelectorAll('.StripeElement--empty').length)
    // if(elEmpty === 0) dispatch(handleCheck(true))
    // else dispatch(handleCheck(false))
  }


  return (
    <form className={styles['card-payment-box']} onSubmit={handleSubmit}>
      <div className={styles["card-number-box"]}>
            <h4 className={styles["card-header"]}>{t('Payment.n_card')}</h4>
            <div className={styles["input-detail"]}>
                <CardNumberElement
                    options={CARD_NUMBER_OPTIONS}
                    onChange={handleValidation}
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
                    onChange={handleValidation}
                    />
                </div>
            </div>
            <div className={styles["detail"]}>
                <h4 className={styles["card-header"]}>{t('Payment.cvc')}</h4>
                <div className={styles["input-detail"]}>
                    <CardCvcElement
                    options={CARD_ELEMENT_OPTIONS}
                    className={styles["card-cvc-number"]}
                    onChange={handleValidation}
                    />
                </div>
            </div>
        </div>
        <button
          style={{display: 'none'}}
          ref={submitBtn}
          >Submit</button>
    </form>
  )
}
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

export default StripeCheckout
