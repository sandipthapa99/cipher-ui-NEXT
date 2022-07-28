import Image from "next/image";
import { PacakageCardProps } from "types/packageCard";

import AnchorButton from "./common/AnchorButton";

const MembershipCard = ({
    title,
    price,
    offers,
    isPermium,
    isRecommended,
}: PacakageCardProps) => {
    return (
        <div
            className={`member-card-block ${
                isRecommended ? "card-block-border-color-secondary" : ""
            }`}
        >
            <div className="top-container">
                <h2 className="member-title">{title}</h2>
                <hr />
                {isPermium ? (
                    <figure className="thumbnail-img">
                        <Image
                            src="/service-details/premium.svg"
                            layout="fill"
                            objectFit="cover"
                            alt="premium-image"
                        />
                    </figure>
                ) : (
                    ""
                )}
                <h3 className="price">
                    Rs{price}
                    <span>/mo</span>{" "}
                </h3>
            </div>
            <div className="offers">
                <ul>
                    {offers.map((offer: any, i: number) => (
                        <li key={i}>{offer.label} </li>
                    ))}
                </ul>
            </div>

            <div className="btn-wrapper">
                <AnchorButton
                    className={"w-50 h-25"}
                    href={""}
                    varient={"secondary"}
                >
                    Select Plan
                </AnchorButton>
            </div>
        </div>
    );
};
export default MembershipCard;
