"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
// import SignOutButton from "./SignOutButton";
import Link from "next/link";
import SignOutButton from "./SignOutButto";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="border-r lg:border-r border-b lg:border-b-0 border-primary-900">
      <ul className="flex lg:flex-col gap-2 lg:h-full text-base lg:text-lg overflow-x-auto lg:overflow-x-visible">
        {navLinks.map((link) => (
          <li key={link.name} className="flex-shrink-0 lg:flex-shrink">
            <Link
              className={`py-2 lg:py-3 px-3 lg:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-2 lg:gap-4 font-semibold text-primary-200 whitespace-nowrap ${
                mounted && link.href === pathname ? "bg-primary-900 text-primary-100" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span className="hidden sm:inline lg:inline">{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="lg:mt-auto flex-shrink-0 lg:flex-shrink">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
