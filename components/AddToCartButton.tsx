"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ProductsProps } from "@/types";
import addToCart from "@/DB/addToCart";
import showToast from "@/utils/showToast";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

type AddToCartButtonProps = {
    product: ProductsProps;
    isAuth: boolean;
    user: KindeUser | null;
};

function AddToCartButton({ product, isAuth, user }: AddToCartButtonProps) {
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);

    const decreaseCount = () => {
        setCount((oldCount) => {
            if (oldCount === 1) return oldCount;
            else return oldCount - 1;
        });
    };

    const increaseCount = () => {
        setCount((oldCount) => {
            if (oldCount === 10) return oldCount;
            else return oldCount + 1;
        });
    };

    const handleAddToCart = async () => {
        if (!isAuth)
            showToast({
                type: "error",
                message: "Please log in to your account first",
            });
        else {
            setLoading(true);
            const cartItem = {
                productID: product._id,
                productCount: count,
                productPrice: product.price,
            };
            if (await addToCart(user?.email as string, cartItem))
                showToast({
                    type: "success",
                    message: `${product.name} is added to the cart`,
                });
            else
                showToast({
                    type: "error",
                    message: "Could not add to the cart",
                });
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex gap-6 items-center">
                <div className="join flex justify-start my-4">
                    <button
                        disabled={count === 1}
                        onClick={decreaseCount}
                        className="join-item btn text-lg px-5"
                    >
                        -
                    </button>
                    <button className="join-item btn text-lg px-5">
                        {count}
                    </button>
                    <button
                        disabled={count === 10}
                        onClick={increaseCount}
                        className="join-item btn text-lg px-5"
                    >
                        +
                    </button>
                </div>

                <h2 className="text-3xl font-bold">
                    &#x20B9;{count * product.price}
                </h2>
            </div>

            <Button
                className="w-full text-black hover:bg-[#c59f60]/90 text-lg px-4 py-2 rounded-md font-semibold my-4"
                onClick={handleAddToCart}
            >
                {loading ? (
                    <span className="loading loading-spinner text-neutral" />
                ) : (
                    "Add to cart"
                )}
            </Button>
        </>
    );
}

export default AddToCartButton;
