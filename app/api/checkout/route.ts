import { CartProps } from "@/types";
import { headers } from "next/headers";
import initializeStripe from "@/utils/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const headersList = headers();
    const { cartItems } = await req.json();

    const lineItems = cartItems.map((item: CartProps) => {
        return {
            quantity: item.productCount,
            price_data: {
                currency: "INR",
                product_data: {
                    name: item.productName,
                },
                unit_amount: item.productPrice * 100,
            },
        };
    });

    try {
        const session = await initializeStripe().checkout.sessions.create({
            payment_method_types: ["card"],
            payment_method_options: {
                card: {
                    request_three_d_secure: "any",
                },
            },
            shipping_address_collection: {
                allowed_countries: ["IN"],
            },
            line_items: lineItems,
            currency: "INR",
            mode: "payment",
            success_url: `${headersList.get("origin")}/thank-you`,
            cancel_url: `${headersList.get("origin")}/`,
        });

        console.log(session);

        return NextResponse.json({ sessionId: session.id });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Error creating checkout session" });
    }
}
