import imageBuilder from "@sanity/image-url";
const builder = imageBuilder({
    dataset: "production",
    projectId: "g7d6gc5j",
});

export function urlFor(src: string) {
    return builder.image(src);
}
