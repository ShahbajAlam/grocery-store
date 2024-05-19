"use server";

import { CartProps } from "@/types";
import { Users } from "./models/UsersModel";

export default async function addToCart(email: string, cartItems: CartProps[]) {
    try {
        await Users.findOneAndUpdate({ email }, { $set: { cart: cartItems } });
    } catch (error) {
        console.log(error);
    }
}
