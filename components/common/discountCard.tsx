import { format } from "date-fns";
import { useData } from "hooks/use-data";
import Image from "next/image";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";
import { useSetCheckSpecialOffer } from "store/use-check-special-offer";
import { useSetSpecialOfferDetails } from "store/use-special-offers";
import { axiosClient } from "utils/axiosClient";

import BigButton from "./Button";

const DiscountCard = () => {
    const setSpecialOffer = useSetSpecialOfferDetails();
    const setCheckedOffer = useSetCheckSpecialOffer();
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

    // console.log(specialOffer?.data?.result);
    const filteredOffers = specialOffer?.data?.result?.filter(
        (item) => item.is_active === true
    );
    const router = useRouter();
    // const { mutate, data } = usePostOffers();

    // const renderDiscountCard = specialOffer?.data?.result?.map((item) => {
    //     return;
    // });

    const renderServiceOffers = filteredOffers?.map((item) => {
        return (
            <Col key={item.id} md={3}>
                <div className="discount-card-block">
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
                                {item.discount_type.toLocaleUpperCase() ===
                                "amount"
                                    ? `
                                    $${item.discount_value} off`
                                    : `${item.discount_value}% off`}
                            </p>
                        </div>
                        <p>{item.description}</p>
                        <p className="time">
                            Ends on:{" "}
                            {format(new Date(item.end_date), "do MMM ")}
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

                                setSpecialOffer(responseData);
                                setCheckedOffer();

                                router.push("/service");

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
            </Col>
        );
    });

    return <Row className="gap-5">{renderServiceOffers}</Row>;
};
export default DiscountCard;
