"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ProductsProps } from "@/types";
import addToCart from "@/DB/addToCart";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import showToast from "@/utils/showToast";

function AddToCartButton({ product }: { product: ProductsProps }) {
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, getUser } = useKindeBrowserClient();
    const user = getUser();
    const email = user?.email as string;

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
        if (!isAuthenticated)
            showToast({
                type: "error",
                message: "Please log in to your account first",
            });
        else {
            setLoading(true);
            const cartItems = [
                {
                    productID: product._id,
                    productCount: count,
                    productPrice: product.price,
                },
            ];
            if (await addToCart(email, cartItems))
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
