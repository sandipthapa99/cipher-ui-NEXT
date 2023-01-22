import { useUser } from "hooks/auth/useUser";
import Image from "next/image";

import AnchorButton from "./common/AnchorButton";

interface GradientBannerProps {
    title: string;
    subTitle: string;
    image: string;
}
const GradientBanner = ({
    title,
    subTitle,

    image,
}: GradientBannerProps) => {
    const { data: user } = useUser();
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
                <p className="bottom-content">
                    <span>{subTitle}</span>
                </p>
                {user ? (
                    <AnchorButton
                        className={"px-4"}
                        href={"/service"}
                        varient={"secondary"}
                    >
                        {"Explore Services"}
                    </AnchorButton>
                ) : (
                    <AnchorButton
                        className={"px-4"}
                        href={"/signup"}
                        varient={"secondary"}
                    >
                        {"Join Us"}
                    </AnchorButton>
                )}
            </div>
        </div>
    );
};
export default GradientBanner;
