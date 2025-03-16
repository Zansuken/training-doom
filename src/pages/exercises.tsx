import { FC, useState } from "react";
import Exercises from "@/components/exercises/exercises";
import DefaultLayout from "@/layouts/default";
import { useAppContext } from "@/context";
import { Tab, Tabs } from "@heroui/tabs";
import ExerciseForm from "@/components/exercises/exercice-form";
import { Key } from "@react-types/shared";
import AddIconOutlined from "@/components/icons/AddIconOutlined";
import DumbbellIcon from "@/components/icons/DumbbellIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExercise } from "@/requests/use-exercices";
import { addToast } from "@heroui/react";
import { ExerciseFormData } from "@/types/exercise.type";

const ExercisesPage: FC = () => {
  document.title = "My exercises";

  const { user } = useAppContext();

  const queryClient = useQueryClient();

  const [selectedTab, setSelectedTab] = useState("exercises");

  const createExerciseMutation = useMutation({
    mutationFn: (exercise: ExerciseFormData) =>
      createExercise(user?.uid || "", exercise),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      await queryClient.refetchQueries({ queryKey: ["exercises"] });
      setSelectedTab("exercises");
      addToast({
        title: "Exercise created",
        color: "success",
      });
    },
    onError: (error) => {
      console.error("Error creating exercise", error);
      addToast({
        title: "Error creating exercise",
        color: "danger",
      });
    },
  });

  return (
    <DefaultLayout>
      <Tabs
        aria-label="Options"
        color="primary"
        variant="bordered"
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab as (key: Key) => void}
        classNames={{
          base: "pb-4",
        }}
      >
        <Tab
          key="exercises"
          title={
            <div className="flex items-center space-x-2">
              <DumbbellIcon className="ml-3 w-6 h-6" />
              <span>My exercises</span>
            </div>
          }
          className="pl-0"
        >
          <Exercises
            redirectToAddExercise={() => setSelectedTab("add-exercise")}
          />
        </Tab>
        <Tab
          key="add-exercise"
          title={
            <div className="flex items-center space-x-2">
              <AddIconOutlined className="ml-3 w-6 h-6" />
              <span>Add exercise</span>
            </div>
          }
          className="pl-0"
        >
          <ExerciseForm
            onSubmit={(data) => createExerciseMutation.mutate(data)}
            context="CREATE"
          />
        </Tab>
      </Tabs>
    </DefaultLayout>
  );
};

export default ExercisesPage;
