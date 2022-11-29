import React from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector, useDispatch } from 'react-redux'
import { orderSlice } from '@/slices/orderSlice';
import { checkout } from 'storage/checkout';

//* COMPONENTS
import { LinkCTA } from '@/common/components/CTA';

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../styles/Checkout.module.scss';

const PrivacyTerms = () => {

    const t = useTranslations('checkout')

    //* REDUX STATE
    const { isPrivacyAccepted } = useSelector(state => state.checkout)
        //* ACTIONS
    const dispatch = useDispatch()
    const { setIsPrivacyAccepted } = checkout.actions

    const handlePrivacyTerms = (e) => {
        dispatch(setIsPrivacyAccepted())
    }

  return (
    <>
        <p className={styles["privacy"]}>
            {t.rich("privacy_policy", {
            a: (children) => <LinkCTA href="/privacy-policy" classes={`${globals["link"]} ${styles["mini-txt"]}`} text_label={children} />
            })}
        </p>
        <div className={styles["terms-conditions-container"]}>
            <div className={styles["input-group"]}>
            <input 
                type="checkbox" 
                id="terms" 
                required
                checked={isPrivacyAccepted ? true : false}
                onChange={handlePrivacyTerms}
                />
            <label htmlFor="terms" className={styles["terms-label"]}>
                {t.rich("terms-and-conditions", {
                a: (children) => <LinkCTA href="/terms-and-conditions" classes={`${globals["link"]} ${styles["mini-txt"]}`} text_label={`${children}`} />
                })}
            </label>
            </div>
        </div>
        {
            !isPrivacyAccepted ?
            <p className={styles["required-txt"]}>* {t("field")}&nbsp;{t("is_required")}</p> : null
        }
    </>
  )
}

export default PrivacyTerms