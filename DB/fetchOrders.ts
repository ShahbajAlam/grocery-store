"use server";

import { revalidatePath } from "next/cache";
import connectDB from "./connection";
import { Orders } from "./models/Orders";

export default async function fetchOrders(email: string) {
    try {
        await connectDB();
        const orders = await Orders.find({ email }).sort({ createdAt: -1 });
        revalidatePath("/myprofile", "page");
        return orders;
    } catch (error) {
        console.log(error);
    }
}
