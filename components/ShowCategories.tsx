import Link from "next/link";

function ShowCategories({ categories }: { categories: string[] }) {
    return (
        <div className="grid gap-2 grid-cols-3">
            {["all", ...categories].map((item) => (
                <Link href={`/${item}`} key={item}>
                    <div className="bg-[#352433] rounded-lg p-4">
                        <div className="w-full aspect-square">
                            <img
                                src="/cat.webp"
                                alt={`Category - ${item}`}
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-center text-lg font-bold">
                            {item}
                        </h2>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default ShowCategories;
