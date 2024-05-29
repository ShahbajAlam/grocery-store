"use client";

import Confetti from "react-confetti";
import { useLayoutEffect, useState } from "react";
import Link from "next/link";

export default function SuccessPage() {
    const [dimension, setDimension] = useState({
        width: 0,
        height: 0,
    });

    useLayoutEffect(() => {
        setDimension({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        });
    }, [dimension.height, dimension.width]);

    return (
        <div className="px-4 py-2">
            <Confetti
                width={dimension.width}
                height={dimension.height}
                gravity={0.07}
            />
            <div className="card w-[90%] bg-base-100 shadow-xl fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                <div className="card-body">
                    <h2 className="card-title">Success!!!</h2>
                    <p>Your order has been placed successfully</p>
                    <p>Thanks for shopping with us</p>
                    <div className="card-actions justify-end">
                        <Link
                            href="/myprofile"
                            className="bg-[#c59f60] text-black hover:bg-[#c59f60]/90 text-lg px-4 py-2 rounded-md font-semibold"
                        >
                            Go to my profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
