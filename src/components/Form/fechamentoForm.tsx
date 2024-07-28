import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Fechamento } from "../../services/api/fechamentoService";
import {
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";
import { Field, FieldTwo, Formn, ObsArea } from "../../utils/modals/modalUserStyles";
import { Inputn, Optionn, Selectn } from "../../utils/commonStyles";

interface FechamentoProps {
  fechamento: Fechamento;
  onSubmit: (data: Fechamento) => void;
}

const FechamentoForm: React.FC<FechamentoProps> = ({
  fechamento,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<Fechamento>({
    defaultValues: fechamento,
  });
  const handleFormSubmit: SubmitHandler<Fechamento> = (data) => {
    onSubmit(data);
  };
  const hasFValue = watch("SB_HouveFechamento");
  const [disabledInputs, setDisabledInputs] = useState(false);

  return (
    <>
      <Formn onSubmit={handleSubmit(handleFormSubmit)}>
        <SectionBox>
          <SectionTitle>Houve fechamento?</SectionTitle>
          <Selectn {...register("SB_HouveFechamento", { valueAsNumber: true })}>
            <Optionn value="">Selecione...</Optionn>
            <Optionn value={1}>Sim</Optionn>
            <Optionn value={0}>Não</Optionn>
          </Selectn>
          {hasFValue === 1 && (
            <>
              <Field>
                <InfoBox>
                  <Labeln>Data</Labeln>
                  <Inputn type="date" 
                    disabled={disabledInputs}
                  {...register("SB_DataFechamento", {
                      required: "Data é obrigatória",
                    })} />
                  {errors.SB_DataFechamento && (
                    <span>{errors.SB_DataFechamento.message}</span>
                  )}
                </InfoBox>
                <InfoBox>
                  <Labeln>Hora</Labeln>
                  <Inputn
                    type="time"
                    disabled={disabledInputs}
                    {...register("SB_HoraFechamento", {
                      required: "Hora é obrigatória",
                    })}
                  />
                  {errors.SB_HoraFechamento && (
                    <span>{errors.SB_HoraFechamento.message}</span>
                  )}
                </InfoBox>
                <InfoBox>
                  <Labeln>Fechado Por</Labeln>
                  <Inputn
                    type="text"
                    disabled={disabledInputs}
                    {...register("SB_FechadoPor", {
                      required: "Fechado por é obrigatório",
                    })}
                  />
                  {errors.SB_FechadoPor && (
                    <span>{errors.SB_FechadoPor.message}</span>
                  )}
                </InfoBox>
                <InfoBox>
                  <Labeln>Rede</Labeln>
                  <Inputn
                    type="text"
                    disabled={disabledInputs}
                    {...register("SB_Rede", {
                      required: "Rede é obrigatória",
                    })}
                  />
                  {errors.SB_Rede && (
                    <span>{errors.SB_Rede.message}</span>
                  )}
                </InfoBox>
              </Field>
              <Field>
                <InfoBox>
                  <Labeln>Fechamento</Labeln>
                  <Inputn
                    type="text"
                    disabled={disabledInputs}
                    {...register("SB_OFechado", {
                      required: "Fechamento é obrigatório",
                    })}
                  />
                  {errors.SB_OFechado && (
                    <span>{errors.SB_OFechado.message}</span>
                  )}
                </InfoBox>
                <InfoBox>
                  <Labeln>Utilizou MZ</Labeln>
                  <Inputn
                    type="text"
                    disabled={disabledInputs}
                    {...register("SB_UltilizouMZ", {
                      required: "Utilizou MZ é obrigatório",
                    })}
                  />
                  {errors.SB_UltilizouMZ && (
                    <span>{errors.SB_UltilizouMZ.message}</span>
                  )}
                </InfoBox>
                <InfoBox>
                  <Labeln>Motivo</Labeln>
                  <Inputn
                    type="text"
                    disabled={disabledInputs}
                    {...register("SB_HFSMotivo", {
                      required: "Motivo é obrigatório",
                    })}
                  />
                  {errors.SB_HFSMotivo && (
                    <span>{errors.SB_HFSMotivo.message}</span>
                  )}
                </InfoBox>
                <InfoBox>
                  <Labeln>Manobra WFM</Labeln>
                  <Inputn
                    type="text"
                    disabled={!disabledInputs}
                    {...register("SB_ManobraWFM", {
                      required: "Manobra WFM é obrigatória",
                    })}
                  />
                  {errors.SB_ManobraWFM && (
                    <span>{errors.SB_ManobraWFM.message}</span>
                  )}
                </InfoBox>
              </Field>
              <Field>
                <InfoBox>
                  <Labeln>Qtde. Ligações</Labeln>
                  <Inputn
                    type="number"
                    disabled={!disabledInputs}
                    {...register("SB_QTDELigacoes", {
                      required: "Qtde. Ligações é obrigatória",
                    })}
                  />
                  {errors.SB_QTDELigacoes && (
                    <span>{errors.SB_QTDELigacoes.message}</span>
                  )}
                </InfoBox>
                <InfoBox>
                  <Labeln>Executante</Labeln>
                  <Inputn
                    type="text"
                    disabled={disabledInputs}
                    {...register("SB_Executante", {
                      required: "Executante é obrigatório",
                    })}
                  />
                  {errors.SB_Executante && (
                    <span>{errors.SB_Executante.message}</span>
                  )}
                </InfoBox>
                <InfoBox>
                  <Labeln>Previsão</Labeln>
                  <Inputn
                    type="time"
                    disabled={disabledInputs}
                    {...register("SB_Previsão", {
                      required: "Previsão é obrigatória",
                    })}
                  />
                  {errors.SB_Previsão && (
                    <span>{errors.SB_Previsão.message}</span>
                  )}
                </InfoBox>
                <InfoBox>
                  <Labeln>Observações Fechamento</Labeln>
                  <ObsArea 
                  {...register("SB_HFSObservacaoFechamento")} 
                  />
                  {errors.SB_HFSObservacaoFechamento && (
                    <span>{errors.SB_HFSObservacaoFechamento.message}</span>
                  )}
                </InfoBox>
              </Field>
            </>
          )}
          {hasFValue === 0 && (<>
            <FieldTwo>
              <InfoBox>
                <Labeln>Motivo</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_HSNMotivo", {
                    required: "Motivo é obrigatório",
                  })}
                />
                {errors.SB_HSNMotivo && (
                  <span>{errors.SB_HSNMotivo.message}</span>
                )}
              </InfoBox>
              <InfoBox>
                <Labeln>Observações Não Fechamento</Labeln>
                <ObsArea {...register("SB_HSNObservacao")} />
                {errors.SB_HSNObservacao && (
                  <span>{errors.SB_HSNObservacao.message}</span>
                )}
              </InfoBox>
            </FieldTwo>
          </>)} {(<></>)}
        </SectionBox>
      </Formn>
    </>
  );
};

export default FechamentoForm;
