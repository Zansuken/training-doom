import { ExerciseDurationType, ExerciseFormData } from "@/types/exercise.type";
import { Input, Select, SelectItem } from "@heroui/react";
import { FC } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";

interface FieldDurationProps {
  durationValue: ExerciseDurationType;
  context: "SHOW" | "EDIT" | "CREATE";
  control?: Control<ExerciseFormData, any>;
  setValue: UseFormSetValue<ExerciseFormData>;
}

const FieldDuration: FC<FieldDurationProps> = ({
  durationValue,
  context,
  control,
  setValue,
}) => {
  const options = [
    "MINUTES",
    "SECONDS",
    "HOURS",
  ] as ExerciseDurationType["unit"][];
  return (
    <Controller
      control={control}
      name="duration"
      render={({ fieldState }) => (
        <div className="flex gap-4 w-full">
          <Input
            isDisabled={context === "SHOW"}
            value={durationValue.time.toString()}
            label="Duration"
            variant="bordered"
            type="number"
            fullWidth
            errorMessage={fieldState?.error?.message}
            onChange={(e) => setValue("duration.time", Number(e.target.value))}
          />
          <Select
            variant="bordered"
            selectedKeys={[durationValue.unit]}
            label="Unit"
            fullWidth
            errorMessage={fieldState?.error?.message}
            onChange={(e) =>
              setValue(
                "duration.unit",
                e.target.value as ExerciseDurationType["unit"]
              )
            }
            isDisabled={context === "SHOW"}
          >
            {options.map((option) => (
              <SelectItem key={option}>{option}</SelectItem>
            ))}
          </Select>
        </div>
      )}
    />
  );
};

export default FieldDuration;
