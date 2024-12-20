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
import {
  createEnderecos,
  getMunicipiosByPolo,
  getPolos,
  getSetoresByMunicipio,
} from "../../services/api/enderecoService";
import { createSolicitacaoBase } from "../../services/api/solicitacaoBase";
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
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";
import { Endereco } from "../../services/models/enderecoModel";
import { getTipoServicos } from "../../services/api/tipoServicoService";

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
        setSetores([]); // Reset setores when polo changes
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

  const handlePoloChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPolo = polos.find(
      (p) => p.id_Polo === Number(e.target.value)
    );
    setValue("poloDescricao", selectedPolo?.SB_Polo || "");
    setValue("polo", e.target.value);
  };

  const handleMunicipioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMunicipio = municipios.find(
      (m) => m.id_Municipio === Number(e.target.value)
    );
    setValue("municipioDescricao", selectedMunicipio?.SB_Municipio || "");
    setValue("municipio", e.target.value);
  };

  const handleSetorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSetor = setores.find(
      (s) => s.id_SetorAbastecimento === Number(e.target.value)
    );
    setValue("setorDescricao", selectedSetor?.SB_SetorAbastecimento || "");
    setValue("setorAbastecimento", e.target.value);
  };

  const onSubmit = async (data: any) => {
    const endereco: Endereco = {
      id_Endereco: 0, // Inicializamos com 0, pois será definido pela API
      SB_Municipio: data.municipioDescricao,
      SB_Logradouro: data.logradouro,
      SB_Numero: data.numero,
      SB_Complemento: data.complemento,
      SB_Bairro: data.bairro,
      SB_ZonaPressao: data.zonaPressao,
      SB_Polo: data.poloDescricao,
      SB_Referencia: data.referencia,
      SB_Cruzamento: data.cruzamento,
      SB_SetorAbastecimento: data.setorDescricao,
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
        id_SolicitacaoBase: data.id,
        SB_DataSolicitacao: data.dataSolicitacao,
        SB_HoraSolicitacao: data.horaSolicitacao,
        SB_NumeroOS: data.numeroOS,
        SB_TipoServico: data.tipoServico,
        SB_Observacoes: data.observacoes,
        SB_Microzona: Number(data.microzona),
        SB_Solicitante: data.solicitante,
        SB_Endereco_id_Endereco: createdEndereco.id_Endereco,
        SB_Endereco: createdEndereco,
        SB_Motivo: data.motivo,
        SB_NumeroMZ: data.numeroMZ,
        SB_Prioridade: data.prioridade,
        SB_Responsavel: data.responsavel,
        SB_Timer: "02:00",
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
                <Selectn {...register("polo")} onChange={handlePoloChange}>
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
                <Selectn
                  {...register("municipio")}
                  onChange={handleMunicipioChange}
                >
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
                    <Optionn
                      key={tipo.id_TipoServico}
                      value={tipo.SB_Descricao}
                    >
                      {tipo.SB_Descricao}
                    </Optionn>
                  ))}
                </Selectn>
              </InfoBox>
              <InfoBox>
                <Labeln>Setor de Abastecimento</Labeln>
                <Selectn
                  {...register("setorAbastecimento")}
                  onChange={handleSetorChange}
                >
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
                  <Optionn value="Media">Media</Optionn>
                  <Optionn value="Baixa">Baixa</Optionn>
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
                <Selectn {...register("motivo")} disabled={isMZEnabled}>
                  <Optionn value={0}>Selecione...</Optionn>
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
