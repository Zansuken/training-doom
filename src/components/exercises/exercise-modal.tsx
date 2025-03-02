import { FC, useState } from "react";
import {
  ExerciseDurationType,
  ExerciseIntensityType,
  ExerciseType,
} from "@/types/exercise.type";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  addToast,
  SharedSelection,
} from "@heroui/react";
import FieldIntensity from "./fields/field-intensity";
import { Icon } from "@iconify/react";
import FieldDescription from "./fields/field-description";
import FieldName from "./fields/field-name";
import FieldDuration from "./fields/field-duration";
import FieldType from "./fields/field-type";
import FieldMuscleGroup from "./fields/field-muscle-groups";
import FieldEquipment from "./fields/field-equipment";

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: ExerciseType;
}

type KeyType = keyof ExerciseType | keyof ExerciseType["duration"];
type ValueType = ExerciseIntensityType | string | number | SharedSelection;

const ExerciseModal: FC<ExerciseModalProps> = ({
  isOpen,
  onClose,
  exercise,
}) => {
  const [context, setContext] = useState<"SHOW" | "EDIT">("SHOW");
  const [formValues, setFormValues] = useState<ExerciseType>({
    ...exercise,
    muscleGroups: new Set(exercise.muscleGroups),
    equipment: new Set(exercise.equipment),
  });

  const handleFormChange = (key: KeyType, value: ValueType) => {
    setFormValues((prev) => {
      switch (key) {
        case "time":
          return {
            ...prev,
            duration: { ...prev.duration, [key]: Number(value) },
          };
        case "unit":
          return {
            ...prev,
            duration: {
              ...prev.duration,
              [key]: value as ExerciseDurationType["unit"],
            },
          };
        default:
          return { ...prev, [key]: value };
      }
    });
  };

  const onCancel = () => {
    setContext("SHOW");
    setFormValues(exercise);
  };

  const onSubmit = () => {
    setContext("SHOW");
    addToast({
      title: "Exercise updated",
      description: "The exercise has been updated successfully",
      color: "success",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader title={exercise.name} />
        <ModalBody>
          <div className="w-full flex gap-4">
            <div className="w-1/2">
              <FieldName
                name={formValues.name}
                context={context}
                onChange={(e) => handleFormChange("name", e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <FieldIntensity
                intensity={formValues.intensity}
                context={context}
                onChange={(e) =>
                  handleFormChange(
                    "intensity",
                    e.target.value as ExerciseIntensityType
                  )
                }
              />
            </div>
          </div>
          <div className="w-full flex gap-4">
            <FieldType
              type={formValues.type}
              context={context}
              onChange={(e) => handleFormChange("type", e.target.value)}
            />
          </div>
          <div className="w-full flex gap-4">
            <FieldDuration
              context={context}
              duration={formValues.duration}
              onChangeDuration={(e) => handleFormChange("time", e.target.value)}
              onChangeUnit={(e) => handleFormChange("unit", e.target.value)}
            />
          </div>
          <div className="w-full flex gap-4">
            <FieldMuscleGroup
              muscleGroups={formValues.muscleGroups}
              context={context}
              onChange={(keys) => handleFormChange("muscleGroups", keys)}
            />
          </div>
          <div className="w-full">
            <FieldEquipment
              equipment={formValues.equipment}
              context={context}
              onChange={(keys) => handleFormChange("equipment", keys)}
            />
          </div>
          <div className="w-full">
            <FieldDescription
              context={context}
              description={formValues.description ?? ""}
              onChange={(e) => handleFormChange("description", e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          {(() => {
            if (context === "EDIT") {
              return (
                <>
                  <Button onPress={onCancel} variant="bordered">
                    Cancel
                  </Button>
                  <Button onPress={onSubmit} color="primary">
                    Save
                  </Button>
                </>
              );
            }

            return (
              <>
                <Button
                  onPress={() => console.log("delete")}
                  color="danger"
                  variant="bordered"
                  startContent={<Icon icon="bx:bx-trash" width={16} />}
                >
                  Delete
                </Button>
                <Button
                  onPress={() => setContext("EDIT")}
                  color="primary"
                  startContent={<Icon icon="bx:bx-edit" width={16} />}
                >
                  Edit
                </Button>
              </>
            );
          })()}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ExerciseModal;
