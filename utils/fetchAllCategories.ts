import { client } from "./sanityClient";

const query = `*[_type == "products"]{category}`;

export type CategoryProps = {
    category: string;
};

export default async function fetchAllCategories() {
    const response: CategoryProps[] = await client.fetch(query);
    const categories = [...new Set(response.map((item) => item.category))];
    return categories;
}
