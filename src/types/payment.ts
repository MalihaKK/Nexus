export type TransactionType =
  | "Deposit"
  | "Withdraw"
  | "Transfer"
  | "Funding";

export interface Transaction {
  id: number;

  date: string;

  sender: string;

  receiver: string;

  amount: number;

  type: TransactionType;

  status: "Completed" | "Pending" | "Failed";
}

export interface Wallet {
  balance: number;
}