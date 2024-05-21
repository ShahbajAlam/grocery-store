"use server";

import { CartProps } from "@/types";
import connectDB from "./connection";
import { Users } from "./models/UsersModel";

export default async function fetchCartDetails(email: string) {
    try {
        await connectDB();
        const cart = (await Users.findOne({ email }, { _id: 0, cart: 1 })) as {
            cart: CartProps[];
        };

        return cart.cart;
    } catch (error) {
        console.log(error);
    }
}
