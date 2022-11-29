import {
    postOrder
} from "./WooCommerceApi";

const createOrder = (value) => {
    return (data, actions) => actions.order.create({
        purchase_units: [{
            amount: {
                value: value
            }
        }]
    });
}

const onApprove = (order, cb) => {
    return (data, actions) => {
        return actions.order.capture().then(function (orderData) {

        }).then(() => {
            postOrder(order)
            cb()
        })
    }
}

export {
    createOrder,
    onApprove
}