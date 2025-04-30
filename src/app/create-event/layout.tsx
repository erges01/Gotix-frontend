// src/app/create-event/layout.tsx

"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Stepper from "@/components/Stepper";  // This should exist!

interface CreateEventLayoutProps {
  children: ReactNode;
}

export default function CreateEventLayout({ children }: CreateEventLayoutProps) {
  const pathname = usePathname();

  const steps = [
    { label: "Details", path: "/create-event/details" },
    { label: "Theme", path: "/create-event/theme" },
    { label: "Tickets", path: "/create-event/tickets" },
    { label: "Questions", path: "/create-event/questions" },
    { label: "Review", path: "/create-event/review" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Stepper steps={steps} activePath={pathname} />

        <div className="mt-10">
          {children}
        </div>
      </div>
    </div>
  );
}
