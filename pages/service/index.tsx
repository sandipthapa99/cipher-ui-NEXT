import { MapboxMap } from "@components/common/MapboxMap";
import ServiceLayout from "@components/services/ServiceLayout";
import type { NextPage } from "next";

const ServicePage: NextPage = () => {
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
