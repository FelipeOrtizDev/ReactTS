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
import { useStore } from "../../components/Form/formsStore"; // Importando Zustand Store
import { getFechamentos } from "../../services/api/fechamentoService";
import { Fechamento } from "../../services/models/fechamentoModel";

const ServicosEmAndamentoPage: React.FC = () => {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoBase[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<Record<number, number>>({});

  // Nova variável de estado para armazenar a solicitação selecionada
  const [selectedSolicitacao, setSelectedSolicitacao] =
    useState<SolicitacaoBase | null>(null);

  const setSolicitacaoBase = useStore((state) => state.setSolicitacaoBase);
  const setFechamento = useStore((state) => state.setFechamento);
  const setAcatamento = useStore((state) => state.setAcatamento)
  // const loadFechamento = useStore((state) => state.loadFechamento);

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const data = await getSolicitacoesBase();
        setSolicitacoes(data);

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
        Object.keys(newTimeLeft).forEach((key: any) => {
          newTimeLeft[key] = newTimeLeft[key] > 0 ? newTimeLeft[key] - 1000 : 0;
        });
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEditClick = async (solicitacao: SolicitacaoBase) => {
    setIsLoading(true);
    console.log("Tentando abrir modal para solicitação:", solicitacao);

    try {
      const fechamento = await getFechamentos(solicitacao.id_SolicitacaoBase);
      setFechamento(fechamento);
      setSolicitacaoBase(solicitacao);
      setSelectedSolicitacao(solicitacao);
      setModalOpen(true);
    } catch (error) {
      setFechamento({} as Fechamento);
      setSolicitacaoBase(solicitacao);
      setSelectedSolicitacao(solicitacao);
      setModalOpen(true);
      console.error("Erro ao buscar ou criar fechamento:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSolicitacao(null); // Reseta a solicitação selecionada
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
          </BodyTable>
        </ListContainer>
        {isModalOpen && selectedSolicitacao && (
          <EditModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            solicitacaoBaseId={selectedSolicitacao.id_SolicitacaoBase}
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
