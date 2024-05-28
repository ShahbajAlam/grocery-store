import { Schema, model, models } from "mongoose";

const OrdersModel = new Schema(
    {
        name: String,
        email: String,
        line1: String,
        line2: String,
        city: String,
        state: String,
        country: String,
        pin: Number,
        total: Number,
        order: [
            {
                quantity: Number,
                unit_amount: Number,
                amount_total: Number,
                description: String,
            },
        ],
    },
    { timestamps: true }
);

export const Orders = models.orders || model("orders", OrdersModel);
