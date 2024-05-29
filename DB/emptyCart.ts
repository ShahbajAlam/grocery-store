"use server";

import connectDB from "./connection";
import { Orders } from "./models/Orders";
import { revalidatePath } from "next/cache";

export default async function emptyCart(email: string) {
    try {
        await connectDB();
        await Orders.deleteMany({ email });

        revalidatePath("/mycart", "page");
    } catch (error) {
        console.log();
    }
}
