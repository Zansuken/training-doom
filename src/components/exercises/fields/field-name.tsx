import { Input } from "@heroui/react";
import { FC } from "react";
import { FieldError } from "react-hook-form";

interface FieldNameProps {
  context: "SHOW" | "EDIT" | "CREATE";
  error?: FieldError;
}

const FieldName: FC<FieldNameProps> = ({ context, error, ...registered }) => {
  return (
    <Input
      isDisabled={context === "SHOW"}
      label="Name"
      variant="bordered"
      isInvalid={Boolean(error)}
      errorMessage={error?.message}
      {...registered}
    />
  );
};

export default FieldName;
