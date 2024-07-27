import React from "react";
import { useForm } from "react-hook-form";
import {
  SolicitacaoBase,
  updateSolicitacaoBase,
} from "../../services/api/solicitacaoBase";
import { ModalContainer, ModalContent, Title } from "./modalUserStyles";
import { Buttons, Inputn } from "../../utils/commonStyles";
import { Formn } from "./modalUserStyles";
import { BsClipboard2X, BsClipboard2Check } from "react-icons/bs";

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
        <Formn onSubmit={handleSubmit(onSubmit)}>
          <Inputn
            type="text"
            {...register("SB_DataSolicitacao", {
              required: "Logradouro é obrigatório",
            })}
            placeholder="Logradouro"
          />
          {errors.SB_DataSolicitacao && (
            <span>{errors.SB_DataSolicitacao.message}</span>
          )}

          <Inputn
            {...register("SB_Observacoes", {
              required: "Observações são obrigatórias",
            })}
            placeholder="Observações"
          />
          {errors.SB_Observacoes && (
            <span>{errors.SB_Observacoes.message}</span>
          )}

          <Buttons type="button" onClick={onClose}>
            Cancelar <BsClipboard2X />
          </Buttons>
          <Buttons type="submit">Salvar
            <BsClipboard2Check />
          </Buttons>
        </Formn>
      </ModalContent>
    </ModalContainer>
  );
};

export default EditModal;
