import {
    checkData1
} from "modules/checkout/utilities"

export const setPaymentMethod = (state, action) => {
    state.payment_method = action.payload.payment_method
    state.payment_method_title = action.payload.payment_method_title
}

export const setIsCardFilled = (state, action) => {
    state.isCardFilled = action.payload
}

export const checkUserInfo = (state, action) => {
    const check_billing = checkData1(state.billing.data)
    const check_shipping = checkData1(state.shipping.data.data)
    const check_privacy = state.isPrivacyAccepted
    const check_card = state.payment_method_title === "Card" ?
        state.isCardFilled : true
    const check_coupon = state.isCoupon ?
        state.isCouponValid ? true : false :
        true
    const check_array = [
        check_billing,
        check_shipping,
        check_privacy,
        check_card,
        check_coupon
    ]
    console.log(check_array)

    check_array.includes(false) ? state.check_user_info = false : state.check_user_info = true

}