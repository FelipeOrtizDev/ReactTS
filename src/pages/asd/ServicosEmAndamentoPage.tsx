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
import { getAcatamentos } from "../../services/api/Acatamento/acatamentoService";
import { Acatamento } from "../../services/models/acatamentoModel";
import { getSolicitacoesAbertura } from "../../services/api/solicitacaoAberturaService";
import { SolicitacaoAbertura } from "../../services/models/solicitacaoAberturaModel";
import { getAcatamentosAbertura } from "../../services/api/Acatamento/acatamentosAberturaService";
import { AcatamentosAbertura } from "../../services/models/acatamentoAberturaModel";

const ServicosEmAndamentoPage: React.FC = () => {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoBase[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>({});

  // Nova variável de estado para armazenar a solicitação selecionada
  const [selectedSolicitacao, setSelectedSolicitacao] =
    useState<SolicitacaoBase | null>(null);

  const setSolicitacaoBase = useStore((state) => state.setSolicitacaoBase);
  const setFechamento = useStore((state) => state.setFechamento);
  const setAcatamento = useStore((state) => state.setAcatamento);
  const setSolicitacaoAbertura = useStore(
    (state) => state.setSolicitacaoAbertura
  );
  const setAcatamentoAbertura = useStore(
    (state) => state.setAcatamentoAbertura
  );
  // const loadFechamento = useStore((state) => state.loadFechamento);

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const data = await getSolicitacoesBase();
        setSolicitacoes(data);

        const initialTimeLeft: { [key: string]: number } = {};
        data.forEach((solicitacao) => {
          initialTimeLeft[solicitacao.id_SolicitacaoBase] = convertToSeconds(
            solicitacao.SB_Timer
          );
        });
        setTimeLeft(initialTimeLeft);
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
      }
    };

    fetchSolicitacoes();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        const newTimeLeft: { [key: string]: number } = {};
        for (const key in prevTimeLeft) {
          const newTime = prevTimeLeft[key] - 1;
          newTimeLeft[key] = newTime > 0 ? newTime : 0;
        }
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const convertToSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  const handleEditClick = async (solicitacao: SolicitacaoBase) => {
    setIsLoading(true);
    console.log("Tentando abrir modal para solicitação:", solicitacao);

    try {
      const fechamento = await getFechamentos(solicitacao.id_SolicitacaoBase);
      setFechamento(fechamento);
    } catch (error) {
      setFechamento({} as Fechamento);
    }

    try {
      const acatamento = await getAcatamentos(solicitacao.id_SolicitacaoBase);
      setAcatamento(acatamento);
    } catch (error) {
      setAcatamento({} as Acatamento);
    }
    try {
      const solicitacaoAbertura = await getSolicitacoesAbertura(
        solicitacao.id_SolicitacaoBase
      );
      setSolicitacaoAbertura(solicitacaoAbertura);
    } catch (error) {
      setSolicitacaoAbertura({} as SolicitacaoAbertura);
    }
    try {
      const acatamentoAbertura = await getAcatamentosAbertura(
        solicitacao.id_SolicitacaoBase
      );
      setAcatamentoAbertura(acatamentoAbertura);
    } catch (error) {
      setAcatamentoAbertura({} as AcatamentosAbertura);
    }

    setSolicitacaoBase(solicitacao);
    setSelectedSolicitacao(solicitacao);
    setModalOpen(true);
    setIsLoading(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSolicitacao(null); // Reseta a solicitação selecionada
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
              const isTimeUp = timeLeft[solicitacao.id_SolicitacaoBase] === 0;

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
                    {formatTime(timeLeft[solicitacao.id_SolicitacaoBase])}
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
