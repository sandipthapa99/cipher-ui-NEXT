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

    //modal card
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        if (loggedIn) {
            setShowModal(true);
        } else {
            router.push({
                pathname: `/service/${serviceCard?.id}`,
            });
        }
    };
    const queryClient = useQueryClient();
    const isServiceBookmarked = useIsBookmarked(
        "service",
        String(serviceCard?.id)
    );

    return (
        // <Link href={`/service/${serviceCard?.slug}`}>
        <div className="service-card-block align-items-stretch">
            <Link href={`/service/${serviceCard?.id}`}>
                <a>
                    <div className="card-img">
                        {serviceCard &&
                            serviceCard?.images &&
                            serviceCard.images.length > 0 && (
                                <figure className="thumbnail-img">
                                    <Image
                                        src={
                                            serviceCard.images[0].media ??
                                            "/placeholder/taskPlaceholder.png"
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
                                {/* <p className="discount-on">{discountOn}</p> */}
                            </div>
                        )}
                    </div>
                </a>
            </Link>
            <div className="card-content">
                <Link href={`/service/${serviceCard?.id}`}>
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
                                    {serviceCard?.created_by?.full_name}
                                </span>{" "}
                            </a>
                        </Link>
                        <span> | {serviceCard?.location}</span>
                    </Spoiler>
                </h3>
                <Link href={`/service/${serviceCard?.id}`}>
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
                            </p>
                            <p className="price">
                                {serviceCard?.currency?.code + " "}
                                {serviceCard?.budget_from}
                                {serviceCard?.budget_to &&
                                    "-" + serviceCard?.budget_to}
                                {serviceCard?.budget_type === "Hourly"
                                    ? "/hr"
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
                                object_id={String(serviceCard?.id)}
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
            {/* <ModalCard
                key={detail.id}
                title={detail.title}
                price={detail.price}
                image={detail.image}
                description={detail.description}
                show={showModal}
                handleClose={() => setShowModal(false)}
            /> */}
            <ModalCard
                title={serviceCard?.title}
                budget_from={serviceCard?.budget_from}
                budget_to={serviceCard?.budget_to}
                budget_type={serviceCard?.budget_type}
                description={serviceCard?.description}
                service_id={String(serviceCard?.id)}
                show={showModal}
                setShow={setShowModal}
                handleClose={() => setShowModal(false)}
                images={[]}
            />
        </div>
        // </Link>
    );
};
export default ServiceCard;
