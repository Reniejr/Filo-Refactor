import {
    createSlice
} from '@reduxjs/toolkit'
import {
    HYDRATE
} from 'next-redux-wrapper'

const initialState = {
    billing: {
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
    },
    shipping: {
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
    },
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
    setShipping
} = orderSlice.actions
export default orderSlice.reducer