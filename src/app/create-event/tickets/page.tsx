// src/app/create-event/tickets/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useCreateEventStore from "@/store/createEventStore";
import { toast } from "react-toastify";

export default function TicketsPage() {
  const router = useRouter();
  const { eventData, setEventData } = useCreateEventStore();

  const [tickets, setTickets] = useState(eventData.ticketTypes || []);
  const [ticket, setTicket] = useState({
    type: "free",
    price: 0,
    quantityAvailable: 0,
  });

  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState(eventData.checkoutQuestions || []);

  const handleAddTicket = () => {
    if (!ticket.type || ticket.quantityAvailable <= 0) {
      toast.error("Fill all ticket fields properly");
      return;
    }
    setTickets([...tickets, ticket]);
    setTicket({ type: "free", price: 0, quantityAvailable: 0 });
  };

  const handleAddQuestion = () => {
    if (!question.trim()) {
      toast.error("Question can't be empty");
      return;
    }
    setQuestions([...questions, { question, type: "text" }]);
    setQuestion("");
  };

  const handleNext = () => {
    if (tickets.length === 0) {
      toast.error("Add at least one ticket type");
      return;
    }
    setEventData({ ticketTypes: tickets, checkoutQuestions: questions });
    router.push("/create-event/review");
  };

  return (
    <div className="min-h-screen bg-[#f3f0ea] text-[#1E1E1E] p-8">
      <h1 className="text-3xl font-extrabold text-[#DDB892] mb-8 text-center">
        Tickets & Checkout Questions
      </h1>

      <div className="space-y-4 max-w-xl mx-auto">
        {/* Ticket Type */}
        <div>
          <label className="block mb-1">Ticket Type</label>
          <select
            className="w-full border border-[#DDB892] p-3 rounded"
            value={ticket.type}
            onChange={(e) => setTicket({ ...ticket, type: e.target.value })}
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
            <option value="invite-only">Invite Only</option>
          </select>
        </div>

        {ticket.type === "paid" && (
          <div>
            <label className="block mb-1">Price (₦)</label>
            <input
              type="number"
              placeholder="Ticket price"
              className="w-full border border-[#DDB892] p-3 rounded placeholder:text-gray-400"
              value={ticket.price}
              onChange={(e) => setTicket({ ...ticket, price: parseFloat(e.target.value) })}
            />
          </div>
        )}

        <div>
          <label className="block mb-1">Quantity Available</label>
          <input
            type="number"
            placeholder="Available quantity"
            className="w-full border border-[#DDB892] p-3 rounded placeholder:text-gray-400"
            value={ticket.quantityAvailable}
            onChange={(e) => setTicket({ ...ticket, quantityAvailable: parseInt(e.target.value) })}
          />
        </div>

        <button
          onClick={handleAddTicket}
          className="w-full bg-[#DDB892] py-2 rounded-lg font-bold text-[#1E1E1E]"
        >
          Add Ticket
        </button>

        {tickets.length > 0 && (
          <div className="mt-6 space-y-2">
            <h2 className="font-semibold mb-2">Your Tickets</h2>
            {tickets.map((t, idx) => (
              <div
                key={idx}
                className="border p-3 rounded flex justify-between items-center border-[#DDB892]"
              >
                <span>{t.type.toUpperCase()} - Qty: {t.quantityAvailable} {t.type === "paid" && ` | ₦${t.price}`}</span>
              </div>
            ))}
          </div>
        )}

        <hr className="my-6" />

        {/* Optional Questions */}
        <div>
          <label className="block mb-1">Optional Checkout Question</label>
          <input
            type="text"
            placeholder="Eg: Your Instagram Handle"
            className="w-full border border-[#DDB892] p-3 rounded placeholder:text-gray-400"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <button
          onClick={handleAddQuestion}
          className="w-full bg-[#DDB892] py-2 rounded-lg font-bold text-[#1E1E1E]"
        >
          Add Question
        </button>

        {questions.length > 0 && (
          <div className="mt-6 space-y-2">
            <h2 className="font-semibold mb-2">Your Questions</h2>
            {questions.map((q, idx) => (
              <div
                key={idx}
                className="border p-3 rounded border-[#DDB892]"
              >
                {q.question}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleNext}
          className="w-full bg-[#DDB892] py-3 rounded-lg font-bold text-[#1E1E1E] mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
