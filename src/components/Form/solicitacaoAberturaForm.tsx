import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SolicitacaoAbertura } from "../../services/models/solicitacaoAberturaModel";
import { AcatamentosAbertura } from "../../services/models/acatamentoAberturaModel";
import { useFormServicoAberturaStore, useFormAcatamentoAberturaStore } from "./formStore";
import { Inputn, Optionn, Selectn, Title } from "../../utils/commonStyles";
import {
  Field,
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
  TextArean,
} from "../../pages/Fechamento/styles";
import { FieldTwo, Formn, ObsArea } from "../../utils/modals/modalUserStyles";

type CombinedFormData = SolicitacaoAbertura & AcatamentosAbertura;

interface SolicitacaoAberturaFormProps {
  solicitacaoAbertura: SolicitacaoAbertura;
  acatamentosAbertura: AcatamentosAbertura;
  solicitacaoBaseId: number;
  enderecoId: number;


  onSubmit: (data: CombinedFormData) => void;
}

const SolicitacaoAberturaForm: React.FC<SolicitacaoAberturaFormProps> = ({
  solicitacaoAbertura,
  acatamentosAbertura,
  solicitacaoBaseId,
  enderecoId,

  onSubmit,
}) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CombinedFormData>({
    defaultValues: { ...solicitacaoAbertura, ...acatamentosAbertura }
  });

  const { solicitacaoAbertura: solicitacaoAberturaState, setSolicitacaoAbertura } = useFormServicoAberturaStore();

  useEffect(() => {
    setValue('SB_DataAbertura', solicitacaoAberturaState.SB_DataAbertura || '');
    setValue('SB_HoraAbertura', solicitacaoAberturaState.SB_HoraAbertura || '');
    setValue('SB_Solicitante', solicitacaoAberturaState.SB_Solicitante || '');
    setValue('SB_ServicoAceito', solicitacaoAberturaState.SB_ServicoAceito || 0);
    setValue('SB_HAbertura', solicitacaoAberturaState.SB_HAbertura || 0);
    setValue('SB_HNMotivo', solicitacaoAberturaState.SB_HNMotivo || '');
    setValue('SB_HNObservacoes', solicitacaoAberturaState.SB_HNObservacoes || '');
    setValue('SB_HSData', solicitacaoAberturaState.SB_HSData || '');
  }, [solicitacaoAberturaState, setValue]);

  const { acatamentoAbertura: acatamentoAberturaState, setAcatamentoAbertura } = useFormAcatamentoAberturaStore();
  
  useEffect(() => {
    setValue('SB_DataAcatamentoAbertura', acatamentoAberturaState.SB_DataAcatamentoAbertura || '');
    setValue('SB_EquipeResponsavelAbertura', acatamentoAberturaState.SB_EquipeResponsavelAbertura || '');
    setValue('SB_PrvisaoAcatamentoAbertura', acatamentoAberturaState.SB_PrvisaoAcatamentoAbertura || '');
    setValue('SB_ObservacaoAcatamentoAbertura', acatamentoAberturaState.SB_ObservacaoAcatamentoAbertura || '');
  }, [acatamentoAberturaState, setValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('SB_')) {
      setSolicitacaoAbertura({ [name]: value });
    } else {
      setAcatamentoAbertura({ [name]: value });
    }
  };

  const handleFormSubmit: SubmitHandler<CombinedFormData> = (data) => {
   
    const solicitacaoData = {
      ...data,
      SB_SolicitacaoBase_id_SolicitacaoBase: solicitacaoBaseId,
      SB_SolicitacaoBase_SB_Enderecos_id_Endereco: enderecoId,
      
    };

    
    const acatamentoData = {
      ...data,
      SB_SolicitacaoAbertura_id_SolicitacaoAbertura: solicitacaoAberturaState.id_SolicitacaoAbertura || 0
    };

    onSubmit({ ...solicitacaoData, ...acatamentoData });
  };

  const servAceitoValue = watch("SB_ServicoAceito");
  const hasAberturaValue = watch("SB_HAbertura");

  return (
    <Formn onSubmit={handleSubmit(handleFormSubmit)}>
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
              onChange={handleInputChange}
            />
            {errors.SB_DataAbertura && (
              <span>{errors.SB_DataAbertura.message}</span>
            )}
          </InfoBox>
          <InfoBox>
            <Labeln>Hora</Labeln>
            <Inputn
              type="time"
              {...register("SB_HoraAbertura", {
                required: "Hora é obrigatória",
              })}
              onChange={handleInputChange}
            />
            {errors.SB_HoraAbertura && (
              <span>{errors.SB_HoraAbertura.message}</span>
            )}
          </InfoBox>
          <InfoBox>
            <Labeln>Solicitante</Labeln>
            <Inputn
              type="text"
              {...register("SB_Solicitante", {
                required: "Solicitante é obrigatório",
              })}
              onChange={handleInputChange}
            />
            {errors.SB_Solicitante && (
              <span>{errors.SB_Solicitante.message}</span>
            )}
          </InfoBox>
        </Field>
        <SectionTitle>Acatamento Abertura</SectionTitle>
        <FieldTwo>
          <InfoBox>
            <Labeln>Data Acatamento</Labeln>
            <Inputn
              type="date"
              {...register("SB_DataAcatamentoAbertura", {
                required: "Data Acatamento é obrigatória",
              })}
              onChange={handleInputChange}
            />
            {errors.SB_DataAcatamentoAbertura && (
              <span>{errors.SB_DataAcatamentoAbertura.message}</span>
            )}
          </InfoBox>
          <InfoBox>
            <Labeln>Passado Para</Labeln>
            <Inputn
              type="text"
              {...register("SB_EquipeResponsavelAbertura", {
                required: "Responsável é obrigatório",
              })}
              onChange={handleInputChange}
            />
            {errors.SB_EquipeResponsavelAbertura && (
              <span>{errors.SB_EquipeResponsavelAbertura.message}</span>
            )}
          </InfoBox>
        </FieldTwo>
        <FieldTwo>
          <InfoBox>
            <Labeln>Previsão</Labeln>
            <Inputn
              type="time"
              {...register("SB_PrvisaoAcatamentoAbertura", {
                required: "Previsão é obrigatória",
              })}
              onChange={handleInputChange}
            />
            {errors.SB_PrvisaoAcatamentoAbertura && (
              <span>{errors.SB_PrvisaoAcatamentoAbertura.message}</span>
            )}
          </InfoBox>
          <InfoBox>
            <Labeln>Observações</Labeln>
            <ObsArea
              {...register("SB_ObservacaoAcatamentoAbertura")}
              onChange={handleInputChange}
            />
            {errors.SB_ObservacaoAcatamentoAbertura && (
              <span>{errors.SB_ObservacaoAcatamentoAbertura.message}</span>
            )}
          </InfoBox>
        </FieldTwo>
      </SectionBox>
      <SectionBox>
        <SectionTitle>O Serviço de Abertura foi aceito?</SectionTitle>
        <Selectn {...register("SB_ServicoAceito", { valueAsNumber: true })} onChange={handleInputChange}>
          <Optionn value="">Selecione...</Optionn>
          <Optionn value={1}>Sim</Optionn>
          <Optionn value={0}>Não</Optionn>
        </Selectn>
      </SectionBox>
      {servAceitoValue === 1 && (
        <SectionBox>
          <SectionTitle>Houve Abertura?</SectionTitle>
          <Selectn {...register("SB_HAbertura", { valueAsNumber: true })} onChange={handleInputChange}>
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
                onChange={handleInputChange}
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
                  onChange={handleInputChange}
                />
              </InfoBox>
              <InfoBox>
                <Labeln>Observações da Não Abertura</Labeln>
                <TextArean
                  placeholder="Digite as observações aqui"
                  {...register("SB_HNObservacoes")}
                  onChange={handleInputChange}
                />
              </InfoBox>
            </FieldTwo>
          )}
        </SectionBox>
      )}
    </Formn>
  );
};

export default SolicitacaoAberturaForm;
