import React from "react";
import {
  PlusCircle,
  MinusCircle,
  Send,
} from "lucide-react";

import { Button } from "../ui/Button";

interface Props {
  onDeposit: () => void;
  onWithdraw: () => void;
  onTransfer: () => void;
}

const PaymentActions: React.FC<Props> = ({
  onDeposit,
  onWithdraw,
  onTransfer,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Button
        onClick={onDeposit}
        leftIcon={<PlusCircle size={18} />}
      >
        Deposit
      </Button>

      <Button
        variant="outline"
        onClick={onWithdraw}
        leftIcon={<MinusCircle size={18} />}
      >
        Withdraw
      </Button>

      <Button
        variant="secondary"
        onClick={onTransfer}
        leftIcon={<Send size={18} />}
      >
        Transfer
      </Button>
    </div>
  );
};

export default PaymentActions;