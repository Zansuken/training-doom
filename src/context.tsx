import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { daysOfWeek, DaysOfWeek } from "./constants";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getUser } from "./functions/user";
import { UserDetailsType } from "./types";
import { useLocation, useNavigate } from "react-router-dom";

type PlannerViewType = "week" | "month";

interface ContextProps {
  currentDay: DaysOfWeek;
  plannerView: PlannerViewType;
  updatePlannerView: (view: PlannerViewType) => void;
  isAppLoading: boolean;
  user: User | null;
  userDisplayName: string;
  userDetails: UserDetailsType | null;
  refreshUserDetails: () => Promise<void>;
}

const AppContext = createContext<ContextProps | undefined>(undefined);

const storedPlannerView = localStorage.getItem("plannerView");

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [plannerView, setPlannerView] = useState<PlannerViewType>(
    // eslint-disable-next-line prettier/prettier
    storedPlannerView === "week" ? "week" : "month"
  );

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        getUser(currentUser.uid).then((data) => {
          setUserDetails(data as UserDetailsType);
          if (
            (data && location.pathname === "/auth/sign-in") ||
            location.pathname === "/auth/sign-up"
          )
            navigate("/home");
        });
      } else {
        setUser(null);
        setUserDetails(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshUserDetails = async () => {
    if (user) {
      const data = await getUser(user.uid);
      setUserDetails(data as UserDetailsType);
    }
  };

  const currentDayOfWeek = new Date().getDay() - 1;

  const updatePlannerView = (view: PlannerViewType) => {
    localStorage.setItem("plannerView", view);
    setPlannerView(view);
  };

  return (
    <AppContext.Provider
      value={{
        currentDay: daysOfWeek[currentDayOfWeek],
        plannerView,
        updatePlannerView,
        isAppLoading: loading,
        user,
        userDetails,
        userDisplayName: user?.displayName || "",
        refreshUserDetails,
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
