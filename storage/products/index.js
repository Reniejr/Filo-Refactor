import {
    createSlice
} from '@reduxjs/toolkit'
import {
    HYDRATE
} from 'next-redux-wrapper'

import products_state from './state'
import {
    setOriginalProducts,
    setWcOrderData,
    selectItem
} from './actions'

const initialState = {
    ...products_state
}

export const products = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setOriginalProducts,
        setWcOrderData,
        selectItem
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.product
            }
        }
    }
})

export default products.reducer