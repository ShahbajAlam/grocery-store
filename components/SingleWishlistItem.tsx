"use client";

import { ProductsProps } from "@/types";
import { urlFor } from "@/utils/urlFor";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { Dispatch, SetStateAction, useState } from "react";

export default function SingleWishlistItem({
    item,
    handleMoveToCart,
}: {
    item: ProductsProps;
    handleMoveToCart: (
        item: ProductsProps,
        setLoading: Dispatch<SetStateAction<boolean>>
    ) => void;
}) {
    const data = useWishlist();
    const [loading, setLoading] = useState(false);

    return (
        <li
            key={item._id}
            className="flex justify-between items-stretch p-4 rounded-md bg-[#352433]"
        >
            <div className="flex justify-center items-center gap-4">
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

                <h2 className="text-lg font-bold lg:text-xl">{item.name}</h2>
            </div>

            <div className="flex flex-col justify-between items-end">
                <Trash2Icon
                    role="button"
                    className="w-8 h-8"
                    onClick={() => {
                        data?.removeFromWishlist(item._id);
                    }}
                />

                <Button
                    onClick={() => handleMoveToCart(item, setLoading)}
                    disabled={loading}
                    className="w-full text-black hover:bg-[#c59f60]/90 text-lg px-4 py-2 rounded-md font-semibold disabled:brightness-50"
                >
                    Move to cart
                </Button>
            </div>
        </li>
    );
}
