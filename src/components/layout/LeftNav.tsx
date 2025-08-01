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
    <div
      className="flex flex-col items-start gap-6 py-8 px-6 h-full w-full border-r-[1px]"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      {/* Home - Disabled */}
      <div className="flex items-center gap-2 w-full opacity-50 cursor-not-allowed">
        <HomeIcon
          className="w-[18px] h-[18px]"
          style={{ color: "var(--color-text)" }}
        />
        <div
          className="font-medium leading-6 truncate"
          style={{ color: "var(--color-text)" }}
        >
          Home
        </div>
      </div>

      {/* Your Companies - Clickable with active state */}
      <Link
        href={ROUTES.COMPANIES.LIST}
        className="flex items-center gap-2 w-full"
      >
        <BuildingOffice2Icon
          className="w-[18px] h-[18px]"
          style={{
            color: isActiveRoute(pathname, ROUTES.COMPANIES.LIST)
              ? "var(--color-secondary)"
              : "var(--color-text)",
          }}
        />
        <div
          className="font-medium leading-6 truncate"
          style={{
            color: isActiveRoute(pathname, ROUTES.COMPANIES.LIST)
              ? "var(--color-secondary)"
              : "var(--color-text)",
          }}
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
          className="w-[18px] h-[18px]"
          style={{
            color: isActiveRoute(pathname, ROUTES.NOTIFICATIONS)
              ? "var(--color-secondary)"
              : "var(--color-text)",
          }}
        />
        <div
          className="absolute left-[0.5625rem] flex flex-col justify-center items-center py-0 px-1 w-3 h-3 rounded-full text-center text-[10px] font-medium leading-[1.0625rem]"
          style={{
            backgroundColor: "var(--color-error)",
            color: "var(--color-text-inverse)",
          }}
        >
          6
        </div>
        <div
          className="font-medium leading-6 truncate"
          style={{
            color: isActiveRoute(pathname, ROUTES.NOTIFICATIONS)
              ? "var(--color-secondary)"
              : "var(--color-text)",
          }}
        >
          Notifications
        </div>
      </Link>
    </div>
  );
};

export default LeftNav;
