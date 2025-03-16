import HomeIconOutlined from "@/components/icons/HomeIconOutlined";
import CalendarIcon from "@/components/icons/CalendarIcon";
import { auth } from "@/firebase";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import DumbbellIcon from "@/components/icons/DumbbellIcon";
import ChartIcon from "@/components/icons/ChartIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";

type NavItem = {
  label: string;
  action: () => void;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  icon?: ReactNode;
};

export type SiteConfig = {
  name: string;
  description: string;
  navItems: {
    navigation: {
      label: string;
      items: NavItem[];
    };
    settings: {
      label: string;
      items: NavItem[];
    };
  };
};

const useSiteConfig = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await auth.signOut();
      navigate("/auth/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  const siteConfig: SiteConfig = {
    name: "Training App",
    description:
      "A simple training app to help you stay on track with your fitness goals.",
    navItems: {
      navigation: {
        label: "Navigation",
        items: [
          {
            label: "Home",
            action: () => navigate("/home"),
            icon: <HomeIconOutlined className="w-4 h-4" />,
          },
          {
            label: "Planner",
            action: () => navigate("/planner"),
            icon: <CalendarIcon className="w-4 h-4" />,
          },
          {
            label: "Analytics",
            action: () => navigate("/analytics"),
            icon: <ChartIcon className="w-4 h-4" />,
          },
          {
            label: "My exercises",
            action: () => navigate("/exercises"),
            icon: <DumbbellIcon className="w-4 h-4" />,
          },
        ],
      },
      settings: {
        label: "Settings",
        items: [
          {
            label: "Settings",
            action: () => navigate("/settings"),
            icon: <SettingsIcon className="w-4 h-4" />,
          },
          {
            label: "Logout",
            action: () => logout(),
            color: "danger",
            icon: "bx:bx-log-out",
          },
        ],
      },
    },
  };

  return { siteConfig, logout };
};

export default useSiteConfig;
