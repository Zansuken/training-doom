import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "@heroui/link";
import {
  Chip,
  Switch,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Icon } from "@iconify/react";

import { siteConfig } from "@/config/site";
import { useAppContext } from "@/context";
import { useTheme } from "@/hooks/use-theme";
import { auth } from "@/firebase";

export const Navbar = () => {
  const location = useLocation();
  const { currentDay, user } = useAppContext();
  const { isDark, toggleTheme } = useTheme("dark");

  console.log("user", user);

  const navigate = useNavigate();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const logout = async () => {
    try {
      await auth.signOut();
      navigate("/auth/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <Chip
        className="absolute top-4 z-50"
        color="primary"
        radius="sm"
        size="lg"
        variant="faded"
      >
        {currentDay.toLocaleUpperCase()}
      </Chip>
      <NavbarContent className="basis-1/5 sm:basis-full pl-32" justify="center">
        {user &&
          siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={`px-4 py-2 rounded-md transition-all ${
                  isActive(item.href)
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                color="foreground"
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
      </NavbarContent>
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
            >
              <Icon icon="bx:bx-dots-vertical-rounded" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="1" color="danger" onPress={logout}>
              Log out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </HeroUINavbar>
  );
};
