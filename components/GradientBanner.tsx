import Image from "next/image";
import { Col, Row } from "react-bootstrap";

import CardBtn from "./common/CardBtn";

interface GradientBannerProps {
    title: string;
    subTitle: string;
    image: string;
}
const GradientBanner = ({ title, subTitle, image }: GradientBannerProps) => {
    return (
        <div className="gradient-layout">
            <div className="gradient"></div>
            <figure className="thumbnail-img">
                <Image
                    src={image}
                    layout="fill"
                    objectFit="cover"
                    alt="oppurtunities-page-main-image"
                />
            </figure>

            <div className="overlay pb-3">
                <h1>{title}</h1>
                <div className="bottom-content">
                    <p>{subTitle}</p>
                </div>
                <CardBtn
                    btnTitle="Join Us"
                    backgroundColor="#FFF"
                    color="#000"
                />
            </div>
        </div>
    );
};
export default GradientBanner;
