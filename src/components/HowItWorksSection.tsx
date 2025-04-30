// src/components/HowItWorksSection.tsx

const steps = [
  {
    title: "Create Your Event",
    description:
      "Set up and publish your event in minutes with our user-friendly platform.",
  },
  {
    title: "Promote Everywhere",
    description:
      "Share your event across social platforms and reach a wider audience.",
  },
  {
    title: "Track & Manage",
    description:
      "Monitor ticket sales, manage attendees, and get real-time analytics.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6] text-center">
      <h2 className="text-5xl font-extrabold text-[#DDB892] mb-12">
        How Goks Tickets Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-8 border border-[#DDB892] rounded-lg hover:shadow-2xl hover:scale-105 transition duration-500"
          >
            <h3 className="text-3xl font-bold text-[#DDB892] mb-4">
              {step.title}
            </h3>
            <p className="text-[#6B6B6B]">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
