import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
  summary: {
    deposits: number;
    withdraws: number;
    total: number;
  };
}

interface TransactionsProviderProps {
  children: ReactNode;
}

const TransactionsContext = createContext<TransactionContextProviderProps>(
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

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, summary }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
