import {
    createSlice
} from '@reduxjs/toolkit'
import {
    HYDRATE
} from 'next-redux-wrapper'

//* USER_INFO
import user_state from './user_info/state'
import {
    setBillingData,
    setShipping,
    setShippingData,
    setInvoice,
    setInvoiceData,
    setIsPrivacyAccepted
} from './user_info/actions'

//* SHIPPING_METHOD
import shipping_method_state from './shipping/state'
import {
    setShippingMethod
} from './shipping/actions'

//* LOCATIONS
import locations_state from './location/state'
import {
    setLocations,
    setCurrentCountry
} from './location/actions'

//* ORDER
import order_state from './order/state'
import {
    setPaymentMethod,
    checkUserInfo,
    setIsCardFilled
} from './order/actions'

//* COUPON
import coupon_state from './coupon/state'
import {
    setIsCoupon,
    setIsCouponValid,
    setCoupon,
    setDiscount
} from './coupon/actions'

//* CART
import cart_state from './cart/state'
import {
    setCartItems,
    resetCartItems,
    addCartItem,
    removeByOne,
    removeFromCart,
    setNewTotal
} from './cart/actions'

const initialState = {
    ...cart_state,
    ...user_state,
    ...shipping_method_state,
    ...locations_state,
    ...order_state,
    ...coupon_state
}

export const checkout = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setCartItems,
        resetCartItems,
        addCartItem,
        removeByOne,
        removeFromCart,
        setBillingData,
        setShipping,
        setShippingData,
        setInvoice,
        setInvoiceData,
        setIsPrivacyAccepted,
        setShippingMethod,
        setLocations,
        setCurrentCountry,
        setPaymentMethod,
        setIsCardFilled,
        checkUserInfo,
        setIsCoupon,
        setIsCouponValid,
        setCoupon,
        setDiscount,
        setNewTotal
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.checkout
            }
        }
    }
})

export default checkout.reducer