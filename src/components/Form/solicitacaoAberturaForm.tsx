import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SolicitacaoAbertura } from "../../services/api/solicitacaoAberturaService";
import {
  Field,
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";
import { Inputn, Title } from "../../utils/commonStyles";
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
  // const servAceitoValue = watch();
  // const hasAberturaValue = watch();

  return (
    <Formn onSubmit={handleSubmit(handleFormSubmit)}>
      <SectionBox>
        <SectionTitle>Solicitação de Abertura</SectionTitle>
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
        <Title>Acatamento Abertura</Title>
        <FieldTwo>
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
            <Labeln>Passado Para</Labeln>
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
      </SectionBox>
    </Formn>
  );
};

export default SolicitacaoAberturaForm;
