import {
    configureStore
} from '@reduxjs/toolkit'

import {
    cartSlice
} from './slices/cartSlice'
import {
    createWrapper
} from 'next-redux-wrapper'

const makeStore = () => configureStore({
    reducer: {
        cart: cartSlice.reducer
    },
    devTools: true
})

export const wrapper = createWrapper(makeStore)