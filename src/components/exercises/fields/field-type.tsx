import { FC } from "react";
import { ExerciseFormData, ExerciseTypeType } from "@/types/exercise.type";
import { Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useGetTypeIcon } from "../hooks/useGetTypeIcon";
import { Control, Controller } from "react-hook-form";

interface FieldTypeProps {
  typeValue: ExerciseTypeType;
  context: "SHOW" | "EDIT" | "CREATE";
  control?: Control<ExerciseFormData, any>;
}

const FieldType: FC<FieldTypeProps> = ({ typeValue, context, control }) => {
  const getTypeIcon = useGetTypeIcon();

  const options = ["CARDIO", "STRENGTH", "FLEXIBILITY"] as ExerciseTypeType[];

  return (
    <Controller
      control={control}
      name="type"
      render={({ field }) => (
        <Select
          variant="bordered"
          selectedKeys={[typeValue]}
          label="Type"
          fullWidth
          isDisabled={context === "SHOW"}
          startContent={<Icon icon={getTypeIcon(typeValue)} width={16} />}
          {...field}
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
      )}
    />
  );
};

export default FieldType;
