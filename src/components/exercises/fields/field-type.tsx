import { ChangeEventHandler, FC } from "react";
import { ExerciseTypeType } from "@/types/exercise.type";
import { Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useGetTypeIcon } from "../hooks/useGetTypeIcon";

interface FieldTypeProps {
  type: ExerciseTypeType;
  context: "SHOW" | "EDIT";
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

const FieldType: FC<FieldTypeProps> = ({ type, context, onChange }) => {
  const getTypeIcon = useGetTypeIcon();

  const options = ["CARDIO", "STRENGTH", "FLEXIBILITY"] as ExerciseTypeType[];

  return (
    <Select
      value={type}
      onChange={onChange}
      variant="bordered"
      selectedKeys={[type]}
      label="Type"
      fullWidth
      isDisabled={context === "SHOW"}
      startContent={<Icon icon={getTypeIcon(type)} width={16} />}
    >
      {options.map((option) => (
        <SelectItem
          key={option}
          startContent={<Icon icon={getTypeIcon(option)} width={16} />}
        >
          {option}
        </SelectItem>
      ))}
    </Select>
  );
};

export default FieldType;
