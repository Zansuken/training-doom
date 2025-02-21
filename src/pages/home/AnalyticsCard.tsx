import { FC } from "react";
import HomeCard from "@/components/home-card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { daysOfWeek } from "@/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = daysOfWeek.map((day) => day.slice(0, 3) + ".");

export const data = {
  labels,
  datasets: [
    {
      label: "Weight (kg)",
      data: [70, 70.5, 70.2, 69.8, 69.5, 69.3, 69.1, 68.9, 68.8, 68.7],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const AnalyticsCard: FC = () => {
  return (
    <HomeCard
      title="Analytics"
      subtitle="Track your progress"
      icon="bx:bx-line-chart"
      link="/analytics"
    >
      <div className="h-full">
        <Line data={data} options={options} height={184} width={326} />
      </div>
    </HomeCard>
  );
};

export default AnalyticsCard;
