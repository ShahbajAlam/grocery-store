"use server";

import { CartProps } from "@/types";
import { Users } from "./models/UsersModel";

export default async function addToCart(email: string, cartItems: CartProps[]) {
    try {
        const doc = await Users.findOneAndUpdate(
            { email },
            { $set: { cart: cartItems } }
        ).select("_id");

        if (!doc.id) return false;
        return true;
    } catch (error) {
        console.log(error);
    }
}
