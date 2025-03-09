import { FC, useState } from "react";
import { ExerciseType } from "@/types/exercise.type";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Button,
  Chip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { capitalize } from "@/helpers/strings";
import ExerciseModal from "./exercise-modal";
import FieldIntensity from "./fields/field-intensity";
import { useGetTypeIcon } from "./hooks/useGetTypeIcon";
interface ExerciseCardProps {
  exercise: ExerciseType;
  exercisesNames: string[];
}

const ExerciseCard: FC<ExerciseCardProps> = ({ exercise, exercisesNames }) => {
  const { name, type, intensity, duration, muscleGroups } = exercise;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTypeIcon = useGetTypeIcon();

  return (
    <Card
      className="min-w-[200px] max-w-[400px] flex flex-col items-center justify-center"
      title="View details"
    >
      <CardHeader className="flex gap-3">
        <Icon icon={getTypeIcon(type)} className="text-4xl" />
        <div className="flex flex-col items-start">
          <p className="text-md">{capitalize(name)}</p>
          <p className="text-small text-default-500">{type}</p>
        </div>
      </CardHeader>
      <Divider className="w-[90%]" />
      <CardBody className="flex flex-row flex-wrap w-full">
        <div className="w-1/2">
          <FieldIntensity intensityValue={intensity} context="SHOW" />
        </div>
        <div className="w-1/2">
          <div className="flex gap-2 flex-col">
            <h3 className="text-md leading-[1]">Duration</h3>
            <p className="text-medium">{`${duration.time} ${duration.unit.toLowerCase()}`}</p>
          </div>
        </div>
        <div className="w-full  mt-2">
          <div className="flex gap-2 flex-col">
            <h3 className="text-md leading-[1]">Muscle groups</h3>
            <div className="flex gap-1">
              {Array.from(muscleGroups).map((group) => (
                <Chip
                  key={group}
                  radius="sm"
                  size="sm"
                  variant="bordered"
                  className="mr-2"
                >
                  <span className="text-medium">
                    {capitalize(group?.toLowerCase() ?? "")}
                  </span>
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-end">
        <Button
          color="primary"
          startContent={<Icon icon="bx:bx-show" width={24} />}
          onPress={() => setIsModalOpen(true)}
        >
          Details
        </Button>
      </CardFooter>
      <ExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        exercise={exercise}
        exercisesNames={exercisesNames}
      />
    </Card>
  );
};

export default ExerciseCard;
