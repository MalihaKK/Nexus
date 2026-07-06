import React, { useState } from 'react';
import { Calendar, Clock, User } from 'lucide-react';

import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';

interface MeetingRequestModalProps {
  participant: string;
  onClose: () => void;
  onSend: (date: string, time: string) => void;
}

export const MeetingRequestModal: React.FC<MeetingRequestModalProps> = ({
  participant,
  onClose,
  onSend,
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = () => {
    if (!date || !time) return;

    onSend(date, time);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl animate-slide-in">

        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Send Meeting Request
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Schedule a meeting with the selected participant.
          </p>
        </div>

        {/* Body */}
        <div className="space-y-5 px-6 py-5">

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <User size={16} />
              Participant
            </label>

            <Input
              value={participant}
              disabled
              fullWidth
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar size={16} />
              Meeting Date
            </label>

            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
              <Clock size={16} />
              Meeting Time
            </label>

            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              fullWidth
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
          >
            Send Request
          </Button>

        </div>

      </div>
    </div>
  );
};