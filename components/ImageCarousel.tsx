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
            plugins={[Autoplay({ delay: 3000 })]}
            opts={{
                loop: true,
            }}
        >
            <CarouselContent>
                {images.map((image) => (
                    <CarouselItem
                        key={image._id}
                        className="w-full aspect-video rounded-2xl"
                    >
                        <img
                            src={image.src}
                            alt={image.name}
                            loading="lazy"
                            className="w-full h-full skeleton object-cover"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}

export default ImageCarousel;
