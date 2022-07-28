import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import { userDocument } from "staticData/userDocument";

const UserDocument = () => {
    return (
        <div className="user-document">
            <div className="title-wrapper d-flex justify-content-between">
                <h1>My Documents</h1>
                <a href="#!">Add New</a>
            </div>
            <div className="content">
                <Row>
                    {userDocument &&
                        userDocument.map((document) => (
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
                                        <figure className="thumbnail-img">
                                            <Image
                                                src={
                                                    document.type == "pdf"
                                                        ? "/userprofile/documents/pdf.svg"
                                                        : "/userprofile/documents/image.svg"
                                                }
                                                layout="fill"
                                                objectFit="cover"
                                                alt="document-type-icon"
                                            />
                                        </figure>
                                    </div>
                                    <p>
                                        {document.type == "pdf"
                                            ? `${document.name}.pdf`
                                            : `${document.name}.jpg`}
                                    </p>
                                </div>
                            </Col>
                        ))}
                </Row>
            </div>
        </div>
    );
};
export default UserDocument;
