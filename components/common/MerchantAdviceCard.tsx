import Image from "next/image";
import { useRouter } from "next/router";
import type { MerchantAdviceProps } from "types/merchantAdvice";

import CardBtn from "./CardBtn";
const MerchantAdviceCard = ({
    title,
    subtitle,
    description,
    image,
}: MerchantAdviceProps) => {
    const router = useRouter();
    const onButtonClick = () => {
        router.push({
            pathname: "/task",
        });
    };
    return (
        <div className="merchant-advice__card d-flex">
            <div className="description">
                <h2>{title}</h2>
                <h4>{subtitle}</h4>
                <p>{description}</p>
                <CardBtn
                    btnTitle="See how"
                    backgroundColor="#211D4F"
                    handleClick={onButtonClick}
                />
            </div>
            <div className="image">
                <figure className="thumbnail-img">
                    <Image
                        src={image}
                        layout="fill"
                        objectFit="cover"
                        alt="earth-image"
                    />
                </figure>
            </div>
        </div>
    );
};
export default MerchantAdviceCard;
