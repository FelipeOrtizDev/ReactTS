import React, { ChangeEvent, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Fechamento } from "../../services/models/fechamentoModel";
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
  form: UseFormReturn<Fechamento>;
}

const FechamentoForm: React.FC<FechamentoProps> = ({ form }) => {
  const { register } = form;
  const [hasFValue, setHasFValue] = useState<number | null>(null);
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setHasFValue(Number(event.target.value));
  };

  return (
    <Formn>
      <SectionBox>
        <SectionTitle>Houve fechamento?</SectionTitle>
        <Selectn
          {...register("SB_HouveFechamento", { valueAsNumber: true })}
          onChange={handleSelectChange}
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
                  {...register("SB_DataFechamento", {
                    required: "Data é obrigatória",
                  })}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Hora</Labeln>
                <Inputn
                  type="time"
                  {...register("SB_HoraFechamento", {
                    required: "Hora é obrigatória",
                  })}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Fechado Por</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_FechadoPor", {
                    required: "Fechado por é obrigatório",
                  })}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Rede</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_Rede", { required: "Rede é obrigatória" })}
                />
              </InfoBox>
            </Field>
            <Field>
              <InfoBox>
                <Labeln>Fechamento</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_OFechado", {
                    required: "Fechamento é obrigatório",
                  })}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Utilizou MZ</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_UltilizouMZ", {
                    required: "Utilizou MZ é obrigatório",
                  })}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Motivo</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_HFSMotivo", {
                    required: "Motivo é obrigatório",
                  })}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Manobra WFM</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_ManobraWFM", {
                    required: "Manobra WFM é obrigatória",
                  })}
                />
              </InfoBox>
            </Field>
            <Field>
              <InfoBox>
                <Labeln>Qtde. Ligações</Labeln>
                <Inputn
                  type="number"
                  {...register("SB_QTDELigacoes", {
                    required: "Qtde. Ligações é obrigatória",
                  })}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Executante</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_Executante", {
                    required: "Executante é obrigatório",
                  })}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Previsão</Labeln>
                <Inputn
                  type="time"
                  {...register("SB_Previsao", {
                    required: "Previsão é obrigatória",
                  })}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Observações Fechamento</Labeln>
                <ObsArea {...register("SB_HFSObservacaoFechamento")} />
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
              />
            </InfoBox>
            <InfoBox>
              <Labeln>Observações Não Fechamento</Labeln>
              <ObsArea {...register("SB_HSNObservacao")} />
            </InfoBox>
          </FieldTwo>
        )}
      </SectionBox>
    </Formn>
  );
};

export default FechamentoForm;
