import { useGetDocument } from "hooks/document/useGetDocument";
import { useData } from "hooks/use-data";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import type { UserProfileProps } from "types/userProfileProps";
const UserDocument = () => {
    // const [fileName, setFileName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const onButtonClick = () => {
        inputRef?.current?.click();
    };
    // const { data } = useGetDocument();
    // const documents = data?.data?.result;
    const { data: documents } = useData<UserProfileProps["documentData"]>(
        ["tasker-document"],
        "/tasker/kyc-document"
    );
    console.log("tsa document", documents);
    // const { mutate, isLoading, data: Document } = usePostDocument();

    return (
        <div className="user-document">
            <div className="title-wrapper d-flex justify-content-between">
                <h1>My Documents</h1>
                {/* <a href="#!" onClick={() => onButtonClick()}>
                    Add New
                </a> */}
            </div>
            <div className="content">
                <Row>
                    {documents?.data && documents?.data.length > 0 ? (
                        documents?.data?.map((document: any) => (
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
                                    {/* <p>
                                        {document.file.substring(
                                            document.file.indexOf("document/") +
                                                9
                                        )}
                                    </p> */}
                                    <p>{document.document_type}</p>
                                </div>
                            </Col>
                        ))
                    ) : (
                        <div className="mx-3">
                            Upload your KYC documents
                            <Link href="settings/account/individual">
                                <a> here.</a>
                            </Link>
                        </div>
                    )}
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
