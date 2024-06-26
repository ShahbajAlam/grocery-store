import Link from "next/link";

function ShowCategories({ categories }: { categories: string[] }) {
    return (
        <div className="grid gap-2 grid-cols-3 md:w-[80%] lg:w-[70%] lg:max-w-[900px] md:mx-auto md:gap-4 lg:grid-cols-4">
            <Link
                href="/category/all"
                className="hover:brightness-150 duration-200"
            >
                <div className="bg-[#352433] rounded-lg p-4 h-full flex justify-center items-center">
                    <h2 className="text-center text-lg font-bold">
                        All Products
                    </h2>
                </div>
            </Link>
            {categories.map((item) => (
                <Link
                    href={`category/${item}`}
                    key={item}
                    className="hover:brightness-150 duration-200"
                >
                    <div className="bg-[#352433] rounded-lg p-4">
                        <div className="w-full aspect-square">
                            <img
                                src={`${item}.webp`}
                                alt={`Category - ${item}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-center text-md font-semibold mt-2 uppercase">
                            {item}
                        </h2>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default ShowCategories;
