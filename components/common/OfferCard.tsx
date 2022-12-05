import Image from "next/image";
import { Col, Row } from "react-bootstrap";

interface OfferCardProps {
    // maxRewardPoint: number;
    // rewardPoint: number;
    // priceToSpend: number;
    // currency: string;
    title: string;
    image: string;
    description: string;
}
const OfferCard = ({ title, description, image }: OfferCardProps) => {
    return (
        <div className="offer-card">
            <Row className="d-flex offer-card__content justify-content-center">
                <Col md={3} className="d-flex align-items-center">
                    <figure className="thumbnail-img">
                        <Image
                            src={image}
                            layout="fill"
                            alt="advertisement-image"
                            objectFit="contain"
                        />
                    </figure>
                </Col>
                <Col md={9} className="d-flex">
                    <div className="info">
                        <h3>
                            {/* For every {currency} {priceToSpend} spent, earn{" "}
                            {rewardPoint} reward points */}
                            {title}
                        </h3>
                        <span>{description}</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
};
export default OfferCard;
