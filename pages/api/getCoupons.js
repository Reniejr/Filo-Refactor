/*
    DATA NEEDED
    ID = number,
    CODE = string,
    AMOUNT = string to convert in float,
    STATUS = string = "public" || "private" || "draft",
    DISCOUNT_TYPE = string,
    DATE_EXPIRES = date,
    USAGE_LIMIT = null || number,
    USAGE_COUNT = number,
    FREE_SHIPPING = boolean,
    MINIMUM_AMOUNT = string to convert in float,
    MAXIMUM_AMOUNT = string to convert in float,
    PRODUCT_IDS = array of number,
    INDIVIDUAL_USE = boolean
*/

import WCApi from "./WCApi";

const getCouponByCode = async (code) => {
    const coupon = await WCApi.get(`coupons?code=${code}`).then(res => res.data[0])
    if (!coupon) {
        return null;
    } else {
        const coupon_data = {
            id: coupon.id,
            code: coupon.code,
            amount: parseFloat(coupon.amount),
            status: coupon.status,
            discount_type: coupon.discount_type,
            date_expires: `${coupon.date_expires}Z`,
            usage_limit: coupon.usage_limit,
            usage_count: coupon.usage_count,
            free_shipping: coupon.free_shipping,
            minimum_amount: parseFloat(coupon.minimum_amount),
            maximum_amount: parseFloat(coupon.maximum_amount),
            product_ids: coupon.product_ids,
            individual_use: coupon.individual_use
        }
        return coupon_data
    }
}

export {
    getCouponByCode
}