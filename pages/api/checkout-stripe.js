const stripe = require('stripe')(process.env.STRIPE_SK)

// const axios = require('axios').default

// const instance = axios.create({
//     baseURL: process.env.WP_URL,
//     headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*"
//     }
// })

export async function paymentIntenthandler(req, res) {
    // const data = req.body.line_items
    const total = parseFloat(req.body.total) * 100

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "eur"
        })
        res.json({
            paymentIntentId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret
        })
    } catch (error) {
        throw new Error(error)
    }
}