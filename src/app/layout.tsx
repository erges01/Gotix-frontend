import type { Metadata } from "next";
import "./globals.css"; // Correct relative path
// Correct path to globals.css

export const metadata: Metadata = {
  title: "Goks Tickets",
  description: "Create, sell, and buy event tickets online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-white">{children}</body>
    </html>
  );
}
