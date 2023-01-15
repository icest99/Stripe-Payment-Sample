require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

const stripeController = async (req, res) => {
    //these values should be from backend, because in front-end it can be manipulates
    const {purchase, total_amount, shipping_fee} = req.body;
    const calculateOrderAmount = () => {
        return total_amount + shipping_fee;
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'thb'
    })
    console.log(paymentIntent)
    res.send({clientSecret: paymentIntent.client_secret})
}

module.exports = stripeController;