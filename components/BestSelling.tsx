import Link from "next/link";
import { Button } from "./ui/button";
import { urlFor } from "@/utils/urlFor";
import { ProductsProps } from "@/types";
import { client } from "@/utils/sanityClient";

async function BestSelling() {
    const query = `*[_type == "products" && bestselling == true]{_id, name, price, category, "image": image.asset._ref}`;
    const bestselling: ProductsProps[] = await client.fetch(
        query,
        {},
        { next: { revalidate: 0 } }
    );

    return (
        <>
            <h1 className="text-lg text-balance text-center font-bold my-4 uppercase">
                Our bestselling products
            </h1>
            <div className="px-4 py-2 grid gap-3 grid-cols-2">
                {bestselling.map((item) => (
                    <div
                        key={item._id}
                        className="rounded-2xl p-2 bg-[#352433] flex flex-col gap-2 justify-center items-center"
                    >
                        <div className="w-[50%] aspect-square flex justify-center items-center">
                            <img
                                src={urlFor(item.image).url()}
                                alt={item.name}
                                loading="lazy"
                            />
                        </div>

                        <h1 className="text-2xl font-semibold text-center">
                            {item.name}
                        </h1>

                        <h2 className="text-lg font-semibold text-center">
                            &#x20B9;{item.price}
                        </h2>

                        <Link
                            href={`/${item.category}/${item._id}`}
                            className="my-2"
                        >
                            <Button className="text-md">
                                See this product
                            </Button>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BestSelling;
