import { useEffect } from "react";
import {
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";
import { AcatamentosAbertura } from "../../services/models/acatamentoAberturaModel";
import { Inputn } from "../../utils/commonStyles";
import { FieldTwo, Formn, ObsArea } from "../../utils/modals/modalUserStyles";
import { useStore } from "./formsStore";
import { UseFormReturn } from "react-hook-form";
import {
  createAcatamentosAbertura,
  updateAcatamentosAbertura,
} from "../../services/api/Acatamento/acatamentosAberturaService";

interface AcatamentoAberturaFormProps {
  form: UseFormReturn<AcatamentosAbertura>;
  solicitacaoBaseId: number;
}

const AcamentoAberturaForm: React.FC<AcatamentoAberturaFormProps> = ({
  form,
  solicitacaoBaseId,
}) => {
  const { register } = form;

  const acatamentoAbertura = useStore((state) => state.acatamentoAbertura);
  acatamentoAbertura.SB_SolicitacaoBase_id_SolicitacaoBase = solicitacaoBaseId;
  useEffect(() => {
    (async () => {
      try {
        if (acatamentoAbertura.id_AcatamentosAbertura) {
          await updateAcatamentosAbertura(acatamentoAbertura);
        } else {
          await createAcatamentosAbertura(
            acatamentoAbertura.SB_SolicitacaoBase_id_SolicitacaoBase,
            acatamentoAbertura
          );
        }
        console.log("acatamentoAbertura enviado com sucesso");
      } catch (error) {
        console.error("Erro ao enviar acatamentoAbertura:", error);
      }
    })();
  }, [acatamentoAbertura]);

  return (
    <Formn>
      <SectionBox>
        <SectionTitle>Acatamento Abertura</SectionTitle>
        <FieldTwo>
          <InfoBox>
            <Labeln>Data Acatamento</Labeln>
            <Inputn
              type="date"
              {...register("SB_DataAcatamentoAbertura", {
                required: "Data Acatamento é obrigatória",
              })}
              onChange={(e) =>
                useStore.getState().setAcatamentoAbertura({
                  ...acatamentoAbertura,
                  SB_DataAcatamentoAbertura: e.target.value,
                })
              }
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Passado Para</Labeln>
            <Inputn
              type="text"
              {...register("SB_EquipeResponsavelAbertura", {
                required: "Responsável é obrigatório",
              })}
              onChange={(e) =>
                useStore.getState().setAcatamentoAbertura({
                  ...acatamentoAbertura,
                  SB_EquipeResponsavelAbertura: e.target.value,
                })
              }
            />
          </InfoBox>
        </FieldTwo>
        <FieldTwo>
          <InfoBox>
            <Labeln>Previsão</Labeln>
            <Inputn
              type="time"
              {...register("SB_PrevisaoAcatamentoAbertura", {
                required: "Previsão é obrigatória",
              })}
              onChange={(e) =>
                useStore.getState().setAcatamentoAbertura({
                  ...acatamentoAbertura,
                  SB_PrevisaoAcatamentoAbertura: e.target.value,
                })
              }
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Observações</Labeln>
            <ObsArea
              {...register("SB_ObservacaoAcatamentoAbertura")}
              onChange={(e) =>
                useStore.getState().setAcatamentoAbertura({
                  ...acatamentoAbertura,
                  SB_ObservacaoAcatamentoAbertura: e.target.value,
                })
              }
            />
          </InfoBox>
        </FieldTwo>
      </SectionBox>
    </Formn>
  );
};

export default AcamentoAberturaForm;
