import { urlFor } from "@/utils/urlFor";
import { client } from "@/utils/sanityClient";
import Categories from "@/components/Categories";
import BestSelling from "@/components/BestSelling";
import BannerImages from "@/components/BannerImages";
import { BannerImage, CategoryProps, ProductsProps } from "@/types";

const imageQuery = `*[_type == "banner"] | order(_createdAt asc){
  "src": image.asset._ref, _id, name
}`;
const categoryQuery = `*[_type == "products"]{category}`;
const bestsellingQuery = `*[_type == "products" && bestselling == true]{_id, name, price, category, "image": image.asset._ref}`;

export default async function Home() {
    const data: BannerImage[] = await client.fetch(
        imageQuery,
        {},
        { next: { revalidate: 300 } }
    );

    const images: BannerImage[] = data.map((image) => ({
        _id: image._id,
        name: image.name,
        src: urlFor(image.src).url(),
    }));

    const response: CategoryProps[] = await client.fetch(
        categoryQuery,
        {},
        { next: { revalidate: 300 } }
    );
    const categories = [...new Set(response.map((item) => item.category))];

    const bestselling: ProductsProps[] = await client.fetch(
        bestsellingQuery,
        {},
        { next: { revalidate: 300 } }
    );

    return (
        <>
            <BannerImages data={JSON.stringify(images)} />
            <Categories categories={categories} />
            <BestSelling bestselling={bestselling} />
        </>
    );
}
