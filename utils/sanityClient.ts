import { createClient } from "next-sanity";

export const client = createClient({
    projectId: "g7d6gc5j",
    apiVersion: "2022-03-07",
    useCdn: false,
    dataset: "production",
});
