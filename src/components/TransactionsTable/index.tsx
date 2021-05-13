import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Container } from "./styles";

interface Transaction {
  id: string;
  title: string;
  price: number;
  type: string;
  category: string;
  createdAt: Date;
}

export const TransactionsTable = () => {
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
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions?.map(
            ({ id, title, price, type, category, createdAt }) => (
              <tr key={id}>
                <td>{title}</td>
                <td className={type}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(price)}
                </td>
                <td>{category}</td>
                <td>
                  {new Intl.DateTimeFormat("pt-BR").format(new Date(createdAt))}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </Container>
  );
};
