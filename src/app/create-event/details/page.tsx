// src/app/create-event/details/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useCreateEventStore from "@/store/createEventStore";

export default function EventDetailsPage() {
  const router = useRouter();
  const { eventData, setEventData } = useCreateEventStore();

  const [form, setForm] = useState({
    title: eventData.title,
    description: eventData.description,
    location: eventData.location,
    dates: eventData.dates[0] || "",
    timeSlots: eventData.timeSlots[0] || "",
    customURL: eventData.customURL || "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "customURL"
        ? value.toLowerCase().replace(/\s+/g, "-")
        : value,
    }));
  };

  const handleNext = () => {
    const hasEmpty = Object.values(form).some((val) => !val.trim());
    if (hasEmpty) {
      return setError("All fields are required including Custom URL!");
    }

    setEventData({
      title: form.title,
      description: form.description,
      location: form.location,
      dates: [form.dates],
      timeSlots: [form.timeSlots],
      customURL: form.customURL,
    });

    router.push("/create-event/theme");
  };

  return (
    <div className="min-h-screen bg-[#f3f0ea] text-[#6B6B6B] p-8">
      <h1 className="text-3xl font-extrabold text-[#DDB892] mb-8 text-center">
        Let's Setup Your Event Details
      </h1>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <div className="space-y-6 max-w-xl mx-auto">
        {["title", "description", "location"].map((field) => (
          <input
            key={field}
            type={field === "description" ? "textarea" : "text"}
            name={field}
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            placeholder={`Event ${field.charAt(0).toUpperCase() + field.slice(1)}`}
            className="w-full border border-[#DDB892] placeholder-gray-400 text-gray-700 p-3 rounded focus:outline-none focus:border-[#DDB892] focus:ring-1 focus:ring-[#DDB892] transition"
          />
        ))}

        <input
          type="date"
          name="dates"
          value={form.dates}
          onChange={handleChange}
          className="w-full border border-[#DDB892] text-gray-700 p-3 rounded focus:outline-none focus:border-[#DDB892] focus:ring-1 focus:ring-[#DDB892] transition"
        />

        <input
          type="time"
          name="timeSlots"
          value={form.timeSlots}
          onChange={handleChange}
          className="w-full border border-[#DDB892] text-gray-700 p-3 rounded focus:outline-none focus:border-[#DDB892] focus:ring-1 focus:ring-[#DDB892] transition"
        />

        <input
          type="text"
          name="customURL"
          value={form.customURL}
          onChange={handleChange}
          placeholder="Custom Event URL (e.g my-awesome-event)"
          className="w-full border border-[#DDB892] placeholder-gray-400 text-gray-700 p-3 rounded focus:outline-none focus:border-[#DDB892] focus:ring-1 focus:ring-[#DDB892] transition"
        />

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
