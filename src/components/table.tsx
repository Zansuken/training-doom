import { FC } from "react";

import { daysOfWeek, DaysOfWeek } from "../constants";

import { useAppContext } from "@/context";

const Grid: FC = () => {
  const { currentDay } = useAppContext();

  const getHeaderBGColor = (day: DaysOfWeek) =>
    day === currentDay ? "bg-blue-500 text-white" : "";
  const getCurrentDayContainerBG = (day: DaysOfWeek) =>
    day === currentDay ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700";
  const getCurrentDayContainerPadding = (index: number, day: DaysOfWeek) => {
    if (index === 0 && day !== currentDay) {
      return "pl-1";
    } else if (index === 6 && day !== currentDay) {
      return "pr-1";
    } else {
      return "";
    }
  };
  const getCurrentDayItemBG = (day: DaysOfWeek) =>
    day === currentDay ? "bg-blue-100 text-white" : "bg-white";

  return (
    <div className="w-full h-full flex flex-col rounded-md overflow-hidden">
      <div className="grid grid-cols-7 bg-gray-200">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className={`${getHeaderBGColor(daysOfWeek[index])} flex items-center justify-center py-1`}
          >
            {daysOfWeek[index]}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 flex-1">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-center px-0.5 pb-0.5 ${getCurrentDayContainerPadding(index, daysOfWeek[index])} ${getCurrentDayContainerBG(daysOfWeek[index])})}`}
          >
            <div
              className={`h-full w-full flex px-2 py-1 ${getCurrentDayItemBG(daysOfWeek[index])}`}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 rounded-ee-md h-1.5 bg-gray-100" />
    </div>
  );
};

export default Grid;
