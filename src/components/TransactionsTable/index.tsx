import React, { useEffect } from "react";
import { Container } from "./styles";

export const TransactionsTable = () => {
  useEffect(() => {
    fetch("http://localhost:3000/api/transactions")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

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
          <tr>
            <td>Desenvolvimento de site</td>
            <td>R$12.000,00</td>
            <td>Venda</td>
            <td>13/04/2021</td>
          </tr>
          <tr>
            <td>PC</td>
            <td className="withdraw"> -R$6.000,00</td>
            <td>Compra</td>
            <td>21/04/2021</td>
          </tr>
          <tr>
            <td>Ovo</td>
            <td className="deposit">R$25.000,00</td>
            <td>Venda</td>
            <td>29/04/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};
