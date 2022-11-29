import {
    configureStore
} from '@reduxjs/toolkit'

import {
    stripeSlice
} from './slices/stripeSlice'
import {
    orderSlice
} from './slices/orderSlice'

import checkout from './storage/checkout'
import products from './storage/products'


import {
    createWrapper
} from 'next-redux-wrapper'

const makeStore = () => configureStore({
    reducer: {
        // order: orderSlice.reducer,
        stripe: stripeSlice.reducer,
        checkout,
        products

    },
    devTools: true
})

export const wrapper = createWrapper(makeStore)