import React, { useState, useEffect } from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector, useDispatch } from 'react-redux'
import { orderSlice } from '@/slices/orderSlice'
import { cartSlice } from '@/slices/cartSlice'

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
    const [ originalTotal, setOriginalTotal ] = useState({
        original_total: 0,
        original_price: 0,
        original_shipping: 0,
    })

    const { total } = useSelector( state => state.cart)
    const { shipping_method } = useSelector( state => state.order)
    const dispatch = useDispatch()
    const { setCoupon } = orderSlice.actions
    const { setTotal } = cartSlice.actions

    useEffect(() => {
        setOriginalTotal({...originalTotal, original_price: total})
        /* eslint-disable-next-line */
    },[])
    useEffect(() => {
        if(shipping_method.method_id === "flat_rate" || shipping_method.method_id === "free_shipping"){
            const new_total = total + shipping_method.total
            setOriginalTotal({...originalTotal, original_total: new_total, original_shipping: shipping_method.total})
        }
        /* eslint-disable-next-line */
    },[shipping_method.total])

    const applyCoupon = async () => {
        const new_coupon = await getCouponByCode(coupon)
        if(new_coupon.discount_type !== ""){
            console.log(new_coupon)
            const new_total = originalTotal.original_total - ( originalTotal.original_total / 100 * new_coupon.amount)
            console.log(new_total)
            dispatch(setTotal(new_total))
            setIsCoupon(false)
        } else {
            setCouponCode({coupon, isValid: false})
        }
    }

    const handleCoupon = (e) => {
        setCouponCode({coupon: e.currentTarget.value, isValid: true})
    }

    const removeCoupon = () => {
        setCouponCode({coupon: "", isValid: false})
        dispatch(setTotal(originalTotal.original_total))
    }


  return (
    <div className={styles["coupon-container"]}>
        {
            isCoupon ?
            <div className={styles["coupon-input"]}>
                {
                    shipping_method.method_id === "flat_rate" || shipping_method.method_id === "free_shipping" || total === 0 ? null :
                    <p className={styles["coupon-not-allowed"]}>{t('coupon_not_allowed')}</p>
                }
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
                    shipping_method.method_id === "flat_rate" && !isValid || shipping_method.method_id === "free_shipping" && !isValid || total !== 0 && !isValid ?
                    <p className={styles["coupon-not-valid"]}>{t('coupon_not_valid')}</p> : null
                    
                }
                <p 
                    onClick={() => setIsCoupon(false)}
                    className={styles["no-coupon"]}
                    >{t('no_coupon')}</p>

            </div> :
            <>
                <p className={styles["is-coupon"]}>
                    {t('isCoupon')} <span 
                        className={styles["coupon-trigger"]}
                        onClick={() => setIsCoupon(true)}
                        >{t('enter_coupon')}</span>
                </p>
                {
                    coupon !== "" ?
                    <p className={styles["coupon-applied"]}>{t('coupon_applied')} <span 
                        className={styles['remove-coupon']}
                        onClick={() => removeCoupon()}
                        >{t('remove_coupon')}</span></p> : null
                }
            </>
        }
    </div>
  )
}

export default Coupon