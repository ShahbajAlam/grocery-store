"use client";

import { ProductsProps } from "@/types";
import { useWishlist } from "@/contexts/WishlistContext";
import showToast from "@/utils/showToast";

export default function AddToWishlistButton({ item }: { item: ProductsProps }) {
    const data = useWishlist();

    const isInWishlist = (id: string) => {
        return data?.products.some((item) => item._id === id);
    };

    return (
        <span
            role="button"
            className={`text-3xl ${isInWishlist(item._id) ? "text-red-600" : ""}`}
            onClick={() => {
                if (isInWishlist(item._id)) {
                    data?.removeFromWishlist(item._id);
                    showToast({
                        type: "success",
                        message: `${item.name} is removed from wishlist`,
                    });
                } else {
                    data?.addToWishlist(item);
                    showToast({
                        type: "success",
                        message: `${item.name} is added to wishlist`,
                    });
                }
            }}
        >
            &#10084;
        </span>
    );
}
