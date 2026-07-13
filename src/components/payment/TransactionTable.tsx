import React from "react";

import { Card, CardHeader, CardBody } from "../ui/Card";
import { Badge } from "../ui/Badge";

import { Transaction } from "../../types/payment";

interface Props {
  transactions: Transaction[];
}

const TransactionTable: React.FC<Props> = ({ transactions }) => {
  return (
    <Card className="rounded-2xl shadow-lg">
      <CardHeader>
        <h2 className="text-xl font-semibold">Transaction History</h2>
      </CardHeader>

      <CardBody className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="py-3">Date</th>

              <th>Sender</th>

              <th>Receiver</th>

              <th>Type</th>

              <th>Amount</th>

              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b hover:bg-gray-50">
                <td className="py-4">{transaction.date}</td>

                <td>{transaction.sender}</td>

                <td>{transaction.receiver}</td>

                <td>{transaction.type}</td>

                <td>${transaction.amount.toLocaleString()}</td>

                <td>
                  <Badge
                    variant={
                      transaction.status === "Completed"
                        ? "success"
                        : transaction.status === "Pending"
                          ? "warning"
                          : "error"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default TransactionTable;
