"use client";

import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/utils/urlFor";
import { useWishlist } from "@/contexts/WishlistContext";
import { Trash2Icon } from "lucide-react";

export default function ShowWishlist() {
    const data = useWishlist();

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
                    <li
                        key={item._id}
                        className="flex justify-between items-center p-4 rounded-md bg-[#352433]"
                    >
                        <div className="flex justify-center items-center gap-4">
                            <Link
                                legacyBehavior
                                href={`category/${item.category}/${item._id}`}
                            >
                                <Image
                                    src={urlFor(item.image).url()}
                                    width={100}
                                    height={100}
                                    loading="lazy"
                                    alt={item.name}
                                    className="lg:w-[150px] aspect-square"
                                />
                            </Link>

                            <div>
                                <h2 className="text-lg font-bold lg:text-xl">
                                    {item.name}
                                </h2>
                            </div>
                        </div>

                        <Trash2Icon
                            role="button"
                            className="w-8 h-8"
                            onClick={() => {
                                data.removeFromWishlist(item._id);
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
