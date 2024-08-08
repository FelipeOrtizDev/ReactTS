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
  const { register} = form;

  const [hasFValue, setHasFValue] = useState<Number | null>(null);

  // Função para lidar com a mudança de seleção
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setHasFValue(Number(event.target.value));
  };
  const [disabledInputs] = useState(false); 

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
                disabled={disabledInputs}
                {...register("SB_DataFechamento", {
                  required: "Data é obrigatória",
                })}
                /* onChange={handleInputChange} */
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
                /* onChange={handleInputChange} */
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
                /* onChange={handleInputChange} */
              />
            </InfoBox>
            <InfoBox>
              <Labeln>Rede</Labeln>
              <Inputn
                type="text"
                disabled={disabledInputs}
                {...register("SB_Rede", { required: "Rede é obrigatória" })}
                /* onChange={handleInputChange} */
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
                /* onChange={handleInputChange} */
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
                /* onChange={handleInputChange} */
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
                /* onChange={handleInputChange} */
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
                /* onChange={handleInputChange} */
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
                /* onChange={handleInputChange} */
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
                /* onChange={handleInputChange} */
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
                /* onChange={handleInputChange} */
              />
            </InfoBox>
            <InfoBox>
              <Labeln>Observações Fechamento</Labeln>
              <ObsArea
                {...register("SB_HFSObservacaoFechamento")}
                /* onChange={handleInputChange} */
              />
            </InfoBox>
          </Field>
        </> )}
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
              /* onChange={handleInputChange} */
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Observações Não Fechamento</Labeln>
            <ObsArea
              {...register("SB_HSNObservacao")}
              /* onChange={handleInputChange} */
            />
          </InfoBox>
        </FieldTwo>
        </>
      )}
      {hasFValue === null && (
        <></>
      )}
      </SectionBox>
    </Formn>
  );
};

export default FechamentoForm;
