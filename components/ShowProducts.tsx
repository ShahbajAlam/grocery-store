"use client";

import Link from "next/link";
import { urlFor } from "@/utils/urlFor";
import { ProductsProps, useProducts } from "@/contexts/ProductsContext";
import { Button } from "./ui/button";

function ShowProducts() {
    const data = useProducts();
    const products = [...(data?.products as Array<ProductsProps>)];

    return (
        <div className="px-4 py-2 grid gap-3 grid-cols-1">
            {products.map((item) => (
                <div
                    key={item._id}
                    className="rounded-2xl px-6 py-4 bg-[#352433] flex flex-col gap-2 justify-center items-center"
                >
                    <div className="w-[50%] aspect-square flex justify-center items-center">
                        <img src={urlFor(item.image).url()} alt={item.name} />
                    </div>

                    <div className="w-full flex justify-between items-center text-3xl text-center font-bold">
                        <h1>{item.name}</h1>
                        <h2>&#x20B9;{item.price}</h2>
                    </div>

                    <Button className="self-end my-2 text-lg">
                        See this product
                    </Button>
                </div>
            ))}
        </div>
    );
}

export default ShowProducts;
