import React from 'react'

//* TRANSLATIONS
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector } from 'react-redux';

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../styles/Checkout.module.scss';

const CostDetails = () => {

    const t = useTranslations('checkout')

    const { total } = useSelector( state => state.cart)

  return (
    <>
        <div className={styles["cost-details"]}>
            <div className={styles["subtotal"]}>
                <h3>{t("subtotal")}</h3>
                <p>{total}0 €</p>
            </div>
            <div className={styles["shipping-method"]}>
                <h3>{t("shipping")}</h3>
                <div className={styles["shipping"]}>
                <p className={styles["method"]}></p>
                <p className={styles["shipping-cost"]}></p>
                </div>
            </div>
        </div>
        <div className={styles["total-box"]}>
            <h3>{t("total")}</h3>
            <p>{ total }0 €</p>
        </div>
    </>
  )
}

export default CostDetails