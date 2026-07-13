import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { CalendarDays } from "lucide-react";

import { Card, CardBody, CardHeader } from "../../ui/Card";
import { Badge } from "../../ui/Badge";
import { AvailabilityModal } from "./AvailabilityModal";
import { useCollaboration } from "../../../context/CollaborationContext";
import { useAuth } from "../../../context/AuthContext";

export const AvailabilityCalendar: React.FC = () => {
  const {
    slots,
    confirmed,
    addSlot,
    updateSlot,
    deleteSlot,
    deleteConfirmedMeeting,
  } = useCollaboration();

  const { user } = useAuth();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [editingSlot, setEditingSlot] = useState<any>(null);

  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;

    // Confirmed meeting
    if (event.extendedProps.type === "meeting") {
      setEditingSlot({
        id: event.id,
        type: "meeting",
        date: event.startStr,
        start: "",
        end: "",
      });

      return;
    }

    // Availability slot
    const [start, end] = event.title.split(" - ");

    setEditingSlot({
      id: event.id,
      type: "slot",
      date: event.startStr,
      start,
      end,
    });
  };

  const calendarEvents = [
    ...slots.map((slot) => ({
      ...slot,
      extendedProps: {
        type: "slot",
      },
    })),

    ...confirmed
      .filter(
        (meeting) =>
          meeting.senderId === user?.id ||
          meeting.receiverId === user?.id
      )
      .map((meeting) => ({
        id: meeting.id,
        title:
          user?.id === meeting.receiverId
            ? `Meeting with ${meeting.senderName}`
            : `Meeting with ${meeting.receiverName}`,
        start: `${meeting.date}T${meeting.time}`,
        color: "#2563eb",
        extendedProps: {
          type: "meeting",
        },
      })),
  ];

  return (
    <>
      <Card>
        <CardHeader className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-primary-600" />

            <h2 className="text-lg font-medium text-gray-900">
              Availability Calendar
            </h2>
          </div>

          <Badge variant="primary">
            {slots.length + confirmed.length} Events
          </Badge>
        </CardHeader>

        <CardBody className="p-3 sm:p-4 md:p-6">
          <div className="rounded-xl overflow-x-auto border border-gray-200 p-4 bg-white shadow-sm">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={calendarEvents}
              dateClick={(info) => setSelectedDate(info.dateStr)}
              eventClick={handleEventClick}
              height="auto"
            />
          </div>
        </CardBody>
      </Card>

      {/* Add Slot */}
      {selectedDate && (
        <AvailabilityModal
          date={selectedDate}
          onClose={() => setSelectedDate(null)}
          onSave={(start, end) => {
            addSlot({
              id: Date.now().toString(),
              title: `${start} - ${end}`,
              date: selectedDate,
            });

            setSelectedDate(null);
          }}
        />
      )}

      {/* Edit/Delete */}
      {editingSlot && (
        <AvailabilityModal
          date={editingSlot.date}
          initialStart={editingSlot.start}
          initialEnd={editingSlot.end}
          onClose={() => setEditingSlot(null)}
          onSave={(start, end) => {
            if (editingSlot.type === "slot") {
              updateSlot(editingSlot.id, `${start} - ${end}`);
            }

            setEditingSlot(null);
          }}
          onDelete={() => {
            if (editingSlot.type === "slot") {
              deleteSlot(editingSlot.id);
            } else {
              deleteConfirmedMeeting(editingSlot.id);
            }

            setEditingSlot(null);
          }}
        />
      )}
    </>
  );
};