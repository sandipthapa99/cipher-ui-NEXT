import ServiceLayout from "@components/services/ServiceLayout";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const NearbyServicesMap = dynamic(
    () => import("@components/services/NearbyServicesMap"),
    { ssr: false }
);

const ServicePage: NextPage = () => {
    return (
        <>
            <ServiceLayout>
                <NearbyServicesMap />

                {/* <AdvertisementCard
                    title="Gardening Services"
                    type="The Merch"
                    currency="Rs"
                    price="1250.00"
                    buttonTitle="Book Now"
                    cardImage="/service-details/garden-cleaning.png"
                /> */}
            </ServiceLayout>
        </>
    );
};
export default ServicePage;
