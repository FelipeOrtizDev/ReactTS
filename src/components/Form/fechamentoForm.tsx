import { SubmitHandler, useForm } from "react-hook-form";
import { Fechamento } from "../../services/api/fechamentoService";
import {
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";
import { Field, Formn, ObsArea } from "../../utils/modals/modalUserStyles";
import { Inputn, Optionn, Selectn } from "../../utils/commonStyles";

interface FechamentoProps {
  fechamento: Fechamento;
  onSubmit: (data: Fechamento) => void;
}

const FechamentoForm: React.FC<FechamentoProps> = ({
  fechamento,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fechamento>({
    defaultValues: fechamento,
  });
  const handleFormSubmit: SubmitHandler<Fechamento> = (data) => {
    onSubmit(data);
  };

  return (
    <>
      <Formn onSubmit={handleSubmit(handleFormSubmit)}>
        <SectionBox>
          <SectionTitle>Houve fechamento?</SectionTitle>
          <Selectn>
            <Optionn value="">Selecione...</Optionn>
            <Optionn value="Sim">Sim</Optionn>
            <Optionn value="Não">Não</Optionn>
          </Selectn>
          <Field>
            <InfoBox>
              <Labeln>Data</Labeln>
              <Inputn type="date" required />
              {errors.SB_HFSMotivo && (
                <span>{errors.SB_HFSMotivo.message}</span>
              )}
            </InfoBox>
            <InfoBox>
              <Labeln>Hora</Labeln>
              <Inputn
                type="time"
                {...register("SB_DataFechamento", {
                  required: "Hora é obrigatória",
                })}
              />
              {errors.SB_DataFechamento && (
                <span>{errors.SB_DataFechamento.message}</span>
              )}
            </InfoBox>
            <InfoBox>
              <Labeln>Fechado Por</Labeln>
              <Inputn
                type="text"
                {...register("SB_DataFechamento", {
                  required: "Fechado por é obrigatório",
                })}
              />
              {errors.SB_DataFechamento && (
                <span>{errors.SB_DataFechamento.message}</span>
              )}
            </InfoBox>
            <InfoBox>
              <Labeln>Rede</Labeln>
              <Inputn
                type="text"
                {...register("SB_DataFechamento", {
                  required: "Rede é obrigatória",
                })}
              />
              {errors.SB_DataFechamento && (
                <span>{errors.SB_DataFechamento.message}</span>
              )}
            </InfoBox>
          </Field>
          <Field>
            <InfoBox>
              <Labeln>Fechamento</Labeln>
              <Inputn
                type="text"
                {...register("SB_DataFechamento", {
                  required: "Fechamento é obrigatório",
                })}
              />
              {errors.SB_DataFechamento && (
                <span>{errors.SB_DataFechamento.message}</span>
              )}
            </InfoBox>
            <InfoBox>
              <Labeln>Utilizou MZ</Labeln>
              <Inputn
                type="text"
                {...register("SB_DataFechamento", {
                  required: "Utilizou MZ é obrigatório",
                })}
              />
              {errors.SB_DataFechamento && (
                <span>{errors.SB_DataFechamento.message}</span>
              )}
            </InfoBox>
            <InfoBox>
              <Labeln>Motivo</Labeln>
              <Inputn
                type="text"
                {...register("SB_DataFechamento", {
                  required: "Motivo é obrigatório",
                })}
              />
              {errors.SB_DataFechamento && (
                <span>{errors.SB_DataFechamento.message}</span>
              )}
            </InfoBox>
            <InfoBox>
              <Labeln>Manobra WFM</Labeln>
              <Inputn
                type="text"
                {...register("SB_DataFechamento", {
                  required: "Manobra WFM é obrigatório",
                })}
              />
              {errors.SB_DataFechamento && (
                <span>{errors.SB_DataFechamento.message}</span>
              )}
            </InfoBox>
          </Field>
          <Field>
            <InfoBox>
              <Labeln>Qtde. Ligações</Labeln>
              <Inputn
                type="text"
                {...register("SB_DataFechamento", {
                  required: "Qtde. Ligações é obrigatório",
                })}
              />
              {errors.SB_DataFechamento && (
                <span>{errors.SB_DataFechamento.message}</span>
              )}
            </InfoBox>
            <InfoBox>
              <Labeln>Executante</Labeln>
              <Inputn
                type="text"
                {...register("SB_DataFechamento", {
                  required: "Executante é obrigatório",
                })}
              />
              {errors.SB_DataFechamento && (
                <span>{errors.SB_DataFechamento.message}</span>
              )}
            </InfoBox>
            <InfoBox>
              <Labeln>Previsão</Labeln>
              <Inputn
                type="text"
                {...register("SB_DataFechamento", {
                  required: "Previsão é obrigatório",
                })}
              />
              {errors.SB_DataFechamento && (
                <span>{errors.SB_DataFechamento.message}</span>
              )}
            </InfoBox>
            <InfoBox>
              <Labeln>Observações Fechamento</Labeln>
              <ObsArea {...register("SB_DataFechamento")} />
              {errors.SB_DataFechamento && (
                <span>{errors.SB_DataFechamento.message}</span>
              )}
            </InfoBox>
          </Field>
        </SectionBox>
      </Formn>
    </>
  );
};

export default FechamentoForm;
