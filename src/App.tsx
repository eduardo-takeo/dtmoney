import React, { useState } from "react";
import Modal from "react-modal";
import { createServer, Model } from "miragejs";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";

import GlobalStyle from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";

createServer({
  models: {
    transaction: Model,
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
    useState(true);

  function openNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function closeNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      <GlobalStyle />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={closeNewTransactionModal}
      />

      <Header openModal={openNewTransactionModal} />
      <Dashboard />
    </>
  );
}

export default App;
