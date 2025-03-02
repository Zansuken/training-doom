import { ExerciseDurationType } from "@/types/exercise.type";
import { Input, Select, SelectItem } from "@heroui/react";
import { ChangeEventHandler, FC } from "react";

interface FieldDurationProps {
  duration: ExerciseDurationType;
  context: "SHOW" | "EDIT";
  onChangeDuration?: ChangeEventHandler<HTMLInputElement>;
  onChangeUnit?: ChangeEventHandler<HTMLSelectElement>;
}

const FieldDuration: FC<FieldDurationProps> = ({
  duration,
  context,
  onChangeDuration,
  onChangeUnit,
}) => {
  const options = ["MINUTES", "SECONDS"] as ExerciseDurationType["unit"][];
  return (
    <div className="flex gap-4 w-full">
      <Input
        isReadOnly={context === "SHOW"}
        value={duration.time.toString()}
        onChange={onChangeDuration}
        label="Duration"
        variant="bordered"
        type="number"
        fullWidth
      />
      <Select
        value={duration.unit}
        onChange={onChangeUnit}
        variant="bordered"
        selectedKeys={[duration.unit]}
        label="Unit"
        fullWidth
      >
        {options.map((option) => (
          <SelectItem key={option}>{option}</SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default FieldDuration;
