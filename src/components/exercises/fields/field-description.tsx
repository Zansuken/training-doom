import { Textarea } from "@heroui/react";
import { FC } from "react";
import { FieldError } from "react-hook-form";

interface FieldDescriptionProps {
  context: "SHOW" | "EDIT" | "CREATE";
  error?: FieldError;
}

const FieldDescription: FC<FieldDescriptionProps> = ({
  context,
  error,
  ...registered
}) => {
  return (
    <Textarea
      isDisabled={context === "SHOW"}
      label="Description"
      variant="bordered"
      isInvalid={Boolean(error)}
      errorMessage={error?.message}
      {...registered}
    />
  );
};

export default FieldDescription;
