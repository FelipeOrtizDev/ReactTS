import React from "react";
import { UseFormReturn } from "react-hook-form";
import { SolicitacaoAbertura } from "../../services/models/solicitacaoAberturaModel";
import { Inputn, Title } from "../../utils/commonStyles";
import {
  Field,
  InfoBox,
  Labeln,
  SectionBox,
} from "../../pages/Fechamento/styles";
import { Formn } from "../../utils/modals/modalUserStyles";

interface SolicitacaoAberturaFormProps {
  form: UseFormReturn<SolicitacaoAbertura>;
}

const SolicitacaoAberturaForm: React.FC<SolicitacaoAberturaFormProps> = ({
  form,
}) => {
  const { register} = form;

  return (
    <Formn>
      <SectionBox>
        <Title>Solicitação de Abertura</Title>
        <Field>
          <InfoBox>
            <Labeln>Data Abertura</Labeln>
            <Inputn
              type="date"
              {...register("SB_DataAbertura", {
                required: "Data Abertura é obrigatória",
              })}

            />
          </InfoBox>
          <InfoBox>
            <Labeln>Hora</Labeln>
            <Inputn
              type="time"
              {...register("SB_HoraAbertura", {
                required: "Hora é obrigatória",
              })}

            />
          </InfoBox>
          <InfoBox>
            <Labeln>Solicitante</Labeln>
            <Inputn
              type="text"
              {...register("SB_Solicitante", {
                required: "Solicitante é obrigatório",
              })}

            />
          </InfoBox>
        </Field>
        </SectionBox>
        {/* <SectionTitle>Acatamento Abertura</SectionTitle>
        <FieldTwo>
          <InfoBox>
            <Labeln>Data Acatamento</Labeln>
            <Inputn
              type="date"
              {...register("SB_DataAcatamentoAbertura", {
                required: "Data Acatamento é obrigatória",
              })}

            />
          </InfoBox>
          <InfoBox>
            <Labeln>Passado Para</Labeln>
            <Inputn
              type="text"
              {...register("SB_EquipeResponsavelAbertura", {
                required: "Responsável é obrigatório",
              })}

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

            />
          </InfoBox>
          <InfoBox>
            <Labeln>Observações</Labeln>
            <ObsArea
              {...register("SB_ObservacaoAcatamentoAbertura")}

            />
          </InfoBox>
        </FieldTwo>
      </SectionBox>
      <SectionBox>
        <SectionTitle>O Serviço de Abertura foi aceito?</SectionTitle>
        <Selectn
          {...register("SB_ServicoAceito", { valueAsNumber: true })
        >
          <Optionn value="">Selecione...</Optionn>
          <Optionn value={1}>Sim</Optionn>
          <Optionn value={0}>Não</Optionn>
        </Selectn>
      </SectionBox>
      {servAceitoValue === 1 && (
        <SectionBox>
          <SectionTitle>Houve Abertura?</SectionTitle>
          <Selectn
            {...register("SB_HAbertura", { valueAsNumber: true })}
          >
            <Optionn value="">Selecione...</Optionn>
            <Optionn value={1}>Sim</Optionn>
            <Optionn value={0}>Não</Optionn>
          </Selectn>
          {hasAberturaValue === 1 && (
            <InfoBox>
              <Labeln>Data</Labeln>
              <Inputn
                type="date"
                {...register("SB_HSData")}
  
              />
            </InfoBox>
          )}
          {hasAberturaValue === 0 && (
            <FieldTwo>
              <InfoBox>
                <Labeln>Motivo</Labeln>
                <Inputn
                  type="text"
                  placeholder="Digite o motivo da não abertura aqui"
                  {...register("SB_HNMotivo")}
    
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Observações da Não Abertura</Labeln>
                <TextArean
                  placeholder="Digite as observações aqui"
                  {...register("SB_HNObservacoes")}
    
                />
              </InfoBox>
            </FieldTwo>
          )}
        </SectionBox>
      )} */}
    </Formn>
  );
};

export default SolicitacaoAberturaForm;
