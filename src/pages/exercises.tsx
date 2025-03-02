import { FC, useEffect, useState } from "react";
import Exercises from "@/components/exercises/exercises";
import DefaultLayout from "@/layouts/default";
import { useAppContext } from "@/context";
import { getUserExercises } from "@/functions/exercise";
import { ExerciseType } from "@/types/exercise.type";
import Loading from "./loading";
import { Tab, Tabs } from "@heroui/tabs";
import { Icon } from "@iconify/react";

const ExercisesPage: FC = () => {
  document.title = "My exercises";

  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState<ExerciseType[]>([]);

  const { user } = useAppContext();

  useEffect(() => {
    if (!user) {
      return;
    }
    getUserExercises(user.uid).then((exercises) => {
      if (exercises) {
        setExercises(exercises);
      }
      setLoading(false);
    });
  }, [user?.uid]);

  if (!user || loading) {
    return <Loading />;
  }

  return (
    <DefaultLayout>
      <Tabs aria-label="Options" color="primary" variant="bordered">
        <Tab
          key="exercises"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="bx:bx-dumbbell" className="w-6 h-6" />
              <span>My exercises</span>
            </div>
          }
        >
          <Exercises exercises={exercises} />
        </Tab>
        <Tab
          key="add-exercise"
          title={
            <div className="flex items-center space-x-2">
              <Icon icon="bx:bx-plus" className="w-6 h-6" />
              <span>Add exercise</span>
            </div>
          }
        >
          <div>Add exercise form</div>
        </Tab>
      </Tabs>
    </DefaultLayout>
  );
};

export default ExercisesPage;
