import React, { createContext, useContext, useState, useEffect } from "react";
import {
  AvailabilitySlot,
  MeetingRequest,
  ConfirmedMeeting,
} from "../types/meeting";

interface CollaborationContextType {
  slots: AvailabilitySlot[];
  requests: MeetingRequest[];
  confirmed: ConfirmedMeeting[];

  addSlot: (slot: AvailabilitySlot) => void;
  deleteSlot: (id: string) => void;
  updateSlot: (id: string, title: string) => void;

  sendRequest: (request: MeetingRequest) => void;

  acceptRequest: (id: string) => void;
  declineRequest: (id: string) => void;
}

const CollaborationContext = createContext<CollaborationContextType | null>(
  null,
);

export const CollaborationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
 const [slots, setSlots] = useState<AvailabilitySlot[]>(() => {
  const saved = localStorage.getItem("slots");
  return saved ? JSON.parse(saved) : [];
});

const [requests, setRequests] = useState<MeetingRequest[]>(() => {
  const saved = localStorage.getItem("requests");
  return saved ? JSON.parse(saved) : [];
});

const [confirmed, setConfirmed] = useState<ConfirmedMeeting[]>(() => {
  const saved = localStorage.getItem("confirmed");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("slots", JSON.stringify(slots));
}, [slots]);

useEffect(() => {
  localStorage.setItem("requests", JSON.stringify(requests));
}, [requests]);

useEffect(() => {
  localStorage.setItem("confirmed", JSON.stringify(confirmed));
}, [confirmed]);

  const addSlot = (slot: AvailabilitySlot) => {
    setSlots((prev) => [...prev, slot]);
  };

  const deleteSlot = (id: string) => {
    setSlots((prev) => prev.filter((slot) => slot.id !== id));
  };

  const updateSlot = (id: string, title: string) => {
    setSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, title } : slot)),
    );
  };

  const sendRequest = (request: MeetingRequest) => {
    setRequests((prev) => [...prev, request]);
  };

  const acceptRequest = (id: string) => {
    const request = requests.find((req) => req.id === id);

    if (!request) return;

    setConfirmed((prev) => [
      ...prev,
      {
        id: request.id,

        senderId: request.senderId,
        senderName: request.senderName,

        receiverId: request.receiverId,
        receiverName: request.receiverName,

        date: request.date,
        time: request.time,

        status: "confirmed",
      },
    ]);

    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const declineRequest = (id: string) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  return (
    <CollaborationContext.Provider
      value={{
        slots,
        requests,
        confirmed,
        addSlot,
        deleteSlot,
        updateSlot,

        sendRequest,

        acceptRequest,
        declineRequest,
      }}
    >
      {children}
    </CollaborationContext.Provider>
  );
};

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);

  if (!context) {
    throw new Error(
      "useCollaboration must be used within CollaborationProvider",
    );
  }

  return context;
};
