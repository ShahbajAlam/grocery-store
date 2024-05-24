import Stripe from "stripe";

const initializeStripe = () => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: "2024-04-10",
    });
    return stripe;
};

export default initializeStripe;
