import React, { useState } from "react";
import Modal from "react-modal";
import { createServer } from "miragejs";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";

import GlobalStyle from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";

createServer({
  routes() {
    this.namespace = "/api";

    this.get("/transactions", () => [
      { id: "1", name: "Luke" },
      { id: "2", name: "Leia" },
      { id: "3", name: "Anakin" },
    ]);
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
