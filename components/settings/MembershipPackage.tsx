import CardBtn from "@components/common/CardBtn";
import { Col, Row } from "react-bootstrap";

const MEMBERSHIP_DETAILS = [
    {
        title: "Membership",
        price: "FREE",
        details: [
            "Discounts of offers from Cipher.",
            "2% off on Subscriptions.",
            "Quick Service..",
        ],
        isactive: true,
        buttonName: "Join Now",
    },
    {
        title: "Premium Client",
        price: "Rs500/mon",
        details: [
            "Discounts of offers from Cipher.",
            "2% off on Subscriptions.",
            "Quick Service..",
        ],
        isactive: false,
        buttonName: "Join Now",
    },
    {
        title: "Premium Tasker",
        price: "Rs100/mon",
        details: [
            "Discounts of offers from Cipher.",
            "2% off on Subscriptions.",
            "Quick Service..",
        ],
        isactive: false,
        buttonName: "Join Now",
    },
];
export const MembershipPackage = () => {
    const renderMembership = MEMBERSHIP_DETAILS.map((membership, index) => {
        const renderDetails = membership.details.map((detail, index) => {
            return (
                // <div className="package-card-detail-setting" key={index}>
                //     <p>{detail}</p>
                // </div>
                <p key={index}>{detail}</p>
            );
        });
        return (
            <Col key={index} className="setting-package">
                <div className="package-detail-settings">
                    <p>{membership.title}</p>

                    <div className="package-liner"></div>
                    <p className="price-membership">{membership.price}</p>
                </div>
                <div className="detail-setting ">{renderDetails}</div>

                <div className="setting-package-btn">
                    {!membership.isactive ? (
                        <CardBtn
                            handleClick={() => {
                                console.log(membership);
                            }}
                            btnTitle={membership.buttonName}
                            backgroundColor="primary-color"
                        />
                    ) : (
                        <p>Current Membership</p>
                    )}
                </div>
            </Col>
        );
    });
    return <Row style={{ gap: "2rem" }}>{renderMembership}</Row>;
};
