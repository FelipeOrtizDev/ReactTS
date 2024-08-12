import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { SolicitacaoAbertura } from "../../services/models/solicitacaoAberturaModel";
import { Inputn, Title } from "../../utils/commonStyles";
import {
  Field,
  InfoBox,
  Labeln,
  SectionBox,
} from "../../pages/Fechamento/styles";
import { Formn } from "../../utils/modals/modalUserStyles";
import {
  createSolicitacaoAbertura,
  updateSolicitacaoAbertura,
} from "../../services/api/solicitacaoAberturaService";
import { useStore } from "./formsStore";

interface SolicitacaoAberturaFormProps {
  form: UseFormReturn<SolicitacaoAbertura>;
  solicitacaoBaseId: number;
}

const SolicitacaoAberturaForm: React.FC<SolicitacaoAberturaFormProps> = ({
  form,
  solicitacaoBaseId,
}) => {
  const { register } = form;
  const solicitacaoAbertura = useStore((state) => state.solicitacaoAbertura);

  useEffect(() => {
    (async () => {
      try {
        if (solicitacaoAbertura.id_SolicitacaoAbertura) {
          await updateSolicitacaoAbertura(solicitacaoAbertura);
        } else {
          await createSolicitacaoAbertura(
            (solicitacaoAbertura.SB_SolicitacaoBase_id_SolicitacaoBase =
              solicitacaoBaseId),
            solicitacaoAbertura
          );
        }
        console.log("solicitacaoAbertura enviado com sucesso");
      } catch (error) {
        console.error("Erro ao enviar solicitacaoAbertura:", error);
      }
    })();
  }, [solicitacaoAbertura]);

  return (
    <Formn>
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
              onChange={(e) =>
                useStore.getState().setSolicitacaoAbertura({
                  ...solicitacaoAbertura,
                  SB_DataAbertura: e.target.value,
                })
              }
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Hora</Labeln>
            <Inputn
              type="time"
              {...register("SB_HoraAbertura", {
                required: "Hora é obrigatória",
              })}
              onChange={(e) =>
                useStore.getState().setSolicitacaoAbertura({
                  ...solicitacaoAbertura,
                  SB_HoraAbertura: e.target.value,
                })
              }
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Solicitante</Labeln>
            <Inputn
              type="text"
              {...register("SB_Solicitante", {
                required: "Solicitante é obrigatório",
              })}
              onChange={(e) =>
                useStore.getState().setSolicitacaoAbertura({
                  ...solicitacaoAbertura,
                  SB_Solicitante: e.target.value,
                })
              }
            />
          </InfoBox>
        </Field>
      </SectionBox>
    </Formn>
  );
};

export default SolicitacaoAberturaForm;
