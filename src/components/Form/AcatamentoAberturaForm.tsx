import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AcatamentosAbertura } from "../../services/api/acatamentosAberturaService";
import { Inputn } from "../../utils/commonStyles";
import { FieldTwo } from "../../utils/modals/modalUserStyles";
import { InfoBox, Labeln } from "../../pages/Fechamento/styles";

interface AcatamentoAberturaFormProps {
  acatamentoAbertura: AcatamentosAbertura;
  onSubmit: (data: AcatamentosAbertura) => void;
}

const AcatamentoAberturaForm: React.FC<AcatamentoAberturaFormProps> = ({
  acatamentoAbertura,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcatamentosAbertura>({
    defaultValues: acatamentoAbertura,
  });

  const handleFormSubmit: SubmitHandler<AcatamentosAbertura> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FieldTwo>
        <InfoBox>
          <Labeln>Data</Labeln>
          <Inputn
            type="date"
            {...register("SB_DataAcatamentoAbertura", {
              required: "Data é obrigatória",
            })}
          />
          {errors.SB_DataAcatamentoAbertura && (
            <span>{errors.SB_DataAcatamentoAbertura.message}</span>
          )}
        </InfoBox>
        <InfoBox>
          <Labeln>Equipe Responsável</Labeln>
          <Inputn
            type="text"
            {...register("SB_EquipeResponsavelAbertura", {
              required: "Equipe Responsável é obrigatória",
            })}
          />
          {errors.SB_EquipeResponsavelAbertura && (
            <span>{errors.SB_EquipeResponsavelAbertura.message}</span>
          )}
        </InfoBox>
      </FieldTwo>
      <button type="submit">Salvar Acatamento Abertura</button>
    </form>
  );
};

export default AcatamentoAberturaForm;
