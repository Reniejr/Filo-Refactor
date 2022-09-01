import React from 'react'
import { useState } from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//*COMPONENTS
import { InputGroup } from '@/common/components/InputGroups';

//* DATA
import formDatas from '../data/formData';

//* STYLES
import styles from  '../styles/Form.module.scss';

const Form = () => {

    const t = useTranslations('returns_exchange')

    const [form, setForm] = useState({
        "n_order": "",
        "request_for": "",
        "reason": "",
        "name": "",
        "phone": null,
        "email": "",
        "notes": "",
        "policy": false,
    })

    const [{isSubmit}, setSubmit] = useState({
        isSubmit: false
    })

    const handleChange = (e) => {
        let new_form = {...form}
        if (e.currentTarget.type === "radio" && e.currentTarget.checked) {
            new_form["request_for"] = e.currentTarget.value
        } else {
            const property = e.currentTarget.id
            new_form[property] = e.currentTarget.value
        }
        setForm(new_form)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
    }

  return (
    <form 
        className={styles["form"]} 
        action=""
        onSubmit={handleSubmit}
        >
        <h2>{t("Form.title")}</h2>
        {
            formDatas.map( input_data => {

                return(
                    <InputGroup
                        key={input_data.id}
                        input_data={input_data}
                        page_t="returns_exchange"
                        formStatus={{
                            formData: {
                                formState: form,
                                formFn: handleChange
                            },
                            submitData: {
                                submitState: isSubmit,
                                submitFn: setSubmit
                            },
                        }}
                    />
                )
            })
        }
        <button type="submit">{t("Form.send")}</button>
    </form>
  )
}

export default Form