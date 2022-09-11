import React, { useState, useEffect } from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* STYLES
import globals from '@/styles/Main.module.scss'
import styles from '../styles/Coupon.module.scss'

const Coupon = () => {

    const t = useTranslations('checkout.Coupon')

    const [ isCoupon, setIsCoupon ] = useState(false)

    const [ { coupon }, setCoupon ] = useState({
        coupon: ""
    })


  return (
    <div className={styles["coupon-container"]}>
        {
            isCoupon ?
            <div className={styles["coupon-input"]}>
                <div className={styles["input-group"]}>
                    <input 
                        type="text" 
                        id="coupon" 
                        placeholder={t("placeholder")}
                        value={coupon}
                        onChange={(e) => setCoupon({coupon: e.currentTarget.value})}
                        />
                    <button
                        className={`${globals['btn']} ${globals["btn-primary"]} ${styles["btn-coupon"]}`}
                    >{t('apply')}</button>
                </div>
                <p 
                    onClick={() => setIsCoupon(false)}
                    className={styles["no-coupon"]}
                    >{t('no_coupon')}</p>

            </div> :
            <p className={styles["is-coupon"]}>
                {t('isCoupon')} <span 
                    className={styles["coupon-trigger"]}
                    onClick={() => setIsCoupon(true)}
                    >{t('enter_coupon')}</span>
            </p>
        }
    </div>
  )
}

export default Coupon