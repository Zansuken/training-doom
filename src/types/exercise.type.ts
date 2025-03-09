export type ExerciseTypeType = "STRENGTH" | "CARDIO" | "FLEXIBILITY";
export type ExerciseIntensityType = "LOW" | "MEDIUM" | "HIGH";
export type ExerciseDurationType = {
  time: number;
  unit: "MINUTES" | "SECONDS" | "HOURS";
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
export type ExerciseInstructionType = {
  id: string;
  description: string;
};
export type ExerciseInstructionsType = ExerciseInstructionType[];

export type ExerciseType = {
  id: string;
  userId: string;
  name: string;
  type: ExerciseTypeType;
  muscleGroups: ExerciseMuscleGroupType[];
  equipment: ExerciseEquipmentType[];
  metrics: ExerciseMetricType[]; // TODO: rethink this
  duration: ExerciseDurationType;
  intensity: ExerciseIntensityType;
  instructions: ExerciseInstructionsType;
  description?: string;
};

export interface ExerciseFormData {
  name: string;
  type: ExerciseTypeType;
  muscleGroups: ExerciseMuscleGroupType[];
  equipment: ExerciseEquipmentType[];
  metrics: ExerciseMetricType[]; // TODO: rethink this
  duration: ExerciseDurationType;
  intensity: ExerciseIntensityType;
  instructions: ExerciseInstructionsType;
  description?: string;
}
