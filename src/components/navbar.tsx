import { useLocation } from "react-router-dom";
import { Link } from "@heroui/link";
import { Chip } from "@heroui/react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";

import { siteConfig } from "@/config/site";
import { useAppContext } from "@/context";

export const Navbar = () => {
  const location = useLocation();
  const { currentDay } = useAppContext();

  const isActive = (href: string) => {
    return location.pathname === href;
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
      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
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
        </div>
      </NavbarContent>
    </HeroUINavbar>
  );
};
