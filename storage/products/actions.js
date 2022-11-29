export const setOriginalProducts = (state, action) => {
    state.original_data = action.payload
}

export const setWcOrderData = (state, action) => {
    state.wc_order_data = action.payload
}

export const selectItem = (state, action) => {
    const {
        product_id,
        variation_id,
    } = action.payload

    const selected_item = state.original_data.find(item => item.id === product_id)
    const selected_product = selected_item.variations.find(variant => variant.variation_id === variation_id)

    state.selected_item = {
        id: selected_item.id,
        product_name: selected_item.product_name,
        ...selected_product
    }
}