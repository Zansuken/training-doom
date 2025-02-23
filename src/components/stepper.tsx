import { BreadcrumbItem, Breadcrumbs, Button } from "@heroui/react";
import { FC, ReactNode } from "react";

interface StepperProps {
  steps: string[];
  currentStep: number;
  children: ReactNode;
  title?: string;
  titleStartIcon?: ReactNode;
  titleEndIcon?: ReactNode;
  onNextStep: () => void;
  onPreviousStep: () => void;
  isNextDisabled: boolean;
  extraAction?: ReactNode;
  hideButtons?: boolean;
}

const Stepper: FC<StepperProps> = ({
  steps,
  currentStep,
  children,
  title,
  titleStartIcon,
  titleEndIcon,
  onNextStep,
  onPreviousStep,
  isNextDisabled,
  extraAction,
  hideButtons = false,
}) => {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      {title && (
        <div className="flex items-center gap-2 pb-3">
          {titleStartIcon && <span className="text-4xl">{titleStartIcon}</span>}
          <p className="pb-1 text-left text-3xl font-semibold">{title}</p>
          {titleEndIcon && <span className="text-4xl">{titleEndIcon}</span>}
        </div>
      )}
      <div className="flex gap-2">
        <Breadcrumbs variant="solid">
          {steps.map((step, index) => (
            <BreadcrumbItem
              key={index}
              isCurrent={currentStep === index}
              isDisabled={currentStep < index}
            >
              {step}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      </div>
      <div>{children}</div>
      {!hideButtons && (
        <div className="flex justify-between gap-2 pt-3 w-full max-w-[281px] px-8">
          <Button
            color="primary"
            variant="bordered"
            onPress={onPreviousStep}
            isDisabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            color="primary"
            variant="solid"
            onPress={onNextStep}
            isDisabled={isNextDisabled}
          >
            Next
          </Button>
        </div>
      )}
      {extraAction && <div className="pt-3">{extraAction}</div>}
    </div>
  );
};

export default Stepper;
