import React, { useState } from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import StripeCheckout from '@/main/components/StripeCheckout';

//* STYLES
import styles from '../styles/PaymentBox.module.scss';

const PaymentBox = () => {

    const t = useTranslations('checkout')

    const [ method, setMethod ] = useState("stripe")

  return (
    <div className={styles["payment-box"]}>
        <div className={`${styles["payment-method"]} ${styles["stripe-method"]}`}>
            <div className={styles["method-choose"]}>
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
            <div className={styles["payment-form"]}>
                <StripeCheckout/>
            </div>  : null
            }
        </div>
        <div className={`${styles["payment-method"]} ${styles["paypal-method"]}`}>
            <div className={styles["method-choose"]}>
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
            <div className={styles["payment-form"]}>
            </div> : null
            }
        </div>
    </div>
  )
}

export default PaymentBox