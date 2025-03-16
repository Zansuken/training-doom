import { FC } from "react";
import { ExerciseFormData, ExerciseMetricType } from "@/types/exercise.type";
import { Select, SelectItem } from "@heroui/react";
import { Control, Controller } from "react-hook-form";

interface FieldMetricsProps {
  typeValue: ExerciseMetricType;
  context: "SHOW" | "EDIT" | "CREATE";
  control?: Control<ExerciseFormData, any>;
}

const FieldMetrics: FC<FieldMetricsProps> = ({
  typeValue,
  context,
  control,
}) => {
  const options = [
    "DISTANCE",
    "REPS",
    "TIME",
    "WEIGHT",
  ] as ExerciseMetricType[];

  return (
    <Controller
      control={control}
      name="metrics"
      render={({ field }) => (
        <Select
          variant="bordered"
          selectedKeys={[typeValue]}
          label="Metrics"
          fullWidth
          isDisabled={context === "SHOW"}
          {...field}
        >
          {options.map((option) => (
            <SelectItem key={option}>{option}</SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

export default FieldMetrics;
