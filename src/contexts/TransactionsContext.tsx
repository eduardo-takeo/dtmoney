import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

interface Transaction {
  id: string;
  title: string;
  price: number;
  type: string;
  category: string;
  createdAt: Date;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<Transaction[]>([]);

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

  return (
    <TransactionsContext.Provider value={transactions}>
      {children}
    </TransactionsContext.Provider>
  );
}
