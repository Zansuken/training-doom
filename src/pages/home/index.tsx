import { FC } from "react";
import DefaultLayout from "@/layouts/default";
import PlannerCard from "./PlannerCard";
import AnalyticsCard from "./AnalyticsCard";
import { Divider } from "@heroui/react";

const IndexPage: FC = () => {
  document.title = "Home";

  return (
    <DefaultLayout>
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <Divider className="mt-4" />
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        <PlannerCard />
        <AnalyticsCard />
      </div>
    </DefaultLayout>
  );
};

export default IndexPage;
