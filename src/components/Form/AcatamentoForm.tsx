import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Acatamento } from "../../services/models/acatamentoModel";
import { Inputn } from "../../utils/commonStyles";
import { FieldTwo, Formn, TextArean } from "../../utils/modals/modalUserStyles";
import {
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";
import { useStore } from "./formsStore";
import { createAcatamento, updateAcatamento } from "../../services/api/Acatamento/acatamentoService";

interface AcatamentoFormProps {
  form: UseFormReturn<Acatamento>;
}
const AcatamentoForm: React.FC<AcatamentoFormProps> = ({ form }) => {
  const { register } = form;

  const acatamento = useStore((state) => state.acatamento);

  const allFieldsFilled = () => {
    return(
      acatamento.SB_DataAcatamento !== undefined &&
      true
    )
  };

  useEffect(() => {
    if (allFieldsFilled()) {
      (async () => {
        try {
          if (acatamento.id_Acatamentos) {
            await updateAcatamento(acatamento);
          } else {
            await createAcatamento(acatamento.SB_SolicitacaoBase_id_SolicitacaoBase, acatamento);
          }
          console.log("acatamento enviado com sucesso");
        } catch (error) {
          console.error("Erro ao enviar acatamento:", error);
        }
      })();
    }
  }, [acatamento]);

  return (
    <Formn>
      <SectionBox>
        <SectionTitle>Acatamento</SectionTitle>
        <FieldTwo>
          <InfoBox>
            <Labeln>Data</Labeln>
            <Inputn
              type="date"
              {...register("SB_DataAcatamento", { required: true })}
              onChange={(e) =>
                useStore.getState().setAcatamento({
                  ...acatamento,
                  SB_DataAcatamento: e.target.value,
                })
              }
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Passado Para</Labeln>
            <Inputn
              type="text"
              {...register("SB_EquipeResponsavel", { required: true })}
              onChange={(e) =>
                useStore.getState().setAcatamento({
                  ...acatamento,
                  SB_EquipeResponsavel: e.target.value,
                })
              }
            />
          </InfoBox>
        </FieldTwo>
        <FieldTwo>
          <InfoBox>
            <Labeln>Previsão (h)</Labeln>
            <Inputn
              type="time"
              {...register("SB_PrevisaoAcatamento", { required: true })}
              onChange={(e) =>
                useStore.getState().setAcatamento({
                  ...acatamento,
                  SB_PrevisaoAcatamento: e.target.value,
                })
              }
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Observações</Labeln>
            <TextArean
              {...register("SB_ObservacaoAcatamento", { required: true })}
              onChange={(e) =>
                useStore.getState().setAcatamento({
                  ...acatamento,
                  SB_ObservacaoAcatamento: e.target.value,
                })
              }
            />
          </InfoBox>
        </FieldTwo>
      </SectionBox>
    </Formn>
  );
};

export default AcatamentoForm;
