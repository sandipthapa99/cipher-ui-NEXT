import BigButton from "@components/common/Button";
import PackageOffersCard from "@components/common/packageCard";
import ServiceHighlights from "@components/common/ServiceHighlights";
import ServiceProviderCard from "@components/common/serviceProviderCard";
import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { PackageCard } from "staticData/packageCard";
import { serviceHighlights } from "staticData/serviceHighlights";
import { serviceProvider } from "staticData/serviceProvider";

interface PublishComponentProps {
    handlePrev: () => void;
}

export const PublishComponent = ({ handlePrev }: PublishComponentProps) => {
    return (
        <section
            id="publish-component-section"
            className="publish-component-section"
        >
            <Container>
                <div className="publish-component">
                    <h1>Garden Cleanning</h1>
                    <p>By Harry Smith, Gardener</p>

                    <Row>
                        <Col md={12} lg={8}>
                            <figure className="thumbnail-img">
                                <Image
                                    src="/service-details/garden-cleaning.png"
                                    layout="fill"
                                    objectFit="cover"
                                    alt="garden-image"
                                />
                            </figure>
                            <h3>Description</h3>
                            <p>
                                Hiring a reputable professional landscape
                                gardener entail paying for their knowledge,
                                experience, time, equipment, and materials. They
                                will be able to discuss your vision and tailor
                                your garden design to your exact needs, taking
                                into account your taste, lifestyle, budget.
                            </p>
                        </Col>
                        <Col md={12} lg={4} className="d-flex">
                            {serviceProvider &&
                                serviceProvider.map((provider) => (
                                    <ServiceProviderCard
                                        image={provider.image}
                                        key={provider.id}
                                        name={provider.name}
                                        views={provider.views}
                                        address={provider.address}
                                        happyClients={provider.happyClients}
                                        successRate={provider.successRate}
                                        speciality={provider.speciality}
                                        startingPrice="1000"
                                        isAddServiceForm={true}
                                    />
                                ))}
                        </Col>
                    </Row>

                    <h3>Highlights</h3>
                    <div className="mt-5">
                        {serviceHighlights &&
                            serviceHighlights.map((name) => (
                                <div key={name.id}>
                                    <ServiceHighlights title={name.title} />
                                </div>
                            ))}
                    </div>

                    <h3>Packages &amp; Offers</h3>
                    <Row className="gx-5 d-flex align-items-stretch">
                        {PackageCard &&
                            PackageCard.map((offer) => (
                                <Col
                                    className="align-items-stretch"
                                    lg={3}
                                    md={4}
                                    sm={6}
                                    key={offer.id}
                                >
                                    <PackageOffersCard
                                        title={offer.title}
                                        price={offer.price.toString()}
                                        offers={offer.offers}
                                        isRecommended={offer.isRecommended}
                                        isPermium={offer.isPermium}
                                        advantage={offer.advantage}
                                        isFromAddService={false}
                                    />
                                </Col>
                            ))}
                    </Row>

                    <div className="d-flex justify-content-center next-button">
                        <span className="previous-step-button">
                            <BigButton
                                btnTitle={"Go Back"}
                                backgroundColor={"#fff"}
                                textColor="black"
                                handleClick={handlePrev}
                            />
                        </span>
                        <BigButton
                            btnTitle={"Publish"}
                            backgroundColor={"#211D4F"}
                            textColor="#fff"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
};