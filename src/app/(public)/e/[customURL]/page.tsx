// src/app/(public)/e/[customURL]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import BuyTicket from "./BuyTicket";

interface EventData {
  _id: string;
  title: string;
  description: string;
  location: string;
  dates: string[];
  timeSlots: string[];
  ticketTypes: {
    type: string;
    price: number;
    quantityAvailable: number;
  }[];
  checkoutQuestions: {
    question: string;
    type: string;
  }[];
  imageUrl?: string;
}

export default function EventPublicPage() {
  const params = useParams();
  const router = useRouter();
  const { customURL } = params as { customURL: string };

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/url/${customURL}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Event not found");
        }

        setEvent(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (customURL) fetchEvent();
  }, [customURL]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-red-500 text-center">{error}</div>;
  if (!event) return null;

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-8 text-[#1E1E1E]">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold text-[#DDB892] text-center">{event.title}</h1>
        <p className="text-center text-sm text-[#6B6B6B]">{event.description}</p>

        <div className="border rounded p-4 text-sm">
          <p><b>Location:</b> {event.location}</p>
          <p><b>Dates:</b> {event.dates.join(", ")}</p>
          <p><b>Time:</b> {event.timeSlots.join(", ")}</p>
        </div>

        {event.imageUrl && (
          <img
            src={event.imageUrl}
            alt="Event Banner"
            className="rounded-lg w-full object-cover h-48"
          />
        )}

        <BuyTicket
          eventId={event._id}
          ticketTypes={event.ticketTypes}
          checkoutQuestions={event.checkoutQuestions}
        />
      </div>
    </div>
  );
}
