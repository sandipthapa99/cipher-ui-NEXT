import { useData } from "hooks/use-data";
import Image from "next/image";

import BigButton from "./Button";

const DiscountCard = () => {
    const { data: specialOffer } = useData(
        ["special-offers"],
        "/offer/serviceoffer/"
    );
    // console.log(specialOffer?.data?.result);
    // const renderDiscountCard = specialOffer?.data?.result?.map((item) => {
    //     return;
    // });

    return (
        <div className="discount-card-block">
            <figure className="thumbnail-img">
                <Image
                    src="/exploreservices/offer1.png"
                    layout="fill"
                    objectFit="cover"
                    alt="discount-image"
                />
            </figure>
            <div className="category-overlay">
                <h1>Additional</h1>
                <div className="discount">
                    <p>20% OFF</p>
                </div>
                <p>For all Home Services</p>
                <p className="time">TODAY ONLY</p>
                <BigButton btnTitle="Book Now" backgroundColor="#fca500" />
            </div>
        </div>
    );
};
export default DiscountCard;
