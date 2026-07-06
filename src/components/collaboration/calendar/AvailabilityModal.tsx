import React, { useState } from "react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";

interface Props {
  date: string;
  initialStart?: string;
  initialEnd?: string;
  onSave: (start: string, end: string) => void;
  onDelete?: () => void;
  onClose: () => void;
}

export const AvailabilityModal: React.FC<Props> = ({
  date,
  initialStart,
  initialEnd,
  onSave,
  onDelete,
  onClose,
}) => {
  const [start, setStart] = useState(initialStart || "");
  const [end, setEnd] = useState(initialEnd || "");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md space-y-4 animate-slide-in">
        <h2 className="text-lg font-semibold">Add Availability</h2>

        <p className="text-sm text-gray-500">{date}</p>

        <Input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />

        <Input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />

        <div className="flex justify-between gap-2">
          {onDelete && (
            <Button variant="outline" onClick={onDelete}>
              Delete
            </Button>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button onClick={() => onSave(start, end)}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
