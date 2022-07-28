import Image from "next/image";
import { UserDocument } from "types/userDocument";
const UserDocument = ({ name, type }: UserDocument) => {
    return (
        <div className="document-block">
            <div className="type">
                <figure className="thumbnail-img">
                    <Image
                        src={type == "pdf" ? '/userprofile/documents/pdf.svg' : '/userprofile/documents/image.svg'}
                        layout="fill"
                        objectFit="cover"
                        alt="document-type-icon"
                    />
                </figure>
            </div>
            <p>
                {type == "pdf" ? `${name}.pdf` : `${name}.jpg`}
            </p>
        </div>
    );
};
export default UserDocument;
