import React from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* STYLES
import styles from '../styles/Form.module.scss'

const InputGroup = ({data, form, form_state}) => {

    const t = useTranslations('checkout')

    const form_type = form.charAt(0).toUpperCase() + form.slice(1)

    const { state, handler, isSubmit } = form_state

  return (
    <div className={styles["input-group"]}>
        <input 
            type={data.type} 
            id={data.id}
            placeholder={`${t(`${form_type}_Info.${data.id}`)} ${data.required ? '*' : ''}`} 
            value={state}
            onChange={handler}
            />
        {
            isSubmit && state === '' ? 
            <div className={styles["error-msg-container"]}>
                <p className={styles["error-msg"]}>
                    {t("field")} {t(`${form_type}_Info.${data.id}`)} {t("is_required")}
                </p>
            </div> : null
        }
    </div>
  )
}

export default InputGroup