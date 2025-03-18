import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Overlay, Content, Title, CloseButton } from "./styles";
import Button from "../Button";
import close from "../../../../public/close.svg";
import Image from "next/image";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Overlay />
      <Content>
        <Title>Tem certeza que deseja excluir este projeto?</Title>
        <CloseButton onClick={onClose}>
          <Image src={close} alt="close-modal-button" height={16} width={16} />
        </CloseButton>
        <Button text="Confirmar" onClick={onConfirm} />
      </Content>
    </Dialog.Root>
  );
};

export default ConfirmDeleteModal;
