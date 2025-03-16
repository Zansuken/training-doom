import AgilityIcon from "@/components/icons/AgilityIcon";
import DumbbellIcon from "@/components/icons/DumbbellIcon";
import RunIcon from "@/components/icons/RunIcon";
import { ExerciseTypeType } from "@/types/exercise.type";

export const useGetTypeIcon = () => {
  const getIcon = (type: ExerciseTypeType) => {
    switch (type) {
      case "STRENGTH":
        return DumbbellIcon;
      case "CARDIO":
        return RunIcon;
      case "FLEXIBILITY":
        return AgilityIcon;
      default:
        return RunIcon;
    }
  };

  return (type: ExerciseTypeType) => getIcon(type);
};
