import { FC } from "react";
import HomeCard from "@/components/home-card";
import { Listbox, ListboxItem, ListboxSection } from "@heroui/react";
import { Icon } from "@iconify/react";

const PlannerCard: FC = () => {
  return (
    <HomeCard
      title="Planner"
      subtitle="Daily session"
      icon="bx:bx-calendar"
      link="/planner"
    >
      <Listbox
        variant="faded"
        disabledKeys={["duration", "push-ups", "cardio"]}
      >
        <ListboxSection title="Duration">
          <ListboxItem
            key="duration"
            isReadOnly
            startContent={<Icon icon="bx:bx-time" />}
          >
            1h
          </ListboxItem>
        </ListboxSection>
        <ListboxSection title="Exercises">
          <ListboxItem
            key="push-ups"
            isReadOnly
            startContent={<Icon icon="bx:bx-dumbbell" />}
          >
            Push-ups
          </ListboxItem>
          <ListboxItem
            key="cardio"
            isReadOnly
            startContent={<Icon icon="mdi:run-fast" />}
          >
            Cardio
          </ListboxItem>
        </ListboxSection>
      </Listbox>
    </HomeCard>
  );
};

export default PlannerCard;
