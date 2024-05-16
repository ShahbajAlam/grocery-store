import { client } from "./sanityClient";

const query = `*[_type == "products"]{category}`;

export default async function fetchAllCategories() {
    const response = await client.fetch(query);
    return response;
}
