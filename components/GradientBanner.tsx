import Cookies from "js-cookie";
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
    const accessToken = Cookies.get("access");
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
                <>
                    <h1>{title}</h1>
                    <div className="bottom-content">
                        <p>{subTitle}</p>
                    </div>
                    {accessToken !== undefined ? (
                        <AnchorButton
                            className={"px-5"}
                            href={"/explore-services"}
                            varient={"secondary"}
                        >
                            {"Explore Services"}
                        </AnchorButton>
                    ) : (
                        <AnchorButton
                            className={"px-5"}
                            href={"/signup"}
                            varient={"secondary"}
                        >
                            {"Join Us"}
                        </AnchorButton>
                    )}
                </>
                <div></div>
            </div>
        </div>
    );
};
export default GradientBanner;
