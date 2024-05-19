import { Schema, model, models } from "mongoose";

const UsersModel = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        cart: {
            type: [
                {
                    productID: String,
                    productCount: Number,
                    productPrice: Number,
                },
            ],
        },
    },
    { timestamps: true }
);

export const Users = models.users || model("users", UsersModel);
