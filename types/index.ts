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

export type BannerImage = {
    _id: string;
    name: string;
    src: string;
};

export type CategoryProps = {
    category: string;
};

export type OrderProps = {
    _id?: any;
    name: string;
    email: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    pin: string;
    total: number;
    order: Array<{
        quantity: number;
        unit_amount: number;
        amount_total: number;
        description: string;
    }>;
};
