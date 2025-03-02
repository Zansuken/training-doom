import { Textarea } from "@heroui/react";
import { ChangeEventHandler, FC } from "react";

interface FieldDescriptionProps {
  description: string;
  context: "SHOW" | "EDIT";
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const FieldDescription: FC<FieldDescriptionProps> = ({
  description,
  context,
  onChange,
}) => {
  return (
    <Textarea
      isReadOnly={context === "SHOW"}
      value={description}
      onChange={onChange}
      label="Description"
      variant="bordered"
    />
  );
};

export default FieldDescription;
