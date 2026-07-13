import React from "react";
import { Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

import { Card, CardHeader, CardBody } from "../ui/Card";

interface Props {
  balance: number;
  totalDeposits: number;
  totalWithdrawals: number;
}

const WalletCard: React.FC<Props> = ({
  balance,
  totalDeposits,
  totalWithdrawals,
}) => {
  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Wallet className="text-primary-600" size={28} />

          <div>
            <h2 className="text-xl font-semibold">
              Wallet Balance
            </h2>

            <p className="text-sm text-gray-500">
              Available Balance
            </p>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <h1 className="text-4xl font-bold text-primary-600">
          ${balance.toLocaleString()}
        </h1>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownCircle
                className="text-green-600"
                size={22}
              />

              <span className="font-medium">
                Deposits
              </span>
            </div>

            <p className="text-2xl font-bold text-green-700">
              ${totalDeposits.toLocaleString()}
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpCircle
                className="text-red-600"
                size={22}
              />

              <span className="font-medium">
                Withdrawals
              </span>
            </div>

            <p className="text-2xl font-bold text-red-700">
              ${totalWithdrawals.toLocaleString()}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default WalletCard;