// src/components/AuthNavbar.tsx
import Link from "next/link";

export default function AuthNavbar() {
  return (
    <header className="w-full py-6 px-8 bg-[#FAF9F6] shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-black tracking-wide text-[#DDB892] hover:opacity-80 transition">
          Goks Tickets
        </Link>
      </div>
    </header>
  );
}
