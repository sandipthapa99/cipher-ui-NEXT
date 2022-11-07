import { EditService } from "@components/services/EditService";
import { KYCIncompleteToast } from "@components/toasts/KYCIncompleteToast";
import { faStar as HollowStar } from "@fortawesome/pro-regular-svg-icons";
import { faStar } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spoiler } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "hooks/auth/useUser";
import { useGetProfile } from "hooks/profile/useGetProfile";
import { useIsBookmarked } from "hooks/use-bookmarks";
import parse from "html-react-parser";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import { parse } from "path";
import { useState } from "react";
import { useWithLogin } from "store/use-login-prompt-store";
import type { ServicesValueProps } from "types/serviceCard";
import { toast } from "utils/toast";

import ModalCard from "./BookNowModalCard";
import CardBtn from "./CardBtn";
import SaveIcon from "./SaveIcon";
import ShareIcon from "./ShareIcon";

const ServiceCard = ({
    serviceCard,
    className,
}: {
    serviceCard: ServicesValueProps["result"][0];
    className?: string;
}) => {
    const { data: user } = useUser();
    const router = useRouter();
    const { data: profileDetails } = useGetProfile();
    const withLogin = useWithLogin();

    const userId = profileDetails?.user.id;

    const serviceProviderId = serviceCard?.created_by?.id;
    const canEdit = userId == serviceProviderId;

    //modal card
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleShowModal = () => {
        if (!user?.is_kyc_verified) {
            toast.showComponent("KYC Incomplete", <KYCIncompleteToast />);
            return;
        }
        if (user && !canEdit) {
            setShowModal(true);
        } else if (user && canEdit) {
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
    const isServiceBookmarked = useIsBookmarked(
        "entityservice",
        serviceCard?.id
    );

    const serviceRating = serviceCard.rating ? serviceCard.rating[0].rating : 0;

    return (
        // <Link href={`/service/${serviceCard?.slug}`}>
        <div className={`service-card-block align-items-stretch ${className}`}>
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
                        <span>
                            {" "}
                            {serviceCard?.location
                                ? `| ${serviceCard.location}`
                                : ""}
                        </span>
                    </Spoiler>
                </h3>
                <Link href={`/service/${serviceCard?.slug}`}>
                    <a>
                        <div className="card-description d-inline">
                            {/*<Spoiler
                                maxHeight={48}
                                hideLabel={""}
                                showLabel={"..."}
                            >*/}
                            <p>
                                {parse(
                                    serviceCard?.description
                                        ? serviceCard?.description
                                        : "Description for this service is not available."
                                )}
                            </p>
                            {/*</Spoiler>*/}
                        </div>
                        <div className="ratings-wrapper d-flex align-items-center justify-content-between">
                            <p className="ratings d-flex align-items-sm-center justify-content-sm-center">
                                <FontAwesomeIcon
                                    icon={
                                        serviceRating && serviceRating > 0
                                            ? faStar
                                            : HollowStar
                                    }
                                    className="svg-icon star"
                                />
                                <span> {serviceRating}</span>
                            </p>
                            <p className="price">
                                {serviceCard?.currency?.symbol
                                    ? serviceCard?.currency?.symbol
                                    : "" + " "}{" "}
                                {serviceCard?.budget_from
                                    ? serviceCard?.budget_from + "-"
                                    : ""}
                                {serviceCard?.budget_to}
                                {serviceCard?.budget_type === "Hourly"
                                    ? " /hr"
                                    : serviceCard?.budget_type === "Monthly"
                                    ? "/mn"
                                    : ""}
                            </p>
                        </div>
                    </a>
                </Link>
                <div className="d-flex justify-content-between gap-5 align-items-center">
                    <div className="d-flex align-items-center justify-content-around justify-content-md-between mb-3 mb-sm-0">
                        {serviceProviderId === userId ? (
                            ""
                        ) : (
                            <SaveIcon
                                object_id={serviceCard?.id}
                                model={"entityservice"}
                                filled={isServiceBookmarked}
                                onSuccess={() =>
                                    queryClient.invalidateQueries([
                                        "bookmarks",
                                        "service",
                                    ])
                                }
                            />
                        )}
                        <ShareIcon
                            url={
                                typeof window !== "undefined"
                                    ? window.location.origin +
                                      `/service/${serviceCard?.id}`
                                    : ""
                            }
                            quote={""}
                            hashtag={""}
                        />
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
                        handleClick={withLogin(handleShowModal)}
                    />
                </div>
            </div>

            <ModalCard
                entity_service_id={serviceCard?.id}
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
