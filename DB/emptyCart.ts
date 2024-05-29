"use server";

import connectDB from "./connection";
import { Orders } from "./models/Orders";

export default async function emptyCart(email: string) {
    try {
        await connectDB();
        await Orders.deleteMany({ email });
    } catch (error) {
        console.log();
    }
}
