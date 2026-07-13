import React, { useState } from "react";
import { useEffect } from "react";
import WalletCard from "../../components/payment/WalletCard";
import PaymentActions from "../../components/payment/PaymentActions";
import PaymentModal from "../../components/payment/PaymentModal";
import TransactionTable from "../../components/payment/TransactionTable";
import FundingFlow from "../../components/payment/FundingFlow";

import {
  initialTransactions,
  initialBalance,
} from "../../data/payment";

import {
  Transaction,
  TransactionType,
} from "../../types/payment";

 const PAYMENT_STORAGE = "nexus-payments";
const BALANCE_STORAGE = "nexus-wallet";

const PaymentsPage: React.FC = () => {
  const [balance, setBalance] = useState(() => {
  const saved = localStorage.getItem(BALANCE_STORAGE);

  return saved ? JSON.parse(saved) : initialBalance;
});

  const [transactions, setTransactions] =
useState<Transaction[]>(() => {
  const saved = localStorage.getItem(PAYMENT_STORAGE);

  return saved
    ? JSON.parse(saved)
    : initialTransactions;
});
useEffect(() => {
  localStorage.setItem(
    BALANCE_STORAGE,
    JSON.stringify(balance)
  );
}, [balance]);

useEffect(() => {
  localStorage.setItem(
    PAYMENT_STORAGE,
    JSON.stringify(transactions)
  );
}, [transactions]);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [action, setAction] =
    useState<TransactionType>("Deposit");

  const openModal = (
    type: TransactionType
  ) => {
    setAction(type);
    setModalOpen(true);
  };

  const addTransaction = (
    receiver: string,
    amount: number
  ) => {
    let newBalance = balance;

    if (action === "Deposit") {
      newBalance += amount;
    }

    if (action === "Withdraw") {
      if (amount > balance) {
        alert("Insufficient Balance");
        return;
      }

      newBalance -= amount;
    }

    if (action === "Transfer") {
      if (amount > balance) {
        alert("Insufficient Balance");
        return;
      }

      newBalance -= amount;
    }

    setBalance(newBalance);

    const transaction: Transaction = {
      id: Date.now(),
      sender:
        action === "Deposit"
          ? "Bank"
          : "You",

      receiver:
        action === "Deposit"
          ? "Wallet"
          : receiver || "Wallet",

      amount,

      type: action,

      status: "Completed",

      date: new Date().toLocaleDateString(),
    };

    setTransactions((prev) => [
      transaction,
      ...prev,
    ]);

    setModalOpen(false);
  };

  const fundStartup = (
    startup: string,
    amount: number
  ) => {
    if (amount > balance) {
      alert("Insufficient Balance");
      return;
    }

   setBalance((prev: number) => prev - amount);
    const transaction: Transaction = {
      id: Date.now(),

      sender: "Investor",

      receiver: startup,

      amount,

      type: "Funding",

      status: "Completed",

      date: new Date().toLocaleDateString(),
    };

    setTransactions((prev: Transaction[]) => [
      transaction,
      ...prev,
    ]);
  };
  const totalDeposits = transactions
  .filter((t) => t.type === "Deposit")
  .reduce((sum, t) => sum + t.amount, 0);

const totalWithdrawals = transactions
  .filter((t) => t.type === "Withdraw")
  .reduce((sum, t) => sum + t.amount, 0);
    return (
    <div className="space-y-8 animate-fade-in">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-gray-900">
          Payments
        </h1>

        <p className="text-gray-600 mt-2">
          Manage wallet, transactions and funding deals.
        </p>

      </div>

      {/* Wallet */}
<WalletCard
  balance={balance}
  totalDeposits={totalDeposits}
  totalWithdrawals={totalWithdrawals}
/>

      {/* Actions */}

      <PaymentActions
        onDeposit={() => openModal("Deposit")}
        onWithdraw={() => openModal("Withdraw")}
        onTransfer={() => openModal("Transfer")}
      />

      {/* Funding Flow */}

      <FundingFlow
        onFund={fundStartup}
      />

      {/* Transactions */}

      <TransactionTable
        transactions={transactions}
      />

      {/* Payment Modal */}

      <PaymentModal
        isOpen={modalOpen}
        title={action}
        onClose={() => setModalOpen(false)}
        onConfirm={addTransaction}
      />

    </div>
  );
};

export default PaymentsPage;