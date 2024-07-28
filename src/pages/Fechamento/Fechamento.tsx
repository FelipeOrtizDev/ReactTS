/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Field,
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
  TextArean,
} from "./styles";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createEnderecos, Endereco } from "../../services/api/enderecoService";
import {
  createSolicitacaoBase,
  SolicitacaoBase,
} from "../../services/api/solicitacaoBase";
import { BsSend, BsArrowBarRight, BsEraser } from "react-icons/bs";
import {
  Buttons,
  ButtonsBox,
  ButtonsLink,
  Inputn,
  Optionn,
  Selectn,
  Title,
} from "../../utils/commonStyles";
import { Link } from "react-router-dom";

const Fechamentos: React.FC = () => {
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const selectedPolo = watch("polo");
  const selectedMunicipio = watch("municipio");
  const mzValue = watch("microzona");
  const [isMZEnabled, setIsMZEnabled] = useState(false);

  const municipioOptions: {
    [key: string]: {
      [key: string]: string[];
    };
  } = {
    Itaquera: {
      SãoPaulo: [
        "Artur Alvin",
        "Carmo",
        "CID. Tiradentes",
        "Guaianazes",
        "Itaquera",
        "Savoy",
        "STA. Etelvina",
      ],
    },
    Penha: {
      SãoPaulo: [
        "Cangaiba",
        "Ermelino Matarazoo",
        "Itam PTA.",
        "JD. Popular",
        "Penha",
        "Sao Miguel PTA.",
      ],
    },
    Suzano: {
      Itaquecetuba: [
        "Itaqua-Centro",
        "Pinheirinho",
        "REC. Monica",
        "V. Industrial",
      ],
      FerrazDeVasconselos: ["Ferraz De Vasconcelos"],
      Aruja: ["Aruja"],
      Suzano: ["Suzano"],
      Poa: ["Poa"],
      BiritibaMirim: ["Cruz Das Almas", "Hiroy", "Takebe", "Vista Alegre"],
      Salesopolis: ["Salesopolis-Centro", "V. Dos Remedios"],
      MogiDasCruzes: ["REC. Monica"],
    },
  };

  useEffect(() => {
    if (mzValue === '1') {
      setIsMZEnabled(true);
    } else {
      setIsMZEnabled(false);
    }
  }, [mzValue]);
  
  useEffect(() => {
    setValue("municipio", "");
    setValue("setorAbastecimento", "");
  }, [selectedPolo, setValue]);

  useEffect(() => {
    setValue("setorAbastecimento", "");
  }, [selectedMunicipio, setValue]);

  const onSubmit = async (data: any) => {
    const endereco: Endereco = {
      id_Endereco: 0, // Inicializamos com 0, pois será definido pela API
      SB_Municipio: data.municipio,
      SB_Logradouro: data.logradouro,
      SB_Numero: Number(data.numero),
      SB_Complemento: data.complemento,
      SB_Bairro: data.bairro,
      SB_ZonaPressao: data.zonaPressao,
      SB_Polo: data.polo,
      SB_Referencia: data.referencia,
      SB_Cruzamento: data.cruzamento,
      SB_SetorAbastecimento: data.setorAbastecimento,
    };

    try {
      // Criar o endereço e obter a resposta da API
      const createdEndereco = await createEnderecos(endereco);

      // Verificar se o id_Endereco está presente na resposta
      if (createdEndereco.id_Endereco === undefined) {
        throw new Error(
          "Erro: id_Endereco não está definido após a criação do endereço"
        );
      }

      // Criar a solicitação base associando corretamente o id_Endereco
      const solicitacaoBase: SolicitacaoBase = {
        SB_DataSolicitacao: data.dataSolicitacao,
        SB_HoraSolicitacao: data.horaSolicitacao,
        SB_NumeroOS: data.numeroOS,
        SB_TipoServico: data.tipoServico,
        SB_Observacoes: data.observacoes,
        SB_Microzona: Number(data.microzona),
        SB_Solicitante: data.solicitante,
        SB_Enderecos_id_Endereco: createdEndereco.id_Endereco,
        SB_Endereco: createdEndereco,
        SB_Motivo: data.motivo,
        SB_NumeroMZ: data.numeroMZ,
        SB_Prioridade: data.prioridade,
        SB_Responsavel: data.responsavel,
        SB_Status: "Solicitado",
      };

      // Enviar a solicitação base
      await createSolicitacaoBase(solicitacaoBase);
      alert("Solicitação criada com sucesso");
      window.location.href = "/";
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
      throw new Error("Erro ao enviar solicitação: " + error);
    }
  };

  const handleReset = () => {
    reset(); // Resetar todos os campos do formulário para seus valores iniciais
  };

  return (
    <>
      <Box>
        <Title>Solicitação de Fechamento</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SectionBox>
            <SectionTitle>Dados do Solicitante</SectionTitle>
            <Field>
              <InfoBox>
                <Labeln>Data</Labeln>
                <Inputn type="date" {...register("dataSolicitacao")} />
              </InfoBox>
              <InfoBox>
                <Labeln>Hora</Labeln>
                <Inputn type="time" {...register("horaSolicitacao")} />
              </InfoBox>
              <InfoBox>
                <Labeln>Polo</Labeln>
                <Selectn {...register("polo")}>
                  <Optionn value="">Selecione...</Optionn>
                  <Optionn value="Itaquera">ITAQUERA</Optionn>
                  <Optionn value="Penha">PENHA/ SÃO MIGUEL</Optionn>
                  <Optionn value="Suzano">SUZANO/ ITAQUA</Optionn>
                </Selectn>
              </InfoBox>
              <InfoBox>
                <Labeln>Solicitante</Labeln>
                <Inputn type="text" {...register("solicitante")} />
              </InfoBox>
              <InfoBox>
                <Labeln>Responsável</Labeln>
                <Inputn type="text" {...register("responsavel")} />
              </InfoBox>
            </Field>
          </SectionBox>
          <SectionBox>
            <SectionTitle>Endereço</SectionTitle>
            <Field>
              <InfoBox>
                <Labeln>Município</Labeln>
                <Selectn {...register("municipio")}>
                  <Optionn value="">Selecione...</Optionn>
                  {selectedPolo &&
                    municipioOptions[selectedPolo] &&
                    Object.keys(municipioOptions[selectedPolo]).map(
                      (municipio) => (
                        <Optionn key={municipio} value={municipio}>
                          {municipio
                            .replace(/([A-Z])/g, " $1")
                            .trim()
                            .toUpperCase()}
                        </Optionn>
                      )
                    )}
                </Selectn>
              </InfoBox>

              <InfoBox>
                <Labeln>Logradouro</Labeln>
                <Inputn type="text" {...register("logradouro")} />
              </InfoBox>

              <InfoBox>
                <Labeln>Número</Labeln>
                <Inputn type="number" {...register("numero")} />
              </InfoBox>

              <InfoBox>
                <Labeln>Complemento</Labeln>
                <Inputn type="text" {...register("complemento")} />
              </InfoBox>
              <InfoBox>
                <Labeln>Cruzamento</Labeln>
                <Inputn type="text" {...register("cruzamento")} />
              </InfoBox>
              <InfoBox>
                <Labeln>Bairro</Labeln>
                <Inputn type="text" {...register("bairro")} />
              </InfoBox>
              <InfoBox>
                <Labeln>Referência</Labeln>
                <Inputn type="text" {...register("referencia")} />
              </InfoBox>
            </Field>
          </SectionBox>
          <SectionBox>
            <SectionTitle>Dados Complementares</SectionTitle>
            <Field>
              <InfoBox>
                <Labeln>Número OS</Labeln>
                <Inputn type="text" {...register("numeroOS")} />
              </InfoBox>
              <InfoBox>
                <Labeln>Tipo de Serviço</Labeln>
                <Selectn {...register("tipoServico")}>
                  <Optionn value="">Selecione...</Optionn>
                  <Optionn value="Arrebentado de Rede">
                    Arrebentado de Rede
                  </Optionn>
                  <Optionn value="Caps Fora">Caps Fora</Optionn>
                  <Optionn value="Troca de Registro">Troca de Registro</Optionn>
                  <Optionn value="Vazamento">Vazamento</Optionn>
                  <Optionn value="Instalação de Registro">
                    Instalação de Registro
                  </Optionn>
                  <Optionn value="Interligação de Rede">
                    Interligação de Rede
                  </Optionn>
                  <Optionn value="Prolongamento">Prolongamento</Optionn>
                  <Optionn value="Remanejamento de Rede">
                    Remanejamento de Rede
                  </Optionn>
                  <Optionn value="Teste de Estanqueidade">
                    Teste de Estanqueidade
                  </Optionn>
                  <Optionn value="Manutenção de VRP">Manutenção de VRP</Optionn>
                  <Optionn value="Outros">Outros</Optionn>
                </Selectn>
              </InfoBox>
              <InfoBox>
                <Labeln>Setor de Abastecimento</Labeln>
                <Selectn {...register("setorAbastecimento")}>
                  <Optionn value="">Selecione...</Optionn>
                  {selectedPolo &&
                    selectedMunicipio &&
                    municipioOptions[selectedPolo] &&
                    municipioOptions[selectedPolo][selectedMunicipio] &&
                    municipioOptions[selectedPolo][selectedMunicipio].map(
                      (setor) => (
                        <Optionn key={setor} value={setor}>
                          {setor.toUpperCase()}
                        </Optionn>
                      )
                    )}
                </Selectn>
              </InfoBox>
              <InfoBox>
                <Labeln>Zona de Pressão</Labeln>
                <Selectn {...register("zonaPressao")}>
                  <Optionn value="">Selecione...</Optionn>
                  <Optionn value="Alta">Alta</Optionn>
                </Selectn>
              </InfoBox>
              <InfoBox>
                <Labeln>Prioridade</Labeln>
                <Selectn {...register("prioridade")}>
                  <Optionn value="">Selecione...</Optionn>
                  <Optionn value="Alta">Alta</Optionn>
                  <Optionn value="Média">Média</Optionn>
                  <Optionn value="Baixa">Baixa</Optionn>
                </Selectn>
              </InfoBox>
              <InfoBox>
                <Labeln>Possui Microzona?</Labeln>
                <Selectn {...register("microzona")}>
                  <Optionn value="">Selecione...</Optionn>
                  <Optionn value="1">Sim</Optionn>
                  <Optionn value="0">Não</Optionn>
                </Selectn>
              </InfoBox>
              <InfoBox>
                <Labeln>Numero MZ</Labeln>
                <Inputn type="number" {...register("numeroMZ")} disabled={!isMZEnabled}/>
                
              </InfoBox>
              <InfoBox>
                <Labeln>Motivo</Labeln>
                <Selectn {...register("motivo")}>
                  <Optionn value="">Selecione...</Optionn>
                  <Optionn value={1}>Rede Primária</Optionn>
                  <Optionn value={0}>Não Implantada</Optionn>
                </Selectn>
              </InfoBox>
              <InfoBox>
                <Labeln>Observações</Labeln>
                <TextArean
                  placeholder="Digite suas observações aqui..."
                  {...register("observacoes")}
                />
              </InfoBox>
            </Field>
          </SectionBox>
          <ButtonsBox>
            <ButtonsLink as={Link} to={"/"}>
              Voltar
              <BsArrowBarRight />
            </ButtonsLink>
            <Buttons type="reset" onClick={handleReset}>
              Limpar
              <BsEraser />
            </Buttons>
            <Buttons type="submit">
              Enviar
              <BsSend />
            </Buttons>
          </ButtonsBox>
        </form>
      </Box>
    </>
  );
};

export default Fechamentos;
