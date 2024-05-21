"use client";

import Link from "next/link";
import Image from "next/image";
import { CartProps } from "@/types";
import { urlFor } from "@/utils/urlFor";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import removeFromCart from "@/DB/removeFromCart";
import showToast from "@/utils/showToast";

function CartItems({ data, email }: { data: string; email: string }) {
    const [items, setItems] = useState(() => JSON.parse(data) as CartProps[]);

    const handleRemove = async (productID: string, productName: string) => {
        const updatedItems = items.filter(
            (item) => item.productID !== productID
        );
        setItems(updatedItems);
        const removed = await removeFromCart(email, productID);
        if (!removed) {
            showToast({
                type: "error",
                message: `Could not remove ${productName} from cart`,
            });
        }
    };

    return (
        <ul className="flex flex-col gap-3 rounded-lg">
            {items.map((item) => (
                <li
                    key={item.productID}
                    className="flex justify-between items-center p-4 rounded-md bg-[#352433]"
                >
                    <div className="flex justify-center items-center gap-4">
                        <Link
                            legacyBehavior
                            href={`/${item.productCategory}/${item.productID}`}
                        >
                            <Image
                                src={urlFor(item.productImage).url()}
                                width={100}
                                height={100}
                                priority
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

                    <Trash2Icon
                        role="button"
                        className="w-8 h-8"
                        onClick={handleRemove.bind(
                            null,
                            item.productID,
                            item.productName
                        )}
                    />
                </li>
            ))}
        </ul>
    );
}

export default CartItems;
