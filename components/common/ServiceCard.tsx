import { EditService } from "@components/services/EditService";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spoiler } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useIsBookmarked } from "hooks/use-bookmarks";
import parse from "html-react-parser";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import { parse } from "path";
import { useState } from "react";
import type { ServicesValueProps } from "types/serviceCard";

import ModalCard from "./BookNowModalCard";
import CardBtn from "./CardBtn";
import SaveIcon from "./SaveIcon";
import ShareIcon from "./ShareIcon";

const ServiceCard = ({
    serviceCard,
}: {
    serviceCard: ServicesValueProps["result"][0];
}) => {
    const router = useRouter();
    const { data: profileDetails } = useGetProfile();

    const loggedIn = Cookies.get("access");

    const userId = profileDetails?.user.id;

    const serviceProviderId = serviceCard?.created_by?.id;
    const canEdit = userId == serviceProviderId;

    //modal card
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleShowModal = () => {
        if (loggedIn && !canEdit) {
            setShowModal(true);
        } else if (loggedIn && canEdit) {
            setShowEditModal(true);
        } else {
            router.push({
                pathname: `/service/${serviceCard?.slug}`,
            });
        }
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };
    const queryClient = useQueryClient();
    const isServiceBookmarked = useIsBookmarked("service", serviceCard?.id);

    return (
        // <Link href={`/service/${serviceCard?.slug}`}>
        <div className="service-card-block align-items-stretch">
            <Link href={`/service/${serviceCard?.slug}`}>
                <a>
                    <div className="card-img">
                        {serviceCard &&
                            serviceCard?.images &&
                            serviceCard?.images?.length > 0 && (
                                <figure className="thumbnail-img">
                                    <Image
                                        src={
                                            serviceCard.images[0].media
                                                ? serviceCard.images[0].media
                                                : "/placeholder/taskPlaceholder.png"
                                        }
                                        layout="fill"
                                        objectFit="cover"
                                        alt="servicecard-image"
                                    />
                                </figure>
                            )}
                        {!serviceCard?.images ||
                            (serviceCard?.images?.length <= 0 && (
                                <figure className="thumbnail-img">
                                    <Image
                                        src={"/placeholder/taskPlaceholder.png"}
                                        layout="fill"
                                        objectFit="cover"
                                        alt="servicecard-image"
                                    />
                                </figure>
                            ))}

                        {serviceCard?.is_online && (
                            <div className="offer">
                                <p className="discount-rate">{20}% OFF</p>
                            </div>
                        )}
                    </div>
                </a>
            </Link>
            <div className="card-content">
                <Link href={`/service/${serviceCard?.slug}`}>
                    <a>
                        <div className="d-flex pro-title-wrapper justify-content-between">
                            <h2 className="card-title">{serviceCard?.title}</h2>
                            {serviceCard?.is_professional ? (
                                <div className="pro-service">
                                    <p>PRO</p>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </a>
                </Link>
                <h3 className="card-subtitle">
                    <Spoiler
                        maxHeight={15}
                        hideLabel={""}
                        showLabel={""}
                        className="card-wrapper d-flex"
                    >
                        <Link href={`/tasker/${serviceCard?.created_by?.id}`}>
                            <a>
                                <span>
                                    {serviceCard?.created_by?.first_name === ""
                                        ? "Cipher"
                                        : ` ${serviceCard?.created_by?.first_name} ${serviceCard?.created_by?.last_name}`}
                                </span>{" "}
                            </a>
                        </Link>
                        <span> | {serviceCard?.location}</span>
                    </Spoiler>
                </h3>
                <Link href={`/service/${serviceCard?.slug}`}>
                    <a>
                        <div className="card-description d-inline">
                            <Spoiler
                                maxHeight={50}
                                hideLabel={"..."}
                                showLabel={"..."}
                            >
                                <p>{parse(serviceCard?.description)}</p>
                            </Spoiler>
                        </div>
                        <div className="ratings-wrapper d-flex align-items-center justify-content-between">
                            <p className="ratings d-flex align-items-sm-center justify-content-sm-center">
                                <FontAwesomeIcon
                                    icon={faStar}
                                    className="svg-icon star"
                                />
                                {/* {serviceCard?.happy_clients} */}
                                TOBE_IMP
                            </p>
                            <p className="price">
                                {serviceCard?.currency?.symbol + " "}
                                {serviceCard?.budget_to}
                                {serviceCard?.budget_from !== 0 &&
                                    " - " + serviceCard?.budget_from}
                                {serviceCard?.budget_type === "Hourly"
                                    ? " /hr"
                                    : serviceCard?.budget_type === "Monthly"
                                    ? "/mn"
                                    : ""}
                            </p>
                        </div>
                    </a>
                </Link>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center justify-content-around justify-content-md-between mb-3 mb-sm-0">
                        {serviceProviderId === userId ? (
                            ""
                        ) : (
                            <SaveIcon
                                object_id={serviceCard?.id}
                                model={"service"}
                                filled={isServiceBookmarked}
                                onSuccess={() =>
                                    queryClient.invalidateQueries([
                                        "bookmarks",
                                        "service",
                                    ])
                                }
                            />
                        )}
                        <ShareIcon url={""} quote={""} hashtag={""} />
                    </div>
                    {/* <CardBtn
                        btnTitle={`${
                            serviceProviderId === userId
                                ? "Edit Now"
                                : "Book Now"
                        }`}
                        backgroundColor="#211D4F"
                        handleClick={handleShowModal}
                    /> */}
                    <CardBtn
                        btnTitle={`${
                            serviceProviderId === userId
                                ? "Edit Now"
                                : "Book Now"
                        }`}
                        backgroundColor="#211D4F"
                        handleClick={handleShowModal}
                    />
                </div>
            </div>

            <ModalCard
                title={serviceCard?.title}
                budget_from={serviceCard?.budget_from}
                budget_to={serviceCard?.budget_to}
                budget_type={serviceCard?.budget_type}
                description={serviceCard?.description}
                service_id={serviceCard?.id}
                show={showModal}
                setShow={setShowModal}
                handleClose={() => setShowModal(false)}
                images={[]}
            />
            <EditService
                showEditModal={showEditModal}
                handleClose={handleCloseEditModal}
                serviceDetail={serviceCard}
            />
        </div>
        // </Link>
    );
};
export default ServiceCard;
