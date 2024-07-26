/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Field,
  InfoBox,
  Labeln,
  SectionBox,
  SectionTitle,
  TextArean,
  Title,
} from "./styles";
import React from "react";
import { useForm } from "react-hook-form";
import { createEnderecos, Endereco } from "../../services/api/enderecoService";
import {
  createSolicitacaoBase,
  SolicitacaoBase,
} from "../../services/api/solicitacaoBase";
import { BsSend, BsArrowBarRight, BsEraser } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Buttons, ButtonsBox, Inputn, Optionn, Selectn } from "../../utils/commonStyles";

const VrfFechamento: React.FC = () => {
  const { register, handleSubmit, reset } = useForm();

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
      };
      console.log(solicitacaoBase);

      // Enviar a solicitação base
      await createSolicitacaoBase(solicitacaoBase);
      console.log("Solicitação Base criada com sucesso:", solicitacaoBase);
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
        <Title>Solicitação Verificação de Fechamentos</Title>
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
                  <Optionn value="teste">Teste</Optionn>
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
                  <Optionn value="SP">São Paulo</Optionn>
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
                  <Optionn value="ZonaLeste">Zona Leste</Optionn>
                </Selectn>
              </InfoBox>
              <InfoBox>
                <Labeln>Zona de Pressão</Labeln>
                <Selectn {...register("zonaPressao")}>
                  <Optionn value="">Selecione...</Optionn>
                  <Optionn value="Alta">ALta</Optionn>
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
                <Labeln>Motivo</Labeln>
                <Selectn {...register("motivo")}>
                  <Optionn value="">Selecione...</Optionn>
                  <Optionn value="Rede Primária">Rede Primária</Optionn>
                  <Optionn value="Não Implantada">Não Implantada</Optionn>
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
            <Buttons as={Link} to={"/"}>
              Voltar
              <BsArrowBarRight />
            </Buttons>
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
export default VrfFechamento;
