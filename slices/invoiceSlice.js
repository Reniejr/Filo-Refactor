import {
    createSlice
} from '@reduxjs/toolkit'
import {
    HYDRATE
} from 'next-redux-wrapper'

const initialState = {
    invoice: null
}

export const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setInvoice(state, action) {
            state.invoice = action.payload
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
    setInvoice
} = invoiceSlice.actions
export default invoiceSlice.reducer