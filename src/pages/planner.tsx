import Planner from "@/components/planner";
import DefaultLayout from "@/layouts/default";

export default function PlannerPage() {
  document.title = "Planner";
  return (
    <DefaultLayout>
      <Planner />
    </DefaultLayout>
  );
}
