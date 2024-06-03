"use client";

import { OrderProps } from "@/types";
import Pagination from "./Pagination";
import SingleOrder from "./SingleOrder";
import { useEffect, useState } from "react";

const PER_PAGE = 10;

function ShowOrders({ orders }: { orders: string }) {
    const firstPage = 1;
    const [page, setPage] = useState(1);
    const lastPage = Math.ceil(orders.length / 10);
    const data = JSON.parse(orders) as OrderProps[];
    let ordersToDisplay = [...data].slice(
        (page - 1) * PER_PAGE,
        page * PER_PAGE
    );

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
        <div>
            <div className="grid grid-cols-1 gap-4">
                {ordersToDisplay?.map((item) => (
                    <SingleOrder key={item._id} item={item} />
                ))}
            </div>

            {data.length > 10 && (
                <Pagination
                    page={page}
                    firstPage={firstPage}
                    lastPage={lastPage}
                    nextPageHandler={nextPageHandler}
                    prevPageHandler={prevPageHandler}
                />
            )}
        </div>
    );
}

export default ShowOrders;
