import { create } from "zustand";
import { SolicitacaoBase } from "../../services/models/solicitacaoBaseModel";
import { Fechamento } from "../../services/models/fechamentoModel";
import { getFechamentos } from "../../services/api/fechamentoService";

// // Default values for Endereco
// const defaultEndereco: Endereco = {
//   id_Endereco: 0,
//   SB_Municipio: '',
//   SB_Logradouro: '',
//   SB_Numero: 0,
//   SB_Complemento: '',
//   SB_Bairro: '',
//   SB_ZonaPressao: '',
//   SB_Polo: '',
//   SB_Referencia: '',
//   SB_SetorAbastecimento: '',
//   SB_Cruzamento: '',
// };

// // Default values for SolicitacaoBase
// const defaultSolicitacaoBase: SolicitacaoBase = {
//   id_SolicitacaoBase: 0,
//   SB_DataSolicitacao: '',
//   SB_HoraSolicitacao: '',
//   SB_NumeroOS: '',
//   SB_TipoServico: '',
//   SB_Observacoes: '',
//   SB_Microzona: 0,
//   SB_Solicitante: '',
//   SB_NumeroMZ: 0,
//   SB_Prioridade: '',
//   SB_Motivo: 0,
//   SB_Status: '',
//   SB_Responsavel: '',
//   SB_Enderecos_id_Endereco: 0,
//   SB_Endereco: defaultEndereco,
//   SB_Acatamento: {
//     id_Acatamentos: 0,
//     SB_DataAcatamento: '',
//     SB_PrevisaoAcatamento: '',
//     SB_EquipeResponsavel: '',
//     SB_ObservacaoAcatamento: '',
//     SB_SolicitacaoBase_id_SolicitacaoBase: 0,
//     SB_SolicitacaoBase_SB_Enderecos_id_Endereco: 0,
//     SB_SolcitacaoBase: {} as SolicitacaoBase,
//   },
// };

// // Default values for Fechamento
// const defaultFechamento: Fechamento = {
//   id_Fechamentos: 0,
//   SB_DataFechamento: '',
//   SB_HoraFechamento: '',
//   SB_Status: '',
//   SB_Prioridade: '',
//   SB_ServicoAceito: 0,
//   SB_HouveFechamento: 0,
//   SB_Rede: '',
//   SB_UltilizouMZ: '',
//   SB_QTDELigacoes: 0,
//   SB_FechadoPor: '',
//   SB_HFSMotivo: '',
//   SB_HSNMotivo: '',
//   SB_HSNObservacao: '',
//   SB_Previsao: '',
//   SB_HFSObservacaoFechamento: '',
//   SB_Executante: '',
//   SB_ManobraWFM: '',
//   SB_OFechado: '',
//   SB_SolicitacaoBase_id_SolicitacaoBase: 0,
//   SB_SolicitacaoBase_SB_Enderecos_id_Endereco: 0,
//   SB_SolicitacaoBase: defaultSolicitacaoBase,
// };

// // Default values for Acatamento
// const defaultAcatamento: Acatamento = {
//   id_Acatamentos: 0,
//   SB_DataAcatamento: '',
//   SB_PrevisaoAcatamento: '',
//   SB_EquipeResponsavel: '',
//   SB_ObservacaoAcatamento: '',
//   SB_SolicitacaoBase_id_SolicitacaoBase: 0,
//   SB_SolicitacaoBase_SB_Enderecos_id_Endereco: 0,
//   SB_SolcitacaoBase: defaultSolicitacaoBase,
// };

// // Zustand store
// interface FormDataState {
//   solicitacaoBase: SolicitacaoBase;
//   fechamento: Fechamento;
//   acatamento: Acatamento;
//   loadFormData: (id: number) => void;
//   setSolicitacaoBase: (data: SolicitacaoBase) => void;
//   setFechamento: (data: Fechamento) => void;
//   setAcatamento: (data: Acatamento) => void;
// }

// export const useStore = create<FormDataState>((set) => ({
//   solicitacaoBase: defaultSolicitacaoBase,  // Initial state
//   fechamento: defaultFechamento,            // Initial state
//   acatamento: defaultAcatamento,            // Initial state

//   // Load form data
//   loadFormData: async (id: number) => {
//     try {
//       const fechamento = await getFechamentos(id); // Carrega o fechamento da API
//       const acatamento = await getAcatamentos(id); // Carrega o acatamento da API
//       set({
//         fechamento,
//         acatamento,
//       });
//     } catch (error) {
//       console.error("Erro ao carregar dados:", error);
//     }
//   },

//   // Setters for updating state
//   setSolicitacaoBase: (data: SolicitacaoBase) => set({ solicitacaoBase: data }),
//   setFechamento: (data: Fechamento) => set({ fechamento: data }),
//   setAcatamento: (data: Acatamento) => set({ acatamento: data }),
//   resetSolicitacaoBase: () => set({ solicitacaoBase: defaultSolicitacaoBase }), // Reset ao estado inicial
// }));

interface FormDataState {
  solicitacaoBase: SolicitacaoBase;
  fechamento: Fechamento;
  setSolicitacaoBase: (data: SolicitacaoBase) => void;
  setFechamento: (data: Fechamento) => void;
}

export const useStore = create<FormDataState>((set) => ({
  solicitacaoBase: {} as SolicitacaoBase,
  fechamento: {} as Fechamento,
  setSolicitacaoBase: (data) => set({ solicitacaoBase: data }),
  setFechamento: (data) => set({ fechamento: data }),
}));
