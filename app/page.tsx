import BannerImages from "@/components/BannerImages";
import Categories from "@/components/Categories";
import ShowProducts from "@/components/ShowProducts";

export default async function Home() {
    return (
        <>
            <BannerImages />
            <Categories />
            <ShowProducts />
        </>
    );
}
