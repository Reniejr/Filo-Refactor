import React from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* COMPONENTS
import { LinkCTA } from '@/common/components/CTA';

//* STYLES
import globals from '@/styles/Main.module.scss';
import styles from '../styles/Checkout.module.scss';

const PrivacyTerms = () => {

    const t = useTranslations('checkout')

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
                />
            <label htmlFor="terms" className={styles["terms-label"]}>
                {t.rich("terms-and-conditions", {
                a: (children) => <LinkCTA href="/terms-and-conditions" classes={`${globals["link"]} ${styles["mini-txt"]}`} text_label={children} />
                })}
            </label>
            </div>
        </div>
    </>
  )
}

export default PrivacyTerms