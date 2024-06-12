import { urlFor } from "@/utils/urlFor";
import { ProductsProps } from "@/types";
import { client } from "@/utils/sanityClient";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";

export async function generateStaticParams() {
    const query = `*[_type == "products"]{_id, name, price, category, description, "image": image.asset._ref}`;
    const product: ProductsProps[] = await client.fetch(
        query,
        {},
        { next: { revalidate: 0 } }
    );
    return product.map((item) => ({
        category: item.category,
        id: item._id,
    }));
}

export default async function ProductPage({
    params,
}: {
    params: {
        category: string;
        id: string;
    };
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
        <div className="px-4 py-2 md:w-[80%] lg:w-[70%] lg:max-w-[900px] md:mx-auto lg:flex md:gap-5">
            <div className="bg-[#352433] rounded-xl w-full aspect-square p-14 my-3 flex justify-center items-center lg:basis-1/2">
                <img
                    src={urlFor(product.image).url()}
                    alt={product.name}
                    loading="lazy"
                    className="w-full aspect-square object-contain md:w-[80%] lg:w-full"
                />
            </div>

            <div className="lg:basis-1/2 lg:flex lg:flex-col lg:justify-between">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl my-5 font-bold">{product.name}</h1>
                    <AddToWishlistButton item={product} />
                </div>
                <h2 className="text-3xl font-bold">&#x20B9;{product.price}</h2>
                <p className="text-lg my-2">{product.description}</p>
                <AddToCartButton
                    product={product}
                    isAuth={isAuth}
                    user={user}
                />
            </div>
        </div>
    );
}
