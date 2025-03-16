import { FC, useState } from "react";
import Exercises from "@/components/exercises/exercises";
import DefaultLayout from "@/layouts/default";
import { useAppContext } from "@/context";
import Loading from "./loading";
import { Tab, Tabs } from "@heroui/tabs";
import useExercices from "@/requests/use-exercices";
import ExerciseForm from "@/components/exercises/exercice-form";
import { Key } from "@react-types/shared";
import { Alert, Button } from "@heroui/react";
import AddIconOutlined from "@/components/icons/AddIconOutlined";
import DumbbellIcon from "@/components/icons/DumbbellIcon";

const ExercisesPage: FC = () => {
  document.title = "My exercises";

  const { user } = useAppContext();
  const { getExercisesQuery, createExerciseMutation } = useExercices(
    user?.uid || ""
  );

  const [selectedTab, setSelectedTab] = useState("exercises");

  if (getExercisesQuery.isLoading) {
    return <Loading />;
  }

  const exercisesNames = getExercisesQuery.data?.map(
    (exercise) => exercise.name
  );

  return (
    <DefaultLayout>
      <Tabs
        aria-label="Options"
        color="primary"
        variant="bordered"
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab as (key: Key) => void}
      >
        <Tab
          key="exercises"
          title={
            <div className="flex items-center space-x-2">
              <DumbbellIcon className="w-6 h-6" />
              <span>My exercises</span>
            </div>
          }
        >
          {(() => {
            if (getExercisesQuery.data && getExercisesQuery.data.length > 0) {
              return <Exercises exercises={getExercisesQuery.data} />;
            }

            return (
              <div className="flex-grow flex">
                <Alert
                  color="primary"
                  title="No exercises found"
                  endContent={
                    <Button
                      color="primary"
                      onPress={() => setSelectedTab("add-exercise")}
                      startContent={<AddIconOutlined width={24} />}
                    >
                      Add exercise
                    </Button>
                  }
                >
                  <p className="text-default-500">
                    You haven't added any exercise yet. Click on the Add
                    exercise button to create one.
                  </p>
                </Alert>
              </div>
            );
          })()}
        </Tab>
        <Tab
          key="add-exercise"
          title={
            <div className="flex items-center space-x-2">
              <AddIconOutlined className="w-6 h-6" />
              <span>Add exercise</span>
            </div>
          }
        >
          <ExerciseForm
            onSubmit={(data) =>
              createExerciseMutation.mutate(data, {
                onSuccess: () => {
                  getExercisesQuery.refetch();
                  setSelectedTab("exercises");
                },
              })
            }
            exercisesNames={exercisesNames ?? []}
            context="CREATE"
          />
        </Tab>
      </Tabs>
    </DefaultLayout>
  );
};

export default ExercisesPage;
