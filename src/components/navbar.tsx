import {
  Switch,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Badge,
  Skeleton,
} from "@heroui/react";
import { Navbar as HeroUINavbar } from "@heroui/navbar";
import { Icon } from "@iconify/react";

import useSiteConfig from "@/config/use-site-congig";
import { useAppContext } from "@/context";
import { useTheme } from "@/hooks/use-theme";
import { useNavigate } from "react-router-dom";
import IcOutlineHome from "./icons/HomeOutlined";
import NotificationIconOutlined from "./icons/NotificationIconOutlined";
import MoonIconOutlined from "./icons/MoonIconOutlined";
import SunIconOutlined from "./icons/SunIconOutlined";
import VerticalDotsIcon from "./icons/VerticalDotsIcon";

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

export const Navbar = () => {
  const { user, notifications, userDisplayName, isAppLoading } =
    useAppContext();
  const { isDark, toggleTheme } = useTheme("dark");
  const { siteConfig } = useSiteConfig();
  const navigate = useNavigate();

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
        <IcOutlineHome className="text-xl" />
      </Button>
      <div className="flex items-center gap-2">
        {user && (
          <Skeleton
            isLoaded={!isAppLoading}
            className="rounded-full h-[28px] w-[28px]"
          >
            <div
              style={{ backgroundColor: getUIDColor(user.uid) }}
              className="rounded-full h-[28px] w-[28px] relative cursor-pointer"
              onClick={() => navigate("/settings#profile")}
            >
              <span className="text-gray-800 text-md font-semibold absolute inset-0 flex items-center justify-center">
                {userDisplayName.charAt(0).toUpperCase()}
              </span>
            </div>
          </Skeleton>
        )}
        {user && notifications.length > 0 && (
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
                  <NotificationIconOutlined className="text-xl" />
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
          thumbIcon={isDark ? <MoonIconOutlined /> : <SunIconOutlined />}
        />
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
              <VerticalDotsIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            {user ? (
              Object.values(siteConfig.navItems).map((value, index) => (
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
              ))
            ) : (
              <>
                <DropdownItem
                  key="sign-in"
                  onPress={() => navigate("/auth/sign-in")}
                  startContent={<Icon icon="bx:bx-log-in" />}
                >
                  Sign In
                </DropdownItem>
                <DropdownItem
                  key="sign-up"
                  onPress={() => navigate("/auth/sign-up")}
                  startContent={<Icon icon="bx:bx-user-plus" />}
                >
                  Sign Up
                </DropdownItem>
              </>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
    </HeroUINavbar>
  );
};
