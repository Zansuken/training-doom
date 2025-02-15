import React, { createContext, useContext, useState, ReactNode } from "react";

import { daysOfWeek, DaysOfWeek } from "./constants";

type PlannerViewType = "week" | "month";

interface ContextProps {
  // Define your context properties here
  example: string;
  setExample: React.Dispatch<React.SetStateAction<string>>;
  currentDay: DaysOfWeek;
  plannerView: PlannerViewType;
  updatePlannerView: (view: PlannerViewType) => void;
}

const AppContext = createContext<ContextProps | undefined>(undefined);

const storedPlannerView = localStorage.getItem("plannerView");

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [example, setExample] = useState<string>("default value");
  const [plannerView, setPlannerView] = useState<PlannerViewType>(
    // eslint-disable-next-line prettier/prettier
    storedPlannerView === "week" ? "week" : "month"
  );

  const currentDayOfWeek = new Date().getDay() - 1;

  const updatePlannerView = (view: PlannerViewType) => {
    localStorage.setItem("plannerView", view);
    setPlannerView(view);
  };

  return (
    <AppContext.Provider
      value={{
        example,
        setExample,
        currentDay: daysOfWeek[currentDayOfWeek],
        plannerView,
        updatePlannerView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }

  return context;
};
