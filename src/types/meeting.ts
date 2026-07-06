export interface AvailabilitySlot {
  id: string;
  title: string;
  date: string;
}

export interface MeetingRequest {
  id: string;

  senderId: string;
  senderName: string;

  receiverId: string;
  receiverName: string;

  date: string;
  time: string;

  status: "pending" | "accepted" | "declined";
}

export interface ConfirmedMeeting {
  id: string;

  senderId: string;
  senderName: string;

  receiverId: string;
  receiverName: string;

  date: string;
  time: string;

  status: "confirmed";
}