import React from "react";
import { CheckCircle, Trash2 } from "lucide-react";

import { Card, CardBody, CardHeader } from "../../ui/Card";
import { Button } from "../../ui/Button";
import { useCollaboration } from "../../../context/CollaborationContext";
import { useAuth } from "../../../context/AuthContext";

export const ConfirmedMeetings: React.FC = () => {
  const { confirmed, deleteConfirmedMeeting } = useCollaboration();
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <CheckCircle size={20} className="text-success-500" />

        <h2 className="text-lg font-medium text-gray-900">
          Confirmed Meetings
        </h2>
      </CardHeader>

      <CardBody className="space-y-4">
        {confirmed.length > 0 ? (
          confirmed
            .filter(
              (meeting) =>
                meeting.senderId === user?.id ||
                meeting.receiverId === user?.id
            )
            .map((meeting) => (
              <div
                key={meeting.id}
                className="p-4 rounded-xl border border-gray-200 flex justify-between items-start"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {user?.id === meeting.senderId
                      ? meeting.receiverName
                      : meeting.senderName}
                  </p>

                  <p className="text-sm text-gray-500">
                    {meeting.date}
                  </p>

                  <p className="text-sm text-gray-500">
                    {meeting.time}
                  </p>

                  <p className="mt-2 text-success-700 font-medium capitalize">
                    {meeting.status}
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => deleteConfirmedMeeting(meeting.id)}
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </div>
            ))
        ) : (
          <p className="text-sm text-gray-500">
            No confirmed meetings yet.
          </p>
        )}
      </CardBody>
    </Card>
  );
};