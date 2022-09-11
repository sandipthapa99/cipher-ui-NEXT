import BigButton from "@components/common/Button";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
interface FillKycProps {
    onClick: () => void;
}

export const FillKyc = ({ onClick }: FillKycProps) => {
    return (
        <Row className="fill-kyc">
            <Col md={6} className="all-info-detail">
                <div className="info-details-kyc">
                    <FontAwesomeIcon className="info-kyc" icon={faCircleInfo} />
                    <p className="p-info">Have you filled up your KYC form ?</p>
                </div>
                <p className="detail-kyc">
                    Fill up the KYC form to enjoy several benefits becoming a
                    part of Cipher.
                </p>
            </Col>
            <Col md={{ span: 3, offset: 3 }}>
                <BigButton
                    btnTitle={"Fill KYC Now"}
                    backgroundColor={"#FFCA6A"}
                    textColor={"#212529"}
                    handleClick={() => onClick()}
                />
            </Col>
        </Row>
    );
};
