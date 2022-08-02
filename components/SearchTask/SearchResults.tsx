import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import type { ServiceNearYou } from "../../staticData/servicesNearYouCard";
import ServiceNearYouCard from "./searchAside";
import SearchResultsDetail from "./SearchResultsDetails";

interface SearchResultsProps {
    servicesNearYou: ServiceNearYou[];
}

const SearchResults = ({ servicesNearYou }: SearchResultsProps) => {
    const [activeService, setActiveService] = useState<
        ServiceNearYou | undefined
    >();
    const renderServiceCards = () =>
        servicesNearYou.map((service) => {
            return (
                <div
                    key={service.id}
                    onClick={() => setActiveService(service)}
                    style={{ cursor: "pointer" }}
                >
                    <ServiceNearYouCard {...service} />
                </div>
            );
        });
    return (
        <div className="search-results">
            <Row>
                <Col className="search-results--col" md={4}>
                    <p>
                        {servicesNearYou.length} Services in Kathmandu, Nepal (1
                        new)
                    </p>
                    {renderServiceCards()}
                </Col>

                <Col md={8} className="map-cont">
                    {activeService !== undefined ? (
                        <SearchResultsDetail {...activeService} />
                    ) : (
                        <iframe
                            className="map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.9640853473306!2d85.32581651514985!3d27.687504882800237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19095c0dfbe9%3A0xeabd594ec46dbdfb!2sCagtu%20Nepal!5e0!3m2!1sen!2snp!4v1658292589018!5m2!1sen!2snp"
                            width="700"
                            height="550"
                            style={{ border: "0" }}
                            allowFullScreen={true}
                            loading="lazy"
                        ></iframe>
                    )}
                </Col>
            </Row>
        </div>
    );
};
export default SearchResults;
