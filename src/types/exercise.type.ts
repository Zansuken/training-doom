export type ExerciseType = {
  id: string;
  userId: string;
  name: string;
  type: "STRENGTH" | "CARDIO" | "FLEXIBILITY";
  muscleGroups: string[];
  equipment: string[];
  metrics: string[];
  duration: string;
  intensity: string;
  instructions: string[];
};
