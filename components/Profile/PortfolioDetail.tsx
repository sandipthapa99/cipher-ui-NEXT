import { PostCard } from "@components/PostTask/PostCard";
import { faSquareCheck } from "@fortawesome/pro-regular-svg-icons";
import { useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import AddPortfolio from "./AddPortfolio";
import ShareIcon from "@components/common/ShareIcon";

interface PortfolioProps {
    show?: boolean;
    handleClose?: () => void;
    setShowPortfolioDetails: Dispatch<SetStateAction<boolean>>;
    id: number;
    description: string;
    image: string;
    issued_date: string;
    url: string;
    name: string;
    file: string;
}
// interface EditDetailProps {
//     data: { result: PortfolioValueProps[] };
// }

const PortfolioDetails = ({
    show,
    handleClose,
    setShowPortfolioDetails,
    id,
    description,
    image,
    issued_date,
    url,
    name,
    file,
}: PortfolioProps) => {
    const queryClient = useQueryClient();
    console.log("image", image, name);
    const [showAddPortfolioModal, setShowAddPortfolioModal] = useState(false);

    // const handleShowPortfolioForm = ()=>{
    //     showModal={true}
    //     handleOnClick={() =>
    //         setShowAddPortfolioModal(!showAddPortfolioModal)
    //     }
    // }
    // const { mutate } = useForm(`/tasker/portfolio/`);
    // const { mutate: editMutation } = useEditForm(`/tasker/portfolio/${id}/`);

    // const data = queryClient.getQueryData<EditDetailProps>([
    //     "tasker-portfolio",
    // ]);

    // const editDetails = data?.data?.result.find((item) => item.id === id);

    return (
        <div className="portfolio-details">
            {/* Modal component */}
            <Modal
                show={show}
                onHide={handleClose}
                //backdrop="static"
            >
                <Modal.Header closeButton> </Modal.Header>
                <div className="applied-modal">
                    <h3>My Portfolio</h3>
                </div>

                <div className="portfolio-details__content">
                    <div className="header">
                        <h3>{name} Portfolio</h3>
                        <Row>
                            <Col md={4}>
                                <p>Posted on {issued_date}</p>
                            </Col>
                            <Col md={{ span: 4, offset: 4 }}>
                                <ShareIcon
                                    url={`http://localhost:3005/profile`}
                                    quote={"This is the task from cipher"}
                                    hashtag={"cipher-task"}
                                />
                            </Col>
                        </Row>
                    </div>

                    <figure>
                        {/* <Image
                                src={`/http://54.252.73.240:8014/tmedia/cipher/user/portfolio/womenBuis_ViZsyj2.png`}
                                layout="fill"
                                objectFit="cover"
                                alt="portfolio-image"
                            /> */}
                    </figure>
                    <img
                        src="http://54.252.73.240:8014/tmedia/cipher/user/portfolio/womenBuis_ViZsyj2.png"
                        alt="portfolio-image"
                        className="portfolio-img"
                    />

                    <div className="description">{description}</div>
                    <div className="url">
                        URL here: <Link href={url}>{url}</Link>
                    </div>

                    <p> File here:</p>
                    <Row>
                        <Col md={2}>
                            <div className="file">
                                <br />
                                <Link href={file}>
                                    <a target="_blank">
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
                                </Link>
                                <br />
                            </div>
                        </Col>
                    </Row>

                    <div className="file-name">{name}.pdf</div>
                </div>

                <Modal.Footer>
                    <Button
                        className="btn close-btn w-25"
                        onClick={handleClose}
                    >
                        Remove
                    </Button>

                    <Button
                        className="btn close-btn w-25"
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
                setShowAddPortfolioModal={setShowAddPortfolioModal}
                handleClose={() => setShowAddPortfolioModal(false)}
            />
        </div>
    );
};
export default PortfolioDetails;
