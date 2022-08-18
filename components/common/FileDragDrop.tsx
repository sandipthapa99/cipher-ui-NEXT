import Image from "next/image";
import { useRef } from "react";
import type { DragAndDropProps } from "types/dragDrop";

import FileInputField from "./FileInputField";
const FileDragDrop = ({
    name,
    image,
    fileType,
    maxImageSize,
    maxPdfSize,
    maxVideoSize,
    field,
}: DragAndDropProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputRef?.current?.click();
    };

    return (
        <div className="drag-drop" onClick={() => onButtonClick}>
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
                    htmlFor="pdfFile"
                    className="browse text-primary"
                    role="button"
                >
                    &nbsp;Browse
                </label>{" "}
                <br />
                {fileType}
            </p>
            {maxImageSize ? (
                <span>Maximum Image size {maxImageSize} MB</span>
            ) : (
                ""
            )}
            {maxVideoSize ? (
                <span>Maximum Video size {maxVideoSize} MB</span>
            ) : (
                ""
            )}
            {maxPdfSize ? <span>Maximum Pdf size {maxPdfSize} MB</span> : ""}
            <input
                type="file"
                id="pdfFile"
                ref={inputRef}
                style={{ display: "none" }}
                onChange={(event: any) => {
                    field?.("file", event.target.files[0]);
                }}
                name={name}
            />
        </div>
    );
};

export default FileDragDrop;
