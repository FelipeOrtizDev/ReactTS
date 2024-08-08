/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent } from "react";
import SolicitacaoBaseForm from "../../components/Form/SolicitacaoBaseForm";
import { ModalContainer, ModalContent, Title } from "./modalUserStyles";
import { Buttons, ButtonsBox, Optionn, Selectn } from "../commonStyles";
import { Fechamento } from "../../services/models/fechamentoModel";
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";
import FechamentoForm from "../../components/Form/fechamentoForm";
import { SectionBox, SectionTitle } from "../../pages/Fechamento/styles";
import { useStore } from "../../components/Form/formfechamentoStore";
import { createFechamentos } from '../../services/api/fechamentoService';
import { useForm } from "react-hook-form";

interface EditModalProps {
  solicitacao: SolicitacaoBase;
  Ifechamento?: Fechamento;
  isLoading: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  solicitacao,
  Ifechamento,
  isLoading,
  onClose,
  onSave,
}) => {

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    fechamentoForm.setValue("SB_ServicoAceito", value);
  };
 
  /*  const { fechamento, setFechamento } = useStore();

  const handleSaveSolicitacao = (data: SolicitacaoBase) => {
    onSave({ ...solicitacao, ...data });
  };

  const handleSaveFechamento = async (data: Fechamento) => {
    try {
      const response = await axiosInstance.post(
        `/fechamentos/${solicitacao.id_SolicitacaoBase}`,
        data
      );
      setFechamento(data);
      console.log("Fechamento enviado com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao enviar fechamento:", error);
    }
  }; */

  const { fechamento, setFechamento } = useStore();

  const solicitacaoForm = useForm<SolicitacaoBase>({
    defaultValues: solicitacao,
  });
  const fechamentoForm = useForm<Fechamento>({
    defaultValues: Ifechamento || fechamento,
  });

  const handleSave = async () => {
    const solicitacaoData = solicitacaoForm.getValues();
    const fechamentoData = fechamentoForm.getValues();
    fechamentoData.Sb_SolicitacaoBase = solicitacaoData;

    fechamentoData.SB_SolicitacaoBase_id_SolicitacaoBase =
      fechamentoData.Sb_SolicitacaoBase.id_SolicitacaoBase;

    fechamentoData.SB_SolicitacaoBase_SB_Enderecos_id_Endereco =
      fechamentoData.Sb_SolicitacaoBase.SB_Enderecos_id_Endereco;
    // Ensure the value is number before sending to backend
    fechamentoData.SB_ServicoAceito = 
      fechamentoForm.getValues("SB_ServicoAceito");


    try {
      const responseData = await createFechamentos(fechamentoData);
      setFechamento(fechamentoData);
      onSave({ ...solicitacaoData, fechamento: fechamentoData });

      return responseData;
    } catch (error) {
      console.error('Erro ao enviar fechamento:', error);
    }
  };

  return (
    <ModalContainer>
      {isLoading ? (
        <div>Carregando...</div>
      ): (
      <ModalContent onSubmit={solicitacaoForm.handleSubmit(handleSave)}>
        <Title>Editar Solicitação e Acatamento</Title>
        <SolicitacaoBaseForm form={solicitacaoForm} />
         {/* <AcatamentoForm
          solicitacaoBaseId={solicitacao.id_SolicitacaoBase}
          enderecoId={solicitacao.SB_Enderecos_id_Endereco}
        /> */}
        <SectionBox>
      <SectionTitle>Serviço foi aceito?</SectionTitle>
      <Selectn     
      {...fechamentoForm.register("SB_ServicoAceito", { valueAsNumber: true })}
      onChange={handleSelectChange}
      value={fechamentoForm.watch("SB_ServicoAceito")}
      >
          <Optionn value="">Selecione...</Optionn>
          <Optionn value={1}>Sim</Optionn>
          <Optionn value={0}>Não</Optionn>
        </Selectn>
      </SectionBox>
      {fechamentoForm.watch("SB_ServicoAceito") === 1 &&( <>
        <FechamentoForm form={fechamentoForm} />
        </>)}

        {/* <SolicitacaoAberturaForm
          acatamento={acatamento}
          onSubmit={handleSaveAcatamento}
        />  */}
        
        {/*  <SolicitacaoAberturaForm
          solicitacaoAbertura={solicitacaoAbertura}
          acatamentosAbertura={acatamentoAbertura}
          solicitacaoBaseId={solicitacao.id_SolicitacaoBase}
          enderecoId={solicitacao.SB_Enderecos_id_Endereco}
          onSubmit={(data) => {
            console.log("Dados do formulário de Solicitação de Abertura enviados:", data);
          }}
        /> */} 

        <ButtonsBox>
          <Buttons type="button" onClick={onClose}>
            Fechar
          </Buttons>
          <Buttons type="button" onClick={handleSave}>
            Salvar Tudo
          </Buttons>
        </ButtonsBox>
      </ModalContent>
      )}
    </ModalContainer>
  );
};

export default EditModal;
