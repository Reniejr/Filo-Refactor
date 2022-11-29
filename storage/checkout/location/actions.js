export const setLocations = (state, action) => {
    state.zones = action.payload
}

export const setCurrentCountry = (state, action) => {
    state.current_country_code = action.payload
}