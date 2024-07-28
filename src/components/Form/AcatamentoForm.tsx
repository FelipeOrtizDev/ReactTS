import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
            <Inputn type="text" />
          </InfoBox>
        </FieldTwo>
        <FieldTwo>
          <InfoBox>
            <Labeln>Previsão (h)</Labeln>
            <Inputn type="time" />
          </InfoBox>
          <InfoBox>
            <Labeln>Observações</Labeln>
            <TextArean />
          </InfoBox>
        </FieldTwo>
      </SectionBox>
    </Formn>
  );
};

export default AcatamentoForm;
