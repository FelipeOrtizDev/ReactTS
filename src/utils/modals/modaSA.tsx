/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";
import { Fechamento } from "../../services/models/fechamentoModel";
import {
  Field,
  Field1,
  FieldTwo,
  ModalContainer,
  ModalContent,
  Title,
} from "./modalUserStyles";
import {
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
  TextArean,
} from "../../pages/Fechamento/styles";
import { Selectn, Optionn, ButtonsBox, Buttons, Inputn } from "../commonStyles";
import { useStore } from "../../components/Form/formsStore";
import SolicitacaoBaseForm from "../../components/Form/SolicitacaoBaseForm";
import FechamentoForm from "../../components/Form/fechamentoForm";
import { saveOrUpdateFechamento } from "../../services/api/fechamentoService";
import AcatamentoForm from "../../components/Form/AcatamentoForm";
import { Acatamento } from "../../services/models/acatamentoModel";
import { AcatamentosAbertura } from "../../services/models/acatamentoAberturaModel";
import { SolicitacaoAbertura } from "../../services/models/solicitacaoAberturaModel";
import SolicitacaoAberturaForm from "../../components/Form/solicitacaoAberturaForm";
import AcatamentoAberturaForm from "../../components/Form/acatamentoAberturaForm";
import { saveOrUpdateAcatamento } from "../../services/api/Acatamento/acatamentoService";
import { saveOrUpdateSolicitacaoAbertura } from "../../services/api/solicitacaoAberturaService";
import { saveOrUpdateAcatamentoAbertura } from "../../services/api/Acatamento/acatamentosAberturaService";

interface ModalSAProps {
  isOpen: boolean;
  onClose: () => void;
  solicitacaoBaseId: number;
}

