import Stripe from "stripe";
import addOrder from "@/DB/addOrder";
import emptyCart from "@/DB/emptyCart";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    let lineitems;
    let event: Stripe.Event;
    const body = await req.text();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    const signature = req.headers.get("stripe-signature") as string;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_KEY as string
        );

        if (event.type === "checkout.session.completed") {
            lineitems = await stripe.checkout.sessions.listLineItems(
                event.data.object.id
            );

            lineitems = lineitems.data.map((item) => ({
                quantity: item.quantity as number,
                unit_amount: (item.price?.unit_amount as number) / 100,
                amount_total: (item.amount_total as number) / 100,
                description: item.description as string,
            }));

            const name = event.data.object.customer_details?.name as string;
            const email = event.data.object.customer_email as string;
            const line1 = event.data.object.shipping_details?.address
                ?.line1 as string;
            const line2 = event.data.object.shipping_details?.address
                ?.line2 as string;
            const city = event.data.object.shipping_details?.address
                ?.city as string;
            const state = event.data.object.shipping_details?.address
                ?.state as string;
            const country = event.data.object.shipping_details?.address
                ?.country as string;
            const pin = event.data.object.shipping_details?.address
                ?.postal_code as string;
            const total = (event.data.object.amount_total as number) / 100;

            await addOrder({
                name,
                email,
                line1,
                line2,
                city,
                state,
                pin,
                country,
                order: lineitems,
                total,
            });

            await emptyCart(email);
        }
        return NextResponse.json({ message: "Webhook call is successful" });
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ message: error.message });
    }
}
