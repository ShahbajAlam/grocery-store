"use client";

import { useState } from "react";
import { ProductsProps } from "@/types";

function AddToCartButton({ product }: { product: ProductsProps }) {
    const [count, setCount] = useState(1);

    const decreaseCount = () => {
        setCount((oldCount) => {
            if (oldCount === 1) return oldCount;
            else return oldCount - 1;
        });
    };

    const increaseCount = () => {
        setCount((oldCount) => {
            if (oldCount === 10) return oldCount;
            else return oldCount + 1;
        });
    };

    return (
        <div className="join flex justify-start my-4">
            <button
                disabled={count === 1}
                onClick={decreaseCount}
                className="join-item btn text-lg px-5"
            >
                -
            </button>
            <button className="join-item btn text-lg px-5">{count}</button>
            <button
                disabled={count === 10}
                onClick={increaseCount}
                className="join-item btn text-lg px-5"
            >
                +
            </button>
        </div>
    );
}

export default AddToCartButton;
