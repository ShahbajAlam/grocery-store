"use client";

import { ProductsProps } from "@/types";
import showToast from "@/utils/showToast";
import { useWishlist } from "@/contexts/WishlistContext";

export default function AddToWishlistButton({ item }: { item: ProductsProps }) {
    const data = useWishlist();

    const isInWishlist = (id: string) => {
        return data?.products.some((item) => item._id === id);
    };

    const handleAddToWishlistButton = () => {
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
    };

    return (
        <span role="button" onClick={handleAddToWishlistButton}>
            {isInWishlist(item._id) ? (
                <img src="/heart.png" alt="heart icon" width={30} height={30} />
            ) : (
                <img src="/like.png" alt="heart icon" width={30} height={30} />
            )}
        </span>
    );
}
