import React from "react";
import { useForm } from "react-hook-form";
import {
  SolicitacaoBase,
  updateSolicitacaoBase,
} from "../../services/api/solicitacaoBase";
import { Form, ModalContainer, ModalContent, Title } from "./modalUser";
import { Buttons } from "../../pages/usuarios/styles";

interface EditModalProps {
  solicitacao: SolicitacaoBase;
  onClose: () => void;
  onSave: (updated: SolicitacaoBase) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  solicitacao,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SolicitacaoBase>();

  const onSubmit = async (data: SolicitacaoBase) => {
    try {
      const updatedSolicitacao = await updateSolicitacaoBase(
        solicitacao.id_SolicitacaoBase!,
        data
      );
      onSave(updatedSolicitacao);
    } catch (error) {
      console.error("Erro ao atualizar solicitação:", error);
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <Title>Editar Solicitação</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("SB_DataSolicitacao", {
              required: "Logradouro é obrigatório",
            })}
            placeholder="Logradouro"
          />
          {errors.SB_DataSolicitacao && (
            <span>{errors.SB_DataSolicitacao.message}</span>
          )}

          <input
            {...register("SB_Observacoes", {
              required: "Observações são obrigatórias",
            })}
            placeholder="Observações"
          />
          {errors.SB_Observacoes && (
            <span>{errors.SB_Observacoes.message}</span>
          )}

          <Buttons type="button" onClick={onClose}>
            Cancelar
          </Buttons>
          <Buttons type="submit">Salvar</Buttons>
        </Form>
      </ModalContent>
    </ModalContainer>
  );
};

export default EditModal;
