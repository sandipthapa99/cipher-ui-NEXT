import {
    useClearSearchedServices,
    useClearSearchQuery,
} from "@components/common/Search/searchStore";
import GoogleMap from "@components/GoogleMap";
import ServiceLayout from "@components/services/ServiceLayout";
import { usePageExit } from "hooks/use-page-exit";
import type { NextPage } from "next";

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
                <GoogleMap />
            </ServiceLayout>
        </>
    );
};
export default ServicePage;
