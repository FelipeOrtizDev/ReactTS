// src/pages/ServicosEmAndamentoPage.tsx
import React, { useEffect, useState } from "react";
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
  const [timeLeft, setTimeLeft] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const data = await getSolicitacoesBase();
        setSolicitacoes(data);

        // Set initial countdown times
        const initialTimeLeft = data.reduce((acc, solicitacao) => {
          const previsao =
            solicitacao.SB_Acatamento?.SB_PrevisaoAcatamento || "00:00:00";
          const previsaoDate = new Date(`1970-01-01T${previsao}Z`).getTime();
          const now = Date.now();
          const timeDifference = previsaoDate - now;
          acc[solicitacao.id_SolicitacaoBase] =
            timeDifference > 0 ? timeDifference : 0;
          return acc;
        }, {} as Record<number, number>);

        setTimeLeft(initialTimeLeft);
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
      }
    };

    fetchSolicitacoes();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft = { ...prevTimeLeft };
        Object.keys(newTimeLeft).forEach((key) => {
          newTimeLeft[key] = newTimeLeft[key] > 0 ? newTimeLeft[key] - 1000 : 0;
        });
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
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

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
            </TitleHeadLineTable>
          </HeadListTable>
          <BodyTable>
            {solicitacoes.map((solicitacao) => {
              const timeLeftForSolicitacao =
                timeLeft[solicitacao.id_SolicitacaoBase];
              const isTimeUp = timeLeftForSolicitacao === 0;

              return (
                <LineTable
                  key={solicitacao.id_SolicitacaoBase}
                  onClick={() => handleEditClick(solicitacao)}
                >
                  <CellTable>{solicitacao.SB_DataSolicitacao}</CellTable>
                  <CellTable>{solicitacao.SB_HoraSolicitacao}</CellTable>
                  <CellTable>{solicitacao.SB_Endereco?.SB_Polo}</CellTable>
                  <CellTable>{solicitacao.SB_Endereco?.SB_Municipio}</CellTable>
                  <CellTable>
                    {solicitacao.SB_Endereco?.SB_Logradouro}
                  </CellTable>
                  <CellTable>{solicitacao.SB_Status}</CellTable>

                  <CellTable>
                    <span className={isTimeUp ? "red-dot" : "green-dot"} />
                    {formatTime(timeLeftForSolicitacao)}
                  </CellTable>
                </LineTable>
              );
            })}
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