import { client } from "./sanityClient";

const query = `*[_type == "products"]{category}`;

export type CategoryProps = {
    category: string;
};

export default async function fetchAllCategories() {
    const response: CategoryProps[] = await client.fetch(query);
    return response;
}
