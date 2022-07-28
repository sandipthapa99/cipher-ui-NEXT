import Image from "next/image";
import { DragAndDropProps } from "types/dragDrop";

const DragDrop = ({
    image,
    fileType,
    maxImageSize,
    maxPdfSize,
    maxVideoSize,
}: DragAndDropProps) => {
    return (
        <div className="drag-drop">
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
                <label htmlFor="choosefile" className="browse">
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
                <p className="size">Maximum Pdf size {maxVideoSize} MB</p>
            ) : (
                ""
            )}

            <div style={{ visibility: "hidden" }}>
                <input type={"file"} id="choosefile" />
            </div>
        </div>
    );
};

export default DragDrop;
