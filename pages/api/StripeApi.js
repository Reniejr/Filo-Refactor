// const stripe = require('stripe')(process.env.STRIPE_SK);

// async function CreateStripeSession(req, res) {

//     const {
//         item
//     } = req.body;

//     const redirectURL = process.env.NODE_ENV === 'production' ?
//         "https://devjr.space/checkout" :
//         "http://localhost:3000"

//     const stripeItem = {
//         "price_data": {
//             "currency": "eur",
//             "product_data": {
//                 "name": "Filo Tag"
//             },
//             "unit_amount": 100,
//         },
//         "description": "Test",
//         "quantity": 1
//     }

//     const session = await stripe.checkout.sessions.create({
//         "payment_method_types": ["card"],
//         "line_items": [stripeItem],
//         "mode": "payment",
//         "success_url": redirectURL + "?status=success",
//         "cancel_url": redirectURL + "?status=cancel",
//     })

//     res.json({
//         "id": session.id
//     })

// }

// export default CreateStripeSession;

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SK)

export default async function handler(req, res) {
    const {
        items
    } = req.body

    try {
        const params = {
            "submit_type": "pay",
            "mode": "payment",
            "payment_method_types": ["card"],
            "line_items": items,
            "success_url": "http://localhost:3000?status=success",
            "cancel_url": "http://localhost:3000?status=cancel",
        }

        const checkoutSession = await stripe.checkout.sessions.create(params)
        console.log(checkoutSession)

        res.status(200).json(checkoutSession)

    } catch (error) {
        throw new Error(error)
    }

}