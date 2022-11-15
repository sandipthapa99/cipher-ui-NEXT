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
            </ServiceLayout>
        </>
    );
};
export default ServicePage;
