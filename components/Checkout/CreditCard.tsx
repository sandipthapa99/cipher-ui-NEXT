import { faCheckCircle } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import type { CreditCardContent } from "staticData/creditCardContent";

const CreditCard = ({ cardDetail }: { cardDetail: CreditCardContent[0] }) => {
    const [selected, setSelected] = useState(false);

    const isSelected = () => {
        setSelected((current) => !current);
    };
    return (
        <div
            onClick={isSelected}
            className={`credit-card-wrapper ${
                selected ? "credit-card-select" : "credit-card-default"
            } mt-3 mt-md-0 me-5`}
        >
            <div className="d-flex justify-content-between align-items-start">
                <h3>{cardDetail.number}</h3>
                {selected ? (
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="svg-icon-circle-check"
                    />
                ) : (
                    ""
                )}
            </div>
            <div className="d-flex flex-column-reverse flex-sm-row justify-content-between credit-card-detail">
                <div className="d-flex flex-column">
                    <span>{cardDetail.name}</span>
                    <span>{cardDetail.expDate}</span>
                </div>
                <figure>
                    <Image
                        src={"/credit-card/Group.jpg"}
                        alt="card-image"
                        layout="fill"
                    />
                </figure>
            </div>
        </div>
    );
};

export default CreditCard;
