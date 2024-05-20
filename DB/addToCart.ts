"use server";

import { CartProps } from "@/types";
import connectDB from "./connection";
import { Users } from "./models/UsersModel";
import fetchCartDetails from "./fetchCartDetails";

export default async function addToCart(email: string, cartItem: CartProps) {
    try {
        connectDB();
        let cart = (await fetchCartDetails(email)) as CartProps[];
        cart = cart?.filter((item) => item.productID !== cartItem.productID);
        cart = [...cart, cartItem];

        const doc = await Users.findOneAndUpdate(
            { email },
            { $set: { cart } }
        ).select("_id");

        if (!doc.id) return false;
        return true;
    } catch (error) {
        console.log(error);
    }
}
