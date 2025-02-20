import Planner from "@/components/planner";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  document.title = "Planner";
  return (
    <DefaultLayout>
      <Planner />
    </DefaultLayout>
  );
}
