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
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export const KYCStatus = () => {
    const { data: profileDetails } = useGetProfile();
    const { data: KycData } = useGetKYC();

    const { data: KycDocuments } = useGetKYCDocument();

    // KYCData.then((res) => console.log(res));

    console.log("KycDocuments", KycDocuments);

    const renderDocuments = KycDocuments?.map((item, index: number) => {
        return (
            <Accordion.Item key={index} value={item?.id.toString()}>
                <Accordion.Control className="mt-1 p-3">
                    <div className="d-flex align-items-center gap-3 folder-text-accordian">
                        <FontAwesomeIcon icon={faFolder} />
                        <p className="m-0 document-kyc">
                            {item?.document_type}
                        </p>
                        {item?.is_verified && (
                            <div className="badge-icon-kyc-verified">
                                <FontAwesomeIcon
                                    icon={faCircleCheck}
                                    className="badge-icon"
                                />
                            </div>
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
                        <Col className="Kyc-documnet-verify" md={3}>
                            <p className="m-0 document-text">Expiry Date</p>
                            <p className="m-0 document-text-value">
                                {item.issued_date}
                            </p>
                        </Col>
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
                <Col md={9} className="d-flex gap-4 photo-text-col ">
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
                        <p className="m-0 title-kyc">{}</p>
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
                                {profileDetails?.user?.phone
                                    ? profileDetails?.user?.phone
                                    : "Add a Phone Number"}
                            </p>
                        </div>
                    </div>
                </Col>
                <Col md={3} className="location-text-kyc">
                    <div className="d-flex align-items-center gap-2">
                        <FontAwesomeIcon
                            icon={faLocationDot}
                            className="font-icon-kyc text-black"
                        />
                        <p className="m-0 body-kyc">{KycData?.country?.name}</p>
                    </div>
                    <p className="m-0 body-kyc">
                        <span className="body-kyc-span">Submitted On: </span>{" "}
                        {format(new Date(KycData?.created_at), "do MMM yyyy")}
                    </p>
                    <p className="m-0 body-kyc">
                        <span className="body-kyc-span">Updated On: </span>{" "}
                        {format(new Date(KycData?.updated_at), "do MMM yyyy")}
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
                    {KycData?.is_kyc_verified ? (
                        <p className="m-0 text-yes">Yes</p>
                    ) : (
                        <p className="m-0 text-pending">Pending</p>
                    )}
                </Col>
                <Col className="basic-info-cont" md={3}>
                    <p className="m-0 text-title-basic-info">
                        Address Verified
                    </p>
                    {KycData?.is_address_verified ? (
                        <p className="m-0 text-yes">Yes</p>
                    ) : (
                        <p className="m-0 text-pending">Pending</p>
                    )}
                </Col>
            </Row>
            <Row className="">
                <h2 className="mt-5 title-kyc-status">KYC Documents</h2>
                <Divider my="sm" size="xs" variant="dashed" className="mb-4" />
                {KycDocuments?.length === 0 ? (
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
        </Container>
    );
};
