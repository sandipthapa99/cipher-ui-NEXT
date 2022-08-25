import ShareIcon from "@components/common/ShareIcon";
import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useGetPortfolioById } from "hooks/profile/getProfileById";
import { useData } from "hooks/use-data";
import Image from "next/image";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import type { UserProfileProps } from "types/userProfileProps";

import AddPortfolio from "./AddPortfolio";

interface PortfolioProps {
    show?: boolean;
    handleClose?: () => void;
    setShowPortfolioDetails: Dispatch<SetStateAction<boolean>>;
    id?: number;
    // description: string;
    // image: string;
    // issued_date: string;
    // url: string;
    // name: string;
    // file: string;
}
// interface EditDetailProps {
//     data: { result: PortfolioValueProps[] };
// }

const PortfolioDetails = ({
    show,
    handleClose,
    setShowPortfolioDetails,
    id,
}: // description,
// image,
// issued_date,
// url,
// name,
// file,
PortfolioProps) => {
    const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);

    const { data: portfolioDetail } = useGetPortfolioById(id);

    const userdata = portfolioDetail;

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
                    {portfolioDetail?.image ? (
                        <Image
                            src={portfolioDetail?.image}
                            alt="portfolio-img"
                            height={500}
                            objectFit="contain"
                            width={800}
                        />
                    ) : null}

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

                    <p> File here:</p>
                    <Row>
                        <Col md={2} sm={4}>
                            <div className="file">
                                <br />

                                <a
                                    target="_blank"
                                    href={portfolioDetail?.file}
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

                                <br />
                            </div>
                        </Col>
                    </Row>

                    <div className="file-name">
                        {portfolioDetail?.title}.pdf
                    </div>
                </div>

                <Modal.Footer>
                    <Button
                        className="btn close-btn w-25"
                        onClick={handleClose}
                    >
                        Remove
                    </Button>

                    <Button
                        className="btn submit-btn w-25"
                        onClick={() =>
                            setShowAddPortfolioModal(!showAddPortfolioModal)
                        }
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
                //  isEditProfile={true}
                setShowAddPortfolioModal={setShowAddPortfolioModal}
                handleClose={() => setShowAddPortfolioModal(false)}
            />
        </div>
    );
};
export default PortfolioDetails;
