import { Input } from "@heroui/react";
import { ChangeEventHandler, FC } from "react";

interface FieldNameProps {
  name: string;
  context: "SHOW" | "EDIT";
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const FieldName: FC<FieldNameProps> = ({ name, context, onChange }) => {
  return (
    <Input
      isReadOnly={context === "SHOW"}
      value={name}
      onChange={onChange}
      label="Name"
      variant="bordered"
    />
  );
};

export default FieldName;
