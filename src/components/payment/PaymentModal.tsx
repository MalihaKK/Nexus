import React, { useState, useEffect } from "react";

import { Card, CardBody } from "../ui/Card";
import { Button } from "../ui/Button";

interface Props {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: (receiver: string, amount: number) => void;
}

const PaymentModal: React.FC<Props> = ({
  isOpen,
  title,
  onClose,
  onConfirm,
}) => {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (isOpen) {
      setReceiver("");
      setAmount("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const value = Number(amount);

    if (value <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    onConfirm(receiver, value);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <Card className="w-full max-w-md rounded-2xl shadow-xl">

        <CardBody className="p-6">

          <h2 className="text-2xl font-bold mb-6">
            {title}
          </h2>

          {title === "Transfer" && (
            <div className="mb-4">
              <label className="block text-sm mb-2">
                Receiver
              </label>

              <input
                type="text"
                placeholder="Enter receiver name"
                value={receiver}
                onChange={(e) =>
                  setReceiver(e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          )}

          <div className="mb-6">

            <label className="block text-sm mb-2">
              Amount
            </label>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3"
            />

          </div>

          <div className="flex justify-end gap-3">

            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
            >
              Confirm
            </Button>

          </div>

        </CardBody>

      </Card>

    </div>
  );
};

export default PaymentModal;