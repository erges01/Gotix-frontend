// src/components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-5 bg-[#FAF9F6] shadow-md">
      {/* Goks Tickets Logo */}
      <Link href="/" className="text-3xl font-black tracking-wide text-[#DDB892]">
        Goks Tickets
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="hover:text-[#DDB892] transition-transform text-[#6B6B6B]"
          >
            {item.name}
          </Link>
        ))}
        <Link
          href="/auth/signup"
          className="bg-[#DDB892] px-5 py-2 rounded-full font-bold text-[#1E1E1E] hover:bg-[#caa374] transition"
        >
          Create Event
        </Link>
      </nav>

      {/* Hamburger Menu (Mobile Only) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-0 m-0 outline-none border-none bg-transparent no-hover"
      >
        <Menu size={32} strokeWidth={1.5} className="text-[#DDB892] no-hover" />
      </button>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-[#FAF9F6] text-[#6B6B6B] transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden z-50`}
      >
        {/* Close Button (X Icon) */}
        <button
          onClick={toggleSidebar}
          className="absolute top-5 right-5 p-0 m-0 outline-none border-none bg-transparent no-hover"
        >
          <X size={32} strokeWidth={1.5} className="text-[#DDB892] no-hover" />
        </button>

        {/* Sidebar Links */}
        <nav className="mt-16 space-y-6 px-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-xl hover:text-[#DDB892]"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/auth/signup"
            className="block text-xl bg-[#DDB892] px-5 py-2 rounded-full text-[#1E1E1E] font-bold hover:bg-[#caa374]"
          >
            Create Event
          </Link>
        </nav>
      </div>
    </header>
  );
}

const navLinks = [
  { name: "Discover", href: "/events" },
  { name: "Why Goks Tickets?", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Login", href: "/auth/login" },
];
