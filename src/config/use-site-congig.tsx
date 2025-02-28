import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";

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
  icon?: string;
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
            icon: "bx:bx-home",
          },
          {
            label: "Planner",
            action: () => navigate("/planner"),
            icon: "bx:bx-calendar",
          },
          {
            label: "Analytics",
            action: () => navigate("/analytics"),
            icon: "bx:bx-bar-chart-alt-2",
          },
          {
            label: "My exercises",
            action: () => navigate("/exercises"),
            icon: "bx:bx-dumbbell",
          },
        ],
      },
      settings: {
        label: "Settings",
        items: [
          {
            label: "Settings",
            action: () => navigate("/settings"),
            icon: "bx:bx-cog",
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
