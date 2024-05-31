"use server";

import connectDB from "./connection";
import { OrderProps } from "@/types";
import { Orders } from "./models/Orders";
import { revalidatePath } from "next/cache";

export default async function addOrder(orderDetails: OrderProps) {
    try {
        await connectDB();
        await Orders.create({ ...orderDetails });
        revalidatePath("/myprofile");
    } catch (error) {
        console.log(error);
    }
}
