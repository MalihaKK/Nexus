import React, { useState } from "react";
import { Landmark } from "lucide-react";

import { Card, CardHeader, CardBody } from "../ui/Card";
import { Button } from "../ui/Button";

interface Props {
  onFund: (
    startup: string,
    amount: number
  ) => void;
}

const FundingFlow: React.FC<Props> = ({
  onFund,
}) => {
  const [startup, setStartup] = useState("");
  const [amount, setAmount] = useState("");

  const handleFund = () => {
    const value = Number(amount);

    if (!startup.trim()) {
      alert("Enter startup name.");
      return;
    }

    if (value <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    onFund(startup, value);

    setStartup("");
    setAmount("");
  };

  return (
    <Card className="rounded-2xl shadow-lg">

      <CardHeader>

        <div className="flex items-center gap-2">

          <Landmark
            size={24}
            className="text-primary-600"
          />

          <h2 className="text-xl font-semibold">
            Funding Deal
          </h2>

        </div>

      </CardHeader>

      <CardBody className="space-y-4">

        <div>

          <label className="block mb-2 text-sm">
            Startup Name
          </label>

          <input
            className="w-full border rounded-lg px-4 py-3"
            placeholder="TechNova"
            value={startup}
            onChange={(e) =>
              setStartup(e.target.value)
            }
          />

        </div>

        <div>

          <label className="block mb-2 text-sm">
            Funding Amount
          </label>

          <input
            type="number"
            className="w-full border rounded-lg px-4 py-3"
            placeholder="5000"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

        </div>

        <Button
          className="w-full"
          onClick={handleFund}
        >
          Fund Startup
        </Button>

      </CardBody>

    </Card>
  );
};

export default FundingFlow;