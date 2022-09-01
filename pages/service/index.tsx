import { MapboxMap } from "@components/common/MapboxMap";
import {
    useClearSearchedServices,
    useClearSearchQuery,
} from "@components/common/Search/searchStore";
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
                <MapboxMap
                    latitude={27.687713889865993}
                    longitude={85.32806957052709}
                />
            </ServiceLayout>
        </>
    );
};
export default ServicePage;
