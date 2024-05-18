import Categories from "@/components/Categories";
import BestSelling from "@/components/BestSelling";
import BannerImages from "@/components/BannerImages";

export default function Home() {
    return (
        <>
            <BannerImages />
            <Categories />
            <BestSelling />
        </>
    );
}
