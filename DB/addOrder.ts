"use server";

import connectDB from "./connection";
import { OrderProps } from "@/types";
import { Orders } from "./models/Orders";

export default async function addOrder(orderDetails: OrderProps) {
    try {
        await connectDB();
        await Orders.create({ ...orderDetails });
    } catch (error) {
        console.log(error);
    }
}
