import { useState } from 'react'
//* TRANSLATION
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector, useDispatch } from 'react-redux'
import { stripeSlice } from '@/slices/stripeSlice'

//* COMPONENTS
import CustomHead from '@/main/components/CustomHead';
// import ProductInCart from '../modules/cart/components/ProductInCart';
// import Invoice from '../modules/cart/components/Invoice';
// import { LinkCTA } from '@/common/components/CTA';
// import ProductOrder from '../modules/checkout/components/ProductOrder';
import Coupon from '../modules/checkout/components/Coupon';
// import PaymentBox from 'modules/checkout/components/PaymentBox';
import CustomerInfo from '../modules/checkout/components/CustomerInfo'
import CostDetails from '../modules/checkout/components/CostDetails';
import PrivacyTerms from '../modules/checkout/components/PrivacyTerms';
import ProductList from 'modules/checkout/components/ProductList';
import StripeCheckout from '@/main/components/StripeCheckout';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//* UTILS
import { fetchPostJSON } from '@/utilities/api-helpers';

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../modules/checkout/styles/Checkout.module.scss';
import sPaymentBox from '../modules/checkout/styles/PaymentBox.module.scss';
import sPayCard from '../modules/_main/styles/CardPayment.module.scss';

const stripePromise = loadStripe(
  `${process.env.STRIPE_PUBLIC_KEY}`
);

const Checkout = () => {

    const t = useTranslations('checkout')
    const {cart, total} = useSelector( state => state.cart)
    const { products } = useSelector( state => state.products)

    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ method, setMethod ] = useState("stripe")

    const dispatch = useDispatch()
    const { setTry } = stripeSlice.actions

    const handleSubmit = async (e) => {

      e.preventDefault()
      const response = await fetchPostJSON('/api/StripeApi', {
        items : cart
      })

      console.log(response)

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
                {/* <PaymentBox/> */}
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
                            {/* <StripeCheckout/> */}
                            <Elements stripe={stripePromise}>
                              <form 
                                className={sPayCard["card-payment-box"]}
                                onSubmit={(e)=>handleSubmit(e)}
                                >
                                <div className={sPayCard["card-number-box"]}>
                                    <h4 className={sPayCard["card-header"]}>{t('Payment.n_card')}</h4>
                                    <div className={sPayCard["input-detail"]}>
                                        <CardNumberElement
                                            options={CARD_NUMBER_OPTIONS}
                                            />
                                    </div>
                                </div>
                                <div className={sPayCard["card-details-box"]}>
                                    <div className={sPayCard["detail"]}>
                                        <h4 className={sPayCard["card-header"]}>{t('Payment.expiration')}</h4>
                                        <div className={sPayCard["input-detail"]}>
                                            <CardExpiryElement
                                            options={CARD_ELEMENT_OPTIONS}
                                            className={sPayCard["card-expiry-number"]}
                                            />
                                        </div>
                                    </div>
                                    <div className={sPayCard["detail"]}>
                                        <h4 className={sPayCard["card-header"]}>{t('Payment.cvc')}</h4>
                                        <div className={sPayCard["input-detail"]}>
                                            <CardCvcElement
                                            options={CARD_ELEMENT_OPTIONS}
                                            className={sPayCard["card-cvc-number"]}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                  className={`${globals["btn"]} ${globals["btn-primary"]} ${styles["order-btn"]}`}
                                  // onClick={() => dispatch(setTry())}
                                  type="submit"
                                >
                                  {t("place_order")}
                                </button>
                            </form>
                            </Elements>
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
                <PrivacyTerms/>
                {/* <button
                  className={`${globals["btn"]} ${globals["btn-primary"]} ${styles["order-btn"]}`}
                  // onClick={() => dispatch(setTry())}
                  type="submit"
                >
                  {t("place_order")}
                </button> */}
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