import { ChangeEventHandler, FC } from "react";
import { ExerciseIntensityType } from "@/types/exercise.type";
import { Chip, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { capitalize } from "@/helpers/strings";

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
  intensity: ExerciseIntensityType;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

const EditIntensity: FC<EditIntensityProps> = ({ intensity, onChange }) => {
  const intensitySettings = getIntensitySettings(intensity);

  const options = ["LOW", "MEDIUM", "HIGH"] as ExerciseIntensityType[];

  return (
    <Select
      onChange={onChange}
      color={intensitySettings.color}
      selectedKeys={[intensity]}
      label="Intensity"
      startContent={<Icon icon={intensitySettings.icon} width={24} />}
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
  );
};

interface FieldIntensityProps {
  intensity: ExerciseIntensityType;
  context: "SHOW" | "EDIT";
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

const FieldIntensity: FC<FieldIntensityProps> = ({
  intensity,
  context,
  onChange,
}) => {
  if (context === "EDIT")
    return <EditIntensity intensity={intensity} onChange={onChange} />;

  return <ShowIntensity intensity={intensity} />;
};

export default FieldIntensity;
