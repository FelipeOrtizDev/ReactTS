import React, { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
import "./ServicosEmAndamentoPage.css";
import {
  getSolicitacoesBase,
  SolicitacaoBase,
} from "../../services/api/solicitacaoBase";
import { UserField, UserItem, UserList } from "../usuarios/styles";
import EditModal from "../../utils/modals/modaSA";
import { Buttons } from "../../utils/commonStyles";

const ServicosEmAndamentoPage: React.FC = () => {
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoBase[]>([]);
  const [selectedSolicitacao, setSelectedSolicitacao] =
    useState<SolicitacaoBase | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

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

  const handleEditClick = (solicitacao: SolicitacaoBase) => {
    setSelectedSolicitacao(solicitacao);
    setModalOpen(true);
  };

  const handleSave = (updatedSolicitacao: SolicitacaoBase) => {
    setSolicitacoes((prev) =>
      prev.map((sol) =>
        sol.id_SolicitacaoBase === updatedSolicitacao.id_SolicitacaoBase
          ? updatedSolicitacao
          : sol
      )
    );
    setModalOpen(false);
  };

  return (
    <div className="servicos-em-andamento-container">
      <div className="titulo-container">
        <h3>Fechamentos</h3>
      </div>
      <div className="lista-container">
        <div className="linha titulos">
          <span>Data</span>
          <span>Hora</span>
          <span>Polo</span>
          <span>Município</span>
          <span>Endereço</span>
          <span>Status</span>
          <span>Andamento</span>
        </div>
      </div>

      <UserList>
        {solicitacoes.map((solicitacao) => (
          <UserItem key={solicitacao.id_SolicitacaoBase}>
            <UserField>{solicitacao.SB_DataSolicitacao}</UserField>
            <UserField>{solicitacao.SB_HoraSolicitacao}</UserField>
            <UserField>{solicitacao.SB_NumeroOS}</UserField>
            <UserField>{solicitacao.SB_Microzona}</UserField>
            <UserField>{solicitacao.SB_Observacoes}</UserField>
            <UserField>{solicitacao.SB_Solicitante}</UserField>
            <UserField>{solicitacao.SB_TipoServico}</UserField>
            <UserField>
              <Buttons onClick={() => handleEditClick(solicitacao)}>
                Editar<BsPencil />
              </Buttons>
            </UserField>
          </UserItem>
        ))}
      </UserList>

      {isModalOpen && selectedSolicitacao && (
        <EditModal
          solicitacao={selectedSolicitacao}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/*       <div className='pesquisas-e-ocorrencias'>
        <div className='pesquisas-container'>
          <div className='titulo-container borda-verde'>
            <h3>Pesquisas</h3>
          </div>
          <div className='lista-container'>
            <div className='linha titulos'>
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
        <div className='separador'></div>
        <div className='ocorrencias-container'>
          <div className='titulo-container borda-verde'>
            <h3>Ocorrências</h3>
          </div>
          <div className='lista-container'>
            <div className='linha titulos'>
              <span>Data</span>
              <span>Hora</span>
              <span>Polo</span>
              <span>Município</span>
              <span>Equipamento</span>
              <span className='afeta-abastecimento'>
                Afeta
                <br />
                Abastecimento
              </span>
              <span>Andamento</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ServicosEmAndamentoPage;
