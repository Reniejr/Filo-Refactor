import React, { useState, useEffect } from 'react'

//* UTILITIES
import { checkCoupon } from '../utilities/handleCoupons'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector, useDispatch } from 'react-redux'
import { checkout } from 'storage/checkout'

//* WOOCOMMERCE
import { getCouponByCode } from '@/pages/api/getCoupons'

//* STYLES
import globals from '@/styles/Main.module.scss'
import styles from '../styles/Coupon.module.scss'

const Coupon = () => {

    const t = useTranslations('checkout.Coupon')

    const [ isCoupon, setIsCoupon ] = useState(false)

    const [ { coupon, isValid }, setCouponCode ] = useState({
        coupon: "",
        isValid: false
    })

    const { total, line_items, shipping_method } = useSelector( state => state.checkout)
    const dispatch = useDispatch()
    const { setDiscount } = checkout.actions

    const applyCoupon = async () => {
        const new_coupon = await getCouponByCode(coupon)

        if(new_coupon) {
            const discount = checkCoupon(new_coupon, {line_items})
            dispatch(setDiscount(discount))
            setCouponCode({coupon: new_coupon.code, isValid: true})
        } else {
            setCouponCode({coupon: coupon, isValid: false})
        }
    }

    const handleCoupon = (e) => {
        setCouponCode({coupon: e.currentTarget.value, isValid: false})
    }

    const removeCoupon = () => {
        setCouponCode({coupon: "", isValid: false})
        dispatch(setDiscount(null))
    }


  return (
    <div className={styles["coupon-container"]}>
        {
            isCoupon ?
            <div className={styles["coupon-input"]}>
                {/* {
                    shipping_method.method_id === "flat_rate" || shipping_method.method_id === "free_shipping" || total === 0 ? null :
                    <p className={styles["coupon-not-allowed"]}>{t('coupon_not_allowed')}</p>
                } */}
                <div className={styles["input-group"]}>
                    <input 
                        type="text" 
                        id="coupon" 
                        placeholder={t("placeholder")}
                        value={coupon}
                        onChange={handleCoupon}
                        />
                    <button
                        className={`${globals['btn']} ${globals["btn-primary"]} ${styles["btn-coupon"]} ${shipping_method.method_id === "flat_rate" || shipping_method.method_id === "free_shipping" || total !== 0 ? null : styles["disabled"] }`}
                        onClick={()=>applyCoupon()}
                    >{t('apply')}</button>
                </div>
                {
                    coupon === "" && !isValid ?
                    <p className={styles["coupon-not-valid"]}>{t('coupon_not_valid')}</p> : null
                    
                }
                {
                    coupon !== "" && isValid ?
                    <p className={styles["coupon-applied"]}>{t('coupon_applied')} <span 
                        className={styles['remove-coupon']}
                        onClick={() => removeCoupon()}
                        >{t('remove_coupon')}</span></p> : <p 
                        onClick={() => setIsCoupon(false)}
                        className={styles["no-coupon"]}
                        >{t('no_coupon')}</p>
                }
            </div> :
            <>
                <p className={styles["is-coupon"]}>
                    {t('isCoupon')} <span 
                        className={styles["coupon-trigger"]}
                        onClick={() => setIsCoupon(true)}
                        >{t('enter_coupon')}</span>
                </p>
            </>
        }
    </div>
  )
}

export default Coupon