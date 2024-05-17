import fetchAllCategories from "@/utils/fetchAllCategories";
import ShowCategories from "./ShowCategories";

async function Categories() {
    const categories = await fetchAllCategories();

    return (
        <div className="px-4 py-2">
            <h1 className="text-xl text-center font-bold my-3">Browse products by categories</h1>
            <ShowCategories categories={categories} />
        </div>
    );
}

export default Categories;
