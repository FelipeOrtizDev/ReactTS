import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { SolicitacaoAbertura } from "../../services/models/solicitacaoAberturaModel";
import { Inputn, Optionn, Selectn } from "../../utils/commonStyles";
import {
  Field,
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";
import { FieldTwo, Formn, ObsArea } from "../../utils/modals/modalUserStyles";
import {
  createSolicitacaoAbertura,
  updateSolicitacaoAbertura,
} from "../../services/api/solicitacaoAberturaService";
import { useStore } from "./formsStore";

interface SolicitacaoAberturaFormProps {
  form: UseFormReturn<SolicitacaoAbertura>;
}

const SolicitacaoAberturaForm: React.FC<SolicitacaoAberturaFormProps> = ({ form }) => {
  const { register, watch } = form;
  const solicitacaoAbertura = useStore((state) => state.solicitacaoAbertura);

  useEffect(() => {
    (async () => {
      try {
        if (solicitacaoAbertura.id_SolicitacaoAbertura) {
          await updateSolicitacaoAbertura(solicitacaoAbertura);
        } else {
          await createSolicitacaoAbertura(
            (solicitacaoAbertura.SB_SolicitacaoBase_id_SolicitacaoBase),
            solicitacaoAbertura
          );
        }
        console.log("solicitacaoAbertura enviado com sucesso");
      } catch (error) {
        console.error("Erro ao enviar solicitacaoAbertura:", error);
      }
    })();
  }, [solicitacaoAbertura]);

  const hasAberturaValue = watch("SB_HAbertura");

  return (
    <Formn>
      <SectionBox>
        <SectionTitle>Houve Abertura?</SectionTitle>
        <Selectn
          {...register("SB_HAbertura", {
            valueAsNumber: true,
          })}
        >
          <Optionn value="null">Selecione...</Optionn>
          <Optionn value={1}>Sim</Optionn>
          <Optionn value={0}>Não</Optionn>
        </Selectn>
        {hasAberturaValue === 1 && (
          <>
            <Field>
            <InfoBox>
              <Labeln>Data</Labeln>
              <Inputn
                type="date"
                {...register("SB_HSData")}
              />
            </InfoBox>
            <InfoBox>
              <Labeln>Hora</Labeln>
              <Inputn
                type="time"
                {...register("SB_HSHoraAbertura")}
              />
            </InfoBox>
            <InfoBox>
              <Labeln>Aberto Por</Labeln>
              <Inputn
                type="text"
                {...register("SB_AbertoPor")}
              />
            </InfoBox>
            <InfoBox>
              <Labeln>Rede</Labeln>
              <Inputn
                type="text"
                {...register("SB_Rede")}
              />
            </InfoBox>
          </Field>
          <Field>
            <InfoBox>
              <Labeln>ØAberto</Labeln>
              <Inputn
                type="text"
                {...register("SB_OAberto")}
              />
            </InfoBox>
            <InfoBox>
              <Labeln>Utilizou MZ</Labeln>
              <Inputn
                type="text"
                {...register("SB_UtilizouMZ")}
              />
            </InfoBox>
            <InfoBox>
              <Labeln>Motivo</Labeln>
              <Inputn
                type="text"
                 placeholder="Digite o motivo da abertura aqui"
                {...register("SB_HSMotivo")}
              />
            </InfoBox>
            <InfoBox>
              <Labeln>Manobra WFM</Labeln>
              <Inputn
                type="text"
                {...register("SB_ManobraWFM")}
              />
            </InfoBox>
          </Field>
          <Field>
            <InfoBox>
              <Labeln>Qtde. Ligações</Labeln>
              <Inputn
                type="number"
                {...register("SB_QTDEligacoes")}
              />
            </InfoBox>
            <InfoBox>
              <Labeln>Executante</Labeln>
              <Inputn
                type="text"
                {...register("SB_Executante")}
              />
            </InfoBox>
            <InfoBox>
              <Labeln>Previsão</Labeln>
              <Inputn
                type="time"
                {...register("SB_Previsao")}
              />
            </InfoBox>
            <InfoBox>
              <Labeln>Observações Abertura</Labeln>
              <ObsArea
                placeholder="Digite as observações aqui"
                {...register("SB_HFSObservacaoAbertura")}
              />
            </InfoBox>
          </Field>
          </>
        )}
        {hasAberturaValue === 0 && (
          <>
          <FieldTwo>
            <InfoBox>
              <Labeln>Motivo</Labeln>
              <Inputn
                type="text"
                placeholder="Digite o motivo da não abertura aqui"
                {...register("SB_HNMotivo")}
              />
            </InfoBox>
            <InfoBox>
              <Labeln>Observações da Não Abertura</Labeln>
              <ObsArea
                placeholder="Digite as observações da não abertura aqui"
                {...register("SB_HNObservacoes")}
              />
            </InfoBox>
          </FieldTwo>
          </>
        )}
      </SectionBox>
    </Formn>
  );
};

export default SolicitacaoAberturaForm;
