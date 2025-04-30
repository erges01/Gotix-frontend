// src/components/FeatureSection.tsx

const features = [
  {
    title: "Effortless Event Creation",
    description: "Create, customize, and publish your event in minutes.",
  },
  {
    title: "Powerful Promotion Tools",
    description: "Maximize your reach with integrated marketing solutions.",
  },
  {
    title: "Live Insights",
    description: "Track ticket sales and attendee insights in real-time.",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold text-[#DDB892] mb-12">
          Why Choose Goks Tickets?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-8 border border-[#DDB892] rounded-lg hover:shadow-2xl hover:scale-105 transition duration-500"
            >
              <h3 className="text-3xl font-bold text-[#DDB892] mb-4">
                {feature.title}
              </h3>
              <p className="text-[#6B6B6B]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
