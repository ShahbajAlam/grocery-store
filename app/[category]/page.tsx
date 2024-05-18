import { client } from "@/utils/sanityClient";
import ShowProducts from "@/components/ShowProducts";

type CategoryParams = {
    params: {
        category: string;
    };
};

export default async function CategoryPage({ params }: CategoryParams) {
    let productsQuery = "";
    let totalCountQuery = "";

    if (params.category === "all") {
        totalCountQuery = `count(*[_type == "products"])`;
        productsQuery = `*[_type == "products"]{_id, name, price, category, description, "image": image.asset._ref}`;
    } else {
        totalCountQuery = `count(*[_type == "products" && category == "${params.category}"])`;
        productsQuery = `*[_type == "products"  && category == "${params.category}"]{_id, name, price, category, description, "image": image.asset._ref}`;
    }

    const totalCount = await client.fetch(
        totalCountQuery,
        {},
        { next: { revalidate: 0 } }
    );
    const products = await client.fetch(
        productsQuery,
        {},
        { next: { revalidate: 0 } }
    );

    return <ShowProducts products={products} totalCount={totalCount} />;
}
