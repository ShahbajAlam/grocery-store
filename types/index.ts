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
    productName: string;
    productImage: string;
    productCount: number;
    productPrice: number;
    productCategory: string;
};
