import { FC } from "react";
import { ExerciseFormData, ExerciseIntensityType } from "@/types/exercise.type";
import { Chip, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { capitalize } from "@/helpers/strings";
import { Control, Controller } from "react-hook-form";

const getIntensitySettings: (intensity: ExerciseIntensityType) => {
  color:
    | "success"
    | "warning"
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | undefined;
  icon: string;
} = (intensity) => {
  switch (intensity) {
    case "LOW":
      return {
        color: "success",
        icon: "mdi:emoticon-cool-outline",
      };
    case "MEDIUM":
      return {
        color: "warning",
        icon: "mdi:emoticon-neutral-outline",
      };
    case "HIGH":
      return {
        color: "danger",
        icon: "mdi:emoticon-devil-outline",
      };
    default:
      return {
        color: "default",
        icon: "mdi:emoticon-poop-outline",
      };
  }
};

interface ShowIntensityProps {
  intensity: ExerciseIntensityType;
}

const ShowIntensity: FC<ShowIntensityProps> = ({ intensity }) => {
  const intensitySettings = getIntensitySettings(intensity);

  return (
    <div className="h-[56px] flex justify-between flex-col">
      <h3 className="text-md leading-[1]">Intensity</h3>
      <Chip
        color={intensitySettings.color}
        startContent={<Icon icon={intensitySettings.icon} width={24} />}
      >
        <span className="text-medium">{capitalize(intensity)}</span>
      </Chip>
    </div>
  );
};

interface EditIntensityProps {
  control: Control<ExerciseFormData, any>;
  intensityValue: ExerciseIntensityType;
}

const EditIntensity: FC<EditIntensityProps> = ({ intensityValue, control }) => {
  const intensitySettings = getIntensitySettings(intensityValue);

  const options = ["LOW", "MEDIUM", "HIGH"] as ExerciseIntensityType[];

  return (
    <Controller
      control={control}
      name="intensity"
      render={({ field, fieldState, formState }) => (
        <Select
          color={intensitySettings.color}
          label="Intensity"
          startContent={<Icon icon={intensitySettings.icon} width={24} />}
          defaultSelectedKeys={[intensityValue]}
          isInvalid={fieldState.invalid}
          errorMessage={formState.errors.intensity?.message}
          isDisabled={formState.isSubmitting}
          {...field}
        >
          {options.map((option) => (
            <SelectItem
              key={option}
              color={getIntensitySettings(option).color}
              startContent={
                <Icon icon={getIntensitySettings(option).icon} width={24} />
              }
            >
              {option}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
};

interface FieldIntensityProps {
  context: "SHOW" | "EDIT" | "CREATE";
  intensityValue: ExerciseIntensityType;
  control?: Control<ExerciseFormData, any>;
}

const FieldIntensity: FC<FieldIntensityProps> = ({
  context,
  intensityValue,
  control,
}) => {
  if (context === "EDIT" && control)
    return <EditIntensity intensityValue={intensityValue} control={control} />;

  return <ShowIntensity intensity={intensityValue} />;
};

export default FieldIntensity;
