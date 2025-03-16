import { FC } from "react";
import ExerciseCard from "./exercise-card";
import { useAppContext } from "@/context";
import { getUserExercises } from "@/functions/exercices";
import Loading from "@/pages/loading";
import { Alert, Button } from "@heroui/react";
import AddIconOutlined from "../icons/AddIconOutlined";
import { useQuery } from "@tanstack/react-query";

interface ExercisesProps {
  redirectToAddExercise: () => void;
}

const Exercises: FC<ExercisesProps> = ({ redirectToAddExercise }) => {
  const { user } = useAppContext();

  const getExercisesQuery = useQuery({
    queryKey: ["exercises", user?.uid], // Include user.uid in queryKey
    queryFn: () => getUserExercises(user?.uid || ""),
    enabled: Boolean(user?.uid), // Only run query when user.uid exists
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const exercises = getExercisesQuery.data ?? [];

  // Only show loading on initial load, not on refetch
  if (getExercisesQuery.isLoading) {
    return <Loading withoutLayout />;
  }

  // Show exercises with loading indicator during refetch
  if (getExercisesQuery.data && getExercisesQuery.data.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            isLoading={getExercisesQuery.isRefetching}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex-grow flex">
      <Alert
        color="primary"
        title="No exercises found"
        endContent={
          <Button
            color="primary"
            onPress={redirectToAddExercise}
            startContent={<AddIconOutlined className="w-6 h-6" />}
          >
            Add exercise
          </Button>
        }
      >
        <p className="text-default-500">
          You haven't added any exercise yet. Click on the Add exercise button
          to create one.
        </p>
      </Alert>
    </div>
  );
};

export default Exercises;
