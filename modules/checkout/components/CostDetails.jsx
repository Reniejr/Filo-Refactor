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
    const { shipping_method } = useSelector( state => state.order)

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
                {/* { total }0 € */}
                {
                    shipping_method.method_id !== "" ?
                        `${shipping_method.total + total}0 €` : null
                }
            </p>
        </div>
    </>
  )
}

export default CostDetails