export const setOriginalProducts = (state, action) => {
    state.original_data = action.payload
}

export const setWcOrderData = (state, action) => {
    state.wc_order_data = action.payload
}

export const selectItem = (state, action) => {
    state.selected_item = action.payload
}