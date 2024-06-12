"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { urlFor } from "@/utils/urlFor";
import { Trash2Icon } from "lucide-react";
import { ProductsProps } from "@/types";
import { useWishlist } from "@/contexts/WishlistContext";
import { Dispatch, SetStateAction, useState } from "react";

type SingleWishlistItemProps = {
    item: ProductsProps;
    handleMoveToCart: (
        item: ProductsProps,
        setLoading: Dispatch<SetStateAction<boolean>>
    ) => void;
};

export default function SingleWishlistItem({
    item,
    handleMoveToCart,
}: SingleWishlistItemProps) {
    const data = useWishlist();
    const [loading, setLoading] = useState(false);

    return (
        <li
            key={item._id}
            className="flex flex-col p-4 rounded-md bg-[#352433]"
        >
            <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <Link href={`category/${item.category}/${item._id}`}>
                        <Image
                            src={urlFor(item.image).url()}
                            width={100}
                            height={100}
                            loading="lazy"
                            alt={item.name}
                            className="lg:w-[150px] aspect-square"
                        />
                    </Link>

                    <h2 className="text-lg font-bold lg:text-xl">
                        {item.name}
                    </h2>
                </div>

                <Trash2Icon
                    role="button"
                    className="w-8 h-8"
                    onClick={() => {
                        data?.removeFromWishlist(item._id);
                    }}
                />
            </div>

            <Button
                onClick={() => handleMoveToCart(item, setLoading)}
                disabled={loading}
                className="text-black hover:bg-[#c59f60]/90 text-lg px-4 py-2 rounded-md font-semibold disabled:brightness-50 self-end"
            >
                {loading ? (
                    <span className="loading loading-spinner text-neutral" />
                ) : (
                    "Move to cart"
                )}
            </Button>
        </li>
    );
}
