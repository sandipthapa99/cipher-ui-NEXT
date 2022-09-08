import BigButton from "@components/common/Button";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";

interface CompleteProfileProps {
    onClick: () => void;
}

export const CompleteProfile = ({ onClick }: CompleteProfileProps) => {
    return (
        <div className="complete-profile">
            <h1>Your profile is incomplete!</h1>
            <p>
                Fill in the details to Complete your profile and get started
                with tasks.
            </p>

            <div className="d-flex buttons">
                <BigButton
                    btnTitle={"Complete Now"}
                    backgroundColor={"#FFCA6A"}
                    textColor={"#212529"}
                    handleClick={() => onClick()}
                />

                <Link href={"/home"} className="text-profile">
                    <a>
                        <BigButton
                            btnTitle={"Later"}
                            backgroundColor={"#FFCA6A"}
                            textColor={"#212529"}
                        />
                    </a>
                </Link>
            </div>
        </div>
    );
};
