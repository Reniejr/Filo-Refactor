import React, { useState } from 'react'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* REDUX
import { useSelector, useDispatch } from 'react-redux'
import { checkout } from 'storage/checkout'

//* STYLES
import globals from '@/styles/Main.module.scss'
import styles from '../styles/Invoice.module.scss';

const Invoice = () => {

    const t = useTranslations('cart')
    const t_invoice = useTranslations('cart.Invoice')
    const dispatch = useDispatch()
    const { setInvoiceData, setInvoice } = checkout.actions  
    const { isInvoice } = useSelector(state => state.checkout.invoice)

    const [ isSubmitted, setIsSubmitted ] = useState(false)

    const [ invoice_details, setInvoiceDetails ] = useState({
        "choose": "company",
    })
    const [ company_details, setCompanyDetails ] = useState({
        "company_name": "",
        "vat_n": "",
        "tax_code": "",
        "billing_address": "",
        "sdi_pec": ""
    })
    const [ private_details, setPrivateDetails ] = useState({
        "first_name": "",
        "last_name": "",
        "vat_n": "",
        "tax_code": "",
        "address": "",
        "email": "",
        "pec": ""
    })

    const handleChoose = (e) => {
        let new_invoice_details = {...invoice_details}
        if (e.currentTarget.checked) {
            new_invoice_details["choose"] = e.currentTarget.value
        }
        setInvoiceDetails(new_invoice_details)
    }

    const handleInvoiceData = (e) => {
        let new_invoice_details = invoice_details.choose === "company" ? {...company_details} : {...private_details}
        new_invoice_details[e.currentTarget.id] = e.currentTarget.value
        invoice_details.choose === "company" ? setCompanyDetails(new_invoice_details) :setPrivateDetails(new_invoice_details)
    }

    const handleSetInvoice = () => {
        const new_invoice = invoice_details.choose === "company" ? 
            company_details : private_details
        dispatch(setInvoiceData(new_invoice))
        setIsSubmitted(true)
    }
    
    const removeInvoice = () => {
        dispatch(setInvoiceData(null))
        setIsSubmitted(false)
    }

  return (
    <div className={styles["invoice-section"]}>
        <div className={styles["is-invoice"]}>
            <h3>
                {t("is_invoice")}
            </h3>
            <input 
                type="checkbox" 
                id="is_invoice" 
                onChange={() => {
                    dispatch(setInvoice(!isInvoice));
                }} 
                checked={isInvoice}
                />
        </div>
        {
            isInvoice ?
                <div className={styles["invoice-details"]}>
                    <div className={styles["invoice-choose"]}>
                        <div className={styles["radio-group"]}>
                            <input 
                                type="radio" 
                                id="for_company" 
                                value="company" 
                                checked={invoice_details.choose === "company" ? true : false} 
                                onChange={handleChoose}
                                />
                            <label htmlFor="for_company">{t_invoice("for_company")}</label>
                        </div>
                        <div className={styles["radio-group"]}>
                            <input 
                                type="radio" 
                                id="private" 
                                value="private" 
                                checked={invoice_details.choose === "private" ? true : false} 
                                onChange={handleChoose}
                                />
                            <label htmlFor="private">{t_invoice("private")}</label>
                        </div>
                    </div>
                    <div className={styles["invoice-data"]}>
                        {
                            isSubmitted ?
                            <div className={styles["invoice-submitted"]}>{t_invoice.rich("submitted", {
                                p: (children) => <p onClick={() => removeInvoice()}>{children}</p> 
                            })}</div> :
                            <>
                            
                                <p>{t_invoice("insert_details")}</p>
                                <div className={`${styles["identity"]} ${styles["input-row"]}`}>
                                    {
                                        invoice_details.choose === "company" ?
                                        <input 
                                            type="text" 
                                            id="company_name" 
                                            className={styles["company_name"]} 
                                            value={company_details.company_name}
                                            placeholder={t_invoice("company.company_name")}
                                            onChange={handleInvoiceData}
                                            /> : 
                                            <>
                                            <input 
                                                type="text" 
                                                id="first_name" 
                                                value={private_details.first_name}
                                                placeholder={t_invoice("person.first_name")}
                                                onChange={handleInvoiceData}
                                                />
                                            <input 
                                                type="text" 
                                                id="last_name" 
                                                value={private_details.last_name}
                                                placeholder={t_invoice("person.last_name")}
                                                onChange={handleInvoiceData}
                                                /> 
                                        
                                        </>
                                    }
                                </div>
                                <div className={`${styles["vat-tax"]} ${styles["input-row"]}`}>
                                    <input 
                                        type="text" 
                                        id="vat_n" 
                                        value={invoice_details.choose === "company" ? company_details.vat_n : private_details.vat_n}
                                        placeholder={t_invoice("vat_n")}
                                        onChange={handleInvoiceData}
                                        />
                                    <input 
                                        type="text" 
                                        id="tax_code" 
                                        value={invoice_details.choose === "company" ? company_details.tax_code : private_details.tax_code}
                                        placeholder={t_invoice("tax_code")}
                                        onChange={handleInvoiceData}
                                        />
                                </div>
                                <div className={`${styles["address"]} ${styles["input-row"]}`}>
                                    {
                                        invoice_details.choose === "company" ? <input 
                                        type="text" 
                                        id="billing_address" 
                                        className={styles["billing_address"]} 
                                        value={company_details.billing_address}
                                        placeholder={t_invoice("company.billing_address")}
                                        onChange={handleInvoiceData}
                                        /> :
                                    <input 
                                        type="text" 
                                        id="address" 
                                        className={styles["address"]} 
                                        value={private_details.address}
                                        placeholder={t_invoice("person.address")}
                                        onChange={handleInvoiceData}
                                        />
                                        }
                                </div>
                                <div className={`${styles["sdi-pec"]} ${styles["input-row"]}`}>
                                    {
                                        invoice_details.choose === "company" ?
                                        <input 
                                            type="text" 
                                            id="sdi_pec" 
                                            className={styles["sdi_pec"]} 
                                            value={company_details.sdi_pec}
                                            placeholder={t_invoice("company.sdi_pec")}
                                            onChange={handleInvoiceData}
                                            /> : 
                                            <>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                value={private_details.email}
                                                placeholder={t_invoice("person.email")}
                                                onChange={handleInvoiceData}
                                                />
                                            <input 
                                                type="text" 
                                                id="pec" 
                                                value={private_details.pec}
                                                placeholder={t_invoice("person.pec")}
                                                onChange={handleInvoiceData}
                                                /> 
                                        </>
                                        }
                                </div>
                                <button 
                                    className={`${globals["btn"]} ${globals["btn-primary"]}`}
                                    onClick={() => handleSetInvoice()}
                                >
                                    {t_invoice("request")}
                                </button>
                            </>
                        }
                    </div>
                </div> : null            
        }
    </div>
  )
}

export default Invoice