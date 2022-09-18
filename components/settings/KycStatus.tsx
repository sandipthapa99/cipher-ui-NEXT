import BigButton from "@components/common/Button";
import {
    faCircleCheck,
    faCircleQuestion,
    faEnvelope,
    faFolder,
    faLocationDot,
    faPhone,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Accordion, Alert, Badge, Container, Divider } from "@mantine/core";
import { format } from "date-fns";
import { useGetKYCDocument } from "hooks/profile/kyc/use-get-kyc-document";
import { useGetKYC } from "hooks/profile/kyc/useGetKYC";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useData } from "hooks/use-data";
import Image from "next/image";
import { Button, Col, Row } from "react-bootstrap";

interface KYCDocumentType {
    id: number;
    created_at: string;
    updated_at: string;
    document_type: string;
    document_id: string;
    file: string;
    issuer_organization: string;
    issued_date: string;
    valid_through: any;
    is_verified: boolean;
    is_company: boolean;
    comment: any;
}

export const KYCStatus = () => {
    const { data: profileDetails } = useGetProfile();
    const { data: KycData } = useGetKYC();
    const { data: KycDocuments } = useGetKYCDocument();

    // console.log("KycDocuments", KycDocuments);
    // console.log("KycData", KycData);
    const renderDocuments = KycDocuments?.map((item, index: number) => {
        return (
            <Accordion.Item key={index} value={item?.document_id}>
                <Accordion.Control className="mt-1 p-3">
                    <div className="d-flex align-items-center gap-3 folder-text-accordian">
                        <FontAwesomeIcon icon={faFolder} />
                        <p className="m-0 document-kyc">
                            {item?.document_type}
                        </p>
                        {item?.is_verified && (
                            <Badge color="green">
                                <FontAwesomeIcon icon={faCircleCheck} />
                            </Badge>
                        )}
                    </div>
                </Accordion.Control>
                <Accordion.Panel>
                    <Row>
                        <Col className="Kyc-documnet-verify" md={3}>
                            <p className="m-0 document-text">Document Id</p>
                            <p className="m-0 document-text-value">
                                {item?.document_id}
                            </p>
                        </Col>
                        <Col className="Kyc-documnet-verify" md={3}>
                            <p className="m-0 document-text">
                                Issuer Organization
                            </p>
                            <p className="m-0 document-text-value">
                                {item.issuer_organization}
                            </p>
                        </Col>
                        <Col className="Kyc-documnet-verify" md={3}>
                            <p className="m-0 document-text">Issued Date</p>
                            <p className="m-0 document-text-value">
                                {item.issued_date}
                            </p>
                        </Col>
                        {item.valid_through !== null && (
                            <Col className="Kyc-documnet-verify" md={3}>
                                <p className="m-0 document-text">Expiry Date</p>
                                <p className="m-0 document-text-value">
                                    {item.valid_through}
                                </p>
                            </Col>
                        )}
                    </Row>
                    <Row className="mt-3">
                        <Col className="Kyc-documnet-verify" md={3}>
                            <p className="m-0 document-text">Documents</p>
                            <Image
                                src={item.file}
                                alt="pic"
                                height={75}
                                width={75}
                                className="photo-kyc-document-status"
                            />
                        </Col>
                    </Row>
                </Accordion.Panel>
            </Accordion.Item>
        );
    });

    return (
        <Container fluid className="bg-white mt-5 container-kyc-status">
            <Row>
                <h3 className="mt-5 title-kyc-status">KYC Form</h3>
                <Col md={8} className="d-flex gap-4 photo-text-col ">
                    <Image
                        src={
                            profileDetails
                                ? profileDetails?.profile_image
                                : "/userprofile/unknownPerson.jpg"
                        }
                        alt="pic"
                        height={100}
                        width={100}
                        className="photo-kyc-status"
                    />
                    <div className="text-cont-kyc">
                        <p className="m-0 title-kyc">{KycData?.full_name}</p>
                        <p className="m-0 body-kyc">
                            @{profileDetails?.user.full_name}
                        </p>
                        <div className="d-flex align-items-center gap-2">
                            <FontAwesomeIcon
                                icon={faEnvelope}
                                className="font-icon-kyc"
                            />
                            <p className="m-0 body-kyc">
                                {profileDetails?.user.email
                                    ? profileDetails?.user.email
                                    : "Add Email"}
                            </p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <FontAwesomeIcon
                                icon={faPhone}
                                className="font-icon-kyc"
                            />
                            <p className="m-0 body-kyc">
                                {profileDetails?.user.phone
                                    ? profileDetails?.user.phone
                                    : "Add a Phone Number"}
                            </p>
                        </div>
                    </div>
                </Col>
                <Col md={4} className="location-text-kyc">
                    <div className="d-flex align-items-center gap-2">
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className="font-icon-kyc text-black"
                        />
                        <p className="m-0 body-kyc">{KycData?.country.name}</p>
                    </div>
                    <p className="m-0 body-kyc">
                        <span className="body-kyc-span">Submitted On: </span>{" "}
                        {KycData
                            ? format(
                                  new Date(KycData?.created_at),
                                  "do MMM yyyy"
                              )
                            : ""}
                    </p>
                    <p className="m-0 body-kyc">
                        <span className="body-kyc-span">Updated On: </span>{" "}
                        {KycData
                            ? format(
                                  new Date(KycData?.updated_at),
                                  "do MMM yyyy"
                              )
                            : ""}
                    </p>
                </Col>
            </Row>
            <Divider my="sm" size="xs" className="mt-5" />
            <h2 className="mt-5 title-kyc-status">Basic Details</h2>
            <Divider my="sm" size="xs" variant="dashed" className="mb-4" />
            <Row>
                <Col className="basic-info-cont" md={3}>
                    <p className="m-0 text-title-basic-info">Address</p>
                    <p className="m-0 text-address">
                        {profileDetails?.address_line1}
                    </p>
                </Col>
                <Col className="basic-info-cont" md={3}>
                    <p className="m-0 text-title-basic-info">Kyc Verified</p>

                    {KycData?.is_kyc_verified && (
                        <Badge color="green">
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </Badge>
                    )}
                </Col>
                <Col className="basic-info-cont" md={3}>
                    <p className="m-0 text-title-basic-info">
                        Address Verified
                    </p>

                    {KycData?.is_address_verified && (
                        <Badge color="green">
                            <FontAwesomeIcon icon={faCircleCheck} />
                        </Badge>
                    )}
                </Col>
            </Row>
            <Row className="">
                <h2 className="mt-5 title-kyc-status">KYC Documents</h2>
                <Divider my="sm" size="xs" variant="dashed" className="mb-4" />
                {!KycData || KycDocuments?.length === 0 ? (
                    <Alert
                        icon={<FontAwesomeIcon icon={faCircleQuestion} />}
                        title=""
                        color="#e7f5ff"
                    >
                        No Kyc Documents provided
                    </Alert>
                ) : (
                    <Accordion variant="contained" defaultValue="">
                        {renderDocuments}
                    </Accordion>
                )}
            </Row>

            {/* <BigButton
                className="close-btn btn p-2 mt-4 h-25 text-white"
                btnTitle="Edit KYC"
                backgroundColor="#211D4F"
            /> */}
        </Container>
    );
};
