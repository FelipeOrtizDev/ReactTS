/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsSend, BsArrowBarRight, BsEraser } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  createEnderecos,
  getMunicipiosByPolo,
  getPolos,
  getSetoresByMunicipio,
} from "../../services/api/enderecoService";
import { getTipoServicos } from "../../services/api/tipoServicoService";
import {
  Box,
  Field,
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
  TextArean,
} from "./styles";
import {
  Buttons,
  ButtonsBox,
  ButtonsLink,
  Inputn,
  Optionn,
  Selectn,
  Title,
} from "../../utils/commonStyles";
import { Endereco } from "../../services/models/enderecoModel";

import { createSolicitacaoBase } from "../../services/api/solicitacaoBase";
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";

const Fechamentos: React.FC = () => {
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  const mzValue = watch("microzona");
  const [isMZEnabled, setIsMZEnabled] = useState(false);
  const [tipoServicos, setTipoServicos] = useState<
    { id_TipoServico: number; SB_Descricao: string }[]
  >([]);

  const selectedPolo = watch("polo");
  const selectedMunicipio = watch("municipio");

  const [polos, setPolos] = useState<any[]>([]);
  const [municipios, setMunicipios] = useState<any[]>([]);
  const [setores, setSetores] = useState<any[]>([]);

  useEffect(() => {
    const fetchPolos = async () => {
      const data = await getPolos();
      setPolos(data);
    };
    fetchPolos();
  }, []);

  useEffect(() => {
    if (selectedPolo) {
      const fetchMunicipios = async () => {
        const data = await getMunicipiosByPolo(selectedPolo);
        setMunicipios(data);
        setSetores([]); // Reset setores quando polo changes
      };
      fetchMunicipios();
    }
  }, [selectedPolo]);

  useEffect(() => {
    if (selectedMunicipio) {
      const fetchSetores = async () => {
        const data = await getSetoresByMunicipio(selectedMunicipio);
        setSetores(data);
      };
      fetchSetores();
    }
  }, [selectedMunicipio]);

  useEffect(() => {
    const fetchTipoServicos = async () => {
      const data = await getTipoServicos();
      setTipoServicos(data);
    };

    fetchTipoServicos();
  }, []);

  useEffect(() => {
    if (mzValue === "1") {
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
    try {
      // Primeiro, cria o endereço e espera a resposta
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

      const createdEndereco = await createEnderecos(endereco);
      const enderecoId = createdEndereco.id_Endereco;

      // Em seguida, cria a solicitação base utilizando o id_Endereco criado
      const solicitacaoBase: SolicitacaoBase = {
        SB_DataSolicitacao: data.dataSolicitacao,
        SB_HoraSolicitacao: data.horaSolicitacao,
        SB_NumeroOS: data.numeroOS,
        SB_TipoServico: data.tipoServico,
        SB_Observacoes: data.observacoes,
        SB_Microzona: Number(data.microzona),
        SB_Solicitante: data.solicitante,
        SB_Endereco_id_Endereco: enderecoId, // Garantir que estamos usando o ID do endereço
        SB_Motivo: data.motivo,
        SB_NumeroMZ: data.numeroMZ,
        SB_Prioridade: data.prioridade,
        SB_Responsavel: data.responsavel,
        SB_Status: "Solicitado",
        id_SolicitacaoBase: 0,
      };

      await createSolicitacaoBase(solicitacaoBase);

      alert("Solicitação criada com sucesso");
      window.location.href = "/";
    } catch (error: any) {
      console.error("Erro ao enviar solicitação:", error);
      alert("Erro ao enviar solicitação: " + error.message);
    }
  };

  const handleReset = () => {
    reset(); // Reseta todos os campos do formulário para seus valores iniciais
  };

  return (
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
                {polos.map((polo) => (
                  <Optionn key={polo.id_Polo} value={polo.id_Polo}>
                    {polo.SB_Polo}
                  </Optionn>
                ))}
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
                {municipios.map((municipio) => (
                  <Optionn
                    key={municipio.id_Municipio}
                    value={municipio.id_Municipio}
                  >
                    {municipio.SB_Municipio}
                  </Optionn>
                ))}
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
                {tipoServicos.map((tipo) => (
                  <Optionn key={tipo.id_TipoServico} value={tipo.SB_Descricao}>
                    {tipo.SB_Descricao}
                  </Optionn>
                ))}
              </Selectn>
            </InfoBox>
            <InfoBox>
              <Labeln>Setor de Abastecimento</Labeln>
              <Selectn {...register("setorAbastecimento")}>
                <Optionn value="">Selecione...</Optionn>
                {setores.map((setor) => (
                  <Optionn
                    key={setor.id_SetorAbastecimento}
                    value={setor.id_SetorAbastecimento}
                  >
                    {setor.SB_SetorAbastecimento}
                  </Optionn>
                ))}
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
              <Inputn
                type="number"
                {...register("numeroMZ")}
                disabled={!isMZEnabled}
              />
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
  );
};

export default Fechamentos;
