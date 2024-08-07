import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Acatamento } from "../../services/models/acatamentoModel";
import { useAcatamentoStore } from "./Stores/formfechamentoStore";
import { Inputn } from "../../utils/commonStyles";
import { FieldTwo, Formn, TextArean } from "../../utils/modals/modalUserStyles";
import {
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
} from "../../pages/Fechamento/styles";

interface AcatamentoFormProps {
  solicitacaoBaseId: number;
  enderecoId: number;
}
const AcatamentoForm: React.FC<AcatamentoFormProps> = ({
  solicitacaoBaseId,
  enderecoId,
}) => {
  const { register, handleSubmit, setValue, getValues } = useForm<Acatamento>();
  const { acatamento, setAcatamento } = useAcatamentoStore();

  useEffect(() => {
    // Inicializando os valores do formulário com Zustand
    setValue("SB_DataAcatamento", acatamento.SB_DataAcatamento || "");
    setValue("SB_EquipeResponsavel", acatamento.SB_EquipeResponsavel || "");
    setValue("SB_PrevisaoAcatamento", acatamento.SB_PrevisaoAcatamento || "");
    setValue(
      "SB_ObservacaoAcatamento",
      acatamento.SB_ObservacaoAcatamento || ""
    );

    console.log("Valores iniciais do formulário:", getValues());
  }, [acatamento, setValue, getValues]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAcatamento({ [name]: value });
  };

  const handleFormSubmit = (data: Acatamento) => {
    console.log("Dados do formulário submetidos:", data);

    setAcatamento({
      ...data,
      SB_SolicitacaoBase_id_SolicitacaoBase: solicitacaoBaseId,
      SB_SolicitacaoBase_SB_Enderecos_id_Endereco: enderecoId,
    });
  };
  return (
    <Formn onSubmit={handleSubmit(handleFormSubmit)}>
      <SectionBox>
        <SectionTitle>Acatamento</SectionTitle>
        <FieldTwo>
          <InfoBox>
            <Labeln>Data</Labeln>
            <Inputn
              type="date"
              {...register("SB_DataAcatamento", { required: true })}
              onChange={handleInputChange}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Passado Para</Labeln>
            <Inputn
              type="text"
              {...register("SB_EquipeResponsavel", { required: true })}
              onChange={handleInputChange}
            />
          </InfoBox>
        </FieldTwo>
        <FieldTwo>
          <InfoBox>
            <Labeln>Previsão (h)</Labeln>
            <Inputn
              type="time"
              {...register("SB_PrevisaoAcatamento", { required: true })}
              onChange={handleInputChange}
            />
          </InfoBox>
          <InfoBox>
            <Labeln>Observações</Labeln>
            <TextArean
              {...register("SB_ObservacaoAcatamento", { required: true })}
              onChange={handleInputChange}
            />
          </InfoBox>
        </FieldTwo>
      </SectionBox>
    </Formn>
  );
};

export default AcatamentoForm;
