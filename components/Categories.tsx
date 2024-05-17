import fetchAllCategories from "@/utils/fetchAllCategories";
import ShowCategories from "./ShowCategories";

async function Categories() {
    const categories = await fetchAllCategories();

    return (
        <div className="px-4 py-2">
            <ShowCategories categories={categories} />
        </div>
    );
}

export default Categories;
