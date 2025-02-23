import { useState } from "react";

const useStepper = (steps: string[]) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const previousStep = () => setCurrentStep((prev) => prev - 1);

  const isNextDisabled = currentStep === steps.length - 1;

  return {
    currentStep,
    nextStep,
    previousStep,
    isNextDisabled,
    steps,
  };
};

export default useStepper;
