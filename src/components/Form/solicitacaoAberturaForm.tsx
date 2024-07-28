import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SolicitacaoAbertura } from "../../services/api/solicitacaoAberturaService";
import { Field, InfoBox, Labeln } from "../../pages/Fechamento/styles";
import { Inputn } from "../../utils/commonStyles";

interface SolicitacaoAberturaFormProps {
  solicitacaoAbertura: SolicitacaoAbertura;
  onSubmit: (data: SolicitacaoAbertura) => void;
}

const SolicitacaoAberturaForm: React.FC<SolicitacaoAberturaFormProps> = ({
  solicitacaoAbertura,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SolicitacaoAbertura>({
    defaultValues: solicitacaoAbertura,
  });

  const handleFormSubmit: SubmitHandler<SolicitacaoAbertura> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Field>
        <InfoBox>
          <Labeln>Data Abertura</Labeln>
          <Inputn
            type="date"
            {...register("SB_DataAbertura", {
              required: "Data Abertura é obrigatória",
            })}
          />
          {errors.SB_DataAbertura && (
            <span>{errors.SB_DataAbertura.message}</span>
          )}
        </InfoBox>
        <InfoBox>
          <Labeln>Motivo</Labeln>
          <Inputn type="text" {...register("SB_HNMotivo")} />
        </InfoBox>
      </Field>
      <button type="submit">Salvar Solicitação Abertura</button>
    </form>
  );
};

export default SolicitacaoAberturaForm;
