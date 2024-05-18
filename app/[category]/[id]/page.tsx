import { urlFor } from "@/utils/urlFor";
import { ProductsProps } from "@/types";
import { client } from "@/utils/sanityClient";

type ProductsParams = {
    params: {
        id: string;
    };
};

export default async function ProductPage({ params }: ProductsParams) {
    const query = `*[_type == "products" && _id == "${params.id}"]{_id, name, price, category, description, "image": image.asset._ref}[0]`;
    const product: ProductsProps = await client.fetch(query);

    return (
        <div className="px-4 py-2">
            <div className="bg-[#352433] rounded-xl w-full aspect-square p-14 my-3">
                <img
                    src={urlFor(product.image).url()}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </div>

            <h1 className="text-4xl my-5 font-bold">{product.name}</h1>
            <p className="text-lg my-2">{product.description}</p>
        </div>
    );
}
