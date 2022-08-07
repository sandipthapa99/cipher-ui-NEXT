import Image from "next/image";
import { useRef } from "react";
import type { DragAndDropProps } from "types/dragDrop";

const DragDrop = ({
    image,
    fileType,
    maxImageSize,
    maxPdfSize,
    maxVideoSize,
}: DragAndDropProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputRef?.current?.click();
    };
    return (
        <div className="drag-drop" onClick={onButtonClick}>
            <figure className="thumbnail-img">
                <Image
                    src={image}
                    layout="fill"
                    objectFit="cover"
                    alt="gallery-image"
                />
            </figure>
            <p className="info">
                Drag or
                <label
                    htmlFor="choosefile"
                    className="browse text-primary"
                    role="button"
                >
                    &nbsp;Browse
                </label>{" "}
                <br />
                {fileType}
            </p>
            {maxImageSize ? (
                <p className="size">Maximum Image size {maxImageSize} MB</p>
            ) : (
                ""
            )}
            {maxVideoSize ? (
                <p className="size">Maximum Video size {maxVideoSize} MB</p>
            ) : (
                ""
            )}
            {maxPdfSize ? (
                <p className="size">Maximum Pdf size {maxPdfSize} MB</p>
            ) : (
                ""
            )}

            <input
                type={"file"}
                id="choosefile"
                ref={inputRef}
                style={{ display: "none" }}
            />
        </div>
    );
};

export default DragDrop;
