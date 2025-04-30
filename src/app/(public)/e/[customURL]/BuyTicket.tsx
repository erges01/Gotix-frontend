// src/components/BuyTicket.tsx

"use client";

import { useState } from "react";
import { toast } from "react-toastify";

interface TicketType {
  type: string;
  price: number;
  quantityAvailable: number;
}

interface CheckoutQuestion {
  question: string;
  type: string;
}

interface BuyTicketProps {
  eventId: string;
  ticketTypes: TicketType[];
  checkoutQuestions: CheckoutQuestion[];
}

/**
 * BuyTicket is a form component that allows users to select ticket types,
 * fill in personal and optional checkout question details, and submit an order.
 */
export default function BuyTicket({ eventId, ticketTypes = [], checkoutQuestions = [] }: BuyTicketProps) {
  const [selectedTickets, setSelectedTickets] = useState<TicketType[]>([]);
  const [checkoutInfo, setCheckoutInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    answers: checkoutQuestions.map(() => ""),
  });

  const handleTicketChange = (type: string, quantity: number) => {
    setSelectedTickets((prev) => {
      const exists = prev.find((t) => t.type === type);
      if (exists) {
        return prev.map((t) => (t.type === type ? { ...t, quantity } : t));
      }
      return [...prev, { type, quantity, price: 0, quantityAvailable: 0 }];
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckoutInfo({ ...checkoutInfo, [e.target.name]: e.target.value });
  };

  const handleAnswerChange = (idx: number, value: string) => {
    const newAnswers = [...checkoutInfo.answers];
    newAnswers[idx] = value;
    setCheckoutInfo({ ...checkoutInfo, answers: newAnswers });
  };

  const handleSubmit = async () => {
    if (!checkoutInfo.fullName || !checkoutInfo.email || !checkoutInfo.phone) {
      return toast.error("Fill all required fields");
    }

    const payload = {
      eventId,
      tickets: selectedTickets,
      checkoutInfo,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.message || "Error creating order");

      toast.success("Order Created!");

      if (data.paymentLink) {
        window.location.href = data.paymentLink;
      } else {
        window.location.reload();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg text-[#1E1E1E]">Select Tickets</h2>
      {ticketTypes.map((t, idx) => (
        <div key={idx} className="border p-2 rounded text-[#1E1E1E]">
          <div className="flex justify-between items-center">
            <span>{t.type.toUpperCase()} - ₦{t.price}</span>
            <input
              type="number"
              min={0}
              onChange={(e) => handleTicketChange(t.type, parseInt(e.target.value))}
              className="w-16 border rounded text-center text-[#1E1E1E]"
            />
          </div>
        </div>
      ))}

      <h2 className="font-bold text-lg text-[#1E1E1E] mt-4">Your Details</h2>
      <input type="text" name="fullName" placeholder="Full Name" onChange={handleInputChange} className="w-full border p-2 rounded text-[#1E1E1E]" />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} className="w-full border p-2 rounded text-[#1E1E1E]" />
      <input type="tel" name="phone" placeholder="Phone Number" onChange={handleInputChange} className="w-full border p-2 rounded text-[#1E1E1E]" />

      {checkoutQuestions.length > 0 && (
        <div className="mt-4">
          <h2 className="font-bold text-lg text-[#1E1E1E]">Extra Questions</h2>
          {checkoutQuestions.map((q, idx) => (
            <input
              key={idx}
              type="text"
              placeholder={q.question}
              className="w-full border p-2 rounded mt-2 text-[#1E1E1E]"
              onChange={(e) => handleAnswerChange(idx, e.target.value)}
            />
          ))}
        </div>
      )}

      <button onClick={handleSubmit} className="w-full bg-[#DDB892] py-3 rounded-lg font-bold mt-4 text-[#1E1E1E]">
        Buy Ticket
      </button>
    </div>
  );
}
