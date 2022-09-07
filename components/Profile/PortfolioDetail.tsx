import ShareIcon from "@components/common/ShareIcon";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { Carousel } from "@mantine/carousel";
import { useGetPortfolioById } from "hooks/profile/getProfileById";
import Image from "next/image";
import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import AddPortfolio from "./AddPortfolio";

interface PortfolioProps {
    show?: boolean;
    handleClose?: () => void;
    setShowPortfolioDetails: Dispatch<SetStateAction<boolean>>;
    id?: number;
    handleDeletePortfolio?: () => void;
}

const PortfolioDetails = ({
    show,
    handleDeletePortfolio,
    id,
    handleClose,
}: // description,
// image,
// issued_date,
// url,
// name,
// file,
PortfolioProps) => {
    const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);
    const [isEditProfile, setIsEditProfile] = useState(false);

    const { data: portfolioDetail } = useGetPortfolioById(id);
    console.log("portfolio details=", portfolioDetail);
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
                                className="d-flex share"
                                sm={6}
                            >
                                <ShareIcon
                                    url={`http://localhost:3005/profile`}
                                    quote={"This is the task from cipher"}
                                    hashtag={"cipher-task"}
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
                                    {image.name
                                        .substring(image.name.indexOf(".") + 1)
                                        .includes("png") ? (
                                        <Image
                                            src={image.media}
                                            alt="portfolio-img"
                                            height={500}
                                            objectFit="contain"
                                            width={800}
                                        />
                                    ) : image.name.substring(
                                          image.name.indexOf(".") + 1
                                      ) === "jpg" ? (
                                        <Image
                                            src={image.media}
                                            alt="portfolio-img"
                                            height={500}
                                            objectFit="contain"
                                            width={800}
                                        />
                                    ) : image.name.substring(
                                          image.name.indexOf(".") + 1
                                      ) === "svg" ? (
                                        <Image
                                            src={image.media}
                                            alt="portfolio-img"
                                            height={500}
                                            objectFit="contain"
                                            width={800}
                                        />
                                    ) : image.name.substring(
                                          image.name.indexOf(".") + 1
                                      ) === "jpeg" ? (
                                        <Image
                                            src={image.media}
                                            alt="portfolio-img"
                                            height={500}
                                            objectFit="contain"
                                            width={800}
                                        />
                                    ) : (
                                        <div>
                                            <video
                                                style={{
                                                    width: "90%",
                                                }}
                                                controls
                                                autoPlay
                                            >
                                                <source
                                                    src={image.media}
                                                    type="video/mp4"
                                                ></source>
                                                Sorry, your browser doesn&apos;t
                                                support videos.
                                            </video>
                                        </div>
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
                                width={800}
                            />
                        </figure>
                    )}

                    {/* <img
                        src="http://54.252.73.240:8014/tmedia/cipher/user/portfolio/womenBuis_ViZsyj2.png"
                        alt="portfolio-image"
                        className="portfolio-img"
                    /> */}

                    <div className="description">
                        {portfolioDetail?.description}
                    </div>
                    <div className="url">
                        URL here:{" "}
                        <a href={portfolioDetail?.credential_url}>
                            {portfolioDetail?.credential_url}
                        </a>
                    </div>
                    {portfolioDetail?.files ? (
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
                    ) : null}
                </div>

                <Modal.Footer>
                    <Button
                        className="btn close-btn w-25"
                        onClick={handleDeletePortfolio}
                    >
                        Remove
                    </Button>

                    <Button
                        className="btn submit-btn w-25"
                        onClick={() => {
                            setShowAddPortfolioModal(!showAddPortfolioModal);
                            setIsEditProfile(true);
                        }}
                    >
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
            <PostCard
                text="You are good to continue."
                buttonName="Continue"
                type="Success"
                iconName={faSquareCheck}
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
