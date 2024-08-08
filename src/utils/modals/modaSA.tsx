/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from "react";
import SolicitacaoBaseForm from "../../components/Form/SolicitacaoBaseForm";
import { ModalContainer, ModalContent, Title } from "./modalUserStyles";
import { Buttons, ButtonsBox, Optionn, Selectn } from "../commonStyles";
import { Fechamento } from "../../services/models/fechamentoModel";
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";
import FechamentoForm from "../../components/Form/fechamentoForm";
import { SectionBox, SectionTitle } from "../../pages/Fechamento/styles";
import { useStore } from "../../components/Form/formfechamentoStore";
import { createFechamentos } from "../../services/api/fechamentoService";
import { useForm } from "react-hook-form";
import { createAcatamento } from "../../services/api/Acatamento/acatamentoService";
import { Acatamento } from "../../services/models/acatamentoModel";
import AcatamentoForm from "../../components/Form/AcatamentoForm";

interface EditModalProps {
  solicitacao: SolicitacaoBase;
  onClose: () => void;
  onSave: (data: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  solicitacao,
  onClose,
  onSave,
}) => {
  const [hasFValue, setHasFValue] = useState<Number | null>(null);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setHasFValue(Number(event.target.value));
  };

  const { fechamento, setFechamento, acatamento, setAcatamento } = useStore();

  const solicitacaoForm = useForm<SolicitacaoBase>({
    defaultValues: solicitacao,
  });
  const fechamentoForm = useForm<Fechamento>({
    defaultValues: fechamento,
  });
  const acatamentoForm = useForm<Acatamento>({
    defaultValues: acatamento,
  });

  const handleSave = async () => {
    const solicitacaoData = solicitacaoForm.getValues();
    const fechamentoData = fechamentoForm.getValues();
    const acatamentoData = acatamentoForm.getValues();

    acatamentoData.SB_SolcitacaoBase = solicitacaoData;

    acatamentoData.SB_SolicitacaoBase_id_SolicitacaoBase =
      acatamentoData.SB_SolcitacaoBase.id_SolicitacaoBase;

    acatamentoData.SB_SolicitacaoBase_SB_Enderecos_id_Endereco =
      acatamentoData.SB_SolcitacaoBase.SB_Enderecos_id_Endereco;

    fechamentoData.Sb_SolicitacaoBase = solicitacaoData;

    fechamentoData.SB_SolicitacaoBase_id_SolicitacaoBase =
      fechamentoData.Sb_SolicitacaoBase.id_SolicitacaoBase;

    fechamentoData.SB_SolicitacaoBase_SB_Enderecos_id_Endereco =
      fechamentoData.Sb_SolicitacaoBase.SB_Enderecos_id_Endereco;

    fechamentoData.SB_ServicoAceito = false;
    fechamentoData.SB_HouveFechamento = false;
    try {
      const responseData = await createFechamentos(fechamentoData);
      const acatamentoResponse = await createAcatamento(acatamentoData);

      setFechamento(fechamentoData);
      setAcatamento(acatamentoData);

      onSave({
        ...solicitacaoData,
        fechamento: fechamentoData,
        acatamento: acatamentoData,
      });

      window.location.reload();

      return { responseData, acatamentoResponse };
    } catch (error) {
      console.error("Erro ao enviar fechamento:", error);
    }
  };
  return (
    <ModalContainer>
      <ModalContent onSubmit={solicitacaoForm.handleSubmit(handleSave)}>
        <Title>Editar Solicitação e Acatamento</Title>
        <SolicitacaoBaseForm form={solicitacaoForm} />
        <AcatamentoForm form={acatamentoForm} />
        <SectionBox>
          <SectionTitle>Serviço foi aceito?</SectionTitle>
          <Selectn onChange={handleSelectChange}>
            <Optionn value="">Selecione...</Optionn>
            <Optionn value={1}>Sim</Optionn>
            <Optionn value={0}>Não</Optionn>
          </Selectn>
        </SectionBox>
        {hasFValue === 1 && (
          <>
            <FechamentoForm form={fechamentoForm} />
          </>
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
