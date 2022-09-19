import WCApi from "./WCApi";

const getCouponByCode = async (code) => {
    const coupon = await WCApi.get(`coupons?code=${code}`)
    console.log(coupon.data[0])
    return {
        amount: coupon.data[0] ? parseFloat(coupon.data[0].amount) : 0,
        discount_type: coupon.data[0] ? coupon.data[0].discount_type : ""
    }
}

export {
    getCouponByCode
}