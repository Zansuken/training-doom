import { FC, SVGProps } from "react";
import { ExerciseFormData, ExerciseIntensityType } from "@/types/exercise.type";
import { Chip, Select, SelectItem, Skeleton } from "@heroui/react";
import DevilIcon from "@/components/icons/DevilIcon";
import { capitalize } from "@/helpers/strings";
import { Control, Controller } from "react-hook-form";
import PoopIcon from "@/components/icons/PoopIcon";
import NeutralFaceIcon from "@/components/icons/NeutralFaceIcon";
import CoolFaceIcon from "@/components/icons/CoolFaceIcon";

const getIntensitySettings: (intensity: ExerciseIntensityType) => {
  color:
    | "success"
    | "warning"
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | undefined;
  Icon: FC<SVGProps<SVGSVGElement>>;
} = (intensity) => {
  switch (intensity) {
    case "LOW":
      return {
        color: "success",
        Icon: CoolFaceIcon,
      };
    case "MEDIUM":
      return {
        color: "warning",
        Icon: NeutralFaceIcon,
      };
    case "HIGH":
      return {
        color: "danger",
        Icon: DevilIcon,
      };
    default:
      return {
        color: "default",
        Icon: PoopIcon,
      };
  }
};

interface ShowIntensityProps {
  intensity: ExerciseIntensityType;
  isLoading: boolean;
}

const ShowIntensity: FC<ShowIntensityProps> = ({ intensity, isLoading }) => {
  const { color, Icon } = getIntensitySettings(intensity);

  return (
    <div className="h-[56px] flex justify-between flex-col">
      <h3 className="text-md leading-[1]">Intensity</h3>
      <Skeleton isLoaded={!isLoading} className="w-2/3 h-[28px] rounded-[14px]">
        <Chip color={color} startContent={<Icon />}>
          <span className="text-medium">{capitalize(intensity)}</span>
        </Chip>
      </Skeleton>
    </div>
  );
};

interface EditIntensityProps {
  control: Control<ExerciseFormData, any>;
  intensityValue: ExerciseIntensityType;
}

const EditIntensity: FC<EditIntensityProps> = ({ intensityValue, control }) => {
  const { color, Icon } = getIntensitySettings(intensityValue);

  const options = ["LOW", "MEDIUM", "HIGH"] as ExerciseIntensityType[];

  return (
    <Controller
      control={control}
      name="intensity"
      render={({ field, fieldState, formState }) => (
        <Select
          color={color}
          label="Intensity"
          startContent={<Icon />}
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
              startContent={(() => {
                const { Icon } = getIntensitySettings(option);
                return <Icon />;
              })()}
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
  isLoading: boolean;
}

const FieldIntensity: FC<FieldIntensityProps> = ({
  context,
  intensityValue,
  control,
  isLoading,
}) => {
  if (context !== "SHOW" && control)
    return <EditIntensity intensityValue={intensityValue} control={control} />;

  return <ShowIntensity intensity={intensityValue} isLoading={isLoading} />;
};

export default FieldIntensity;
