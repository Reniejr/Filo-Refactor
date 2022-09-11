import {
    configureStore
} from '@reduxjs/toolkit'

import {
    cartSlice
} from './slices/cartSlice'
import {
    invoiceSlice
} from './slices/invoiceSlice'
import {
    stripeSlice
} from './slices/stripeSlice'
import {
    orderSlice
} from './slices/orderSlice'
import {
    productsSlice
} from './slices/productSlice'
import {
    createWrapper
} from 'next-redux-wrapper'

const makeStore = () => configureStore({
    reducer: {
        cart: cartSlice.reducer,
        products: productsSlice.reducer,
        invoice: invoiceSlice.reducer,
        order: orderSlice.reducer,
        stripe: stripeSlice.reducer
    },
    devTools: true
})

export const wrapper = createWrapper(makeStore)