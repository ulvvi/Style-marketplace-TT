import { useState } from "react";
import { IconButton } from "../IconButton";

interface ProductGalleryProps {
    productPics?: ProductPic[];
}

interface ProductPic {
    imgSrc: string;
    alt?: string;
}

export function ProductGallery({productPics = new Array(4).fill({imgSrc: "/src/assets/placeholder.svg"})}:ProductGalleryProps) {
    const [currentImage, setCurrentImage] = useState(0);
    const isFirstImage = currentImage === 0;
    const isLastImage = currentImage === productPics.length-1;

    return (
        <>
            <section className="flex flex-col col-span-full items-center mt-8 lg:col-span-1">
                <div className="aspect-square overflow-hidden rounded-xl relative max-w-100 lg:max-w-full w-full">
                    <IconButton iconSrc="/src/assets/icons/heartIcon.svg" buttonClassName="bg-secondary !absolute top-4 right-4"></IconButton>
                    <IconButton iconSrc="/src/assets/icons/sliderArrowIcon.svg" onClick={() => isFirstImage ? "" : setCurrentImage(currentImage-1)} buttonClassName={`disabled:!cursor-default disabled:opacity-50 disabled:hover:bg-secondary bg-secondary !absolute left-4 top-1/2 -translate-y-1/2 scale-x-[-1]`} disabled={isFirstImage}/>
                    <img src={productPics[currentImage].imgSrc} alt={productPics[currentImage].alt} className="w-full" />
                    <IconButton iconSrc="/src/assets/icons/sliderArrowIcon.svg" onClick={() => isLastImage ?  "" : setCurrentImage(currentImage+1) } buttonClassName={`disabled:!cursor-default disabled:opacity-50 disabled:hover:bg-secondary bg-secondary !absolute right-4 top-1/2 -translate-y-1/2`} disabled={isLastImage}/>
                </div>
                <div className="flex flex-row gap-2 my-4 max-w-100 lg:max-w-full w-full">
                    {productPics.map((item, i) => (
                        <button onClick={() => setCurrentImage(i)} className={`rounded-xl overflow-hidden ${ currentImage === i ? "ring-2 ring-primary" : ""}`}>
                            <img src={item.imgSrc} alt={item.alt} className="w-full h-full object-cover"></img>
                        </button>
                    ))}
                </div>
            </section>
        </>
    )
}