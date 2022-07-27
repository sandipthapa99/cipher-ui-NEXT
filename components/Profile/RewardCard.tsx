import Image from "next/image";
import { RewardCardProps } from "types/rewardCard";
import CardBtn from "@components/common/CardBtn";
import { useState } from "react";

const RewardCard = ({
    title,
    rewardImage,
    haveDiscount,
    discount,
    haveCouponCode,
    isAvailable,
    daysLeft,
    btnText,
    isCouponCodeAvailable,
    couponCode,
    description,
}: RewardCardProps) => {

    const [copySuccess, setCopySuccess] = useState('');
    // your function to copy here

    const copyToClipBoard = async (copyMe: any) => {
        try {
            await navigator.clipboard.writeText(copyMe);
            setCopySuccess('Copied!');
        } catch (err) {
            setCopySuccess('Failed to copy!');
        }
    };
    return (
        <div className="find-hire-card-block reward-card">
            <figure className="thumbnail-img">
                <Image
                    src={rewardImage}
                    layout="fill"
                    objectFit="cover"
                    alt="reward-image"
                />
            </figure>
            {isAvailable ? '' :
                <figure className="expired-img">
                    <Image
                        src='/userprofile/rewards/expired.svg'
                        layout="fill"
                        objectFit="cover"
                        alt="expired-image"
                    />
                </figure>}
            <div className="card-content">
                <h2>{haveDiscount ? `25% Off ${title}` : `${title}`}</h2>
                <p>{description}</p>
                {haveCouponCode ?

                    <div className='coupon'>
                        {isCouponCodeAvailable ?
                            <div className="code">
                                <p>{couponCode}</p>
                            </div> :
                            <div className="disabled disabled-color">
                                <p>{couponCode}</p>
                            </div>}

                        <div className={`${isCouponCodeAvailable ? 'abled' : 'disabled-copy-btn'} copy-btn`}
                            onClick={() => copyToClipBoard(couponCode)}
                        >Copy</div>

                    </div>
                    :
                    <CardBtn btnTitle={`${btnText}`} backgroundColor="primary-color" />
                }

            </div>
        </div>
    );
};
export default RewardCard;
