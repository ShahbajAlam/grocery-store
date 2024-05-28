"use server";

import { OrderProps } from "@/types";
import connectDB from "./connection";
import { Orders } from "./models/Orders";

export default async function addOrder(orderDetails: OrderProps) {
    const { order, ...other } = orderDetails;
    try {
        await connectDB();
        await Orders.create({ ...other, order: order });
    } catch (error) {
        console.log(error);
    }
}
