// src/components/PricingSection.tsx

const plans = [
  {
    name: "Starter (Free)",
    price: "$0",
    features: ["1 Free Event", "Basic Analytics", "Event Promotion"],
  },
  {
    name: "Pro Organizer",
    price: "$49/month",
    features: ["Unlimited Events", "Advanced Analytics", "Priority Support"],
  },
];

export default function PricingSection() {
  return (
    <section className="py-24 px-6 bg-[#FAF9F6] text-center">
      <h2 className="text-5xl font-extrabold text-[#DDB892] mb-12">
        Flexible Pricing Plans
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="p-8 border border-[#DDB892] rounded-lg hover:shadow-2xl hover:scale-105 transition duration-500"
          >
            <h3 className="text-3xl font-bold text-[#DDB892] mb-4">
              {plan.name}
            </h3>
            <p className="text-4xl font-extrabold text-[#3A3A3A]">{plan.price}</p>
            <ul className="mt-6 text-[#6B6B6B]">
              {plan.features.map((feature, index) => (
                <li key={index} className="mt-2">{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
