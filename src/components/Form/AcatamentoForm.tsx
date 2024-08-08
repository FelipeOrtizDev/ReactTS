import React from "react";
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

interface AcatamentoFormProps {
  form: UseFormReturn<Acatamento>;
}
const AcatamentoForm: React.FC<AcatamentoFormProps> = ({ form }) => {
  const { register } = form;

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
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Passado Para</Labeln>
            <Inputn
              type="text"
              {...register("SB_EquipeResponsavel", { required: true })}
            />
          </InfoBox>
        </FieldTwo>
        <FieldTwo>
          <InfoBox>
            <Labeln>Previsão (h)</Labeln>
            <Inputn
              type="time"
              {...register("SB_PrevisaoAcatamento", { required: true })}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Observações</Labeln>
            <TextArean
              {...register("SB_ObservacaoAcatamento", { required: true })}
            />
          </InfoBox>
        </FieldTwo>
      </SectionBox>
    </Formn>
  );
};

export default AcatamentoForm;
