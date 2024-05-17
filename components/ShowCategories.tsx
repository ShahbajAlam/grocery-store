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
        <div className="grid gap-2 grid-cols-4">
            {["all", ...categories].map((item) => (
                <div key={item}>
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
                            className={`w-full aspect-square duration-200 ${value === item ? "brightness-50" : ""}`}
                        >
                            <img
                                src="https://picsum.photos/100"
                                alt={`Category - ${item}`}
                                className="w-full h-full object-cover skeleton"
                            />
                            <h2 className="text-center text-lg font-bold">
                                {item}
                            </h2>
                        </div>
                    </label>
                </div>
            ))}
        </div>
    );
}

export default ShowCategories;
