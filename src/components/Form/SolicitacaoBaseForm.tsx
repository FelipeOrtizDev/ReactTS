import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SolicitacaoBase } from "../../services/api/solicitacaoBase";
import { Inputn } from "../../utils/commonStyles";
import { Field, InfoBox, Labeln } from "../../pages/Fechamento/styles";

interface SolicitacaoBaseFormProps {
  solicitacao: SolicitacaoBase;
  onSubmit: (data: SolicitacaoBase) => void;
}

const SolicitacaoBaseForm: React.FC<SolicitacaoBaseFormProps> = ({
  solicitacao,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SolicitacaoBase>({
    defaultValues: solicitacao,
  });

  const handleFormSubmit: SubmitHandler<SolicitacaoBase> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Field>
        <InfoBox>
          <Labeln>Data Solicitação</Labeln>
          <Inputn
            type="date"
            {...register("SB_DataSolicitacao", {
              required: "Data é obrigatória",
            })}
          />
          {errors.SB_DataSolicitacao && (
            <span>{errors.SB_DataSolicitacao.message}</span>
          )}
        </InfoBox>
        <InfoBox>
          <Labeln>Hora da Solicitação</Labeln>
          <Inputn
            type="time"
            {...register("SB_HoraSolicitacao", {
              required: "Hora é obrigatória",
            })}
          />
          {errors.SB_HoraSolicitacao && (
            <span>{errors.SB_HoraSolicitacao.message}</span>
          )}
        </InfoBox>
        <InfoBox>
          <Labeln>Polo</Labeln>
          <Inputn
            type="text"
            {...register("SB_Endereco.SB_Polo", {
              required: "Polo é obrigatório",
            })}
          />
          {errors.SB_Endereco?.SB_Polo && (
            <span>{errors.SB_Endereco?.SB_Polo.message}</span>
          )}
        </InfoBox>
        <InfoBox>
          <Labeln>Solicitante</Labeln>
          <Inputn
            type="text"
            {...register("SB_Solicitante", {
              required: "Solicitante é obrigatório",
            })}
          />
          {errors.SB_Solicitante && (
            <span>{errors.SB_Solicitante.message}</span>
          )}
        </InfoBox>
      </Field>
      {/* Add more fields here... */}
      <button type="submit">Salvar Solicitação</button>
    </form>
  );
};

export default SolicitacaoBaseForm;
