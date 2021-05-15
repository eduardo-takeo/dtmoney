import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: Date;
}

type TransactionInput = Omit<Transaction, "id">;

interface TransactionContextProviderProps {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => void;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext =
  createContext<TransactionContextProviderProps>(
    {} as TransactionContextProviderProps
  );

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    await api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }

  async function createTransaction(transactionInput: TransactionInput) {
    try {
      const response = await api.post("/transactions", transactionInput);
      const { transaction } = response.data;

      setTransactions([...transactions, transaction]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
