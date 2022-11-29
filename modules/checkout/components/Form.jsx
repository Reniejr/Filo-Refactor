import React, { useState, Fragment, useEffect} from 'react'

//* REDUX
import { useSelector, useDispatch } from 'react-redux'
import { checkout } from 'storage/checkout'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* DATA
import { billing_data, shipping_data } from '../data'

//* UTILITIES
import { checkData } from '../utilities'

//* COMPONENTS
import SelectCity from './SelectCity'
import InputGroup from './InputGroup'

//* STYLES
import styles from '../styles/Form.module.scss'

const Form = ({bill_or_ship, isSubmit}) => {

    const t = useTranslations('checkout')
    const t_billing = useTranslations('checkout.Billing_Info')
    const t_shipping = useTranslations('checkout.Shipping_Info')

    const dispatch = useDispatch()
    const billing_saves = useSelector(state => state.checkout.billing.data)
    const shipping_saves = useSelector(state => state.checkout.shipping.data)
    const { zones } = useSelector(state => state.checkout)
    const { setShippingMethod, setBillingData, setShippingData } = checkout.actions

    const [ checkForm, setCheckForm ] = useState(false)
    const [ billing_details, setBillingDetails ] = useState({
        "first_name": "",
        "last_name": "",
        "company_name": "",
        "country": "",
        "address_1": "",
        "address_2": "",
        "postal_code": "",
        "state": "",
        "city": "",
        "phone": "",
        "email": ""
    })
    const [ shipping_details, setShippingDetails ] = useState({
        "first_name": "",
        "last_name": "",
        "company_name": "",
        "country": "",
        "address_1": "",
        "address_2": "",
        "postal_code": "",
        "state": "",
        "city": "",
        "phone": ""
    })

    const [ csc, setCsc ] = useState({
        "billing":{
            "country": "",
            "state": "",
            "city": "",
        },
        "shipping":{
            "country": "",
            "state": "",
            "city": "",
        }
    })

    if (bill_or_ship === "billing") {
        useEffect(() => {
            const checking = checkData(billing_saves)
            checking.includes(false) ? setCheckForm(false) : setCheckForm(true)  
          /* eslint-disable-next-line */
        }, [billing_saves])
    } else {
        useEffect(() => {
            const checking = checkData(shipping_saves)
            checking.includes(false) ? setCheckForm(false) : setCheckForm(true)
          
          /* eslint-disable-next-line */
        }, [shipping_saves])
    }

    

    const handleInput = (e) => {
        const new_details = bill_or_ship === "billing" ? {...billing_details} : {...shipping_details}

        const id = e.currentTarget.id

        new_details[id] = e.currentTarget.value

        if (bill_or_ship === "billing") {
            setBillingDetails(new_details)
            dispatch(setBillingData(new_details))
        } else {
            setShippingDetails(new_details)
            dispatch(setShippingData(new_details))
        }
    }

    const handleCsc = (value, csc_prop) => {
        const new_billing_csc = {...csc.billing}
        const new_shipping_csc = {...csc.shipping}

        const new_billing_details = { ...billing_details }
        const new_shipping_details = { ...shipping_details }

        if(csc_prop === 'country') {
            const zone = zones.find( zone => zone.location === value.isoCode)
            if(!zone) {
                dispatch(setShippingMethod({
                    "method_id": "cannot_ship",
                    "method_title": "cannot_ship",
                    "total": 0
                }))
            } else {
                dispatch(setShippingMethod({
                    "method_id": zone.method.title.replaceAll(" ", "_").toLowerCase(),
                    "method_title": zone.method.title,
                    "total": zone.method.cost
                }))
            }
            
        }
        if (bill_or_ship === "billing") {
            new_billing_csc[csc_prop] = value.isoCode
            new_billing_details[csc_prop] = value.label
            setCsc({...csc, billing: new_billing_csc })
            setBillingDetails(new_billing_details)
            dispatch(setBillingData(new_billing_details))
        } else {
            new_shipping_csc[csc_prop] = value.isoCode
            new_shipping_details[csc_prop] = value.label
            setCsc({ ...csc, shipping: new_shipping_csc})
            setShippingDetails(new_shipping_details) 
            dispatch(setShippingData(new_shipping_details))   
        }
        
    }

    const array_data = bill_or_ship === "billing" ? billing_data : shipping_data
    const isState = (property) => bill_or_ship === "billing" ? billing_details[property] : shipping_details[property] 
    const isBillOrShip =  bill_or_ship === "billing" ? "billing" : "shipping"

  return (
    <div className={styles["form-user-info"]}>
        <h2>{bill_or_ship === "billing" ? t_billing("billing_details") : t_shipping("shipping_details")}</h2>
        {
            array_data.map( (row, i) => {
                return(
                    <div
                        key={`${isBillOrShip}-form-row-${row.length}-${i}`} 
                        className={`${styles["form-row"]} ${styles[`row-${row.length}`]}`}
                    >
                        {
                            row.map( i_group => {

                                return(
                                    <Fragment key={`${isBillOrShip}-${i_group.id}`}>
                                        {
                                            i_group.type === "csc" ?
                                            <SelectCity
                                                detail={i_group.id}
                                                values={{
                                                    csc_value: isState(i_group.id),
                                                    parent_value: i_group.id === " country" ? "" : i_group.id === "state" ? csc[isBillOrShip]["country"] : i_group.id === "city" ? [csc[isBillOrShip]["country"], csc[isBillOrShip]["state"]] : ""
                                                }}
                                                handlerCsc={(value)=>handleCsc(value, i_group.id)}
                                            /> :
                                            <InputGroup
                                                data={i_group}
                                                form={isBillOrShip}
                                                form_state={{
                                                    state: isState(i_group.id),
                                                    handler: handleInput,
                                                    isSubmit
                                                }}
                                            />
                                        }
                                    </Fragment>
                                )
                            })
                        }
                    </div>
                )
            })
        }
        {
            !checkForm ?
            <p className={styles["required-txt"]}>* {t("field")}&nbsp;{t("is_required")}</p>
            : null
        }
    </div>
  )
}

export default Form