"use server";

import { CartProps } from "@/types";
import connectDB from "./connection";
import { Users } from "./models/UsersModel";
import fetchCartDetails from "./fetchCartDetails";
import { revalidatePath } from "next/cache";

export default async function removeFromCart(email: string, productID: string) {
    try {
        connectDB();

        let cart = (await fetchCartDetails(email)) as CartProps[];
        cart = cart.filter((item) => item.productID !== productID);

        const doc = await Users.findOneAndUpdate(
            { email },
            { $set: { cart } }
        ).select("_id");

        revalidatePath("/mycart", "page");

        if (!doc.id) return false;
        return true;
    } catch (error) {
        console.log(error);
    }
}
