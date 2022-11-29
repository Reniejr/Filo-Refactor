export const setIsCoupon = (state, action) => {
    state.isCoupon = action.payload
}

export const setIsCouponValid = (state, action) => {
    state.isCouponValid = action.payload
}

export const setCoupon = (state, action) => {
    state.coupon_data = action.payload
}
export const setDiscount = (state, action) => {
    state.discount = action.payload
}