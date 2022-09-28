import LongSquareImageCard from "@components/common/LongSquareImageCard";
import React from "react";
import { Container } from "react-bootstrap";
import {
    GetStartedData,
    ManageYourCareerData,
    SafeAndSecureData,
} from "staticData/getStartedData";

import { EarnMoneyVideoComponent } from "./EarnMoneyVideoComponent";
import { GetStartedCard } from "./GetStartedCard";

export const EarnMoneyProfessional = () => {
    return (
        <>
            <section
                id="earn-money-professional-top-section"
                className="earn-money-professional-top-section"
            >
                <Container className="px-5" fluid="xl">
                    <EarnMoneyVideoComponent />
                </Container>
            </section>

            <section
                id="earn-money-professional-get-started-section"
                className="earn-money-professional-get-started-section"
            >
                <Container className="px-5" fluid="xl">
                    <h1>How do I get Started ?</h1>
                    {GetStartedData?.map((item, index) => (
                        <GetStartedCard
                            key={index}
                            image={item?.image}
                            heading={item?.heading}
                            firstPoint={item?.firstPoint}
                            secondPoint={item?.secondPoint}
                            index={index}
                        />
                    ))}
                </Container>
            </section>

            <section
                id="earn-money-manage-your-career-section"
                className="earn-money-manage-your-career-section"
            >
                <Container>
                    <LongSquareImageCard
                        title={"Manage your Career"}
                        subtitle={
                            "Stay up to date on the Homeaale marketplace and keep in touch with your clients."
                        }
                        description={ManageYourCareerData}
                        image={"/earn-money/earnmoney5.png"}
                        imageOnRight={true}
                    />
                </Container>
            </section>

            <section
                id="earn-money-safe-and-secure-section"
                className="earn-money-safe-and-secure-section"
            >
                <Container>
                    <LongSquareImageCard
                        title={"Safe and Secure"}
                        description={SafeAndSecureData}
                        subtitle={
                            "Homeaale is a community that values your trust and safety as our number one priority. Our representatives are available 24/7 to assist you with any issues."
                        }
                        image={"/earn-money/earnmoney6.png"}
                    />
                </Container>
            </section>
        </>
    );
};
