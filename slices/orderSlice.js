import {
    createSlice
} from '@reduxjs/toolkit'
import {
    HYDRATE
} from 'next-redux-wrapper'

import {
    checkData
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
    coupon: {
        "amount": 0,
        "discount_type": ""
    },
    isOtherShip: false,
    privacy_accepted: false,
    isCheck: false,
    card_filled: false,
}

export const orderSlice = createSlice({
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
        handlePrivacy(state, action) {
            state.privacy_accepted = !state.privacy_accepted
        },
        handleOtherShip(state, action) {
            state.isOtherShip = action.payload
        },
        handleAllCheck(state, action) {
            let check_bill = [false];
            let check_ship = [false];

            if (!state.isOtherShip) {
                check_bill = checkData(state.billing)
                check_ship = [true]
                if (check_bill.includes(false) || !state.privacy_accepted || !state.card_filled) state.isCheck = false;
                else state.isCheck = true
            }
            if (state.isOtherShip) {
                check_bill = checkData(state.billing)
                check_ship = checkData(state.shipping)
                if (check_ship.includes(false) || check_ship.includes(false) || !state.privacy_accepted || !state.card_filled) state.isCheck = false;
                else state.isCheck = true
            }
        },
        handleCheck(state, action) {
            state.isCheck = action.payload
        },
        handleCardFilled(state, action) {
            state.card_filled = action.payload
        },
        setCoupon(state, action) {
            state.coupon = action.payload
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
    handlePrivacy,
    handleOtherShip,
    handleAllCheck,
    handleCheck,
    handleCardFilled,
    setCoupon
} = orderSlice.actions
export default orderSlice.reducer