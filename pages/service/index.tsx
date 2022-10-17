import {
    useClearSearchedServices,
    useClearSearchQuery,
} from "@components/common/Search/searchStore";
import ServiceLayout from "@components/services/ServiceLayout";
import { usePageExit } from "hooks/use-page-exit";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const NearbyServicesMap = dynamic(
    () => import("@components/services/NearbyServicesMap"),
    { ssr: false }
);

const ServicePage: NextPage = () => {
    const clearSearchedServices = useClearSearchedServices();
    const clearSearchQuery = useClearSearchQuery();
    usePageExit(() => {
        clearSearchedServices();
        clearSearchQuery();
    });
    return (
        <>
            <ServiceLayout>
                <NearbyServicesMap />
            </ServiceLayout>
        </>
    );
};
export default ServicePage;
