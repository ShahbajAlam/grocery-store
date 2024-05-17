"use client";

import { client } from "@/utils/sanityClient";
import {
    type ReactNode,
    createContext,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    useContext,
} from "react";

export type ProductsContextProps = {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    loading: boolean;
    category: string;
    setCategory: Dispatch<SetStateAction<string>>;
    totalCount: number;
    products: ProductsProps[];
} | null;

export type ProductsProps = {
    _id: string;
    name: string;
    price: number;
    category: string;
    image: string;
};

const ProductsContext = createContext<ProductsContextProps>(null);

const ProductsProvider = ({ children }: { children: ReactNode }) => {
    let query = "";
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("all");
    const [totalCount, setTotalCount] = useState(0);
    const [products, setProducts] = useState<Array<ProductsProps>>([]);

    useEffect(() => {
        setLoading(true);

        const getCount = async (category: string) => {
            let query = "";
            if (category === "all") query = `count(*[_type == "products"])`;
            else
                query = `count(*[_type == "products" && category == "${category}"])`;

            const data: number = await client.fetch(query);
            setTotalCount(data);
        };

        const getProducts = async () => {
            if (category === "all")
                query = `*[_type == "products"][${(page - 1) * 10}...${page * 10}]{_id, name, price, category, "image": image.asset._ref}`;
            else
                query = `*[_type == "products" && category == "${category}"][${(page - 1) * 10}...${page * 10}]{_id, name, price, category, "image": image.asset._ref}`;

            const data: ProductsProps[] = await client.fetch(query);
            setProducts(data);
        };

        getCount(category);
        getProducts();

        setLoading(false);
    }, [page, category]);

    return (
        <ProductsContext.Provider
            value={{
                category,
                loading,
                page,
                products,
                setCategory,
                setPage,
                totalCount,
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

const useProducts = () => useContext(ProductsContext);

export { ProductsProvider, useProducts };
