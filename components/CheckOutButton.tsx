"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { CartProps } from "@/types";
import showToast from "@/utils/showToast";
import { loadStripe } from "@stripe/stripe-js";

export default function CheckOutButton({
    cart,
    email,
}: {
    cart: string;
    email: string;
}) {
    const [loading, setLoading] = useState(false);
    const cartItems = JSON.parse(cart) as CartProps[];

    const checkOut = async () => {
        try {
            setLoading(true);

            const stripe = await loadStripe(
                process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
            );

            if (!stripe) throw new Error("Stripe failed to initialize.");

            const checkoutResponse = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cartItems, email }),
            });

            const { sessionId } = await checkoutResponse.json();
            await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
            if (error instanceof Error)
                showToast({ type: "error", message: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button className="w-full text-md my-4" onClick={checkOut}>
            {loading ? (
                <span className="loading loading-spinner text-neutral" />
            ) : (
                "Checkout"
            )}
        </Button>
    );
}
