// src/components/Footer.tsx
import Link from "next/link";
import { X, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#FAF9F6] text-[#6B6B6B] py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* About Goks Tickets Section */}
        <div>
          <h2 className="text-3xl font-bold text-[#DDB892] mb-4"> Goks Tickets</h2>
          <p className="mb-6">
            Goks Tickets empowers event organizers to create, promote, and manage unforgettable events with ease.
          </p>
          <p>Built for organizers, powered by innovation.</p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-2xl font-semibold text-[#3A3A3A] mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-[#DDB892] transition duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Stay Connected Section */}
        <div>
          <h3 className="text-2xl font-semibold text-[#3A3A3A] mb-4">Stay Connected</h3>
          <p className="mb-4">Follow us on our socials to stay updated.</p>
          <div className="flex space-x-6">
            <Link
              href="https://x.com"
              aria-label="Twitter"
              className="hover:text-[#DDB892] transition"
            >
              <X size={24} />
            </Link>
            <Link
              href="https://instagram.com"
              aria-label="Instagram"
              className="hover:text-[#DDB892] transition"
            >
              <Instagram size={24} />
            </Link>
            <Link
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="hover:text-[#DDB892] transition"
            >
              <Linkedin size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center mt-12 border-t border-[#DDB892] pt-6">
        <p>© {new Date().getFullYear()} Goks Tickets. Your Stage Awaits.</p>
      </div>
    </footer>
  );
}

// Quick Links Array
const quickLinks = [
  { label: "Discover Events", href: "/events" },
  { label: "About Goks Tickets", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Create Event", href: "/auth/signup" },
  { label: "Contact Us", href: "/contact" },
];
