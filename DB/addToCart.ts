"use server";

import { CartProps } from "@/types";
import connectDB from "./connection";
import { Users } from "./models/UsersModel";
import fetchCartDetails from "./fetchCartDetails";

export default async function addToCart(email: string, cartItem: CartProps) {
    try {
        await connectDB();

        let cart = (await fetchCartDetails(email)) as CartProps[];
        cart = cart?.filter((item) => item.productID !== cartItem.productID);
        cart = [...cart, cartItem];

        if (cart.length === 11) return { type: "max_limit" };

        const doc = await Users.findOneAndUpdate(
            { email },
            { $set: { cart } }
        ).select("_id");

        if (!doc.id) return { type: false };
        return { type: true };
    } catch (error) {
        console.log(error);
    }
}
