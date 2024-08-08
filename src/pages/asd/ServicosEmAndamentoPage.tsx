import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import "./ServicosEmAndamentoPage.css";
import { getSolicitacoesBase } from "../../services/api/solicitacaoBase";
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";
import EditModal from "../../utils/modals/modaSA";
import {
  ListContainer,
  Sac,
  TitleContainer,
  HeadListTable,
  BodyTable,
  LineTable,
  CellTable,
  TitleHeadLineTable,
  Buttons,
} from "./styles";
import { getFechamentos } from "../../services/api/fechamentoService";
import { Fechamento } from "../../services/models/fechamentoModel";

const ServicosEmAndamentoPage: React.FC = () => {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoBase[]>([]);
  const [selectedSolicitacao, setSelectedSolicitacao] =
    useState<SolicitacaoBase | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFechamento, setSelectedFechamento] = useState<Fechamento | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const data = await getSolicitacoesBase();
        setSolicitacoes(data);
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
      }
    };

    fetchSolicitacoes();
  }, []);

  const handleEditClick = async (solicitacao: SolicitacaoBase) => {
    setIsLoading(true);
    try {
      const fechamentos = await getFechamentos(solicitacao.id_SolicitacaoBase);
      setSelectedFechamento(fechamentos[0] || null); // Supondo que há um único fechamento relacionado à solicitação
      setSelectedSolicitacao(solicitacao);
      setModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar fechamento:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedFechamento(undefined);
    setSelectedSolicitacao(null);
  };

  const handleSave = (updatedSolicitacao: SolicitacaoBase) => {
    setSolicitacoes((prev) =>
      prev.map((sol) =>
        sol.id_SolicitacaoBase === updatedSolicitacao.id_SolicitacaoBase
          ? updatedSolicitacao
          : sol
      )
    );
    handleCloseModal();
  };

  return (
    <>
      <TitleContainer>Fechamentos</TitleContainer>
      <Sac>
        <ListContainer>
          <HeadListTable>
            <TitleHeadLineTable>
              <th>Data</th>
              <th>Hora</th>
              <th>Polo</th>
              <th>Município</th>
              <th>Endereço</th>
              <th>Status</th>
              <th>Andamento</th>
              <th>Ações</th>
            </TitleHeadLineTable>
          </HeadListTable>
          <BodyTable>
            {solicitacoes.map((solicitacao) => (
              <LineTable key={solicitacao.id_SolicitacaoBase}>
                <CellTable>{solicitacao.SB_DataSolicitacao}</CellTable>
                <CellTable>{solicitacao.SB_HoraSolicitacao}</CellTable>
                <CellTable>{solicitacao.SB_Endereco?.SB_Polo}</CellTable>
                <CellTable>{solicitacao.SB_Endereco?.SB_Municipio}</CellTable>
                <CellTable>{solicitacao.SB_Endereco?.SB_Logradouro}</CellTable>
                <CellTable>{solicitacao.SB_Status}</CellTable>
                <CellTable>{solicitacao.SB_TipoServico}</CellTable>
                <CellTable>
                <Buttons onClick={() => handleEditClick(solicitacao)} 
                disabled={isLoading}>
                    Editar
                    <BsPencil />
                  </Buttons>
                </CellTable>
              </LineTable>
            ))}
          </BodyTable>
        </ListContainer>
        {isModalOpen && selectedSolicitacao && (
          <EditModal
            solicitacao={selectedSolicitacao}
            Ifechamento={selectedFechamento}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            isLoading={isLoading}
          />
        )}
        <div className="pesquisas-e-ocorrencias">
          <div className="pesquisas-container">
            <div className="titulo-container borda-verde">
              <h3>Pesquisas</h3>
            </div>
            <div className="lista-container">
              <div className="linha titulos">
                <span>Data</span>
                <span>Hora</span>
                <span>Polo</span>
                <span>Município</span>
                <span>Endereço</span>
                <span>Tipo</span>
                <span>Andamento</span>
              </div>
            </div>
          </div>
          <div className="separador"></div>
          <div className="ocorrencias-container">
            <div className="titulo-container borda-verde">
              <h3>Ocorrências</h3>
            </div>
            <div className="lista-container">
              <div className="linha titulos">
                <span>Data</span>
                <span>Hora</span>
                <span>Polo</span>
                <span>Município</span>
                <span>Equipamento</span>
                <span className="afeta-abastecimento">
                  Afeta
                  <br />
                  Abastecimento
                </span>
                <span>Andamento</span>
              </div>
            </div>
          </div>
        </div>
      </Sac>
    </>
  );
};

export default ServicosEmAndamentoPage;
