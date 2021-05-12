import React from "react";
import { createServer } from "miragejs";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";

import GlobalStyle from "./styles/global";

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

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Dashboard />
    </>
  );
}

export default App;
