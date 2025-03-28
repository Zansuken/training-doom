import { ExerciseFormData, ExerciseType } from "@/types/exercise.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import FieldName from "./fields/field-name";
import FieldIntensity from "./fields/field-intensity";
import {
  addToast,
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
} from "@heroui/react";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import FieldType from "./fields/field-type";
import FieldMuscleGroups from "./fields/field-muscle-groups";
import FieldEquipment from "./fields/field-equipment";
import FieldDescription from "./fields/field-description";
import FieldInstructions from "./fields/field-instructions";
import { deleteExercise, getUserExercisesNames } from "@/functions/exercices";
import TrashIconOutlined from "../icons/TrashIconOutlined";
import EditIconOutlined from "../icons/EditIconOutlined";
import RestoreIcon from "../icons/RestoreIcon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "@/context";
import Loading from "@/pages/loading";
import FieldMetrics from "./fields/field-metrics";

interface ExerciseFormProps {
  editDefaultValues?: ExerciseFormData;
  onSubmit: SubmitHandler<ExerciseFormData>;
  context?: "SHOW" | "EDIT" | "CREATE";
  setContext?: Dispatch<SetStateAction<"SHOW" | "EDIT">>;
  setIsDeleteModalOpen?: (value: boolean) => void;
  exercise?: ExerciseType;
}

const ExerciseForm: FC<ExerciseFormProps> = ({
  editDefaultValues,
  onSubmit,
  context,
  exercise,
  setContext = () => {},
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { user } = useAppContext();

  const getExercisesNamesQuery = useQuery({
    queryKey: ["exercisesNames"],
    queryFn: () => getUserExercisesNames(user?.uid || ""),
  });

  const exercisesNames = getExercisesNamesQuery.data ?? [];

  const defaultValues: ExerciseFormData = editDefaultValues ?? {
    description: "",
    equipment: [],
    intensity: "LOW",
    instructions: [],
    metrics: "TIME",
    muscleGroups: [],
    name: "",
    type: "STRENGTH",
  };

  const instructionsRef = useRef(defaultValues.instructions);

  const submit: SubmitHandler<ExerciseFormData> = (data) => {
    onSubmit(data);
    instructionsRef.current = data.instructions;
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
    metrics: yup.mixed<ExerciseFormData["metrics"]>().required(),
    intensity: yup.mixed<ExerciseFormData["intensity"]>().required(),
    instructions: yup
      .array<ExerciseFormData["instructions"]>()
      .test(
        "no-empty-instructions",
        "One or more instructions are empty",
        (value = []) => {
          const instructionsValid = value.every(
            (instruction) => instruction.description.length > 0
          );

          return instructionsValid;
        }
      )
      .required(),
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

  const onCancel = () => {
    setContext("SHOW");
    reset(defaultValues);
  };

  const queryClient = useQueryClient();

  const deleteExerciseMutation = useMutation({
    mutationFn: (exerciseId: string) => deleteExercise(exerciseId),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      await queryClient.refetchQueries({ queryKey: ["exercises"] });
      addToast({
        title: "Exercise deleted",
        color: "success",
      });
    },
    onError: (error) => {
      console.error("Error deleting exercise", error);
      addToast({
        title: "Error deleting exercise",
        color: "danger",
      });
    },
  });

  if (getExercisesNamesQuery.isLoading) {
    return <Loading withoutLayout />;
  }

  return (
    <>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <FieldName
              context={context ?? "EDIT"}
              error={formState.errors.name}
              {...register("name")}
            />
          </div>
          <div className="w-1/2">
            <FieldIntensity
              context={context ?? "EDIT"}
              intensityValue={watch("intensity")}
              control={control}
              isLoading={getExercisesNamesQuery.isLoading}
            />
          </div>
          <div className="absolute bottom-4 left-4">
            {context !== "CREATE" && (
              <Switch
                isSelected={context !== "SHOW"}
                onChange={() => {
                  if (context === "SHOW") {
                    setContext("EDIT");
                  } else {
                    setContext("SHOW");
                    reset(defaultValues);
                  }
                }}
                startContent={<RestoreIcon />}
                endContent={<EditIconOutlined />}
              />
            )}
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
            <FieldMetrics
              context={context ?? "EDIT"}
              typeValue={watch("metrics")}
              control={control}
            />
          </div>
        </div>
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
            instructionsRef={instructionsRef}
            setValue={setValue}
            control={control}
            error={formState.errors.instructions}
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
                <Button onPress={onCancel} variant="bordered">
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
