import React from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import { Container } from "./styles";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Close modal" />
      </button>
      <Container>
        <h2>Cadastro de finanças</h2>
        <input type="text" placeholder="Nome" />
        <input type="text" placeholder="Preço" />
        <input type="text" placeholder="Categoria" />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
};
