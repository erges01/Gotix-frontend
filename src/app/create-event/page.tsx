"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateEventHomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/create-event/details");
  }, [router]);

  return null;
}
