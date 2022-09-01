import React from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* STYLES
import styles from '../styles/InputGroups.module.scss'

const InputGroup = ({input_data, page_t, formStatus}) => {

    const {
        id,
        type,
        required,
        label_show
    } = input_data

    const {
        formData,
        submitData
    } = formStatus

    const { formState, formFn } = formData
    const { submitState, submitFn } = submitData

    const t = useTranslations(page_t)

    const InputCheckTxt = () => {

        return(
            <>
                {
                    submitState && formState[id] === "" ?
                    <ion-icon name="checkmark-circle-outline"></ion-icon> :
                    <p className={styles["required-text"]}>
                        <ion-icon name="close-circle-outline"></ion-icon>
                        {t(`Form.${id}.required`)}
                    </p>
                }
            </>
        )
    }

    return(
        <div className={`${styles["input-group"]} ${styles[`input-${type}`]}`}>
            {
                label_show && type !== "checkbox" ?
                <label htmlFor={id}>{t(`Form.${id}.label`)}</label> : null
            }
            {
                type === "textarea" ? 
                <textarea
                    id={id}
                    required={required}
                    type={type}
                    value={formState[id]}
                    onChange={(e) => formFn(e)}
                /> : type === "radio" ?
                    <>
                        {
                            input_data.labels.map( radio_options => {

                                return(
                                    <div 
                                        className={styles["radio-group"]}
                                        key={`radio-option-${radio_options}`}
                                        >
                                        <input
                                            type="radio"
                                            id={radio_options} 
                                            value={radio_options} 
                                            onChange={(e)=> formFn(e)}
                                            checked={formState["request_for"] === radio_options ? true : false}
                                            />
                                        <label htmlFor={radio_options}>{radio_options}</label>
                                    </div>
                                )
                            })
                        }
                    </> :
                    <input
                        id={id}
                        required={required}
                        type={type}
                        placeholder={t(`Form.${id}.placeholder`)}
                        value={formState[id]}
                        onChange={(e) => formFn(e)}
                    />
            }
            {
                label_show && type === "checkbox" ?
                <label htmlFor={id}>{t(`Form.${id}.label`)}</label> : null
            }
            {/* { required ? <InputCheckTxt/> : null} */}
        </div>
    )

}

export { InputGroup }