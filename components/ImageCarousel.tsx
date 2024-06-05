"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { BannerImage } from "@/types";
import Autoplay from "embla-carousel-autoplay";

function ImageCarousel({ images }: { images: BannerImage[] }) {
    return (
        <Carousel
            plugins={[Autoplay({ delay: 3000 })]}
            opts={{
                loop: true,
            }}
            className="lg:w-[70%] lg:max-w-[900px] lg:mx-auto"
        >
            <CarouselContent>
                {images.map((image) => (
                    <CarouselItem
                        key={image._id}
                        className="w-full aspect-video rounded-2xl lg:aspect-[2/1]"
                    >
                        <img
                            src={image.src}
                            alt={image.name}
                            className="w-full h-full skeleton object-cover"
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}

export default ImageCarousel;
