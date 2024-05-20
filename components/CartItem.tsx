"use client";

import Link from "next/link";
import Image from "next/image";
import { CartProps } from "@/types";
import { urlFor } from "@/utils/urlFor";
import { Trash2Icon } from "lucide-react";
import removeFromCart from "@/DB/removeFromCart";

function CartItem({ item, email }: { item: CartProps; email: string }) {
    
    const handleRemoveFromCart = async () => {
        const res = await removeFromCart(email, item.productID);
    };

    return (
        <li className="flex justify-between items-center p-4 rounded-md bg-[#352433]">
            <div className="flex justify-center items-center gap-4">
                <Link
                    legacyBehavior
                    href={`/${item.productCategory}/${item.productID}`}
                >
                    <Image
                        src={urlFor(item.productImage).url()}
                        width={100}
                        height={100}
                        alt={item.productName}
                    />
                </Link>

                <div>
                    <h2 className="text-lg font-bold">
                        {item.productName} (x{item.productCount})
                    </h2>
                    <h2 className="text-lg font-bold">
                        &#x20B9;{item.productPrice * item.productCount}
                    </h2>
                </div>
            </div>

            <Trash2Icon onClick={handleRemoveFromCart} />
        </li>
    );
}

export default CartItem;
