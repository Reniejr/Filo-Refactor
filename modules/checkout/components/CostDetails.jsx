import React, { useState, useEffect } from 'react'

//* TRANSLATIONS
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector, useDispatch } from 'react-redux';
import { checkout } from 'storage/checkout';

//* STYLES
import styles from '../styles/Checkout.module.scss';

const CostDetails = () => {

    const t = useTranslations('checkout')

    const { original_total, shipping_method, discount } = useSelector( state => state.checkout)
    const { setNewTotal } = checkout.actions
    const dispatch = useDispatch()

    const [ displayTotal, setDisplayTotal ] = useState({
        original_subtotal: original_total,
        discounted_total: 0,
        total: 0
    }) 

    useEffect(() => {
        setDisplayTotal({
            ...displayTotal,
            original_subtotal: original_total,
            total: original_total
        })
        /* eslint-disable-next-line */
    }, [original_total])

    useEffect(() => {
      
        if (discount) {
            setDisplayTotal({
                ...displayTotal,
                discounted_total: discount.discounted_total,
                total: parseFloat(discount.discounted_total) + parseFloat(shipping_method.total * 100)
            })
            dispatch(setNewTotal(parseFloat(discount.discounted_total) + parseFloat(shipping_method.total * 100)))
            
        } else {
            setDisplayTotal({
                ...displayTotal,
                discounted_total: 0,
                total: parseFloat(displayTotal.original_subtotal) + parseFloat(shipping_method.total * 100)
            })
            dispatch(setNewTotal(parseFloat(displayTotal.original_subtotal) + parseFloat(shipping_method.total * 100)))
        }
        
        /* eslint-enable-next-line */
    }, [discount])
    
    useEffect(() => {
        
        if (shipping_method.total !== 0) {
            setDisplayTotal({
                ...displayTotal,
                total: parseFloat(displayTotal.total) + parseFloat(shipping_method.total * 100)
            })
            dispatch(setNewTotal(parseFloat(displayTotal.total) + parseFloat(shipping_method.total * 100)))
            
        } else {
            setDisplayTotal({
                ...displayTotal,
                total: displayTotal.discounted_total !== 0 ? displayTotal.discounted_total : original_total
            })
            dispatch(setNewTotal(displayTotal.discounted_total !== 0 ? displayTotal.discounted_total : original_total))
        }

        /* eslint-enable-next-line */
    }, [shipping_method])

    const fixNumTo2Decimals = (num) => (Math.round(num * 100) / 100).toFixed(2)
    

  return (
    <>
        <div className={styles["cost-details"]}>
            <div className={styles["subtotal"]}>
                <h3>{t("subtotal")}</h3>
                <div className={styles["price-container"]}>
                    <p 
                        className={`${discount && discount.discounted_total ? styles["discounted-subtotal"] : styles["original-subtotal"]}`}
                        >{fixNumTo2Decimals(displayTotal.original_subtotal / 100)} €</p>
                    {
                        discount && discount.discounted_total ?
                        <p className={`${styles["final-subtotal"]}`}>{fixNumTo2Decimals(displayTotal.discounted_total / 100)} €</p>
                        : null
                    }
                </div>
            </div>
            <div className={styles["shipping-method"]}>
                <h3>{t("shipping")}</h3>
                <div className={styles["shipping"]}>
                <p className={styles["method"]}>
                    {
                        shipping_method.method_id !== "" ?
                            t(`${shipping_method.method_id}`) : t("based_country")
                    }
                </p>
                <p className={styles["shipping-cost"]}>
                    {
                        shipping_method.method_id === "" || shipping_method.method_id === "cannot_ship" ?
                            null : `${shipping_method.total},00 €`
                    }
                </p>
                </div>
            </div>
        </div>
        <div className={styles["total-box"]}>
            <h3>{t("total")}</h3>
            <p>
                {fixNumTo2Decimals(displayTotal.total / 100)}€
            </p>
        </div>
    </>
  )
}

export default CostDetails