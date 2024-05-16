import { urlFor } from "@/utils/urlFor";
import { client } from "@/utils/sanityClient";
import ImageCarousel from "./ImageCarousel";

const query = `*[_type == "banner"] | order(_createdAt asc){
  "src": image.asset._ref, _id, name
}`;

export type BannerImage = {
    _id: string;
    name: string;
    src: string;
};

async function BannerImages() {
    const data: BannerImage[] = await client.fetch(query);
    const images: BannerImage[] = data.map((image) => ({
        _id: image._id,
        name: image.name,
        src: urlFor(image.src).url(),
    }));

    return (
        <div className="py-2 px-4">
            <ImageCarousel images={images} />
        </div>
    );
}

export default BannerImages;
