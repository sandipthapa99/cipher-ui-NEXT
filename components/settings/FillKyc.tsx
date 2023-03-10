import BigButton from "@components/common/Button";
import Image from "next/image";
import Link from "next/link";
interface FillKycProps {
    onClick: () => void;
}

export const FillKyc = ({ onClick }: FillKycProps) => {
    return (
        <div className="complete-profile">
            {/* <Col md={6} className="all-info-detail">
                <div className="info-details-kyc">
                    <ErrorOutlineOutlined className="info-kyc"  />
                    <p className="p-info">Have you filled up your KYC form ?</p>
                </div>
                <p className="detail-kyc">
                    Fill up the KYC form to enjoy several benefits becoming a
                    part of Homaale.
                </p>
            </Col>
            <Col md={{ span: 3, offset: 3 }}>
                <BigButton
                    btnTitle={"Fill KYC Now"}
                    backgroundColor={"#FFCA6A"}
                    textColor={"#212529"}
                    handleClick={() => onClick()}
                />
            </Col> */}
            <div className="d-flex profile-wrapper align-items-center">
                <h1>Fill your KYC Details</h1>

                <figure className="thumbnail-img">
                    <Image
                        src="/settings/kyc.svg"
                        layout="fill"
                        objectFit="cover"
                        alt="profile-image"
                    />
                </figure>
                <h3>Fill Your KYC to Get Verified.</h3>
                <p>Fill up your KYC detail to be verified Homaale User.</p>
            </div>
            <div className="d-flex buttons">
                <Link href={"/home"} className="text-profile">
                    <a>I&apos;ll do it later</a>
                </Link>
                <BigButton
                    btnTitle={"Let's do it"}
                    backgroundColor={"#FFCA6A"}
                    textColor={"#212529"}
                    handleClick={() => onClick()}
                />
            </div>
        </div>
    );
};
