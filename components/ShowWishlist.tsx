"use client";

import addToCart from "@/DB/addToCart";
import showToast from "@/utils/showToast";
import { CartProps, ProductsProps } from "@/types";
import { useWishlist } from "@/contexts/WishlistContext";
import { Dispatch, SetStateAction } from "react";
import SingleWishlistItem from "./SingleWishlistItem";

type ShowWishlistProps = {
    email: string;
    isAuth: boolean;
};

export default function ShowWishlist({ isAuth, email }: ShowWishlistProps) {
    const data = useWishlist();

    const handleMoveToCart = async (
        item: ProductsProps,
        setLoading: Dispatch<SetStateAction<boolean>>
    ) => {
        if (!isAuth) {
            showToast({
                type: "error",
                message: "Please log in to your account first",
            });
            return;
        }

        const cartItem: CartProps = {
            productID: item._id,
            productName: item.name,
            productCount: 1,
            productCategory: item.category,
            productImage: item.image,
            productPrice: item.price,
        };

        try {
            setLoading(true);
            const response = (await addToCart(email, cartItem)) as {
                type: string | boolean;
            };

            if (response.type === true) {
                showToast({
                    type: "success",
                    message: `${item.name} is added to the cart`,
                });
            } else if (response.type === false) {
                showToast({
                    type: "error",
                    message: "Could not add to the cart",
                });
            } else {
                showToast({
                    type: "error",
                    message: "Only 10 items are allowed in the cart once",
                });
            }
        } catch (error) {
            if (error instanceof Error)
                showToast({ type: "error", message: error.message });
        } finally {
            setLoading(false);
        }
    };

    if (data?.products.length === 0)
        return (
            <h1 className="px-4 py-2 text-lg text-balance text-center font-bold mt-20 uppercase lg:text-xl">
                Your wishlist is empty, start adding some items
            </h1>
        );

    return (
        <div className="px-4 py-2">
            <h1 className="text-lg text-balance text-center font-bold my-4 uppercase lg:text-xl">
                My wishlist
            </h1>

            <ul className="flex flex-col gap-3 rounded-lg md:w-[80%] lg:w-[70%] lg:max-w-[900px] md:mx-auto">
                {data?.products.map((item) => (
                    <SingleWishlistItem
                        key={item._id}
                        item={item}
                        handleMoveToCart={handleMoveToCart}
                    />
                ))}
            </ul>
        </div>
    );
}
