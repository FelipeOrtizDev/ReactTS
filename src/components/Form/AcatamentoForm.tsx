import React from "react";
import { useForm } from "react-hook-form";
import {
  Acatamento,
  createAcatamento,
} from "../../services/api/acatamentoService";
import { Inputn } from "../../utils/commonStyles";
import { FieldTwo, Formn, TextArean } from "../../utils/modals/modalUserStyles";
import {
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";

interface AcatamentoFormProps {
  solicitacaoBaseId: number;
  onSubmit: (data: Acatamento) => void;
}

const AcatamentoForm: React.FC<AcatamentoFormProps> = ({
  solicitacaoBaseId,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Acatamento>();

  const handleFormSubmit = async (data: Acatamento) => {
    try {
      data.SB_SolicitacaoBase_id_SolicitacaoBase = solicitacaoBaseId;

      const createdAcatamento = await createAcatamento(data);
      console.log(createdAcatamento);
      onSubmit(createdAcatamento);
    } catch (error) {
      console.error("Erro ao criar acatamento:", error);
    }
  };

  return (
    <Formn onSubmit={handleSubmit(handleFormSubmit)}>
      <SectionBox>
        <SectionTitle>Acatamento</SectionTitle>
        <FieldTwo>
          <InfoBox>
            <Labeln>Data</Labeln>
            <Inputn
              type="date"
              {...register("SB_DataAcatamento", {
                required: "Data Abertura é obrigatória",
              })}
            />
            {errors.SB_DataAcatamento && (
              <span>{errors.SB_DataAcatamento.message}</span>
            )}
          </InfoBox>
          <InfoBox>
            <Labeln>Passado Para</Labeln>
            <Inputn
              type="text"
              {...register("SB_EquipeResponsavel", {
                required: "Equipe Responsável é obrigatória",
              })}
            />
            {errors.SB_EquipeResponsavel && (
              <span>{errors.SB_EquipeResponsavel.message}</span>
            )}
          </InfoBox>
        </FieldTwo>
        <FieldTwo>
          <InfoBox>
            <Labeln>Previsão (h)</Labeln>
            <Inputn
              type="time"
              {...register("SB_PrvisãoAcatamento", {
                required: "A Previsão e Obrigatoria",
              })}
            />
            {errors.SB_PrvisãoAcatamento && (
              <span>{errors.SB_PrvisãoAcatamento.message}</span>
            )}
          </InfoBox>
          <InfoBox>
            <Labeln>Observações</Labeln>
            <TextArean {...register("SB_ObservacaoAcatamento")} />
          </InfoBox>
        </FieldTwo>
      </SectionBox>
    </Formn>
  );
};

export default AcatamentoForm;
