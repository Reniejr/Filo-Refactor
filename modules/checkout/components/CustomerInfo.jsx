import React, { useState, useEffect } from 'react'

//* TRANSLATIONS
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector, useDispatch } from 'react-redux';
import { orderSlice } from '@/slices/orderSlice';

//* COMPONENTS
import Form from './Form';

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../styles/Checkout.module.scss';

const CustomerInfo = ({ isSubmit }) => {

    const t = useTranslations('checkout')
    const t_shipping = useTranslations('checkout.Shipping_Info')
    const [ isShipping, setIsShipping ] = useState(false)

    const { billing, isOtherShip, shipping, privacy_accepted } = useSelector( state => state.order)
    const dispatch = useDispatch()
    const { setShipping, handleOtherShip, handleAllCheck } = orderSlice.actions

    useEffect(()=>{

      if(!isOtherShip){
        const new_shipping_details = { ...billing }
        delete new_shipping_details.email
        dispatch(setShipping(new_shipping_details))
      } else {
        const empty_shipping_details = { 
          "first_name": "",  
          "last_name": "",  
          "company_name": "",  
          "country": "",  
          "address": "",  
          "address_details": "",  
          "postal_code": "",  
          "state": "",  
          "city": "",  
          "phone": "",  
        }
        dispatch(setShipping(empty_shipping_details))
      }

      /* eslint-disable-next-line */
    },[isOtherShip, billing])
    
    useEffect(() => {
      dispatch(handleAllCheck())
      /* eslint-disable-next-line */
    }, [isOtherShip, billing, shipping, privacy_accepted])
    

  return (
    <div className={`${globals["container"]} ${styles["user-container"]}`}>
        <Form bill_or_ship="billing" isSubmit={isSubmit}/>
        
        <div className={styles["is-shipping"]}>
        <p>{t_shipping("is_shipping")}</p>
        <input 
            type="checkbox" 
            id="is-shipping" 
            onChange={()=> dispatch(handleOtherShip(!isOtherShip))}
            checked={isOtherShip ? true : false}
            />
        </div>

        {
        isOtherShip ?
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