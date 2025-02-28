import { ExerciseType } from "@/types/exercise.type";
import { FC } from "react";

interface ExercisesProps {
  exercises: ExerciseType[];
}

const Exercises: FC<ExercisesProps> = ({ exercises }) => {
  return (
    <div>
      {exercises.map((exercise) => (
        <div key={exercise.id}>
          <h2>{exercise.name}</h2>
          <p>{exercise.type}</p>
          <p>{exercise.muscleGroups.join(", ")}</p>
          <p>{exercise.equipment.join(", ")}</p>
          <p>{exercise.metrics.join(", ")}</p>
          <p>{exercise.duration}</p>
          <p>{exercise.intensity}</p>
          <p>{exercise.instructions.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default Exercises;
