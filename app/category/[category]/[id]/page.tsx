import { urlFor } from "@/utils/urlFor";
import { ProductsProps } from "@/types";
import { client } from "@/utils/sanityClient";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AddToCartButton from "@/components/AddToCartButton";

type ProductsParams = {
    params: {
        id: string;
    };
};

export async function generateStaticParams() {
    const query = `*[_type == "products"]{_id, name, price, category, description, "image": image.asset._ref}`;
    const product: ProductsProps[] = await client.fetch(query);

    return product.map((item) => ({
        id: item._id,
    }));
}

export default async function ProductPage({
    params,
}: {
    params: { id: string };
}) {
    const query = `*[_type == "products" && _id == "${params.id}"]{_id, name, price, category, description, "image": image.asset._ref}[0]`;
    const product: ProductsProps = await client.fetch(
        query,
        {},
        { next: { revalidate: 0 } }
    );

    const { isAuthenticated, getUser } = getKindeServerSession();
    const isAuth = await isAuthenticated();
    const user = await getUser();

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

            <h2 className="text-3xl font-bold">&#x20B9;{product.price}</h2>

            <p className="text-lg my-2">{product.description}</p>

            <AddToCartButton product={product} isAuth={isAuth} user={user} />
        </div>
    );
}
