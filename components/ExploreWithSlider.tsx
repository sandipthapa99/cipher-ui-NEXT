import Link from "next/link";
import React from "react";
import { Carousel } from "react-bootstrap";
import { WinNewClientData } from "staticData/growBusiness";

import { WinClientCard } from "./common/WinClientCard";

export const ExploreWithSlider = () => {
    return (
        <div className="explore-with-slider">
            <Carousel>
                {WinNewClientData &&
                    WinNewClientData.map((item) => (
                        <Carousel.Item key={item?.id}>
                            <Link href={item?.redirect}>
                                <a>
                                    <WinClientCard
                                        image={item.image}
                                        title={item.title}
                                        description={item.description}
                                        buttonText={item.buttonText}
                                    />
                                </a>
                            </Link>
                        </Carousel.Item>
                    ))}
            </Carousel>
        </div>
    );
};
