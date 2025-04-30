// src/store/createEventStore.ts

import { create } from "zustand";

type TicketType = {
  type: string;
  price: number;
  quantityAvailable: number;
};

type CheckoutQuestion = {
  question: string;
  type: string;
};

type EventData = {
  title: string;
  description: string;
  location: string;
  dates: string[];
  timeSlots: string[];
  ticketTypes: TicketType[];
  checkoutQuestions: CheckoutQuestion[];
  themeColor: string | null;
  image: File | null;
  customURL: string; // updated: always string for safe usage
};

type CreateEventStore = {
  eventData: EventData;
  setEventData: (data: Partial<EventData>) => void;
  resetEventData: () => void;
};

const defaultEventData: EventData = {
  title: "",
  description: "",
  location: "",
  dates: [],
  timeSlots: [],
  ticketTypes: [],
  checkoutQuestions: [],
  themeColor: null,
  image: null,
  customURL: "", // updated
};

const useCreateEventStore = create<CreateEventStore>((set) => ({
  eventData: defaultEventData,

  setEventData: (data) =>
    set((state) => ({
      eventData: { ...state.eventData, ...data },
    })),

  resetEventData: () => set({ eventData: defaultEventData }),
}));

export default useCreateEventStore;
