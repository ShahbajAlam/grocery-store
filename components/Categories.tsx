import ShowCategories from "./ShowCategories";
import fetchAllCategories from "@/utils/fetchAllCategories";

async function Categories() {
    const categories = await fetchAllCategories();
    console.log(categories);
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
