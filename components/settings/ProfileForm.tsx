import BigButton from "@components/common/Button";
import Image from "next/image";
import Link from "next/link";

interface CompleteProfileProps {
    onClick: () => void;
}

export const CompleteProfile = ({ onClick }: CompleteProfileProps) => {
    return (
        <div className="complete-profile">
            {/* <h1>Your profile is incomplete!</h1>
            <p>Complete it to get started with tasks.</p>

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
                            backgroundColor={"#211d4f"}
                            textColor={"#fff"}
                        />
                    </a>
                </Link>
            </div> */}
            <div className="d-flex profile-wrapper align-items-center">
                <h1>Complete your Profile</h1>

                <figure className="thumbnail-img">
                    <Image
                        src="/userprofile/unknownPerson.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="profile-image"
                    />
                </figure>
                <h3>Please complete your Profile.</h3>
                <p>
                    Fill up your remaining detail to become an expertise in
                    Cipher.
                </p>
            </div>
            <div className="d-flex buttons">
                <Link href={"/home"} className="text-profile">
                    <a>I&apos;ll do it later</a>
                </Link>
                <BigButton
                    btnTitle={"Let's do it"}
                    backgroundColor={"#211d4f"}
                    textColor={"#fff"}
                    handleClick={() => onClick()}
                />
            </div>
        </div>
    );
};
