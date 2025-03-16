import { ExerciseFormData, ExerciseType } from "@/types/exercise.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import FieldName from "./fields/field-name";
import FieldIntensity from "./fields/field-intensity";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
} from "@heroui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import FieldType from "./fields/field-type";
import FieldDuration from "./fields/field-duration";
import FieldMuscleGroups from "./fields/field-muscle-groups";
import FieldEquipment from "./fields/field-equipment";
import FieldDescription from "./fields/field-description";
import FieldInstructions from "./fields/field-instructions";
import useExercices from "@/requests/use-exercices";
import TrashIconOutlined from "../icons/TrashIconOutlined";
import EditIconOutlined from "../icons/EditIconOutlined";
import RestoreIcon from "../icons/RestoreIcon";

interface ExerciseFormProps {
  editDefaultValues?: ExerciseFormData;
  onSubmit: SubmitHandler<ExerciseFormData>;
  exercisesNames?: string[];
  context?: "SHOW" | "EDIT" | "CREATE";
  setContext?: Dispatch<SetStateAction<"SHOW" | "EDIT">>;
  setIsDeleteModalOpen?: (value: boolean) => void;
  exercise?: ExerciseType;
}

const ExerciseForm: FC<ExerciseFormProps> = ({
  editDefaultValues,
  onSubmit,
  exercisesNames = [],
  context,
  exercise,
  setContext = () => {},
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const defaultValues: ExerciseFormData = {
    description: "",
    duration: { time: 0, unit: "SECONDS" },
    equipment: [],
    intensity: editDefaultValues?.intensity ?? "LOW",
    instructions: [],
    metrics: [],
    muscleGroups: [],
    name: "",
    type: "STRENGTH",
  };

  const validationSchema = yup.object<ExerciseFormData>().shape({
    name: yup
      .string()
      .max(50, "The exercise name must be at most 50 characters long")
      // Should be unique
      .test("unique-name", "This exercise name is already in use", (value) => {
        // If the exercise is being edited, the name can be the same as the current one
        if (editDefaultValues?.name === value) {
          return true;
        }

        // If the exercise is being created, the name must be unique
        return !exercisesNames.includes(value ?? "");
      })
      .required(),
    type: yup.mixed<ExerciseFormData["type"]>().required(),
    muscleGroups: yup.array<ExerciseFormData["muscleGroups"]>().required(),
    equipment: yup.array<ExerciseFormData["equipment"]>().required(),
    metrics: yup.array<ExerciseFormData["metrics"]>().required(),
    duration: yup.object().shape({
      time: yup.number().required(),
      unit: yup.mixed<ExerciseFormData["duration"]["unit"]>().required(),
    }),
    intensity: yup.mixed<ExerciseFormData["intensity"]>().required(),
    instructions: yup.array<ExerciseFormData["instructions"]>().required(),
    description: yup
      .string()
      .max(500, "The exercise description must be at most 500 characters long"),
  });

  const { register, handleSubmit, formState, watch, control, setValue, reset } =
    useForm<ExerciseFormData>({
      mode: "onBlur",
      reValidateMode: "onChange",
      defaultValues: editDefaultValues ?? defaultValues,
      resolver: yupResolver(validationSchema),
    });

  const { deleteExerciseMutation } = useExercices(exercise?.userId ?? "");

  return (
    <>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex gap-4">
          <div className="w-1/2 pr-2">
            <FieldName
              context={context ?? "EDIT"}
              error={formState.errors.name}
              {...register("name")}
            />
          </div>
          <div className="w-1/2 pr-2 flex items-baseline justify-end">
            <Switch
              isSelected={context !== "SHOW"}
              onChange={() => {
                if (context === "SHOW") {
                  setContext("EDIT");
                } else {
                  setContext("SHOW");
                  reset();
                }
              }}
              startContent={<RestoreIcon />}
              endContent={<EditIconOutlined />}
            />
          </div>
        </div>
        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <FieldType
              context={context ?? "EDIT"}
              typeValue={watch("type")}
              control={control}
            />
          </div>
          <div className="w-1/2">
            <FieldIntensity
              context={context ?? "EDIT"}
              intensityValue={watch("intensity")}
              control={control}
            />
          </div>
        </div>
        <FieldDuration
          context={context ?? "EDIT"}
          durationValue={watch("duration")}
          control={control}
          setValue={setValue}
        />
        <div className="w-full">
          <FieldMuscleGroups
            context={context ?? "EDIT"}
            muscleGroupsValue={watch("muscleGroups")}
            control={control}
          />
        </div>
        <div className="w-full">
          <FieldEquipment
            equipmentValue={watch("equipment")}
            context={context ?? "EDIT"}
            control={control}
          />
        </div>
        <div className="w-full">
          <FieldDescription
            context={context ?? "EDIT"}
            error={formState.errors.description}
            {...register("description")}
          />
        </div>
        <div className="w-full">
          <FieldInstructions
            context={context ?? "EDIT"}
            instructionsValue={watch("instructions")}
            setValue={setValue}
            control={control}
          />
        </div>
        {(() => {
          if (context === "CREATE") {
            return (
              <Button
                color="primary"
                type="submit"
                className="w-full"
                isDisabled={formState.isSubmitting || !formState.isValid}
              >
                Add exercise
              </Button>
            );
          }

          if (context === "EDIT") {
            return (
              <div className="w-full flex gap-2 justify-end pb-2">
                <Button onPress={() => setContext("SHOW")} variant="bordered">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </div>
            );
          }
        })()}
        {context === "SHOW" && (
          <div className="w-full flex gap-2 justify-end pb-2">
            <Button
              onPress={() => setIsDeleteModalOpen(true)}
              color="danger"
              variant="bordered"
              startContent={<TrashIconOutlined width={16} />}
            >
              Delete
            </Button>
          </div>
        )}
      </form>
      {exercise?.id && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          placement="center"
        >
          <ModalContent>
            <ModalHeader title="Delete Exercise" />
            <ModalBody>
              <Alert color="warning" title="Are you sure?">
                <p className="text-sm text-default-500">
                  This action cannot be undone. This will permanently delete the
                  exercise.
                </p>
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button
                onPress={() => setIsDeleteModalOpen(false)}
                variant="bordered"
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  deleteExerciseMutation.mutate(exercise.id);
                  setIsDeleteModalOpen(false);
                }}
                color="danger"
                variant="bordered"
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ExerciseForm;
