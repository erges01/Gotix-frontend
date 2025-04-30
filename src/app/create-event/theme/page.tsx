// src/app/create-event/theme/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useCreateEventStore from "@/store/createEventStore";

export default function ThemePage() {
  const router = useRouter();
  const { eventData, setEventData } = useCreateEventStore();

  const [image, setImage] = useState<File | null>(eventData.image || null);
  const [themeColor, setThemeColor] = useState<string>(eventData.themeColor || "#DDB892");
  const [error, setError] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleNext = () => {
    setEventData({
      image,
      themeColor,
    });
    router.push("/create-event/tickets");
  };

  return (
    <div className="min-h-screen bg-[#f3f0ea] text-[#6B6B6B] p-8">
      <h1 className="text-3xl font-extrabold text-[#DDB892] mb-8 text-center">
        Theme & Branding
      </h1>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <div className="space-y-6 max-w-xl mx-auto">

        <div className="space-y-2">
          <label className="block text-[#6B6B6B] font-medium">
            Upload Banner (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#DDB892] file:text-[#1E1E1E] hover:file:opacity-90"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[#6B6B6B] font-medium">
            Pick Theme Color
          </label>
          <input
            type="color"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="w-16 h-10 border border-[#DDB892] rounded"
          />
        </div>

        <button
          onClick={handleNext}
          className="w-full bg-[#DDB892] py-3 rounded-lg text-[#1E1E1E] font-bold hover:opacity-90 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
