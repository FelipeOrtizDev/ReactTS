import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Fechamento } from "../../services/models/fechamentoModel";
import { useFechamentoStore } from "./Stores/formfechamentoStore";
import { Inputn, Optionn, Selectn } from "../../utils/commonStyles";
import {
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";
import {
  Field,
  FieldTwo,
  Formn,
  ObsArea,
} from "../../utils/modals/modalUserStyles";

interface FechamentoProps {
  solicitacaoBaseId: number;
  fechamento: Fechamento;
  onSubmit: (data: Fechamento) => void;
}

const FechamentoForm: React.FC<FechamentoProps> = ({
  solicitacaoBaseId,
  fechamento,
  onSubmit,
}) => {
  const { register, handleSubmit, setValue, watch } = useForm<Fechamento>({
    defaultValues: fechamento,
  });
  const { setFechamento } = useFechamentoStore();
  const fechamentoState = fechamento || {};

  useEffect(() => {
    setValue("SB_HouveFechamento", fechamentoState.SB_HouveFechamento || 0);
    setValue("SB_DataFechamento", fechamentoState.SB_DataFechamento || "");
    setValue("SB_HoraFechamento", fechamentoState.SB_HoraFechamento || "");
    setValue("SB_FechadoPor", fechamentoState.SB_FechadoPor || "");
    setValue("SB_Rede", fechamentoState.SB_Rede || "");
    setValue("SB_OFechado", fechamentoState.SB_OFechado || "");
    setValue("SB_UltilizouMZ", fechamentoState.SB_UltilizouMZ || "");
    setValue("SB_HFSMotivo", fechamentoState.SB_HFSMotivo || "");
    setValue("SB_ManobraWFM", fechamentoState.SB_ManobraWFM || "");
    setValue("SB_QTDELigacoes", fechamentoState.SB_QTDELigacoes || 0);
    setValue("SB_Executante", fechamentoState.SB_Executante || "");
    setValue("SB_Previsao", fechamentoState.SB_Previsao || "");
    setValue(
      "SB_HFSObservacaoFechamento",
      fechamentoState.SB_HFSObservacaoFechamento || ""
    );
    setValue("SB_HSNMotivo", fechamentoState.SB_HSNMotivo || "");
    setValue("SB_HSNObservacao", fechamentoState.SB_HSNObservacao || "");
  }, [fechamentoState, setValue]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFechamento(solicitacaoBaseId, { ...fechamentoState, [name]: value });
  };

  const handleFormSubmit: SubmitHandler<Fechamento> = (data) => {
    data.SB_SolicitacaoBase_id_SolicitacaoBase = solicitacaoBaseId;
    onSubmit(data);
  };

  const hasFValue = watch("SB_HouveFechamento");
  const [disabledInputs] = useState(false);

  return (
    <Formn onSubmit={handleSubmit(handleFormSubmit)}>
      <SectionBox>
        <SectionTitle>Houve fechamento?</SectionTitle>
        <Selectn
          {...register("SB_HouveFechamento", { valueAsNumber: true })}
          onChange={handleInputChange}
        >
          <Optionn value="">Selecione...</Optionn>
          <Optionn value={1}>Sim</Optionn>
          <Optionn value={0}>Não</Optionn>
        </Selectn>
        {hasFValue === 1 && (
          <>
            <Field>
              <InfoBox>
                <Labeln>Data</Labeln>
                <Inputn
                  type="date"
                  disabled={disabledInputs}
                  {...register("SB_DataFechamento", {
                    required: "Data é obrigatória",
                  })}
                  onChange={handleInputChange}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Hora</Labeln>
                <Inputn
                  type="time"
                  disabled={disabledInputs}
                  {...register("SB_HoraFechamento", {
                    required: "Hora é obrigatória",
                  })}
                  onChange={handleInputChange}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Fechado Por</Labeln>
                <Inputn
                  type="text"
                  disabled={disabledInputs}
                  {...register("SB_FechadoPor", {
                    required: "Fechado por é obrigatório",
                  })}
                  onChange={handleInputChange}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Rede</Labeln>
                <Inputn
                  type="text"
                  disabled={disabledInputs}
                  {...register("SB_Rede", { required: "Rede é obrigatória" })}
                  onChange={handleInputChange}
                />
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
                  onChange={handleInputChange}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Utilizou MZ</Labeln>
                <Inputn
                  type="text"
                  disabled={disabledInputs}
                  {...register("SB_UltilizouMZ", {
                    required: "Utilizou MZ é obrigatório",
                  })}
                  onChange={handleInputChange}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Motivo</Labeln>
                <Inputn
                  type="text"
                  disabled={disabledInputs}
                  {...register("SB_HFSMotivo", {
                    required: "Motivo é obrigatório",
                  })}
                  onChange={handleInputChange}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Manobra WFM</Labeln>
                <Inputn
                  type="text"
                  disabled={!disabledInputs}
                  {...register("SB_ManobraWFM", {
                    required: "Manobra WFM é obrigatória",
                  })}
                  onChange={handleInputChange}
                />
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
                  onChange={handleInputChange}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Executante</Labeln>
                <Inputn
                  type="text"
                  disabled={disabledInputs}
                  {...register("SB_Executante", {
                    required: "Executante é obrigatório",
                  })}
                  onChange={handleInputChange}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Previsão</Labeln>
                <Inputn
                  type="time"
                  disabled={disabledInputs}
                  {...register("SB_Previsao", {
                    required: "Previsão é obrigatória",
                  })}
                  onChange={handleInputChange}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Observações Fechamento</Labeln>
                <ObsArea
                  {...register("SB_HFSObservacaoFechamento")}
                  onChange={handleInputChange}
                />
              </InfoBox>
            </Field>
          </>
        )}
        {hasFValue === 0 && (
          <FieldTwo>
            <InfoBox>
              <Labeln>Motivo</Labeln>
              <Inputn
                type="text"
                {...register("SB_HSNMotivo", {
                  required: "Motivo é obrigatório",
                })}
                onChange={handleInputChange}
              />
            </InfoBox>
            <InfoBox>
              <Labeln>Observações Não Fechamento</Labeln>
              <ObsArea
                {...register("SB_HSNObservacao")}
                onChange={handleInputChange}
              />
            </InfoBox>
          </FieldTwo>
        )}
      </SectionBox>
    </Formn>
  );
};

export default FechamentoForm;
