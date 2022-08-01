import Image from "next/image";
import React, { useMemo, useState } from "react";

interface TaskImageCarouselProps {
    images: string[];
}
export const TaskImageCarousel = ({ images }: TaskImageCarouselProps) => {
    const [currentImage, setCurrentImage] = useState(0);

    const activeImage = useMemo(
        () => images[currentImage],
        [currentImage, images]
    );
    return (
        <div className="task-image-carousel">
            <Image
                className="task-image-carousel__image"
                src={activeImage}
                width="400px"
                height="350px"
                alt={`Task image ${currentImage}`}
                objectFit="cover"
            />
            <pre>{JSON.stringify(images, null, 4)}</pre>
            <ul className="task-image-carousel__controls">
                {images.map((_, index) => (
                    <li
                        onClick={() => setCurrentImage(index)}
                        data-is-active={JSON.stringify(index === currentImage)}
                        className="task-image-carousel__controls--control"
                        key={index}
                    />
                ))}
            </ul>
        </div>
    );
};
