import { client } from "@/utils/sanityClient";
import ShowCategories from "./ShowCategories";

const query = `*[_type == "products"]{category}`;

export type CategoryProps = {
    category: string;
};

async function Categories() {
    const response: CategoryProps[] = await client.fetch(
        query,
        {},
        { next: { revalidate: 120 } }
    );
    const categories = [...new Set(response.map((item) => item.category))];

    return (
        <div className="px-4 py-2">
            <h1 className="text-lg text-balance text-center font-bold my-4 uppercase">
                Browse products by categories
            </h1>
            <ShowCategories categories={categories} />
        </div>
    );
}

export default Categories;
