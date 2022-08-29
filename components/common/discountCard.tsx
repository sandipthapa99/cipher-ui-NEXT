import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { usePostOffers } from "hooks/offers/use-Post-Offers";
import { useData } from "hooks/use-data";
import Image from "next/image";
import { useState } from "react";
import { Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { axiosClient } from "utils/axiosClient";

import BigButton from "./Button";

const DiscountCard = () => {
    const [responseData, setResponseData] = useState<any>([]);
    const { data: specialOffer } = useData<{
        result: Array<{
            id: number;
            services: Array<any>;
            created_by: {
                id: string;
                email: string;
                full_name: string;
                profile_image: any;
            };
            created_at: string;
            updated_at: string;
            title: string;
            description: string;
            image: string;
            discount_type: string;
            discount_value: number;
            start_date: string;
            end_date: string;
            is_active: boolean;
            redeems: Array<any>;
        }>;
    }>(["special-offers"], "/offer/serviceoffer/all");
    console.log(responseData);

    // console.log(specialOffer?.data?.result);
    const filteredOffers = specialOffer?.data?.result?.filter(
        (item) => item.is_active === true
    );
    // const { mutate, data } = usePostOffers();

    // const renderDiscountCard = specialOffer?.data?.result?.map((item) => {
    //     return;
    // });

    const renderServiceOffers = filteredOffers?.map((item) => {
        return (
            <div key={item.id} className="discount-card-block">
                {specialOffer && (
                    <figure className="thumbnail-img">
                        <Image
                            src={item.image}
                            layout="fill"
                            objectFit="cover"
                            alt="discount-image"
                        />
                    </figure>
                )}
                <div className="category-overlay">
                    <h1>{item.title}</h1>
                    <div className="discount">
                        <p>
                            {item.discount_type.toLocaleUpperCase() === "amount"
                                ? `$
                                    ${item.discount_value} off`
                                : `${item.discount_value}% off`}
                        </p>
                    </div>
                    <p>{item.description}</p>
                    <p className="time">
                        Ends on: {format(new Date(item.end_date), "do MMM ")}
                    </p>
                    <BigButton
                        btnTitle="See Offers"
                        backgroundColor="#fca500"
                        handleClick={async () => {
                            const response = await axiosClient.get(
                                `/task/service?offer=${item.title}`
                            );
                            // if (response.status === 200) {
                            //     console.log("success");
                            // } else {
                            //     console.log("failure");
                            // }
                            const responseData = response?.data?.result;
                            setResponseData([...responseData, item.title]);

                            // item.services.forEach(async (item) => {
                            //     const response: any = await axiosClient.get(
                            //         `/task/service?offer=${item.title}`
                            //     );
                            //     if (response.status === 200) {
                            //         toast.success(`Success`);
                            //     } else {
                            //         toast.error(`Error`);
                            //     }
                            // });
                        }}
                    />
                </div>
            </div>
        );
    });

    return <Col md={3}>{renderServiceOffers}</Col>;
};
export default DiscountCard;
