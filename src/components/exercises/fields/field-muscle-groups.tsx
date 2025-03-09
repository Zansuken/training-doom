import { FC } from "react";
import {
  ExerciseFormData,
  ExerciseMuscleGroupType,
  ExerciseType,
} from "@/types/exercise.type";
import { Chip, Select, SelectItem } from "@heroui/react";
import { capitalize } from "@/helpers/strings";
import { Control, Controller } from "react-hook-form";

interface FieldMuscleGroupsProps {
  muscleGroupsValue: ExerciseType["muscleGroups"];
  context: "SHOW" | "EDIT" | "CREATE";
  control?: Control<ExerciseFormData, any>;
}

const FieldMuscleGroups: FC<FieldMuscleGroupsProps> = ({
  muscleGroupsValue,
  context,
  control,
}) => {
  const options = [
    "ARMS",
    "BACK",
    "CHEST",
    "CORE",
    "LEGS",
    "SHOULDERS",
  ] as ExerciseMuscleGroupType[];

  return (
    <Controller
      control={control}
      name="muscleGroups"
      render={({ fieldState, field: { onChange, ...fieldProps } }) => (
        <Select
          label="Muscle groups"
          placeholder="Select a muscle group"
          selectionMode="multiple"
          defaultSelectedKeys={muscleGroupsValue}
          isDisabled={context === "SHOW"}
          errorMessage={fieldState?.error?.message}
          fullWidth
          renderValue={(items) =>
            items.map((item) => (
              <Chip
                key={item.key}
                radius="sm"
                size="sm"
                variant="bordered"
                className="mr-2"
              >
                <span className="text-medium">
                  {capitalize(item.textValue?.toLowerCase() ?? "")}
                </span>
              </Chip>
            ))
          }
          {...fieldProps}
          onSelectionChange={(keys) => {
            // Convert the selection to an array of strings
            const selection = Array.from(keys).map((key) => String(key));
            onChange(selection);
          }}
        >
          {options.map((option) => (
            <SelectItem key={option}>
              {capitalize(option.toLowerCase())}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default FieldMuscleGroups;
