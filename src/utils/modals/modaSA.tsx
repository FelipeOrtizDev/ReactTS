import React, { ChangeEvent, useState } from "react";
import SolicitacaoBaseForm from "../../components/Form/SolicitacaoBaseForm";
import AcatamentoForm from "../../components/Form/AcatamentoForm";

import { useAcatamentoSubmit } from "../../hooks/useA";
import { useFormAcatamentoAberturaStore, useFormAcatamentoStore, useFormFechamentoStore, useFormServicoAberturaStore, } from "../../components/Form/formStore";
import { ModalContainer, ModalContent, Title } from "./modalUserStyles";
import { Buttons, ButtonsBox, Optionn, Selectn } from "../commonStyles";
import { Fechamento } from "../../services/models/fechamentoModel";
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";
import FechamentoForm from "../../components/Form/fechamentoForm";
import SolicitacaoAberturaForm from "../../components/Form/solicitacaoAberturaForm";
import { SectionBox, SectionTitle } from "../../pages/Fechamento/styles";

interface EditModalProps {
  solicitacao: SolicitacaoBase;
  fechamento: Fechamento;
  onClose: () => void;
  onSave: (data: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  solicitacao,
  fechamento,
  onClose,
  onSave,
}) => {
  const { handleSubmit: handleAcatamentoSubmit } = useAcatamentoSubmit();
  const { acatamento } = useFormAcatamentoStore();
  const { fechamento: fechamentoState } = useFormFechamentoStore();
  const { solicitacaoAbertura } = useFormServicoAberturaStore();
  const { acatamentoAbertura } = useFormAcatamentoAberturaStore();
  const [hasFValue, setHasFValue] = useState<Number | null>(null);

  // Função para lidar com a mudança de seleção
  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setHasFValue(Number(event.target.value));
  };


  const handleSubmitAll = async () => {
    try {
      //FC
      if (!fechamentoState.SB_DataFechamento || !fechamentoState.SB_HoraFechamento || !fechamentoState.SB_FechadoPor) {
        alert("Preencha todos os campos obrigatórios.");
        return;
      }
      onSave({ fechamento: fechamentoState });
      //AC
      const acatamentoData = {
        ...acatamento,
        SB_SolicitacaoBase_id_SolicitacaoBase: solicitacao.id_SolicitacaoBase,
        SB_SolicitacaoBase_SB_Enderecos_id_Endereco: solicitacao.SB_Enderecos_id_Endereco,
      };
      if (!acatamentoData.SB_DataAcatamento || !acatamentoData.SB_PrevisaoAcatamento || !acatamentoData.SB_EquipeResponsavel) {
        alert("Preencha todos os campos obrigatórios.");
        return;
      }
      const response = await handleAcatamentoSubmit(acatamentoData);
      onSave({ acatamento: response });
      //SA
      console.log("Dados de Solicitação Abertura antes do envio:", solicitacaoAbertura);
      console.log("Dados de Acatamento Abertura antes do envio:", acatamentoAbertura);
      if (!solicitacaoAbertura.SB_DataAbertura || !solicitacaoAbertura.SB_HoraAbertura || !solicitacaoAbertura.SB_Solicitante) {
        alert("Preencha todos os campos obrigatórios.");
        return;
      }
      onSave({ solicitacaoAbertura, acatamentoAbertura });


    } catch (error) {
      console.error("Erro ao enviar acatamento:", error);
      alert("Erro ao enviar dados, por favor, tente novamente.");
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <Title>Editar Solicitação e Acatamento</Title>
        <SolicitacaoBaseForm solicitacao={solicitacao} />
        <AcatamentoForm
          solicitacaoBaseId={solicitacao.id_SolicitacaoBase}
          enderecoId={solicitacao.SB_Enderecos_id_Endereco}
        />
        <SectionBox>
      <SectionTitle>Serviço foi aceito?</SectionTitle>
      <Selectn onChange={handleSelectChange}>
          <Optionn value="">Selecione...</Optionn>
          <Optionn value={1}>Sim</Optionn>
          <Optionn value={0}>Não</Optionn>
        </Selectn>
      </SectionBox>
      {hasFValue === 1 &&( <>
        <FechamentoForm
          fechamento={fechamento}
          onSubmit={(data: Fechamento) => {
            console.log("Dados do formulário de Fechamento enviados:", data);
          }}
        /> </>)}

        <SolicitacaoAberturaForm
          solicitacaoAbertura={solicitacaoAbertura}
          acatamentosAbertura={acatamentoAbertura}
          solicitacaoBaseId={solicitacao.id_SolicitacaoBase}
          enderecoId={solicitacao.SB_Enderecos_id_Endereco}
          onSubmit={(data) => {
            console.log("Dados do formulário de Solicitação de Abertura enviados:", data);
          }}
        />
        <ButtonsBox>
          <Buttons type="button" onClick={onClose}>
            Fechar
          </Buttons>
          <Buttons type="button" onClick={handleSubmitAll}>
            Salvar Tudo
          </Buttons>
        </ButtonsBox>
      </ModalContent>
    </ModalContainer>
  );
};

export default EditModal;