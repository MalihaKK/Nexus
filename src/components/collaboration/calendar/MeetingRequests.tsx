import React from 'react';
import { Clock } from 'lucide-react';

import { Card, CardBody, CardHeader } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { useCollaboration } from '../../../context/CollaborationContext';

export const MeetingRequests: React.FC = () => {
  const {
    requests,
    acceptRequest,
    declineRequest,
  } = useCollaboration();

  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <Clock size={20} className="text-accent-600" />
        <h2 className="text-lg font-medium text-gray-900">
          Meeting Requests
        </h2>
      </CardHeader>

      <CardBody className="space-y-4">
        {requests.length > 0 ? (
          requests.map((request) => (
            <div
              key={request.id}
              className="p-4 rounded-xl border border-gray-200"
            >
              <p className="font-medium text-gray-900">
                {request.participant}
              </p>

              <p className="text-sm text-gray-500">
                {request.date}
              </p>

              <p className="text-sm text-gray-500">
                {request.time}
              </p>

              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  onClick={() => acceptRequest(request.id)}
                >
                  Accept
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => declineRequest(request.id)}
                >
                  Decline
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            No pending meeting requests.
          </p>
        )}
      </CardBody>
    </Card>
  );
};