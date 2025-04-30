// src/app/dashboard/manage-events/page.tsx
"use client";
import { useState, useEffect } from "react";

interface Event {
  id: string;
  title: string;
  date: string;
  status: "Live" | "Upcoming" | "Ended";
}

export default function ManageEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/events/organizer", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete event");

      setEvents(events.filter((event) => event.id !== eventId));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#6B6B6B] p-10">
      <h1 className="text-4xl font-extrabold text-[#DDB892] mb-8">Manage Your Events</h1>

      {loading && <p>Loading events...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && events.length === 0 && <p>No events found.</p>}

      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-6 rounded-lg shadow-md border border-[#DDB892] flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <p className="text-sm">{event.date} • <span className="font-bold">{event.status}</span></p>
            </div>
            <div className="flex space-x-4">
              <button className="bg-[#DDB892] text-[#1E1E1E] px-4 py-2 rounded-lg font-bold hover:bg-[#caa374]">
                Edit
              </button>
              <button onClick={() => handleDelete(event.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
