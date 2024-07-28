/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import {
  createFechamentos,
  Fechamento,
} from "../../services/api/fechamentoService";
import {
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";
import { Field, Formn, ObsArea } from "../../utils/modals/modalUserStyles";
import { Inputn, Optionn, Selectn } from "../../utils/commonStyles";
import { forwardRef, useImperativeHandle } from "react";

interface FechamentoProps {
  solicitacaoBaseId: number;
  onSubmit: (data: Fechamento) => void;
}

const FechamentoForm: React.FC<FechamentoProps> = forwardRef(
  ({ solicitacaoBaseId, onSubmit }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Fechamento>();

    const handleFormSubmit = async (data: Fechamento) => {
      try {
        data.SB_SolicitacaoBase_id_SolicitacaoBase = solicitacaoBaseId;

        const createdFechamento = await createFechamentos(data);
        console.log(createFechamentos);
        onSubmit(createdFechamento);
      } catch (error) {
        console.error("Erro ao criar fechamento:", error);
      }
    };

    useImperativeHandle(ref, () => ({
      submit: handleSubmit(handleFormSubmit),
    }));
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
                {errors.SB_DataFechamento && (
                  <span>{errors.SB_DataFechamento.message}</span>
                )}
              </InfoBox>
              <InfoBox>
                <Labeln>Hora</Labeln>
                <Inputn
                  type="time"
                  {...register("SB_HoraFechamento", {
                    required: "Hora é obrigatória",
                  })}
                />
                {errors.SB_HoraFechamento && (
                  <span>{errors.SB_HoraFechamento.message}</span>
                )}
              </InfoBox>
              <InfoBox>
                <Labeln>Fechado Por</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_FechadoPor", {
                    required: "Fechado por é obrigatório",
                  })}
                />
                {errors.SB_FechadoPor && (
                  <span>{errors.SB_FechadoPor.message}</span>
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
                {errors.SB_Rede && <span>{errors.SB_Rede.message}</span>}
              </InfoBox>
            </Field>
            <Field>
              <InfoBox>
                <Labeln>Fechamento</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_OFechado", {
                    required: "Fechamento é obrigatório",
                  })}
                />
                {errors.SB_OFechado && (
                  <span>{errors.SB_OFechado.message}</span>
                )}
              </InfoBox>
              <InfoBox>
                <Labeln>Utilizou MZ</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_UltilizouMZ", {
                    required: "Utilizou MZ é obrigatório",
                  })}
                />
                {errors.SB_UltilizouMZ && (
                  <span>{errors.SB_UltilizouMZ.message}</span>
                )}
              </InfoBox>
              <InfoBox>
                <Labeln>Motivo</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_HFSMotivo", {
                    required: "Motivo é obrigatório",
                  })}
                />
                {errors.SB_HFSMotivo && (
                  <span>{errors.SB_HFSMotivo.message}</span>
                )}
              </InfoBox>
              <InfoBox>
                <Labeln>Manobra WFM</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_ManobraWFM", {
                    required: "Manobra WFM é obrigatório",
                  })}
                />
                {errors.SB_ManobraWFM && (
                  <span>{errors.SB_ManobraWFM.message}</span>
                )}
              </InfoBox>
            </Field>
            <Field>
              <InfoBox>
                <Labeln>Qtde. Ligações</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_QTDELigacoes", {
                    required: "Qtde. Ligações é obrigatório",
                  })}
                />
                {errors.SB_QTDELigacoes && (
                  <span>{errors.SB_QTDELigacoes.message}</span>
                )}
              </InfoBox>
              <InfoBox>
                <Labeln>Executante</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_Executante", {
                    required: "Executante é obrigatório",
                  })}
                />
                {errors.SB_Executante && (
                  <span>{errors.SB_Executante.message}</span>
                )}
              </InfoBox>
              <InfoBox>
                <Labeln>Previsão</Labeln>
                <Inputn
                  type="text"
                  {...register("SB_Previsão", {
                    required: "Previsão é obrigatório",
                  })}
                />
                {errors.SB_Previsão && (
                  <span>{errors.SB_Previsão.message}</span>
                )}
              </InfoBox>
              <InfoBox>
                <Labeln>Observações Fechamento</Labeln>
                <ObsArea {...register("SB_HSNObservacao")} />
                {errors.SB_HSNObservacao && (
                  <span>{errors.SB_HSNObservacao.message}</span>
                )}
              </InfoBox>
            </Field>
          </SectionBox>
        </Formn>
      </>
    );
  }
);

export default FechamentoForm;
