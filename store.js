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
    productsSlice
} from './slices/productSlice'
import {
    createWrapper
} from 'next-redux-wrapper'

const makeStore = () => configureStore({
    reducer: {
        cart: cartSlice.reducer,
        products: productsSlice.reducer,
        invoice: invoiceSlice.reducer
    },
    devTools: true
})

export const wrapper = createWrapper(makeStore)