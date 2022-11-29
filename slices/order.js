import {
    createSlice
} from '@reduxjs/toolkit'
import {
    HYDRATE
} from 'next-redux-wrapper'

import {
    checkData,
    checkData1
} from '../modules/checkout/utilities'

const initialState = {
    billing: {
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
    },
    shipping: {
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
    },
    shipping_method: {
        "method_id": "",
        "method_title": "",
        "total": 0
    },
    isPrivacyAccepted: false,
    isCheckout: false,
    isCardFilled: false,
    payment_method: ""
}

export const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setBilling(state, action) {
            state.billing = action.payload
        },
        setShipping(state, action) {
            state.shipping = action.payload
        },
        setShippingMethod(state, action) {
            state.shipping_method = action.payload
        },
        handleCheckout(state, action) {
            const check_billing_infos = checkData1(state.billing)
            const check_shipping_infos = checkData1(state.shipping)

            let all_checkings;

            switch (state.payment_method) {
                case "stripe":
                    all_checkings = [
                        check_billing_infos,
                        check_shipping_infos,
                        isCardFilled
                    ];
                    break;
                case "paypal":
                    all_checkings = [
                        check_billing_infos,
                        check_shipping_infos
                    ];
                    break;
                default:
                    ;
                    break;
            }


        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.order
            }
        }
    }
})

export const {
    setBilling,
    setShipping,
    setShippingMethod,
} = order.actions
export default order.reducer