import {
    useClearSearchedServices,
    useClearSearchQuery,
} from "@components/common/Search/searchStore";
import ServiceLayout from "@components/services/ServiceLayout";
import { ServicesMap } from "@components/services/ServicesMap";
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
                <ServicesMap />
            </ServiceLayout>
        </>
    );
};
export default ServicePage;
