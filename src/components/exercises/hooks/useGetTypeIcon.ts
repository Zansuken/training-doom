import { ExerciseTypeType } from "@/types/exercise.type";

export const useGetTypeIcon = () => {
  const getIcon = (type: ExerciseTypeType) => {
    switch (type) {
      case "STRENGTH":
        return "bx:bx-dumbbell";
      case "CARDIO":
        return "bx:bx-run";
      case "FLEXIBILITY":
        return "bx:bx-body";
      default:
        return "bx:bx-run";
    }
  };

  return getIcon;
};
