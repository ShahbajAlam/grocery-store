import { BannerImage } from "@/types";
import ImageCarousel from "./ImageCarousel";

async function BannerImages({ data }: { data: string }) {
    const images = JSON.parse(data) as BannerImage[];
    return (
        <div className="py-2 px-4">
            <ImageCarousel images={images} />
        </div>
    );
}

export default BannerImages;
