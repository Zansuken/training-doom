import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  FC,
  SVGProps,
} from "react";

import { daysOfWeek, DaysOfWeek, defaultProfileValues } from "./constants";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { createUser, getUser } from "./functions/user";
import { UserDetailsType } from "@/types/user.type";
import { useLocation, useNavigate } from "react-router-dom";
import { addToast } from "@heroui/react";
import PersonEditIcon from "@/components/icons/PersonEditIcon";

type PlannerViewType = "week" | "month";

type NotificationType = {
  key: string;
  onPress: () => void;
  color: "danger" | "default" | "primary" | "secondary" | "success" | "warning";
  Icon: FC<SVGProps<SVGSVGElement>>;
  label: string;
};

interface ContextProps {
  currentDay: DaysOfWeek;
  plannerView: PlannerViewType;
  updatePlannerView: (view: PlannerViewType) => void;
  isAppLoading: boolean;
  user: User | null;
  userDisplayName: string;
  userDetails: UserDetailsType | null;
  refreshUserDetails: () => Promise<void>;
  notifications: NotificationType[];
  removeNotification: (key: string) => void;
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
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const addNotification = (notification: NotificationType) => {
    // if notification already exists, don't add it again
    if (notifications.some((n) => n.key === notification.key)) return;
    setNotifications([...notifications, notification]);
  };

  const removeNotification = (key: string) => {
    setNotifications(notifications.filter((n) => n.key !== key));
  };

  const isProfileIncomplete = (data: UserDetailsType) =>
    Object.keys(data).some(
      (key) =>
        data[key as keyof UserDetailsType] ===
        defaultProfileValues[key as keyof UserDetailsType]
    );

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser);
          const data = await getUser(currentUser.uid);

          const notification: NotificationType = {
            key: "incomplete-profile",
            onPress: () => navigate("/settings#profile"),
            color: "primary",
            Icon: PersonEditIcon,
            label: "Complete your profile",
          };

          if (data && isProfileIncomplete(data as UserDetailsType)) {
            addNotification(notification);
            setUserDetails(defaultProfileValues);
          }

          if (
            data &&
            Object.keys(data).every(
              (key) =>
                data[key] !== defaultProfileValues[key as keyof UserDetailsType]
            )
          ) {
            setUserDetails(data as UserDetailsType);
          }

          if (!data) {
            addNotification(notification);
            await createUser(currentUser.uid, defaultProfileValues);
            setUserDetails(defaultProfileValues);
          }
          if (
            (data && location.pathname === "/auth/sign-in") ||
            location.pathname === "/auth/sign-up"
          )
            navigate("/home");
        } else {
          setUser(null);
          setUserDetails(null);
        }
      } catch (error) {
        console.error("Error getting user", error);
        addToast({
          title: "Error getting user",
          color: "danger",
        });
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const refreshUserDetails = async () => {
    if (user) {
      const data = await getUser(user.uid);
      setUserDetails(data as UserDetailsType);

      if (!isProfileIncomplete(data as UserDetailsType)) {
        removeNotification("incomplete-profile");
      }
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
        notifications,
        removeNotification,
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
