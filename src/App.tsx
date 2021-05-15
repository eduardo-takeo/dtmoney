import React, { useState } from "react";
import Modal from "react-modal";
import { createServer, Model } from "miragejs";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";

import GlobalStyle from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./contexts/TransactionsContext";

createServer({
  models: {
    transaction: Model,
  },
  seeds(server) {
    server.create("transaction", {
      id: "1",
      title: "PC gamer",
      type: "withdraw",
      amount: 5000,
      category: "Compras",
      createdAt: new Date().toLocaleDateString(),
    });
    server.create("transaction", {
      id: "2",
      title: "Salário",
      type: "deposit",
      amount: 15000,
      category: "Renda mensal",
      createdAt: new Date().toLocaleDateString(),
    });
    server.create("transaction", {
      id: "3",
      title: "Curso",
      type: "withdraw",
      amount: 250,
      category: "Educação",
      createdAt: new Date().toLocaleDateString(),
    });
  },
  routes() {
    this.namespace = "/api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    });
  },
});

Modal.setAppElement("#root");

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function openNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function closeNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <GlobalStyle />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={closeNewTransactionModal}
      />

      <Header openModal={openNewTransactionModal} />
      <Dashboard />
    </TransactionsProvider>
  );
}

export default App;