const EditModal: React.FC<ModalSAProps> = ({
  isOpen,
  onClose,
  solicitacaoBaseId,
}) => {
  const solicitacaoBase = useStore((state) => state.solicitacaoBase);
  const fechamento = useStore((state) => state.fechamento);
  const acatamento = useStore((state) => state.acatamento);
  const acatamentoAbertura = useStore((state) => state.acatamentoAbertura);
  const solicitacaoAbertura = useStore((state) => state.solicitacaoAbertura);

  const setSolicitacaoBase = useStore((state) => state.setSolicitacaoBase);
  const setFechamento = useStore((state) => state.setFechamento);
  const setAcatamento = useStore((state) => state.setAcatamento);
  const setAcatamentoAbertura = useStore(
    (state) => state.setAcatamentoAbertura
  );
  const setSolicitacaoAbertura = useStore(
    (state) => state.setSolicitacaoAbertura
  );

  const formSolicitacaoBase: UseFormReturn<SolicitacaoBase> =
    useForm<SolicitacaoBase>({
      defaultValues: solicitacaoBase,
    });

  const formFechamento: UseFormReturn<Fechamento> = useForm<Fechamento>({
    defaultValues: fechamento,
  });
  const formAcatamento: UseFormReturn<Acatamento> = useForm<Acatamento>({
    defaultValues: acatamento,
  });

  const formAcatamentoAbertura: UseFormReturn<AcatamentosAbertura> =
    useForm<AcatamentosAbertura>({
      defaultValues: acatamentoAbertura,
    });

  const formSolicitacaoAbertura: UseFormReturn<SolicitacaoAbertura> =
    useForm<SolicitacaoAbertura>({
      defaultValues: solicitacaoAbertura,
    });

  const servAceitoValue = formSolicitacaoAbertura.watch("SB_ServicoAceito");
  const hasAberturaValue = formSolicitacaoAbertura.watch("SB_HAbertura");
  // Carrega os dados de fechamento e solicitação base quando o modal é aberto
  useEffect(() => {
    if (isOpen && solicitacaoBaseId) {
      setSolicitacaoBase({
        ...solicitacaoBase,
        id_SolicitacaoBase: solicitacaoBaseId,
      });
    }
  }, [isOpen, solicitacaoBaseId, setSolicitacaoBase]);

  // UseEffect para monitorar mudanças em SB_ServicoAceito
  useEffect(() => {
    const subscription = formFechamento.watch((value, { name }) => {
      if (name === "SB_ServicoAceito") {
        setFechamento({
          ...fechamento,
          SB_ServicoAceito: value.SB_ServicoAceito,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [formFechamento, setFechamento, fechamento]);

  useEffect(() => {
    const subscription = formSolicitacaoAbertura.watch((value, { name }) => {
      if (name === "SB_ServicoAceito") {
        setSolicitacaoAbertura({
          ...solicitacaoAbertura,
          SB_ServicoAceito: value.SB_ServicoAceito,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [formSolicitacaoAbertura, setSolicitacaoAbertura, solicitacaoAbertura]);

  // Função para salvar os dados ao fechar o modal
  const handleSave = async () => {
    try {
      // Obtenha os valores atualizados do formulário
      const updatedSolicitacao = formSolicitacaoBase.getValues();
      const updatedFechamento = formFechamento.getValues();
      const updatedAcatamento = formAcatamento.getValues();
      const updatedAcatamentoAbertura = formAcatamentoAbertura.getValues();
      const updatedSolicitacaoAbertura = formSolicitacaoAbertura.getValues();
      setSolicitacaoBase(updatedSolicitacao);

      // Certifique-se de que o ID da solicitação base está presente
      const solicitacaoBaseId = updatedSolicitacao.id_SolicitacaoBase;

      const solicitacaoBaseIdAcatamento = solicitacaoBaseId;

      updatedFechamento.SB_SolicitacaoBase_id_Endereco =
        updatedSolicitacao.SB_Endereco_id_Endereco;

      updatedAcatamento.SB_SolicitacaoBase_id_Endereco =
        updatedSolicitacao.SB_Endereco_id_Endereco;

      updatedSolicitacaoAbertura.SB_SolicitacaoBase_id_Endereco =
        updatedSolicitacao.SB_Endereco_id_Endereco;

      updatedSolicitacaoAbertura.SB_SolicitacaoBase_id_SolicitacaoBase =
        solicitacaoBaseId;

      updatedSolicitacaoAbertura.SB_SolicitacaoBase_id_Endereco =
        updatedSolicitacao.SB_Endereco_id_Endereco;

      updatedAcatamentoAbertura.SB_SolicitacaoBase_id_SolicitacaoBase =
        solicitacaoBaseId;

      updatedAcatamentoAbertura.SB_SolicitacaoBase_id_Endereco =
        updatedSolicitacao.SB_Endereco_id_Endereco;

      let savedFechamento,
        savedAcatamento,
        savedSolicitacaoAbertura,
        savedAcatamentoAbertura;

      // Atualize ou crie o fechamento no backend utilizando o solicitacaoBaseId
      try {
        savedFechamento = await saveOrUpdateFechamento(
          solicitacaoBaseId,
          updatedFechamento
        );
      } catch (error) {
        console.error("Erro ao salvar fechamento:", error);
      }

      try {
        savedAcatamento = await saveOrUpdateAcatamento(
          solicitacaoBaseIdAcatamento,
          updatedAcatamento
        );
      } catch (error) {
        console.error("Erro ao salvar acatamento:", error);
      }

      try {
        savedSolicitacaoAbertura = await saveOrUpdateSolicitacaoAbertura(
          solicitacaoBaseId,
          updatedSolicitacaoAbertura
        );
      } catch (error) {
        console.error("Erro ao salvar solicitação de abertura:", error);
      }

      try {
        savedAcatamentoAbertura = await saveOrUpdateAcatamentoAbertura(
          solicitacaoBaseId,
          updatedAcatamentoAbertura
        );
      } catch (error) {
        console.error("Erro ao salvar acatamento de abertura:", error);
      }

      // Sincronize o estado do Zustand

      if (savedFechamento) {
        setFechamento(savedFechamento);
      }

      if (savedAcatamento) {
        setAcatamento(savedAcatamento);
      }

      if (savedSolicitacaoAbertura) {
        setSolicitacaoAbertura(savedSolicitacaoAbertura);
      }

      if (savedAcatamentoAbertura) {
        setAcatamentoAbertura(savedAcatamentoAbertura);
      }
      window.location.reload();
      // Feche o modal
      onClose();
    } catch (error) {
      console.error("Erro inesperado ao salvar dados:", error);
      onClose();
      window.location.reload();
    }
  };

  return (
    <ModalContainer>
      <ModalContent onSubmit={handleSave}>
        <Title>Editar Solicitação e Acatamento</Title>
        <SolicitacaoBaseForm form={formSolicitacaoBase} />
        <AcatamentoForm form={formAcatamento} />
        <SectionBox>
          <SectionTitle>Serviço foi aceito?</SectionTitle>
          <Selectn
            {...formFechamento.register("SB_ServicoAceito", {
              valueAsNumber: true,
            })}
          >
            <Optionn value="null">Selecione...</Optionn>
            <Optionn value={1}>Sim</Optionn>
            <Optionn value={0}>Não</Optionn>
          </Selectn>
        </SectionBox>

        {fechamento.SB_ServicoAceito === 1 && (
          <>
            <FechamentoForm form={formFechamento} />
          </>
        )}

        <SolicitacaoAberturaForm
          form={formSolicitacaoAbertura}
          solicitacaoBaseId={solicitacaoBaseId}
        />

        <AcatamentoAberturaForm
          form={formAcatamentoAbertura}
          solicitacaoBaseId={solicitacaoBaseId}
        />

        <SectionBox>
          <SectionTitle>O Serviço de Abertura foi aceito?</SectionTitle>
          <Selectn
            {...formSolicitacaoAbertura.register("SB_ServicoAceito", {
              valueAsNumber: true,
            })}
          >
            <Optionn value={0}>Selecione...</Optionn>
            <Optionn value={1}>Sim</Optionn>
            <Optionn value={0}>Não</Optionn>
          </Selectn>
        </SectionBox>
        {servAceitoValue === 1 && (
          <SectionBox>
            <SectionTitle>Houve Abertura?</SectionTitle>
            <Selectn
              {...formSolicitacaoAbertura.register("SB_HAbertura", {
                valueAsNumber: true,
              })}
            >
              <Optionn value={0}>Selecione...</Optionn>
              <Optionn value={1}>Sim</Optionn>
              <Optionn value={0}>Não</Optionn>
            </Selectn>
            {hasAberturaValue === 1 && (
              <InfoBox>
                <Labeln>Data</Labeln>
                <Inputn
                  type="date"
                  {...formSolicitacaoAbertura.register("SB_HSData")}
                />
                {/*   <Labeln>Data</Labeln>
                <Inputn
                  type="text"
                  placeholder="Digite o motivo da não abertura aqui"
                  {...formSolicitacaoAbertura.register("SB_HSData")}
                />
                <Labeln>Hora</Labeln>
                <Inputn
                  type="text"
                  placeholder="Digite o motivo da não abertura aqui"
                  {...formSolicitacaoAbertura.register("SB_HoraAbertura")}
                />
                <Labeln>Aberto Por</Labeln>
                <Inputn
                  type="text"
                  placeholder="Digite o motivo da não abertura aqui"
                  {...formSolicitacaoAbertura.register("SB_AbertoPor")}
                />
                <Labeln>Abertura</Labeln>
                <Inputn
                  type="text"
                  placeholder="Digite o motivo da não abertura aqui"
                  {...formSolicitacaoAbertura.register("SB_OAberto")}
                />
                <Labeln>Abertura</Labeln>
                <Inputn
                  type="text"
                  placeholder="Digite o motivo da não abertura aqui"
                  {...formSolicitacaoAbertura.register("SB_OAberto")}
                />
                <Labeln>Utilizou MZ</Labeln>
                <Inputn
                  type="text"
                  placeholder="Digite o motivo da não abertura aqui"
                  {...formSolicitacaoAbertura.register("SB_UtilizouMZ")}
                />
                <Labeln>Motivo</Labeln>
                <Inputn
                  type="text"
                  placeholder="Digite o motivo da não abertura aqui"
                  {...formSolicitacaoAbertura.register("SB_HSNMotivo")}
                />
                <Labeln>Manobra WFM</Labeln>
                <Inputn
                  type="text"
                  placeholder="Digite o motivo da não abertura aqui"
                  {...formSolicitacaoAbertura.register("SB_ManobraWFM")}
                />
                <Labeln>Qtde. Ligações</Labeln>
                <Inputn
                  type="number"
                  placeholder="Digite o motivo da não abertura aqui"
                  {...formSolicitacaoAbertura.register("SB_QTDEligacoes")}
                />
                <Labeln>Executante</Labeln>
                <Inputn
                  type="text"
                  placeholder="Digite o motivo da não abertura aqui"
                  {...formSolicitacaoAbertura.register("SB_Executante")}
                />
                <Labeln>Previsão</Labeln>
                <Inputn
                  type="text"
                  placeholder="Digite o motivo da não abertura aqui"
                  {...formSolicitacaoAbertura.register("SB_Previsao")}
                />
                <Labeln>Observações Abertura</Labeln>
                <Inputn
                  type="text"
                  placeholder="Digite o motivo da não abertura aqui"
                  {...formSolicitacaoAbertura.register(
                    "SB_HFObservacaoAbertura"
                  )}
                /> */}
              </InfoBox>
            )}
            {hasAberturaValue === 0 && (
              <FieldTwo>
                <InfoBox>
                  <Labeln>Motivo</Labeln>
                  <Inputn
                    type="text"
                    placeholder="Digite o motivo da não abertura aqui"
                    {...formSolicitacaoAbertura.register("SB_HNMotivo")}
                  />
                </InfoBox>
                <InfoBox>
                  <Labeln>Observações da Não Abertura</Labeln>
                  <TextArean
                    placeholder="Digite as observações aqui"
                    {...formSolicitacaoAbertura.register("SB_HNObservacoes")}
                  />
                </InfoBox>
              </FieldTwo>
            )}
          </SectionBox>
        )}

        <ButtonsBox>
          <Buttons type="button" onClick={onClose}>
            Fechar
          </Buttons>
          <Buttons type="button" onClick={handleSave}>
            Salvar Tudo
          </Buttons>
        </ButtonsBox>
      </ModalContent>
    </ModalContainer>
  );
};

export default EditModal;
