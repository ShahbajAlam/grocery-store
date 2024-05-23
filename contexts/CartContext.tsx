"use client";

import { CartProps } from "@/types";
import { ReactNode, createContext, useState } from "react";

type CartContextProps = {} | null;

const CartContext = createContext<CartContextProps>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartProps[]>(() => {
        if (typeof localStorage !== "undefined") {
            return localStorage.getItem("grocery-cart")
                ? localStorage.getItem("grocery-cart")
                : [];
        }
    });

    return <CartContext.Provider>{children}</CartContext.Provider>;
};
