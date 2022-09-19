import {
    createSlice
} from '@reduxjs/toolkit'
import {
    HYDRATE
} from 'next-redux-wrapper'

const initialState = {
    zones: []
}

export const locationsSlice = createSlice({
    name: 'zones',
    initialState,
    reducers: {
        setLocations(state, action) {
            state.zones = action.payload
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.locations
            }
        }
    }
})

export const {
    setLocations
} = locationsSlice.actions
export default locationsSlice.reducer