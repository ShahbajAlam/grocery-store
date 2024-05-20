import { Schema, model, models } from "mongoose";

const UsersModel = new Schema(
    {
        email: {
            type: String,
        },
        name: {
            type: String,
        },
        cart: {
            type: [
                {
                    productID: String,
                    productName: String,
                    productImage: String,
                    productCount: Number,
                    productPrice: Number,
                    productCategory: String,
                },
            ],
        },
    },
    { timestamps: true }
);

export const Users = models.users || model("users", UsersModel);
