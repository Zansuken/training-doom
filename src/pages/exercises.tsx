import { FC, useEffect, useState } from "react";
import Exercises from "@/components/exercises";
import DefaultLayout from "@/layouts/default";
import { useAppContext } from "@/context";
import { getUserExercises } from "@/functions/exercise";
import { ExerciseType } from "@/types/exercise.type";
import Loading from "./loading";

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
      <Exercises exercises={exercises} />
    </DefaultLayout>
  );
};

export default ExercisesPage;
