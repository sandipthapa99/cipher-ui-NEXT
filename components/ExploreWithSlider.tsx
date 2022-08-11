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
                            <WinClientCard
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                buttonText={item.buttonText}
                            />
                        </Carousel.Item>
                    ))}
            </Carousel>
        </div>
    );
};
