import ShareIcon from "@components/common/ShareIcon";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { Carousel } from "@mantine/carousel";
import { useGetPortfolioById } from "hooks/profile/getProfileById";
import parse from "html-react-parser";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getPageUrl } from "utils/helpers";

import AddPortfolio from "./AddPortfolio";

interface PortfolioProps {
    show?: boolean;
    handleClose?: () => void;
    setShowPortfolioDetails: Dispatch<SetStateAction<boolean>>;
    id?: number;
    isTaskerPortfolio?: boolean;
    handleDeletePortfolio?: () => void;
}

const PortfolioDetails = ({
    show,
    handleDeletePortfolio,
    id,
    isTaskerPortfolio,
    handleClose,
}: PortfolioProps) => {
    const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);
    const [isEditProfile, setIsEditProfile] = useState(false);

    const { data: portfolioDetail } = useGetPortfolioById(id);
    //
    //     "🚀 ~ file: PortfolioDetail.tsx ~ line 41 ~ portfolioDetail",
    //     portfolioDetail
    // );

    return (
        <div className="portfolio-details">
            {/* Modal component */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>My Portfolio</h3>
                </div>

                <div className="portfolio-details__content">
                    <div className="header">
                        <h3>{portfolioDetail?.title} Portfolio</h3>
                        <Row className="d-flex justify-content-between end align-items-center">
                            <Col md={4} sm={6}>
                                <p>Posted on {portfolioDetail?.issued_date}</p>
                            </Col>
                            <Col
                                md={{ span: 4, offset: 4 }}
                                className="d-flex share justify-content-end"
                                sm={6}
                            >
                                <ShareIcon
                                    url={getPageUrl()}
                                    quote={"This is the task from Homaale"}
                                    hashtag={"Homaale-task"}
                                />
                                <p>Share</p>
                            </Col>
                        </Row>
                    </div>
                    {portfolioDetail?.images.length > 1 ? (
                        <Carousel
                            styles={{
                                control: {
                                    "&[data-inactive]": {
                                        opacity: 0,
                                        cursor: "default",
                                    },
                                },
                            }}
                        >
                            {portfolioDetail?.images.map((image: any) => (
                                <Carousel.Slide key={image.id}>
                                    {image.media_type == "mp4" ? (
                                        <video
                                            style={{
                                                width: "100%",
                                            }}
                                            controls
                                            //    autoPlay
                                        >
                                            <source
                                                src={image.media}
                                                type="video/mp4"
                                            ></source>
                                            Sorry, your browser doesn&apos;t
                                            support videos.
                                        </video>
                                    ) : (
                                        <Image
                                            src={image.media}
                                            alt="portfolio-img"
                                            height={500}
                                            objectFit="contain"
                                            width={800}
                                        />
                                    )}
                                </Carousel.Slide>
                            ))}
                        </Carousel>
                    ) : (
                        <figure className="thumbnail-img">
                            <Image
                                src={
                                    portfolioDetail?.images[0]?.media ??
                                    "/userprofile/image.svg"
                                }
                                alt="portfolio-img"
                                height={500}
                                objectFit="contain"
                                width={900}
                            />
                        </figure>
                    )}

                    <div className="description">
                        {portfolioDetail?.description
                            ? parse(portfolioDetail.description)
                            : ""}
                    </div>
                    <div className="url">
                        URL here:{" "}
                        <a
                            href={
                                portfolioDetail?.credential_url
                                    ? portfolioDetail?.credential_url
                                    : "/"
                            }
                            target="_blank"
                            rel="noreferrer"
                        >
                            {portfolioDetail?.credential_url}
                        </a>
                    </div>
                    {portfolioDetail?.files.length > 0 ? (
                        <>
                            <p> File here:</p>
                            <Row>
                                {portfolioDetail.files &&
                                    portfolioDetail.files.map(
                                        (file: any, i: number) => (
                                            <Col md={3} sm={4} key={i}>
                                                <div className="file">
                                                    <br />

                                                    <a
                                                        target="_blank"
                                                        href={file.media}
                                                        rel="noreferrer"
                                                    >
                                                        <figure className="file-img">
                                                            <Image
                                                                src={
                                                                    "/userprofile/documents/pdf.svg"
                                                                }
                                                                alt="document-type-icon"
                                                                height={100}
                                                                width={100}
                                                            />
                                                        </figure>
                                                    </a>
                                                </div>
                                                <br />

                                                <div className="file-name py-2 px-2">
                                                    {file.name.substring(
                                                        file.name.indexOf(
                                                            "/media/"
                                                        ) + 7
                                                    )}
                                                </div>
                                            </Col>
                                        )
                                    )}
                            </Row>
                        </>
                    ) : (
                        ""
                    )}
                </div>
                {isTaskerPortfolio ? (
                    ""
                ) : (
                    <Modal.Footer>
                        <Button
                            className="btn close-btn"
                            onClick={handleDeletePortfolio}
                        >
                            Remove
                        </Button>

                        <Button
                            className="btn submit-btn"
                            onClick={() => {
                                setShowAddPortfolioModal(
                                    !showAddPortfolioModal
                                );
                                setIsEditProfile(true);
                            }}
                        >
                            Edit
                        </Button>
                    </Modal.Footer>
                )}
            </Modal>
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
            />
            <AddPortfolio
                show={showAddPortfolioModal}
                id={id}
                isEditProfile={isEditProfile}
                setShowAddPortfolioModal={setShowAddPortfolioModal}
                handleClose={() => {
                    setShowAddPortfolioModal(false);
                }}
            />
        </div>
    );
};
export default PortfolioDetails;
