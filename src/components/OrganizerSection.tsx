// src/components/OrganizerSection.tsx
import Link from "next/link";

export default function OrganizerSection() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-6xl font-extrabold text-[#DDB892] mb-8">
          Your Event. Your Rules.
        </h2>
        <p className="text-[#6B6B6B] text-xl mb-12">
          Whether it's a music festival, a tech conference, or a private workshop—we help you make it happen seamlessly.
        </p>

        <Link
          href="/auth/signup"
          className="bg-[#DDB892] hover:bg-[#caa374] transition px-8 py-4 rounded-lg text-[#1E1E1E] font-bold text-lg transform hover:scale-110"
        >
          Start Organizing
        </Link>
      </div>
    </section>
  );
}
