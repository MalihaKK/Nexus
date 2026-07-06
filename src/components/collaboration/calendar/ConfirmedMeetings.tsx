import React from 'react';
import { CheckCircle } from 'lucide-react';

import { Card, CardBody, CardHeader } from '../../ui/Card';
import { useCollaboration } from '../../../context/CollaborationContext';

export const ConfirmedMeetings: React.FC = () => {
  const { confirmed } = useCollaboration();

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
          confirmed.map((meeting) => (
            <div
              key={meeting.id}
              className="p-4 rounded-xl border border-gray-200"
            >
              <p className="font-medium text-gray-900">
                {meeting.participant}
              </p>

              <p className="text-sm text-gray-500">
                {meeting.date}
              </p>

              <p className="text-sm text-gray-500">
                {meeting.time}
              </p>

              <p className="mt-2 text-success-700 font-medium">
                {meeting.status}
              </p>
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