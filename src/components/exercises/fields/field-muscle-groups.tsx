import { FC } from "react";
import { ExerciseMuscleGroupType, ExerciseType } from "@/types/exercise.type";
import { Chip, Select, SelectItem, SharedSelection } from "@heroui/react";
import { capitalize } from "@/helpers/strings";

interface FieldMuscleGroupsProps {
  muscleGroups: ExerciseType["muscleGroups"];
  context: "SHOW" | "EDIT";
  onChange: (keys: SharedSelection) => void;
}

const FieldMuscleGroups: FC<FieldMuscleGroupsProps> = ({
  muscleGroups,
  context,
  onChange,
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
    <Select
      label="Muscle groups"
      placeholder="Select a muscle group"
      selectionMode="multiple"
      selectedKeys={muscleGroups}
      onSelectionChange={onChange}
      isDisabled={context === "SHOW"}
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
    >
      {options.map((option) => (
        <SelectItem key={option}>{capitalize(option.toLowerCase())}</SelectItem>
      ))}
    </Select>
  );
};

export default FieldMuscleGroups;
