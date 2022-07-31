import React, { useState } from "react"
import { PackageDetails } from "./PackageDetails"
import { ServiceDetails } from "./ServiceDetails"

export const MainStep = () => {
  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep(step + 1)
  }

  const handlePrev = () => {
    setStep(step - 1)
  }

  switch (step) {
    case 1:
      return <ServiceDetails handleNext = {handleNext}/>
    case 2:
      return <PackageDetails handleNext = {handleNext} handlePrev={handlePrev}/>

    default:
      return <ServiceDetails handleNext={handleNext} />
  }
}
