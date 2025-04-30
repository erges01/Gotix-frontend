// src/app/create-event/questions/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useCreateEventStore from "@/store/createEventStore";
import { toast } from "react-toastify";

export default function QuestionsPage() {
  const router = useRouter();
  const { eventData, setEventData } = useCreateEventStore();

  const [question, setQuestion] = useState({
    question: "",
    type: "text",
  });

  const [questions, setQuestions] = useState(eventData.checkoutQuestions || []);

  const handleAddQuestion = () => {
    if (!question.question.trim()) {
      return toast.error("Question cannot be empty");
    }

    setQuestions([...questions, question]);
    setQuestion({ question: "", type: "text" });
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setEventData({ checkoutQuestions: questions });
    router.push("/create-event/review");
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-10 px-4 md:px-8">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-[#DDB892]">
          Checkout Questions
        </h1>

        <p className="text-sm text-gray-500">
          Add custom questions you'd like attendees to answer during checkout.
        </p>

        <div className="space-y-2">
          <label className="font-medium">Your Question</label>
          <input
            type="text"
            placeholder="e.g What's your Instagram handle?"
            value={question.question}
            onChange={(e) =>
              setQuestion({ ...question, question: e.target.value })
            }
            className="w-full border border-[#DDB892] p-2 rounded"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium">Answer Type</label>
          <select
            className="w-full border border-[#DDB892] p-2 rounded"
            value={question.type}
            onChange={(e) =>
              setQuestion({ ...question, type: e.target.value })
            }
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleAddQuestion}
          className="w-full bg-[#DDB892] py-2 rounded-lg text-black font-bold"
        >
          Add Question
        </button>

        {questions.length > 0 && (
          <div className="mt-4 space-y-2">
            {questions.map((q, idx) => (
              <div
                key={idx}
                className="border border-[#DDB892] p-3 rounded flex justify-between items-center"
              >
                <span>
                  {q.question} ({q.type})
                </span>
                <button
                  onClick={() => handleRemoveQuestion(idx)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleNext}
          className="w-full bg-[#DDB892] py-3 rounded-lg text-black font-bold mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
