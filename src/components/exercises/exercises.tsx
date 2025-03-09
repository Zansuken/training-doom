import { FC } from "react";
import { ExerciseType } from "@/types/exercise.type";
import ExerciseCard from "./exercise-card";

interface ExercisesProps {
  exercises: ExerciseType[];
}

const Exercises: FC<ExercisesProps> = ({ exercises }) => {
  const exercisesNames = exercises.map((exercise) => exercise.name);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          exercisesNames={exercisesNames}
        />
      ))}
    </div>
  );
};

export default Exercises;
