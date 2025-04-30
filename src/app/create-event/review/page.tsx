"use client";

import { useRouter } from "next/navigation";
import useCreateEventStore from "@/store/createEventStore";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ReviewPage() {
  const router = useRouter();
  const { eventData, resetEventData } = useCreateEventStore();
  const [loading, setLoading] = useState(false);

  const handleCopyLink = () => {
    const link = `${process.env.NEXT_PUBLIC_CLIENT_URL}/e/${eventData.customURL}`;
    navigator.clipboard.writeText(link);
    toast.success("Event link copied!");
  };

  const handleCreateEvent = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("location", eventData.location);
    formData.append("dates", JSON.stringify(eventData.dates));
    formData.append("timeSlots", JSON.stringify(eventData.timeSlots));
    formData.append("ticketTypes", JSON.stringify(eventData.ticketTypes));
    formData.append("checkoutQuestions", JSON.stringify(eventData.checkoutQuestions));
    formData.append("customURL", eventData.customURL || "");

    if (eventData.image) {
      formData.append("image", eventData.image);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/create`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("CREATE EVENT ERROR:", data);
        throw new Error(data?.message || "Failed to create event");
      }

      toast.success("Event created successfully!");
      resetEventData();
      router.push("/create-event/success");

    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1E1E1E] p-8">
      <h1 className="text-3xl font-extrabold text-[#DDB892] mb-8 text-center">
        Review Your Event Before Publishing
      </h1>

      <div className="space-y-6 max-w-xl mx-auto">

        <div className="border border-[#DDB892] p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Event Details</h2>
          <p><b>Title:</b> {eventData.title}</p>
          <p><b>Description:</b> {eventData.description}</p>
          <p><b>Location:</b> {eventData.location}</p>
          <p><b>Dates:</b> {eventData.dates?.join(", ")}</p>
          <p><b>Time Slots:</b> {eventData.timeSlots?.join(", ")}</p>
          <p><b>Custom URL:</b> 
            <span 
              onClick={handleCopyLink} 
              className="text-[#DDB892] cursor-pointer hover:underline ml-1"
            >
              {`${process.env.NEXT_PUBLIC_CLIENT_URL}/e/${eventData.customURL}`}
            </span>
          </p>
        </div>

        <div className="border border-[#DDB892] p-4 rounded-lg">
          <h2 className="font-semibold mb-2">Tickets</h2>
          {eventData.ticketTypes.length > 0 ? (
            eventData.ticketTypes.map((t, idx) => (
              <p key={idx}>
                {t.type.toUpperCase()} - ₦{t.price} | Qty: {t.quantityAvailable}
              </p>
            ))
          ) : <p>No tickets added.</p>}
        </div>

        {eventData.checkoutQuestions.length > 0 && (
          <div className="border border-[#DDB892] p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Checkout Questions</h2>
            {eventData.checkoutQuestions.map((q, idx) => (
              <p key={idx}>{q.question}</p>
            ))}
          </div>
        )}

        {eventData.image && (
          <div className="border border-[#DDB892] p-4 rounded-lg">
            <h2 className="font-semibold mb-2">Event Banner</h2>
            <img
              src={URL.createObjectURL(eventData.image)}
              alt="Event"
              className="w-48 rounded"
            />
          </div>
        )}

        <div className="flex justify-between gap-4 mt-6">
          <button
            onClick={() => router.push("/create-event/tickets")}
            className="w-full border border-[#DDB892] py-3 rounded-lg text-[#DDB892] font-bold"
          >
            Go Back
          </button>

          <button
            onClick={handleCreateEvent}
            disabled={loading}
            className="w-full bg-[#DDB892] py-3 rounded-lg text-[#1E1E1E] font-bold disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
}
