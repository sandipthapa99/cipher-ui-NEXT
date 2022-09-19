import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { ServiceNearYou } from "types/serviceNearYouCards";

import ServiceNearYouCard from "./searchAside";
import SearchResultsDetail from "./SearchResultsDetails";

interface SearchResultsProps {
    servicesNearYou: ServiceNearYou[];
}

const SearchResults = ({ servicesNearYou }: SearchResultsProps) => {
    const router = useRouter();

    const [activeService, setActiveService] = useState<
        ServiceNearYou | undefined
    >();

    useEffect(() => {
        const serviceId = router?.query?.serviceId;

        if (serviceId) {
            const service = servicesNearYou?.find(
                (item) => item?.id === parseInt(serviceId as string)
            );
            console.log("serviceId ......", service);
            setActiveService(service);
        }
    }, [router?.query, router?.query?.serviceId, servicesNearYou]);

    const toggleActiveService = (service: ServiceNearYou) => {
        router.push({
            pathname: router?.pathname,
            query: { ...router.query, serviceId: service?.id },
        });
        setActiveService(service);
    };

    const renderServiceCards = () =>
        servicesNearYou?.map((service: any) => {
            return (
                <div
                    key={service?.id}
                    onClick={() => toggleActiveService(service)}
                    style={{ cursor: "pointer" }}
                >
                    <ServiceNearYouCard
                        servicePrice={service?.budget}
                        serviceTitle={service?.title}
                        serviceRating={service?.success_rate}
                        serviceProviderLocation={service?.location}
                        discount={service?.discount}
                        image={service?.image}
                        // serviceProvider={service?.created_by}
                        onServiceClick={toggleActiveService}
                        budget_type={""}
                    />
                </div>
            );
        });
    return (
        <Container>
            <div className="search-results">
                <Row>
                    <Col className="search-results--col" md={4}>
                        <p>
                            {servicesNearYou?.length} Services in Kathmandu ,
                            Nepal ({servicesNearYou?.length} new)
                        </p>
                        {renderServiceCards()}
                    </Col>

                    <Col md={8} className="map-cont">
                        {activeService ? (
                            <SearchResultsDetail
                                image={activeService?.image}
                                servicePrice={activeService?.budget ?? ""}
                                serviceProvider={
                                    activeService?.created_by ?? ""
                                }
                                serviceProviderLocation={
                                    activeService?.location ?? ""
                                }
                                serviceDescription={
                                    activeService?.description ?? ""
                                }
                                serviceRating={activeService?.success_rate ?? 0}
                                serviceTitle={activeService?.title ?? ""}
                                haveDiscount={
                                    activeService.discount ? true : false
                                }
                                discountOn={""}
                                discount={
                                    activeService?.discount
                                        ? activeService?.discount
                                        : 0
                                }
                                highlights={JSON.parse(
                                    activeService?.highlights
                                )}
                                serviceId={String(activeService?.id)}
                            />
                        ) : (
                            <iframe
                                className="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.9640853473306!2d85.32581651514985!3d27.687504882800237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19095c0dfbe9%3A0xeabd594ec46dbdfb!2sCagtu%20Nepal!5e0!3m2!1sen!2snp!4v1658292589018!5m2!1sen!2snp"
                                style={{ border: "0" }}
                                allowFullScreen={true}
                                loading="lazy"
                            ></iframe>
                        )}
                    </Col>
                </Row>
            </div>
        </Container>
    );
};
export default SearchResults;
