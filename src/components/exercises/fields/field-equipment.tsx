import { FC } from "react";
import {
  ExerciseEquipmentType,
  ExerciseFormData,
  ExerciseType,
} from "@/types/exercise.type";
import { Chip, Select, SelectItem } from "@heroui/react";
import { capitalize } from "@/helpers/strings";
import { Control, Controller } from "react-hook-form";

interface FieldEquipmentProps {
  equipmentValue: ExerciseType["equipment"];
  context: "SHOW" | "EDIT" | "CREATE";
  control?: Control<ExerciseFormData, any>;
}

const FieldEquipment: FC<FieldEquipmentProps> = ({
  equipmentValue,
  context,
  control,
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
    <Controller
      control={control}
      name="equipment"
      render={({ fieldState, field: { onChange, ...fieldProps } }) => (
        <Select
          label="Equipment"
          placeholder="Select equipment"
          selectionMode="multiple"
          defaultSelectedKeys={equipmentValue}
          isDisabled={context === "SHOW"}
          errorMessage={fieldState?.error?.message}
          fullWidth
          {...fieldProps}
          onSelectionChange={(keys) => {
            // Convert the selection to an array of strings
            const selection = Array.from(keys).map((key) => String(key));
            onChange(selection);
          }}
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
      )}
    />
  );
};

export default FieldEquipment;
