import React from "react";
import { useForm } from "react-hook-form";
import {
  SolicitacaoBase,
  updateSolicitacaoBase,
} from "../../services/api/solicitacaoBase";
import {
  Formn,
  ModalContainer,
  ModalContent,
  Field,
  FieldTwo,
  TextArean,
  Title,
} from "./modalUserStyles";
import {
  Buttons,
  ButtonsBox,
  Inputn,
  Selectn,
  Optionn,
} from "../../utils/commonStyles";
import { BsClipboard2X, BsClipboard2Check } from "react-icons/bs";
import {
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";
import { Acatamento } from "../../services/api/acatamentoService";

interface EditModalProps {
  solicitacao: SolicitacaoBase;
  acamento: Acatamento;
  onClose: () => void;
  onSave: (updated: SolicitacaoBase) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  solicitacao,
  acamento,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SolicitacaoBase, Acatamento>();

  const onSubmit = async (data: SolicitacaoBase) => {
    try {
      const updatedSolicitacao = await updateSolicitacaoBase(
        solicitacao.id_SolicitacaoBase!,
        data
      );
      onSave(updatedSolicitacao);
    } catch (error) {
      console.error("Erro ao atualizar solicitação:", error);
    }
  };

  return (
    <>
      <ModalContainer>
        <ModalContent>
          <Title>Editar Solicitação</Title>
          <Formn onSubmit={handleSubmit(onSubmit)}>
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
                  {errors.SB_DataSolicitacao && (
                    <span>{errors.SB_DataSolicitacao.message}</span>
                  )}
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
                  {errors.SB_HoraSolicitacao && (
                    <span>{errors.SB_HoraSolicitacao.message}</span>
                  )}
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
                  {errors.SB_Endereco?.SB_Polo && (
                    <span>{errors.SB_Endereco?.SB_Polo.message}</span>
                  )}
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
                  {errors.SB_Solicitante && (
                    <span>{errors.SB_Solicitante.message}</span>
                  )}
                </InfoBox>
              </Field>
              {/* // responsavel, prioridade - conectar com iterface */}
              <Field>
                <InfoBox>
                  <Labeln>Responsável</Labeln>
                  <Inputn
                    type="text"
                    {...register("SB_Solicitante", {
                      required: "Responsável é obrigatório",
                    })}
                    defaultValue={solicitacao.SB_Responsavel}
                  />
                  {errors.SB_Solicitante && (
                    <span>{errors.SB_Solicitante.message}</span>
                  )}
                </InfoBox>
                <InfoBox>
                  <Labeln>Prioridade</Labeln>
                  <Inputn
                    type="text"
                    {...register("SB_Solicitante", {
                      required: "Prioridade é obrigatória",
                    })}
                    defaultValue={solicitacao.SB_Prioridade}
                  />
                  {errors.SB_Solicitante && (
                    <span>{errors.SB_Solicitante.message}</span>
                  )}
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
                  {errors.SB_Endereco?.SB_Municipio && (
                    <span>{errors.SB_Endereco?.SB_Municipio.message}</span>
                  )}
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
                  {errors.SB_Endereco?.SB_Logradouro && (
                    <span>{errors.SB_Endereco?.SB_Logradouro.message}</span>
                  )}
                </InfoBox>
              </Field>
              {/* // cruzamen -conect interface */}
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
                  {errors.SB_Endereco?.SB_Numero && (
                    <span>{errors.SB_Endereco?.SB_Numero.message}</span>
                  )}
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
                  {errors.SB_Endereco?.SB_Complemento && (
                    <span>{errors.SB_Endereco?.SB_Complemento.message}</span>
                  )}
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
                  {errors.SB_Endereco?.SB_Cruzamento && (
                    <span>{errors.SB_Endereco?.SB_Cruzamento.message}</span>
                  )}
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
                  {errors.SB_Endereco?.SB_Bairro && (
                    <span>{errors.SB_Endereco?.SB_Bairro.message}</span>
                  )}
                </InfoBox>
              </Field>
              {/* //ref, os , tipo, setor abastecimento */}
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
                  {errors.SB_Endereco?.SB_Referencia && (
                    <span>{errors.SB_Endereco?.SB_Referencia.message}</span>
                  )}
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
                  {errors.SB_NumeroOS && (
                    <span>{errors.SB_NumeroOS.message}</span>
                  )}
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
                  {errors.SB_TipoServico && (
                    <span>{errors.SB_TipoServico.message}</span>
                  )}
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
                  {errors.SB_Endereco?.SB_SetorAbastecimento && (
                    <span>
                      {errors.SB_Endereco?.SB_SetorAbastecimento.message}
                    </span>
                  )}
                </InfoBox>
              </Field>
              {/* // Micro, MZ, Motivo */}
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
                  {errors.SB_Endereco?.SB_ZonaPressao && (
                    <span>{errors.SB_Endereco?.SB_ZonaPressao.message}</span>
                  )}
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
                  {errors.SB_Microzona && (
                    <span>{errors.SB_Microzona.message}</span>
                  )}
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
                  {errors.SB_NumeroMZ && (
                    <span>{errors.SB_NumeroMZ.message}</span>
                  )}
                </InfoBox>
                <InfoBox>
                  <Labeln>Motivo</Labeln>
                  <Inputn
                    type="text"
                    {...register("SB_Motivo", {
                      required: "Motivo é obrigatório",
                    })}
                    defaultValue={solicitacao.SB_Motivo}
                  />
                  {errors.SB_Motivo && <span>{errors.SB_Motivo.message}</span>}
                </InfoBox>
              </Field>
              <Labeln>Observações</Labeln>
              <TextArean
                {...register("SB_Observacoes")}
                defaultValue={solicitacao.SB_Observacoes}
              />
            </SectionBox>
            <SectionBox>
              <SectionTitle>Acatamento</SectionTitle>
              <FieldTwo>
                <InfoBox>
                  <Labeln>Data</Labeln>
                  <Inputn
                    type="date"
                    defaultValue={acamento.SB_DataAcatamento}
                  />
                </InfoBox>
                <InfoBox>
                  <Labeln>Passado Para</Labeln>
                  <Inputn
                    type="text"
                    defaultValue={acamento.SB_EquipeResponsavel}
                  />
                </InfoBox>
              </FieldTwo>
              <FieldTwo>
                <InfoBox>
                  <Labeln>Previsão (h)</Labeln>
                  <Inputn
                    type="time"
                    defaultValue={acamento.SB_PrvisãoAcatamento}
                  />
                </InfoBox>
                <InfoBox>
                  <Labeln>Observações</Labeln>
                  <TextArean defaultValue={acamento.SB_ObservacaoAcatamento} />
                </InfoBox>
              </FieldTwo>
            </SectionBox>
            <SectionBox>
              <SectionTitle>Houve fechamento?</SectionTitle>
              <Selectn>
                <Optionn value="">Selecione...</Optionn>
                <Optionn value="Sim">Sim</Optionn>
                <Optionn value="Não">Não</Optionn>
              </Selectn>
            </SectionBox>

            <ButtonsBox>
              <Buttons type="button" onClick={onClose}>
                Cancelar <BsClipboard2X />
              </Buttons>
              <Buttons type="submit">
                Salvar
                <BsClipboard2Check />
              </Buttons>
            </ButtonsBox>
          </Formn>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default EditModal;
