export type ExerciseTypeType = "STRENGTH" | "CARDIO" | "FLEXIBILITY";
export type ExerciseIntensityType = "LOW" | "MEDIUM" | "HIGH";
export type ExerciseDurationType = {
  time: number;
  unit: "MINUTES" | "SECONDS";
};
export type ExerciseMuscleGroupType =
  | "CHEST"
  | "BACK"
  | "LEGS"
  | "ARMS"
  | "SHOULDERS"
  | "CORE";
export type ExerciseEquipmentType =
  | "BARBELL"
  | "DUMBBELL"
  | "KETTLEBELL"
  | "RESISTANCE_BAND"
  | "BODYWEIGHT";
export type ExerciseMetricType = "WEIGHT" | "REPS" | "DISTANCE" | "TIME";

export type ExerciseType = {
  id: string;
  userId: string;
  name: string;
  type: ExerciseTypeType;
  muscleGroups: ExerciseMuscleGroupType[] | Set<ExerciseMuscleGroupType>;
  equipment: ExerciseEquipmentType[] | Set<ExerciseEquipmentType>;
  metrics: ExerciseMetricType[]; // TODO: rethink this
  duration: ExerciseDurationType;
  intensity: ExerciseIntensityType;
  instructions: string[]; // TODO: add to form
  description?: string;
};
