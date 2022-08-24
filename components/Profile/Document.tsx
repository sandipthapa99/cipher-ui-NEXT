import { useGetDocument } from "hooks/document/useGetDocument";
import { useData } from "hooks/use-data";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
const UserDocument = () => {
    // const [fileName, setFileName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const onButtonClick = () => {
        inputRef?.current?.click();
    };
    const { data } = useGetDocument();
    const documents = data?.data?.result;
    // const { data: documents } = useData<DocumentResponse>(
    //     ["tasker-document"],
    //     "/tasker/document"
    // );
    // console.log("tsa document", documents);
    // const { mutate, isLoading, data: Document } = usePostDocument();

    return (
        <div className="user-document">
            <div className="title-wrapper d-flex justify-content-between">
                <h1>My Documents</h1>
                <a href="#!" onClick={() => onButtonClick()}>
                    Add New
                </a>
            </div>
            <div className="content">
                <Row>
                    {documents &&
                        documents.map((document: any) => (
                            <Col
                                key={document.id}
                                md={3}
                                lg={2}
                                sm={4}
                                xs={6}
                                className="gx-5"
                            >
                                <div className="document-block">
                                    <div className="type">
                                        <Link href={document.file}>
                                            <a target="_blank">
                                                <figure className="thumbnail-img">
                                                    <Image
                                                        src={
                                                            document.file
                                                                .split(".")
                                                                .pop() === "pdf"
                                                                ? "/userprofile/documents/pdf.svg"
                                                                : "/userprofile/documents/image.svg"
                                                        }
                                                        layout="fill"
                                                        objectFit="cover"
                                                        alt="document-type-icon"
                                                    />
                                                </figure>
                                            </a>
                                        </Link>
                                    </div>
                                    <p>
                                        {document.file.substring(
                                            document.file.indexOf("document/") +
                                                9
                                        )}
                                    </p>
                                </div>
                            </Col>
                        ))}
                </Row>
            </div>
            <input
                type={"file"}
                id="choosefile"
                ref={inputRef}
                style={{ display: "none" }}
                //onChange={uploadFile}
            />
        </div>
    );
};
export default UserDocument;
