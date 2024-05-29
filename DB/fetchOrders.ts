"use server";

import connectDB from "./connection";
import { Orders } from "./models/Orders";

export default async function fetchOrders(email: string) {
    try {
        await connectDB();
        const orders = await Orders.find({ email }).sort({ createdAt: -1 });
        return orders;
    } catch (error) {
        console.log(error);
    }
}
