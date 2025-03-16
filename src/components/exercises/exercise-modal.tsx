import { FC, useState } from "react";
import { ExerciseFormData, ExerciseType } from "@/types/exercise.type";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";
import ExerciseForm from "./exercice-form";
import { SubmitHandler } from "react-hook-form";
import useExercices from "@/requests/use-exercices";

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: ExerciseType;
}

const ExerciseModal: FC<ExerciseModalProps> = ({
  isOpen,
  onClose,
  exercise,
}) => {
  const [context, setContext] = useState<"SHOW" | "EDIT">("SHOW");

  const formValues: ExerciseFormData = {
    description: exercise.description ?? "",
    equipment: exercise.equipment,
    intensity: exercise.intensity,
    instructions: exercise.instructions,
    metrics: exercise.metrics,
    muscleGroups: exercise.muscleGroups,
    name: exercise.name,
    type: exercise.type,
  };

  const { updateExerciseMutation } = useExercices(exercise.userId);

  const onSubmit: SubmitHandler<ExerciseFormData> = (data) => {
    if (context === "SHOW") return;

    updateExerciseMutation.mutate(
      {
        id: exercise.id,
        userId: exercise.userId,
        exercise: data,
      },
      {
        onSuccess: () => {
          setContext("SHOW");
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      placement="center"
      hideCloseButton
      className="relative"
    >
      <ModalContent>
        <ModalHeader title={exercise.name} />
        <ModalBody className="gap-4">
          <ExerciseForm
            editDefaultValues={formValues}
            onSubmit={onSubmit}
            context={context}
            exercise={exercise}
            setContext={setContext}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExerciseModal;
