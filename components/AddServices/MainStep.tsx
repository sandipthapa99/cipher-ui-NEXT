import React, { useState } from "react";

import { GalleryFrom } from "./GalleryFrom";
import { PackageDetails } from "./PackageDetails";
import { PublishComponent } from "./PublishComponent";
import { ServiceDetails } from "./ServiceDetails";
import { StepsLine } from "./StepsLine";

export const MainStep = () => {
    const [step, setStep] = useState(1);

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    switch (step) {
        case 1:
            return (
                <>
                    <StepsLine step={step} />
                    <ServiceDetails handleNext={handleNext} />
                </>
            );
        case 2:
            return (
                <>
                    <StepsLine step={step} />
                    <PackageDetails
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                    />
                </>
            );

        case 3:
            return (
                <>
                    <StepsLine step={step} />
                    <GalleryFrom
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                    />
                </>
            );

        case 4:
            return (
                <>
                    <StepsLine step={step} />
                    <PublishComponent handlePrev={handlePrev} />
                </>
            );

        default:
            return <ServiceDetails handleNext={handleNext} />;
    }
};
