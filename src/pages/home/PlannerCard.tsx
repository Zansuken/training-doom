import { FC } from "react";
import HomeCard from "@/components/home-card";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/react";
import DumbbellIcon from "@/components/icons/DumbbellIcon";
import CalendarIcon from "@/components/icons/CalendarIcon";
import RunIcon from "@/components/icons/RunIcon";
import TimeIconOutlined from "@/components/icons/TimeIconOutlined";

const PlannerCard: FC = () => {
  return (
    <HomeCard
      title="Planner"
      subtitle="Daily session"
      icon={<CalendarIcon className="w-11 h-11" />}
      link="/planner"
    >
      <Listbox
        variant="faded"
        disabledKeys={["duration", "push-ups", "cardio"]}
        aria-label="Planner"
      >
        <ListboxSection title="Duration">
          <ListboxItem
            key="duration"
            isReadOnly
            startContent={<TimeIconOutlined />}
          >
            1h
          </ListboxItem>
        </ListboxSection>
        <ListboxSection title="Exercises">
          <ListboxItem
            key="push-ups"
            isReadOnly
            startContent={<DumbbellIcon />}
          >
            Push-ups
          </ListboxItem>
          <ListboxItem key="cardio" isReadOnly startContent={<RunIcon />}>
            Cardio
          </ListboxItem>
        </ListboxSection>
      </Listbox>
    </HomeCard>
  );
};

export default PlannerCard;
