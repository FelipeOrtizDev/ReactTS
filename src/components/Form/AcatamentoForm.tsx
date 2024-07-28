import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Acatamento } from "../../services/api/acatamentoService";
import { Inputn } from "../../utils/commonStyles";
import { FieldTwo } from "../../utils/modals/modalUserStyles";
import { InfoBox, Labeln } from "../../pages/Fechamento/styles";

interface AcatamentoFormProps {
  acatamento: Acatamento;
  onSubmit: (data: Acatamento) => void;
}

const AcatamentoForm: React.FC<AcatamentoFormProps> = ({
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

  const handleFormSubmit: SubmitHandler<Acatamento> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FieldTwo>
        <InfoBox>
          <Labeln>Data Acatamento</Labeln>
          <Inputn
            type="date"
            {...register("SB_DataAcatamento", {
              required: "Data é obrigatória",
            })}
          />
          {errors.SB_DataAcatamento && (
            <span>{errors.SB_DataAcatamento.message}</span>
          )}
        </InfoBox>
        <InfoBox>
          <Labeln>Equipe Responsável</Labeln>
          <Inputn
            type="text"
            {...register("SB_EquipeResponsavel", {
              required: "Equipe é obrigatória",
            })}
          />
          {errors.SB_EquipeResponsavel && (
            <span>{errors.SB_EquipeResponsavel.message}</span>
          )}
        </InfoBox>
      </FieldTwo>
      <button type="submit">Salvar Acatamento</button>
    </form>
  );
};

export default AcatamentoForm;
