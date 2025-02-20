import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { daysOfWeek, DaysOfWeek } from "./constants";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

type PlannerViewType = "week" | "month";

interface ContextProps {
  // Define your context properties here
  example: string;
  setExample: React.Dispatch<React.SetStateAction<string>>;
  currentDay: DaysOfWeek;
  plannerView: PlannerViewType;
  updatePlannerView: (view: PlannerViewType) => void;
  isAppLoading: boolean;
  user: User | null;
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

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        navigate("/home");
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
        isAppLoading: loading,
        user,
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
