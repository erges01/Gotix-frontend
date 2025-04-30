"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import useCreateEventStore from "@/store/createEventStore";
import { toast } from "react-toastify";

export default function SuccessPage() {
  const router = useRouter();
  const { eventData } = useCreateEventStore();

  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
    });
  }, []);

  const handleCopyLink = () => {
    const link = `${process.env.NEXT_PUBLIC_CLIENT_URL}/e/${eventData.customURL}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAF9F6] text-center p-8">
      <div className="max-w-lg mx-auto space-y-6">
        <h1 className="text-4xl font-extrabold text-[#DDB892]">
          🎉 Event Published!
        </h1>

        <p className="text-gray-600 text-sm">
          Share your link with attendees and start selling tickets.
        </p>

        <div className="border border-[#DDB892] p-3 rounded-lg text-sm cursor-pointer hover:opacity-90 transition"
          onClick={handleCopyLink}
        >
          {`${process.env.NEXT_PUBLIC_CLIENT_URL}/e/${eventData.customURL}`}
        </div>

        <img
          src="/celebrate.svg"
          alt="Celebrate"
          className="w-40 mx-auto"
        />

        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-[#DDB892] py-3 rounded-lg text-black font-bold"
          >
            Go to Dashboard
          </button>

          <button
            onClick={() => router.push("/dashboard/manage-events")}
            className="w-full border border-[#DDB892] py-3 rounded-lg text-[#DDB892] font-bold"
          >
            View Events
          </button>
        </div>
      </div>
    </div>
  );
}
