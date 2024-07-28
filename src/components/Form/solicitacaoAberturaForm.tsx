import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  createSolicitacaoAbertura,
  SolicitacaoAbertura,
} from "../../services/api/solicitacaoAberturaService";
import {
  Field,
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";
import { Inputn } from "../../utils/commonStyles";
import { Formn, TextArean } from "../../utils/modals/modalUserStyles";
import { AcatamentosAbertura } from "../../services/api/acatamentosAberturaService";

interface CombinedSolicitacaoAbertura
  extends SolicitacaoAbertura,
    AcatamentosAbertura {}
interface SolicitacaoAberturaFormProps {
  solicitacaoBaseId: number;
  onSubmit: (data: CombinedSolicitacaoAbertura) => void;
}

const SolicitacaoAberturaForm: React.FC<SolicitacaoAberturaFormProps> = ({
  solicitacaoBaseId,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CombinedSolicitacaoAbertura>();

  const handleFormSubmit = async (data: CombinedSolicitacaoAbertura) => {
    try {
      data.SB_SolicitacaoBase_id_SolicitacaoBase = solicitacaoBaseId;

      const createdSolicitacaoAbertura = await createSolicitacaoAbertura(data);

      onSubmit(createdSolicitacaoAbertura);
    } catch (error) {
      console.error("Erro ao criar solicitação abertura:", error);
    }
  };

  return (
    <Formn onSubmit={handleSubmit(handleFormSubmit)}>
      <SectionBox>
        <SectionTitle> Solicitação Abertura ?</SectionTitle>
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
      </SectionBox>
      <SectionBox>
        <SectionTitle> Abertura de Acatamento </SectionTitle>
        <Field>
          <InfoBox>
            <Labeln>Data Abertura</Labeln>
            <Inputn
              type="date"
              {...register("SB_DataAcatamentoAbertura", {
                required: "Data Abertura é obrigatória",
              })}
            />
            {errors.SB_DataAcatamentoAbertura && (
              <span>{errors.SB_DataAcatamentoAbertura.message}</span>
            )}
          </InfoBox>
          <InfoBox>
            <Labeln>Passsado Para</Labeln>
            <Inputn type="text" {...register("SB_HNMotivo")} />
            {errors.SB_EquipeResponsavelAbertura && (
              <span>{errors.SB_EquipeResponsavelAbertura.message}</span>
            )}
          </InfoBox>
          <InfoBox>
            <Labeln>Previsão (h)</Labeln>
            <Inputn
              type="text"
              {...register("SB_PrvisaoAcatamentoAbertura", {
                required: "Data Abertura é obrigatória",
              })}
            />
            {errors.SB_PrvisaoAcatamentoAbertura && (
              <span>{errors.SB_PrvisaoAcatamentoAbertura.message}</span>
            )}
          </InfoBox>
          <InfoBox>
            <Labeln>Obeservações</Labeln>
            <TextArean {...register("SB_ObservacaoAcatamentoAbertura")} />
            {errors.SB_ObservacaoAcatamentoAbertura && (
              <span>{errors.SB_ObservacaoAcatamentoAbertura.message}</span>
            )}
          </InfoBox>
        </Field>
      </SectionBox>
    </Formn>
  );
};

export default SolicitacaoAberturaForm;
