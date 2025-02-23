import {
  Switch,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Badge,
} from "@heroui/react";
import { Navbar as HeroUINavbar } from "@heroui/navbar";
import { Icon } from "@iconify/react";

import useSiteConfig from "@/config/use-site-congig";
import { useAppContext } from "@/context";
import { useTheme } from "@/hooks/use-theme";
import { useNavigate } from "react-router-dom";

const getUIDColor = (uid: string) => {
  const colors = [
    "#FFC107",
    "#673AB7",
    "#3F51B5",
    "#009688",
    "#FF5722",
    "#FF9800",
    "#795548",
    "#607D8B",
    "#9C27B0",
    "#2196F3",
    "#4CAF50",
    "#FFEB3B",
  ];
  const index = uid.charCodeAt(0) % colors.length;
  return colors[index];
};

type NotificationType = {
  key: string;
  onPress: () => void;
  color: "danger" | "default" | "primary" | "secondary" | "success" | "warning";
  icon: string;
  label: string;
};

export const Navbar = () => {
  const { user, userDetails, isAppLoading, userDisplayName } = useAppContext();
  const { isDark, toggleTheme } = useTheme("dark");
  const { siteConfig } = useSiteConfig();
  const navigate = useNavigate();

  const isProfileIncomplete =
    !userDetails || Object.values(userDetails || {}).some((value) => !value);

  const notifications: NotificationType[] = [];

  if (
    !isAppLoading &&
    userDetails &&
    isProfileIncomplete &&
    !notifications.find((n) => n.key === "profile")
  ) {
    notifications.push({
      key: "profile",
      onPress: () => navigate("/settings#profile"),
      color: "primary",
      icon: "mdi:person-edit",
      label: "Complete your profile",
    });
  }

  return (
    <HeroUINavbar
      maxWidth="full"
      position="sticky"
      className="flex items-center"
    >
      <Button
        color="primary"
        isIconOnly
        variant="shadow"
        onPress={() => navigate("/home")}
      >
        <Icon icon="bx:bx-home" className="text-xl" />
      </Button>
      <div className="flex items-center gap-2">
        {user && (
          <div
            style={{ backgroundColor: getUIDColor(user.uid) }}
            className="rounded-full h-[28px] w-[28px] relative cursor-pointer"
            onClick={() => navigate("/settings/account")}
          >
            <span className="text-gray-800 text-md font-semibold absolute inset-0 flex items-center justify-center">
              {userDisplayName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        {user && (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly radius="full" variant="light">
                <Badge
                  color="danger"
                  variant="solid"
                  size="sm"
                  content={notifications.length}
                  isInvisible={!notifications.length}
                >
                  <Icon icon="bx:bx-bell" className="text-xl" />
                </Badge>
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {notifications.map(({ key, onPress, color, icon, label }) => (
                <DropdownItem
                  key={key}
                  onPress={onPress}
                  color={color}
                  endContent={<Icon icon={icon} className="text-2xl" />}
                  className={`text-${color}`}
                >
                  {label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
        <Switch
          isSelected={isDark}
          onChange={toggleTheme}
          thumbIcon={
            isDark ? <Icon icon="bx:bx-moon" /> : <Icon icon="bx:bx-sun" />
          }
        />
        {user && (
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                className="bg-transparent border-none"
                color="primary"
                variant="flat"
                size="lg"
                radius="full"
              >
                <Icon icon="bx:bx-dots-vertical-rounded" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {Object.values(siteConfig.navItems).map((value, index) => (
                <DropdownSection key={index} title={value.label}>
                  {value.items.map(({ action, label, color, icon }, index) => (
                    <DropdownItem
                      key={index}
                      onPress={action}
                      color={color}
                      startContent={icon && <Icon icon={icon} />}
                      className={`text-${color}`}
                    >
                      {label}
                    </DropdownItem>
                  ))}
                </DropdownSection>
              ))}
            </DropdownMenu>
          </Dropdown>
        )}
      </div>
    </HeroUINavbar>
  );
};
