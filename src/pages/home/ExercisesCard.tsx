import HomeCard from "@/components/home-card";
import DumbbellIcon from "@/components/icons/DumbbellIcon";

const ExercisesCard = () => {
  return (
    <HomeCard
      title="Exercises"
      subtitle="Manage your exercises"
      icon={<DumbbellIcon className="w-11 h-11" />}
      link="/exercises"
    >
      <p>Exercises</p>
    </HomeCard>
  );
};

export default ExercisesCard;
