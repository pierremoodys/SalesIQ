"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES, isActiveRoute } from "@/config/routes";
import {
  HomeIcon,
  BuildingOffice2Icon,
  BellIcon,
} from "@heroicons/react/24/outline";

const LeftNav = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-start gap-6 py-8 px-6 h-full w-full border-r-[1px] border-gray-200 bg-white">
      {/* Home - Disabled */}
      <div className="flex items-center gap-2 w-full opacity-50 cursor-not-allowed">
        <HomeIcon className="w-[18px] h-[18px] text-black" />
        <div className="text-gray-900 font-medium leading-6 truncate">Home</div>
      </div>

      {/* Your Companies - Clickable with active state */}
      <Link
        href={ROUTES.COMPANIES.LIST}
        className="flex items-center gap-2 w-full"
      >
        <BuildingOffice2Icon
          className={`w-[18px] h-[18px] ${
            isActiveRoute(pathname, ROUTES.COMPANIES.LIST)
              ? "text-moodys-bright-blue"
              : "text-black"
          }`}
        />
        <div
          className={`font-medium leading-6 truncate ${
            isActiveRoute(pathname, ROUTES.COMPANIES.LIST)
              ? "text-moodys-bright-blue"
              : "text-gray-900"
          }`}
        >
          Companies
        </div>
      </Link>

      {/* Notifications - Clickable with active state */}
      <Link
        href={ROUTES.NOTIFICATIONS}
        className="flex items-center gap-2 w-full relative"
      >
        <BellIcon
          className={`w-[18px] h-[18px] ${
            isActiveRoute(pathname, ROUTES.NOTIFICATIONS)
              ? "text-moodys-bright-blue"
              : "text-black"
          }`}
        />
        <div className="absolute left-[0.5625rem] flex flex-col justify-center items-center py-0 px-1 w-3 h-3 rounded-full bg-red-800 text-white text-center text-[10px] font-medium leading-[1.0625rem]">
          6
        </div>
        <div
          className={`font-medium leading-6 truncate ${
            isActiveRoute(pathname, ROUTES.NOTIFICATIONS)
              ? "text-moodys-bright-blue"
              : "text-gray-900"
          }`}
        >
          Notifications
        </div>
      </Link>
    </div>
  );
};

export default LeftNav;
