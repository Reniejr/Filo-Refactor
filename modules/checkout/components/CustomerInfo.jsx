import React, { useState } from 'react'

//* TRANSLATIONS
import { useTranslations } from 'next-intl'

//* COMPONENTS
import Form from './Form';

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../styles/Checkout.module.scss';

const CustomerInfo = ({ isSubmit }) => {

    const t = useTranslations('checkout')
    const t_shipping = useTranslations('checkout.Shipping_Info')
    const [ isShipping, setIsShipping ] = useState(false)

  return (
    <div className={`${globals["container"]} ${styles["user-container"]}`}>
        <Form bill_or_ship="billing" isSubmit={isSubmit}/>
        
        <div className={styles["is-shipping"]}>
        <p>{t_shipping("is_shipping")}</p>
        <input 
            type="checkbox" 
            id="is-shipping" 
            onChange={()=> setIsShipping(!isShipping)}
            checked={isShipping ? true : false}
            />
        </div>

        {
        isShipping ?
            <Form bill_or_ship="shipping" isSubmit={isSubmit}/> : null
        }

        <div className={styles["notes"]}>
        <label htmlFor="notes">{t("notes.order_notes")}</label>
        <textarea id="notes" cols="30" rows="5" placeholder={t("notes.placeholder")}></textarea>
        </div>
    </div>
  )
}

export default CustomerInfo