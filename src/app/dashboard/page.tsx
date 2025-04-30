// src/app/dashboard/page.tsx

"use client";

import Link from "next/link";
import { Plus, LayoutDashboard, Calendar, Settings } from "lucide-react";

export default function OrganizerDashboard() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#6B6B6B] p-10 flex flex-col justify-center">
      <h1 className="text-4xl font-extrabold text-[#DDB892] mb-8 text-center">
        Organizer Dashboard
      </h1>

      {/* Full Page Grid for the Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[80vh]">
        
        {/* Create Event */}
        <Link href="/create-event/details" className="dashboard-card">
          <Plus className="icon" />
          <h2>Create Event</h2>
          <p>Launch your next big event in minutes.</p>
        </Link>

        {/* Event Dashboard */}
        <Link href="/dashboard/analytics" className="dashboard-card">
          <LayoutDashboard className="icon" />
          <h2>Event Dashboard</h2>
          <p>View insights and track event performance.</p>
        </Link>

        {/* Manage Events */}
        <Link href="/dashboard/manage-events" className="dashboard-card">
          <Calendar className="icon" />
          <h2>Manage Events</h2>
          <p>Edit or remove events you have created.</p>
        </Link>

        {/* Account Settings */}
        <Link href="/dashboard/settings" className="dashboard-card">
          <Settings className="icon" />
          <h2>Account Settings</h2>
          <p>Update your profile and preferences.</p>
        </Link>

      </div>
    </div>
  );
}
