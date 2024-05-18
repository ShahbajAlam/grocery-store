"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Pagination from "./Pagination";
import { urlFor } from "@/utils/urlFor";
import { ProductsProps } from "@/types";
import { useEffect, useState } from "react";

function ShowProducts({
    products,
    totalCount,
}: {
    products: ProductsProps[];
    totalCount: number;
}) {
    const [page, setPage] = useState(1);
    const firstPage = 1;
    const lastPage = Math.ceil(totalCount / 10);
    let productsToDisplay = [...products].slice((page - 1) * 10, page * 10);

    const prevPageHandler = () => {
        setPage((oldPage) => {
            if (oldPage === firstPage) return oldPage;
            else return oldPage - 1;
        });
    };

    const nextPageHandler = () => {
        setPage((oldPage) => {
            if (oldPage === lastPage) return oldPage;
            else return oldPage + 1;
        });
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [page]);

    return (
        <>
            <h1 className="text-center text-lg font-bold my-4 uppercase">
                {totalCount} products found
            </h1>
            <div className="px-4 py-2 grid gap-3 grid-cols-1">
                {productsToDisplay.map((item) => (
                    <div
                        key={item._id}
                        className="rounded-2xl px-6 py-4 bg-[#352433] flex flex-col gap-2 justify-center items-center"
                    >
                        <div className="w-[50%] aspect-square flex justify-center items-center">
                            <img
                                src={urlFor(item.image).url()}
                                alt={item.name}
                                loading="lazy"
                            />
                        </div>

                        <div className="w-full flex justify-between items-center text-3xl text-center font-bold">
                            <h1>{item.name}</h1>
                            <h2>&#x20B9;{item.price}</h2>
                        </div>

                        <Link
                            href={`/${item.category}/${item._id}`}
                            className="self-end my-2"
                        >
                            <Button className="font-semibold text-lg">
                                See this product
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>
            {totalCount > 10 && (
                <Pagination
                    page={page}
                    firstPage={firstPage}
                    lastPage={lastPage}
                    prevPageHandler={prevPageHandler}
                    nextPageHandler={nextPageHandler}
                />
            )}
        </>
    );
}

export default ShowProducts;
