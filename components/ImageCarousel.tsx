"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { BannerImage } from "./BannerImages";

function ImageCarousel({ images }: { images: BannerImage[] }) {
    return (
        <Carousel
            plugins={[Autoplay({ delay: 4000 })]}
            opts={{
                loop: true,
            }}
        >
            <CarouselContent>
                {images.map((image) => (
                    <CarouselItem key={image._id}>
                        <img
                            src={image.src}
                            className="w-full aspect-video rounded-2xl"
                            alt={image.name}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}

export default ImageCarousel;
