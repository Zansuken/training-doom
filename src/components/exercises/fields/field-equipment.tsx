import { FC } from "react";
import { ExerciseEquipmentType, ExerciseType } from "@/types/exercise.type";
import { Chip, Select, SelectItem, SharedSelection } from "@heroui/react";
import { capitalize } from "@/helpers/strings";

interface FieldEquipmentProps {
  equipment: ExerciseType["equipment"];
  context: "SHOW" | "EDIT";
  onChange: (keys: SharedSelection) => void;
}

const FieldEquipment: FC<FieldEquipmentProps> = ({
  equipment,
  context,
  onChange,
}) => {
  const options = [
    "BARBELL",
    "DUMBBELL",
    "KETTLEBELL",
    "MEDICINE_BALL",
    "RESISTANCE_BAND",
    "STABILITY_BALL",
    "BODYWEIGHT",
    "CABLE_MACHINE",
    "MACHINE",
    "CARDIO_MACHINE",
    "OTHER",
  ] as ExerciseEquipmentType[];
  return (
    <Select
      label="Equipment"
      placeholder="Select equipment"
      selectionMode="multiple"
      selectedKeys={equipment}
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
              {capitalize(item.textValue?.toLowerCase() ?? "").replace(
                "_",
                " "
              )}
            </span>
          </Chip>
        ))
      }
    >
      {options.map((option) => (
        <SelectItem key={option}>
          {capitalize(option.toLowerCase()).replace("_", " ")}
        </SelectItem>
      ))}
    </Select>
  );
};

export default FieldEquipment;
