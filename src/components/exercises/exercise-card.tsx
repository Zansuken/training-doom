import { FC, useState } from "react";
import { ExerciseType } from "@/types/exercise.type";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Divider,
  Button,
  Skeleton,
  Chip,
} from "@heroui/react";
import { capitalize } from "@/helpers/strings";
import ExerciseModal from "./exercise-modal";
import FieldIntensity from "./fields/field-intensity";
import { useGetTypeIcon } from "./hooks/useGetTypeIcon";
import EyeOpenIconOutlined from "../icons/EyeOpenIconOutlined";
interface ExerciseCardProps {
  exercise: ExerciseType;
  isLoading: boolean;
}

const ExerciseCard: FC<ExerciseCardProps> = ({ exercise, isLoading }) => {
  const { name, type, intensity, metrics } = exercise;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTypeIcon = useGetTypeIcon();
  const Icon = getTypeIcon(type);

  return (
    <Card
      className="min-w-[200px] max-w-[400px] flex flex-col items-center justify-center"
      title="View details"
    >
      <CardHeader className="flex gap-3">
        {isLoading && <Skeleton className="rounded-md w-10 h-10" />}
        {!isLoading && <Icon className="w-10 h-10" />}
        <div className="flex flex-col flex-1 gap-2 items-start">
          <Skeleton isLoaded={!isLoading} className="w-3/5 h-4 rounded-lg">
            <p className="text-md truncate">{capitalize(name)}</p>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} className="w-4/5 h-4 rounded-lg">
            <p className="text-small text-default-500 truncate">{type}</p>
          </Skeleton>
        </div>
      </CardHeader>
      <Divider className="w-[90%]" />
      <CardBody className="flex flex-row flex-wrap w-full">
        <div className="w-1/2">
          <FieldIntensity
            intensityValue={intensity}
            context="SHOW"
            isLoading={isLoading}
          />
        </div>
        <div className="w-1/2">
          <div className="flex gap-2 flex-col">
            <h3 className="text-md leading-[1]">Metrics</h3>
            <Skeleton
              isLoaded={!isLoading}
              className="w-3/4 h-[24px] mt-1 rounded-lg"
            >
              <Chip className="rounded-lg">
                <p className="text-medium">{metrics}</p>
              </Chip>
            </Skeleton>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-end">
        <Button
          color="primary"
          startContent={
            !isLoading && <EyeOpenIconOutlined className="w-5 h-5" />
          }
          onPress={() => setIsModalOpen(true)}
          isLoading={isLoading}
        >
          Details
        </Button>
      </CardFooter>
      <ExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        exercise={exercise}
      />
    </Card>
  );
};

export default ExerciseCard;
