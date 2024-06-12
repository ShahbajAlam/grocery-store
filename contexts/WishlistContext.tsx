"use client";

import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { ProductsProps } from "@/types";

const WishlistContext = createContext<{
    products: ProductsProps[];
    addToWishlist: (product: ProductsProps) => void;
    removeFromWishlist: (id: string) => void;
} | null>(null);

const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<ProductsProps[]>([]);

    useEffect(() => {
        if (
            typeof localStorage != "undefined" &&
            localStorage.getItem("wishlist")
        ) {
            setProducts(JSON.parse(localStorage.getItem("wishlist") as string));
        }
    }, [products.length]);

    const addToWishlist = (product: ProductsProps) => {
        const updatedProducts = [product, ...products];

        setProducts(updatedProducts);
        if (typeof localStorage != "undefined") {
            localStorage.setItem("wishlist", JSON.stringify(updatedProducts));
        }
    };

    const removeFromWishlist = (id: string) => {
        const updatedProducts = [...products].filter((item) => item._id != id);

        setProducts(updatedProducts);
        if (typeof localStorage != "undefined") {
            localStorage.setItem("wishlist", JSON.stringify(updatedProducts));
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                products,
                addToWishlist,
                removeFromWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
