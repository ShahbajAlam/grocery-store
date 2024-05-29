"use server";

import connectDB from "./connection";
import { revalidatePath } from "next/cache";
import { Users } from "./models/UsersModel";

export default async function emptyCart(email: string) {
    try {
        await connectDB();
        await Users.updateOne({ email }, { $set: { cart: [] } });

        revalidatePath("/mycart", "page");
    } catch (error) {
        console.log();
    }
}
