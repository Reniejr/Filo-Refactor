import {
    createSlice
} from '@reduxjs/toolkit'
import {
    HYDRATE
} from 'next-redux-wrapper'

const initialState = {
    payment_try: false
}

export const stripeSlice = createSlice({
    name: 'stripe',
    initialState,
    reducers: {
        setTry(state, action) {
            state.payment_try = true
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.invoice
            }
        }
    }
})

export const {
    setTry
} = stripeSlice.actions
export default stripeSlice.reducer