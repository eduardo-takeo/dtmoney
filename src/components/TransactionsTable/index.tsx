import React from "react";
import { Container } from "./styles";

export const TransactionsTable = () => {
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
