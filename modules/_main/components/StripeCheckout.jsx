import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardPayment from "./CardPayment";

const stripePromise = loadStripe(
  `${process.env.STRIPE_PUBLIC_KEY}`
);

// const options = {
//   clientSecret: process.env.STRIPE_SK
// }

const StripeCheckout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardPayment />
    </Elements>
  )
}

export default StripeCheckout