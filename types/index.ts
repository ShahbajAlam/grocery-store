export type ProductsProps = {
    _id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
};

export type CartProps = {
    productID: string;
    productCount: number;
    productPrice: number;
};
