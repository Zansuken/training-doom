import { FC } from "react";
import { Tab, Tabs } from "@heroui/tabs";
import { Card } from "@heroui/react";

import Grid from "./table";

import { useAppContext } from "@/context";

const Planner: FC = () => {
  const { updatePlannerView, plannerView } = useAppContext();

  const handleSwitch = () =>
    updatePlannerView(plannerView === "week" ? "month" : "week");

  return (
    <Card className="flex flex-col h-full gap-4 p-2">
      <div className="flex justify-end gap-4">
        <Tabs selectedKey={plannerView} onSelectionChange={handleSwitch}>
          <Tab key="week" title="Week" />
          <Tab key="month" title="Month" />
        </Tabs>
      </div>
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <Grid />
      </div>
    </Card>
  );
};

export default Planner;
