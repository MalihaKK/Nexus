import React from "react";

interface Props {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const StatusSelector: React.FC<Props> = ({
  status,
  setStatus,
}) => {
  return (
    <div className="border rounded-xl p-6 shadow-sm">

      <h3 className="text-lg font-semibold mb-4">
        Document Status
      </h3>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
      >
        <option>Draft</option>

        <option>In Review</option>

        <option>Signed</option>

      </select>

    </div>
  );
};

export default StatusSelector;