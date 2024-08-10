/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";
import { Fechamento } from "../../services/models/fechamentoModel";
import { ModalContainer, ModalContent, Title } from "./modalUserStyles";
import { SectionBox, SectionTitle } from "../../pages/Fechamento/styles";
import { Selectn, Optionn, ButtonsBox, Buttons } from "../commonStyles";
import { useStore } from "../../components/Form/formsStore";
import SolicitacaoBaseForm from "../../components/Form/SolicitacaoBaseForm";
import FechamentoForm from "../../components/Form/fechamentoForm2";
import { saveOrUpdateFechamento } from "../../services/api/fechamentoService";

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

  const setSolicitacaoBase = useStore((state) => state.setSolicitacaoBase);
  const setFechamento = useStore((state) => state.setFechamento);

  const formSolicitacaoBase: UseFormReturn<SolicitacaoBase> =
    useForm<SolicitacaoBase>({
      defaultValues: solicitacaoBase,
    });

  const formFechamento: UseFormReturn<Fechamento> = useForm<Fechamento>({
    defaultValues: fechamento,
  });
  // Carrega os dados de fechamento e solicitação base quando o modal é aberto
  useEffect(() => {
    if (isOpen && solicitacaoBaseId) {
      setSolicitacaoBase({
        ...solicitacaoBase,
        id_SolicitacaoBase: solicitacaoBaseId,
      });
    }
  }, [isOpen, solicitacaoBaseId, setSolicitacaoBase]);

  // Função para salvar os dados ao fechar o modal
  const handleSave = async () => {
    try {
      // Obtenha os valores atualizados do formulário
      const updatedSolicitacao = formSolicitacaoBase.getValues();
      const updatedFechamento = formFechamento.getValues();

      updatedFechamento.SB_ServicoAceito = 1;
      updatedFechamento.SB_SolicitacaoBase_id_Endereco =
        updatedSolicitacao.SB_Enderecos_id_Endereco;

      // Certifique-se de que o ID da solicitação base está presente
      const solicitacaoBaseId = updatedSolicitacao.id_SolicitacaoBase;

      // Atualize ou crie o fechamento no backend utilizando o solicitacaoBaseId
      const savedFechamento = await saveOrUpdateFechamento(
        solicitacaoBaseId,
        updatedFechamento
      );

      // Sincronize o estado do Zustand
      setSolicitacaoBase(updatedSolicitacao);
      setFechamento(savedFechamento);

      // Feche o modal
      onClose();
    } catch (error) {
      console.error("Erro ao salvar solicitação e fechamento:", error);
    }
  };
  // Função para lidar com a mudança de seleção
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    Number(event.target.value);
  };
  console.log("solicitaçao: ", solicitacaoBase.id_SolicitacaoBase);
  console.log("fechamento: ", fechamento.id_Fechamentos);
  console.log("Current state:", useStore.getState());
  return (
    <ModalContainer>
      {/* {isLoading ? (
        <div>Carregando...</div>
      ): ( */}
      <ModalContent onSubmit={handleSave}>
        <Title>Editar Solicitação e Acatamento</Title>
        <SolicitacaoBaseForm form={formSolicitacaoBase} />
        {/* <AcatamentoForm form={acatamentoForm} /> */}
        <SectionBox>
          <SectionTitle>Serviço foi aceito?</SectionTitle>
          <Selectn onChange={handleSelectChange}>
            <Optionn value={1}>Selecione...</Optionn>
            <Optionn value={1}>Sim</Optionn>
            <Optionn value={0}>Não</Optionn>
          </Selectn>
        </SectionBox>

        <FechamentoForm form={formFechamento} />
        {/* {fechamento.SB_ServicoAceito === 1 && (
          <>
            <FechamentoForm form={fechamentoForm} />
          </>
        )} */}

        <ButtonsBox>
          <Buttons type="button" onClick={onClose}>
            Fechar
          </Buttons>
          <Buttons type="button" onClick={handleSave}>
            Salvar Tudo
          </Buttons>
        </ButtonsBox>
      </ModalContent>
      {/* )} */}
    </ModalContainer>
  );
};

export default EditModal;
