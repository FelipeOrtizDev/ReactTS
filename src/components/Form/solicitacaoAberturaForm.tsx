import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SolicitacaoAbertura } from "../../services/api/solicitacaoAberturaService";
import {
  Field,
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
  TextArean,
} from "../../pages/Fechamento/styles";
import { Inputn, Optionn, Selectn, Title } from "../../utils/commonStyles";
import { FieldTwo, Formn, ObsArea } from "../../utils/modals/modalUserStyles";

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
    watch,
    formState: { errors },
  } = useForm<SolicitacaoAbertura>({
    defaultValues: solicitacaoAbertura,
  });

  const handleFormSubmit: SubmitHandler<SolicitacaoAbertura> = (data) => {
    onSubmit(data);
  };
  const servAceitoValue = watch("SB_ServiçoAceito");
  const hasAberturaValue = watch("SB_HAbertura");

  return (
    <Formn onSubmit={handleSubmit(handleFormSubmit)}>
      <SectionBox>
        <Title>Solicitação de Abertura</Title>
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
            <Labeln>Hora</Labeln>
            <Inputn
              type="time"
              {...register("SB_HoraAbertura", {
                required: "Hora é obrigatória",
              })}
            />
            {errors.SB_HoraAbertura && (
              <span>{errors.SB_HoraAbertura.message}</span>
            )}
          </InfoBox>
          <InfoBox>
            <Labeln>Solicitante</Labeln>
            <Inputn
              type="text"
              {...register("SB_Solicitante", {
                required: "Data Abertura é obrigatória",
              })}
            />
            {errors.SB_Solicitante && (
              <span>{errors.SB_Solicitante.message}</span>
            )}
          </InfoBox>
        </Field>
        <SectionTitle>Acatamento Abertura</SectionTitle>
        <FieldTwo>
          <InfoBox>
            <Labeln>Data Abertura</Labeln>
            <Inputn
              type="date"
            // {...register("SB_DataAbertura", {
            //   required: "Data Abertura é obrigatória",
            // })}
            />
            {/* {errors.SB_DataAbertura && (
              <span>{errors.SB_DataAbertura.message}</span>
            )} */}
          </InfoBox>
          <InfoBox>
            <Labeln>Passado Para</Labeln>
            <Inputn
              type="text"
            // {...register("SB_Solicitante", {
            //   required: "Data Abertura é obrigatória",
            // })}
            />
            {/* {errors.SB_Solicitante && (
              <span>{errors.SB_Solicitante.message}</span>
            )} */}
          </InfoBox>
        </FieldTwo>
        <FieldTwo>
          <InfoBox>
            <Labeln>Previsão</Labeln>
            <Inputn
              type="time"
            // {...register("", {
            //   required: "Previsão é obrigatória",
            // })}
            />
            {/* {errors.SB_Previsão && (
                    <span>{errors.SB_Previsão.message}</span>
                  )} */}
          </InfoBox>
          <InfoBox>
            <Labeln>Observações</Labeln>
            <ObsArea
            // {...register("SB_HFSObservacaoFechamento")} 
            />
            {/* {errors.SB_HFSObservacaoFechamento && (
                    <span>{errors.SB_HFSObservacaoFechamento.message}</span>
                  )} */}
          </InfoBox>
        </FieldTwo>
      </SectionBox>
      <SectionBox>
        <SectionTitle>O Serviço de Abertura foi aceito?</SectionTitle>
        <Selectn {...register("SB_ServiçoAceito", { valueAsNumber: true })}>
          <Optionn value="">Selecione...</Optionn>
          <Optionn value={1}>Sim</Optionn>
          <Optionn value={0}>Não</Optionn>
        </Selectn>
      </SectionBox>
      {servAceitoValue === 1 && (<>
        <SectionBox>
          <SectionTitle>Houve Abertura?</SectionTitle>
          <Selectn {...register("SB_HAbertura", { valueAsNumber: true })}>
            <Optionn value="">Selecione...</Optionn>
            <Optionn value={1}>Sim</Optionn>
            <Optionn value={0}>Não</Optionn>
          </Selectn>
          {hasAberturaValue === 1 && (<>
            <InfoBox>
              <Labeln>Data</Labeln>
              <Inputn type="date"{...register("SB_HSData")} />
            </InfoBox>
          </>)}
          {hasAberturaValue === 0 && (
            <>
              <FieldTwo>
                <InfoBox>
                  <Labeln>Motivo</Labeln>
                  <Inputn placeholder="Digite o motivo da não abertura aqui" type="text" {...register("SB_HNMotivo")} />
                </InfoBox>
                <InfoBox>
                  <Labeln>Obsevações da Não Abertura</Labeln>
                  <TextArean placeholder="Digite as obsevações aqui"{...register("SB_HNObservacoes")} />
                </InfoBox>
              </FieldTwo>
            </>
          )}
        </SectionBox>
      </>)}
    </Formn>
  );
};

export default SolicitacaoAberturaForm;
