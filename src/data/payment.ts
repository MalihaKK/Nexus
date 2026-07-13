import { Transaction } from "../types/payment";

export const initialBalance = 25000;

export const initialTransactions: Transaction[] = [
  {
    id: 1,
    date: "2026-07-01",
    sender: "John Investor",
    receiver: "TechNova",
    amount: 5000,
    type: "Funding",
    status: "Completed",
  },
  {
    id: 2,
    date: "2026-07-02",
    sender: "Wallet",
    receiver: "Bank",
    amount: 1200,
    type: "Withdraw",
    status: "Completed",
  },
  {
    id: 3,
    date: "2026-07-03",
    sender: "Bank",
    receiver: "Wallet",
    amount: 3000,
    type: "Deposit",
    status: "Completed",
  },
  {
    id: 4,
    date: "2026-07-04",
    sender: "Investor A",
    receiver: "Startup X",
    amount: 2500,
    type: "Funding",
    status: "Pending",
  },
  {
    id: 5,
    date: "2026-07-05",
    sender: "Wallet",
    receiver: "Sarah",
    amount: 800,
    type: "Transfer",
    status: "Completed",
  },
];