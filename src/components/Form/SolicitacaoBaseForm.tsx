import React from "react";
import { useForm } from "react-hook-form";
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";
import { Inputn } from "../../utils/commonStyles";
import {
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";
import { Field, TextArean } from "../../utils/modals/modalUserStyles";

interface SolicitacaoBaseFormProps {
  solicitacao: SolicitacaoBase;
  onSubmit: (data: SolicitacaoBase) => void;
}

const SolicitacaoBaseForm: React.FC<SolicitacaoBaseFormProps> = ({
  solicitacao,
  onSubmit,
}) => {
  const { register, handleSubmit } = useForm<SolicitacaoBase>({
    defaultValues: solicitacao,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SectionBox>
        <SectionTitle>Dados da Solicitação</SectionTitle>
        <Field>
          <InfoBox>
            <Labeln>Data Solicitação</Labeln>
            <Inputn
              type="date"
              {...register("SB_DataSolicitacao", {
                required: "Data é obrigatório",
              })}
              defaultValue={solicitacao.SB_DataSolicitacao}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Hora da Solicitação</Labeln>
            <Inputn
              type="time"
              {...register("SB_HoraSolicitacao", {
                required: "Hora é obrigatória",
              })}
              defaultValue={solicitacao.SB_HoraSolicitacao}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Polo</Labeln>
            <Inputn
              type="text"
              {...register("SB_Endereco.SB_Polo", {
                required: "Polo é obrigatório",
              })}
              defaultValue={solicitacao.SB_Endereco.SB_Polo}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Solicitante</Labeln>
            <Inputn
              type="text"
              {...register("SB_Solicitante", {
                required: "Solicitante é obrigatório",
              })}
              defaultValue={solicitacao.SB_Solicitante}
            />
          </InfoBox>
        </Field>
        <Field>
          <InfoBox>
            <Labeln>Responsável</Labeln>
            <Inputn
              type="text"
              {...register("SB_Responsavel", {
                required: "Responsável é obrigatório",
              })}
              defaultValue={solicitacao.SB_Responsavel}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Prioridade</Labeln>
            <Inputn
              type="text"
              {...register("SB_Prioridade", {
                required: "Prioridade é obrigatória",
              })}
              defaultValue={solicitacao.SB_Prioridade}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Município</Labeln>
            <Inputn
              type="text"
              {...register("SB_Endereco.SB_Municipio", {
                required: "Município é obrigatório",
              })}
              defaultValue={solicitacao.SB_Endereco.SB_Municipio}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Logradouro</Labeln>
            <Inputn
              type="text"
              {...register("SB_Endereco.SB_Logradouro", {
                required: "Logradouro é obrigatório",
              })}
              defaultValue={solicitacao.SB_Endereco.SB_Logradouro}
            />
          </InfoBox>
        </Field>
        <Field>
          <InfoBox>
            <Labeln>Número</Labeln>
            <Inputn
              type="text"
              {...register("SB_Endereco.SB_Numero", {
                required: "Número é obrigatório",
              })}
              defaultValue={solicitacao.SB_Endereco.SB_Numero}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Complemento</Labeln>
            <Inputn
              type="text"
              {...register("SB_Endereco.SB_Complemento", {
                required: "Complemento é obrigatório",
              })}
              defaultValue={solicitacao.SB_Endereco.SB_Complemento}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Cruzamento</Labeln>
            <Inputn
              type="text"
              {...register("SB_Endereco.SB_Cruzamento", {
                required: "Cruzamento é obrigatório",
              })}
              defaultValue={solicitacao.SB_Endereco.SB_Cruzamento}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Bairro</Labeln>
            <Inputn
              type="text"
              {...register("SB_Endereco.SB_Bairro", {
                required: "Bairro é obrigatório",
              })}
              defaultValue={solicitacao.SB_Endereco.SB_Bairro}
            />
          </InfoBox>
        </Field>
        <Field>
          <InfoBox>
            <Labeln>Referência</Labeln>
            <Inputn
              type="text"
              {...register("SB_Endereco.SB_Referencia", {
                required: "Referencia é obrigatória",
              })}
              defaultValue={solicitacao.SB_Endereco.SB_Referencia}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Número OS</Labeln>
            <Inputn
              type="text"
              {...register("SB_NumeroOS", {
                required: "Numero OS é obrigatório",
              })}
              defaultValue={solicitacao.SB_NumeroOS}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Tipo de Serviço</Labeln>
            <Inputn
              type="text"
              {...register("SB_TipoServico", {
                required: "Tipo Serviço é obrigatório",
              })}
              defaultValue={solicitacao.SB_TipoServico}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Setor Abastecimento</Labeln>
            <Inputn
              type="text"
              {...register("SB_Endereco.SB_SetorAbastecimento", {
                required: "Setor Abastecimento é obrigatório",
              })}
              defaultValue={solicitacao.SB_Endereco.SB_SetorAbastecimento}
            />
          </InfoBox>
        </Field>
        <Field>
          <InfoBox>
            <Labeln>Zona de Pressão</Labeln>
            <Inputn
              type="text"
              {...register("SB_Endereco.SB_ZonaPressao", {
                required: "Zona de Pressão é obrigatória",
              })}
              defaultValue={solicitacao.SB_Endereco.SB_ZonaPressao}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Microzona</Labeln>
            <Inputn
              type="text"
              {...register("SB_Microzona", {
                required: "Microzona é obrigatória",
              })}
              defaultValue={solicitacao.SB_Microzona}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Numero MZ</Labeln>
            <Inputn
              type="text"
              {...register("SB_NumeroMZ", {
                required: "Numero MZ é obrigatório",
              })}
              defaultValue={solicitacao.SB_NumeroMZ}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Motivo</Labeln>
            <Inputn
              type="number"
              {...register("SB_Motivo", {
                required: "Motivo é obrigatório",
              })}
              defaultValue={solicitacao.SB_Motivo}
            />
          </InfoBox>
        </Field>
        <Labeln>Observações</Labeln>
        <TextArean
          {...register("SB_Observacoes")}
          defaultValue={solicitacao.SB_Observacoes}
        />
      </SectionBox>
    </form>
  );
};

export default SolicitacaoBaseForm;
