import React, { useState, Fragment} from 'react'

//* REDUX
import { useSelector, useDispatch } from 'react-redux'
import { orderSlice } from '@/slices/orderSlice'

//* TRANSLATION
import { useTranslations } from 'next-intl'

//* DATA
import { billing_data, shipping_data } from '../data'

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
    const billing_saves = useSelector(state => state.order.billing)
    const shipping_saves = useSelector(state => state.order.shipping)
    const { setBilling, setShipping } = orderSlice.actions

    const [ billing_details, setBillingDetails ] = useState({
        "first_name": "",
        "last_name": "",
        "company_name": "",
        "country": "",
        "address": "",
        "address_details": "",
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
        "address": "",
        "address_details": "",
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

    const handleInput = (e) => {
        const new_details = bill_or_ship === "billing" ? {...billing_details} : {...shipping_details}

        const id = e.currentTarget.id

        new_details[id] = e.currentTarget.value

        if (bill_or_ship === "billing") {
            setBillingDetails(new_details)
            dispatch(setBilling(new_details))
        } else {
            setShippingDetails(new_details)
            dispatch(setShipping(new_details))
        }
    }

    const handleCsc = (value, csc_prop) => {
        const new_billing_csc = {...csc.billing}
        const new_shipping_csc = {...csc.shipping}

        const new_billing_details = { ...billing_details }
        const new_shipping_details = { ...shipping_details }

        if (bill_or_ship === "billing") {
            new_billing_csc[csc_prop] = value.isoCode
            new_billing_details[csc_prop] = value.label
            setCsc({...csc, billing: new_billing_csc })
            setBillingDetails(new_billing_details)
            dispatch(setBilling(new_billing_details))
        } else {
            new_shipping_csc[csc_prop] = value.isoCode
            new_shipping_details[csc_prop] = value.label
            setCsc({ ...csc, shipping: new_shipping_csc})
            setShippingDetails(new_shipping_details) 
            dispatch(setShipping(new_shipping_details))   
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

        
        {/* <div className={`${styles["input-group"]}`}>
            <input 
                type="text"
                onChange={handleInput} 
                placeholder={t_billing("first_name")}
                id="first_name" 
                />
            <input 
                type="text"
                onChange={handleInput} 
                placeholder={t_billing("last_name")}
                id="last_name" 
                />
        </div>
        <div className={`${styles["input-group"]}`}>
            <input 
                type="text"
                onChange={handleInput} 
                placeholder={t_billing("company_name")}
                id="company_name" 
                />
        </div>
        <div className={`${styles["input-group"]}`}>
            <SelectCity
                detail="country"
                values={{
                    csc_value: bill_or_ship === "billing" ? billing_details.country : shipping_details.country,
                    parent_value: ""
                }}
                handlerCsc={(value)=>console.log(value)}
            />
        </div>
        <div className={`${styles["input-group"]}`}>
            <input 
                type="text"
                onChange={handleInput} 
                placeholder={t_billing("address")}
                id="address" 
                />
        </div>
        <div className={`${styles["input-group"]}`}>
            <input 
                type="text"
                onChange={handleInput} 
                placeholder={t_billing("address_details")}
                id="address_details" 
                />
        </div>
        <div className={`${styles["input-group"]}`}>
            <input 
                type="text"
                onChange={handleInput} 
                placeholder={t_billing("postal_code")}
                id="postal_code" 
                />
            <SelectCity
                detail="state"
                values={{
                    csc_value: bill_or_ship === "billing" ? billing_details.state : shipping_details.state,
                    parent_value: bill_or_ship === "billing" ? billing_details.country : shipping_details.country
                }}
                handlerCsc={(value)=>console.log(value)}
            />
            <SelectCity
                detail="city"
                values={{
                    csc_value: bill_or_ship === "billing" ? billing_details.city : shipping_details.city,
                    parent_value: bill_or_ship === "billing" ? billing_details.state : shipping_details.state
                }}
                handlerCsc={(value)=>console.log(value)}
            />
        </div>
        <div className={`${styles["input-group"]}`}>
            <input 
                type="tel" 
                placeholder={t_billing("phone")}
                id="phone"
                onChange={handleInput} 
                />
        </div>
        {
            bill_or_ship === "billing" ? 
                <div className={`${styles["input-group"]}`}>
                    <input 
                        type="email" 
                        placeholder={t_billing("email")}
                        id="email" 
                        onChange={(handleInput)} 
                        />
                </div> : null
        } */}
    </div>
  )
}

export default Form