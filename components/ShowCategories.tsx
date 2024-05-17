"use client";

import { useEffect, useState } from "react";
import { CategoryProps } from "@/utils/fetchAllCategories";
import { useProducts } from "@/contexts/ProductsContext";

function ShowCategories({ categories }: { categories: CategoryProps[] }) {
    const data = useProducts();
    const [value, setValue] = useState("all");

    useEffect(() => {
        data?.setCategory(value);
    }, [value]);

    return (
        <div className="grid gap-2 grid-cols-3">
            {[{ category: "all" }, ...categories].map((item) => (
                <div key={item.category}>
                    <input
                        hidden
                        type="radio"
                        name="categories"
                        id={item.category}
                        value={item.category}
                        checked={value === item.category}
                        onChange={() => setValue(item.category)}
                    />
                    <label htmlFor={item.category}>
                        <div>
                            <img
                                src="https://picsum.photos/100"
                                alt=""
                                className="w-full object-cover"
                            />
                            <h2 className="text-center text-lg font-bold">
                                {item.category}
                            </h2>
                        </div>
                    </label>
                </div>
            ))}
        </div>
    );
}

export default ShowCategories;
