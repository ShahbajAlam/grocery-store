"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { CartProps } from "@/types";
import { urlFor } from "@/utils/urlFor";
import { Trash2Icon } from "lucide-react";
import showToast from "@/utils/showToast";
import removeFromCart from "@/DB/removeFromCart";

function CartItems({ data, email }: { data: string; email: string }) {
    const item = JSON.parse(data) as CartProps;
    const [loading, setLoading] = useState(false);

    const handleRemove = async (productID: string, productName: string) => {
        try {
            setLoading(true);
            const removed = await removeFromCart(email, productID);
            if (!removed) {
                showToast({
                    type: "error",
                    message: `Could not remove ${productName} from cart`,
                });
            }
        } catch (error) {
            showToast({
                type: "error",
                message: `Could not remove ${productName} from cart`,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <li
            key={item.productID}
            className="flex justify-between items-center p-4 rounded-md bg-[#352433]"
        >
            <div className="flex justify-center items-center gap-4">
                <Link
                    href={`category/${item.productCategory}/${item.productID}`}
                >
                    <Image
                        src={urlFor(item.productImage).url()}
                        width={100}
                        height={100}
                        loading="lazy"
                        alt={item.productName}
                        className="lg:w-[150px] aspect-square"
                    />
                </Link>

                <div>
                    <h2 className="text-lg font-bold lg:text-xl">
                        {item.productName} (x{item.productCount})
                    </h2>
                    <h2 className="text-lg font-bold lg:text-xl">
                        &#x20B9;{item.productPrice * item.productCount}
                    </h2>
                </div>
            </div>

            {loading ? (
                <span className="loading loading-spinner text-info w-8 h-8" />
            ) : (
                <Trash2Icon
                    role="button"
                    className="w-8 h-8"
                    onClick={handleRemove.bind(
                        null,
                        item.productID,
                        item.productName
                    )}
                />
            )}
        </li>
    );
}

export default CartItems;
