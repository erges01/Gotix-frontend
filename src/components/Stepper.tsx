"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";

const steps = [
  { label: "Details", path: "/create-event/details" },
  { label: "Theme", path: "/create-event/theme" },
  { label: "Tickets", path: "/create-event/tickets" },
  { label: "Review", path: "/create-event/review" },
];

export default function Stepper() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center gap-4 mb-8 overflow-x-auto">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold",
              pathname === step.path
                ? "border-[#DDB892] text-[#DDB892]"
                : "border-gray-300 text-gray-400"
            )}
          >
            {index + 1}
          </div>
          <span
            className={clsx(
              "text-sm font-medium",
              pathname === step.path
                ? "text-[#DDB892]"
                : "text-gray-400"
            )}
          >
            {step.label}
          </span>
        </div>
      ))}
    </div>
  );
}
