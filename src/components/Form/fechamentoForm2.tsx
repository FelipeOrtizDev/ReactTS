import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Fechamento } from "../../services/models/fechamentoModel";
import { Inputn, Optionn, Selectn } from "../../utils/commonStyles";
import {
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";
import { Field, Formn, ObsArea } from "../../utils/modals/modalUserStyles";
import { useStore } from "./formsStore";

interface FechamentoFormProps {
  form: UseFormReturn<Fechamento>;
}

const FechamentoForm: React.FC<FechamentoFormProps> = ({ form }) => {
  const { register, setValue } = form;

  const fechamento = useStore((state) => state.fechamento);
  const setFechamento = useStore((state) => state.setFechamento);

  useEffect(() => {
    if (fechamento) {
      Object.keys(fechamento).forEach((key) => {
        setValue(key as keyof Fechamento, fechamento[key]);
      });
    }
  }, [fechamento, setValue]);

  const handleInputChange = (field: keyof Fechamento, value: any) => {
    setFechamento({ ...fechamento, [field]: value });
  };

  const [disabledInputs] = useState(false);

  return (
    <Formn>
      <SectionBox>
        <SectionTitle>Houve fechamento?</SectionTitle>

        <Selectn {...register("SB_HouveFechamento", { valueAsNumber: true })}>
          <Optionn value="">Selecione...</Optionn>
          <Optionn value={1}>Sim</Optionn>
          <Optionn value={0}>Não</Optionn>
        </Selectn>

        <ObsArea
          {...register("SB_HFSObservacaoFechamento")}
          onChange={(e) =>
            handleInputChange("SB_HFSObservacaoFechamento", e.target.value)
          }
          defaultValue={fechamento.SB_HFSObservacaoFechamento}
        />
        <InfoBox>
          <Labeln>Fechado Por</Labeln>
          <Inputn
            type="text"
            disabled={disabledInputs}
            {...register("SB_FechadoPor", {
              required: "Fechado por é obrigatório",
            })}
            onChange={(e) => handleInputChange("SB_FechadoPor", e.target.value)}
            defaultValue={fechamento.SB_FechadoPor || ""}
          />
        </InfoBox>
        {/* {hasFValue === 1 && (
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
                  onChange={(e) =>
                    useStore.getState().setFechamento({
                      ...fechamento,
                      SB_DataFechamento: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    useStore.getState().setFechamento({
                      ...fechamento,
                      SB_HoraFechamento: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    useStore.getState().setFechamento({
                      ...fechamento,
                      SB_FechadoPor: e.target.value,
                    })
                  }
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Rede</Labeln>
                <Inputn
                  type="text"
                  disabled={disabledInputs}
                  {...register("SB_Rede", { required: "Rede é obrigatória" })}
                  onChange={(e) =>
                    useStore.getState().setFechamento({
                      ...fechamento,
                      SB_Rede: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    useStore.getState().setFechamento({
                      ...fechamento,
                      SB_OFechado: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    useStore.getState().setFechamento({
                      ...fechamento,
                      SB_UltilizouMZ: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    useStore.getState().setFechamento({
                      ...fechamento,
                      SB_HFSMotivo: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    useStore.getState().setFechamento({
                      ...fechamento,
                      SB_ManobraWFM: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    useStore.getState().setFechamento({
                      ...fechamento,
                      SB_QTDELigacoes: Number(e.target.value),
                    })
                  }
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
                  onChange={(e) =>
                    useStore.getState().setFechamento({
                      ...fechamento,
                      SB_Executante: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    useStore.getState().setFechamento({
                      ...fechamento,
                      SB_Previsao: e.target.value,
                    })
                  }
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Observações Fechamento</Labeln>
                
              </InfoBox>
            </Field>
          </>
        )}
        {hasFValue === 0 && (
          <>
            <FieldTwo>
              <InfoBox>
                <Labeln>Motivo</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_HSNMotivo", {
                    required: "Motivo é obrigatório",
                  })}
                  onChange={(e) =>
                    useStore.getState().setFechamento({
                      ...fechamento,
                      SB_HSNMotivo: e.target.value,
                    })
                  }
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Observações Não Fechamento</Labeln>
                <ObsArea
                  {...register("SB_HSNObservacao")}
                  onChange={(e) =>
                    useStore.getState().setFechamento({
                      ...fechamento,
                      SB_HSNObservacao: e.target.value,
                    })
                  }
                />
              </InfoBox>
            </FieldTwo>
          </>
        )}
        {hasFValue === null && <></>} */}
      </SectionBox>
    </Formn>
  );
};

export default FechamentoForm;
