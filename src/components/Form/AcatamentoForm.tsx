/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { Acatamento } from "../../services/api/acatamentoService";
import { Inputn } from "../../utils/commonStyles";
import { FieldTwo, Formn, TextArean } from "../../utils/modals/modalUserStyles";
import {
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";

interface AcatamentoFormProps {
  acatamento: Acatamento;
  SB_SolicitacaoBase_id_SolicitacaoBase: number;
  SB_SolicitacaoBase_SB_Enderecos_id_Endereco: number;

  onSubmit: (data: Acatamento) => void;
}

const AcatamentoForm: React.FC<AcatamentoFormProps> = ({
  SB_SolicitacaoBase_id_SolicitacaoBase,
  SB_SolicitacaoBase_SB_Enderecos_id_Endereco,
  acatamento,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Acatamento>({
    defaultValues: acatamento,
  });

  const handleFormSubmit = (data: Acatamento) => {
    const acatamento: Acatamento = {
      SB_DataAcatamento: data.SB_DataAcatamento,
      SB_EquipeResponsavel: data.SB_EquipeResponsavel,
      SB_PrvisãoAcatamento: data.SB_PrvisãoAcatamento,
      SB_ObservacaoAcatamento: data.SB_ObservacaoAcatamento,
      SB_SolicitacaoBase_id_SolicitacaoBase:
        SB_SolicitacaoBase_id_SolicitacaoBase,
      SB_SolicitacaoBase_SB_Enderecos_id_Endereco:
        SB_SolicitacaoBase_SB_Enderecos_id_Endereco,
    };
    onSubmit({
      ...acatamento,
    });
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
                required: "Data Abertura é obrigatória",
              })}
            />
          </InfoBox>
        </FieldTwo>
        <FieldTwo>
          <InfoBox>
            <Labeln>Previsão (h)</Labeln>
            <Inputn
              type="time"
              {...register("SB_PrvisãoAcatamento", {
                required: "Data Abertura é obrigatória",
              })}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Observações</Labeln>
            <TextArean
              {...register("SB_ObservacaoAcatamento", {
                required: "Data Abertura é obrigatória",
              })}
            />
          </InfoBox>
        </FieldTwo>
      </SectionBox>
    </Formn>
  );
};

export default AcatamentoForm;
