import Categories from "@/components/Categories";
import ShowProducts from "@/components/ShowProducts";
import BannerImages from "@/components/BannerImages";

export default async function Home() {
    return (
        <>
            <BannerImages />
            <Categories />
            <ShowProducts />
        </>
    );
}
