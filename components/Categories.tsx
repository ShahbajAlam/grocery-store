import ShowCategories from "./ShowCategories";

async function Categories({ categories }: { categories: string[] }) {
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
