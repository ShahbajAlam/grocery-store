"use client";

import { useEffect, useState } from "react";
import { useProducts } from "@/contexts/ProductsContext";

function ShowCategories({ categories }: { categories: string[] }) {
    const data = useProducts();
    const [value, setValue] = useState("all");

    useEffect(() => {
        data?.setCategory(value);
    }, [value]);

    return (
        <div className="grid gap-2 grid-cols-3">
            {["all", ...categories].map((item) => (
                <div key={item} className="bg-[#352433] rounded-lg p-4">
                    <input
                        hidden
                        type="radio"
                        name="categories"
                        id={item}
                        value={item}
                        checked={value === item}
                        onChange={() => setValue(item)}
                    />
                    <label htmlFor={item}>
                        <div
                            className={`w-full aspect-square duration-200 ${value === item ? "brightness-150 scale-105" : ""}`}
                        >
                            <img
                                src="/cat.webp"
                                alt={`Category - ${item}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-center text-lg font-bold">
                            {item}
                        </h2>
                    </label>
                </div>
            ))}
        </div>
    );
}

export default ShowCategories;
