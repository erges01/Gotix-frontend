// src/app/dashboard/analytics/page.tsx

"use client";

import { useState, useEffect } from "react";
import { fetcher } from "@/utils/api";

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetcher("/events/organizer/analytics"); // Correct API endpoint
        setStats(data?.data || {});
      } catch (err: any) {
        setError(err.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, []);

  if (loading) return <p className="p-8 text-center">Loading analytics...</p>;
  if (error) return <p className="p-8 text-center text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#6B6B6B] p-10">
      <h1 className="text-4xl font-extrabold text-[#DDB892] mb-6">Event Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-[#DDB892]">
          <h2 className="text-2xl font-bold">Total Revenue</h2>
          <p className="text-lg">₦{stats.totalRevenue || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-[#DDB892]">
          <h2 className="text-2xl font-bold">Tickets Sold</h2>
          <p className="text-lg">{stats.totalTicketsSold || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-[#DDB892]">
          <h2 className="text-2xl font-bold">Best Selling Events</h2>
          <p className="text-lg">
            {stats.bestSellingEvents?.length || 0}
          </p>
        </div>
      </div>
    </div>
  );
}
