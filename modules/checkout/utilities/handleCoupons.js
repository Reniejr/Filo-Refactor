import moment from "moment";

const calcByType = (discount_type, coupon_amount, item_price) => {

    switch (discount_type) {
        case "percent":
            return parseFloat(coupon_amount) * item_price / 100;
        case "fixed_product":
            return item_price - (parseFloat(coupon_amount) * 100);
    }

}

const getDiscountDetails = (variation_id, price_item) => {
    return {
        variation_id,
        price_item
    }
}

const checkCoupon = (coupon, cart) => {

    const {
        id,
        code,
        amount,
        status,
        discount_type,
        date_expires,
        usage_limit,
        usage_count,
        free_shipping,
        minimum_amount,
        maximum_amount,
        product_ids,
        individual_use
    } = coupon;

    const {
        line_items,
        original_total,
        shipping
    } = cart;

    if (status !== 'publish') return null;

    if (date_expires !== "nullZ" && moment(date_expires).isBefore(moment())) return null;

    if (usage_limit && usage_count > usage_limit) return null;

    if (product_ids.length > 0) {
        let discounted_total = 0;
        let discounted_items = [];

        product_ids.forEach(p_id => {

            line_items.forEach(item => {

                let original_amount = item.amount * item.quantity

                if (item.variation_id === p_id) {

                    const discounted_item_price = calcByType(discount_type, amount, item.amount)
                    const discounted_amount = discounted_item_price * item.quantity

                    discounted_total = discounted_total + discounted_amount

                    discounted_items.push(getDiscountDetails(item.variation_id, discounted_item_price))

                } else discounted_total = discounted_total + original_amount

            })
        })

        return {
            discounted_items,
            discounted_total
        }

    } else {

        let discounted_total = 0;
        let discounted_items = [];

        line_items.forEach(item => {
            const discounted_item_price = calcByType(discount_type, amount, item.amount)
            const discounted_amount = discounted_item_price * item.quantity
            discounted_items.push(getDiscountDetails(item.variation_id, discounted_item_price))
            discounted_total = discounted_total + discounted_amount
        })

        return {
            discounted_items,
            discounted_total
        }
    }

}

export {
    checkCoupon
}