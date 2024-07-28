import { axiosInstance } from "./conexaoApi";

export interface Acatamento {
  id_Acatamentos?: number;
  SB_DataAcatamento: string;
  SB_PrvisãoAcatamento: string;
  SB_EquipeResponsavel: string;
  SB_ObservacaoAcatamento: string;
  SB_SolicitacaoBase_id_SolicitacaoBase: number;
  SB_SolicitacaoBase_SB_Enderecos_id_Endereco: number;
}

export const getAcatamentos = async (): Promise<Acatamento[]> => {
  try {
    const response = await axiosInstance.get("/acatamentos");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar acatamentos:" + error);
  }
};

export const createAcatamento = async (
  acatamento: Acatamento
): Promise<Acatamento> => {
  try {
    const response = await axiosInstance.post("/acatamentos", acatamento);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar acatamento: " + error);
  }
};

export const updateAcatamento = async (
  id: number,
  acatamento: Partial<Acatamento>
): Promise<Acatamento> => {
  try {
    const response = await axiosInstance.put(`/acatamentos/${id}`, acatamento);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar o acatamento : " + error);
  }
};

export const deleteAcatamento = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/acatamentos/${id}`);
  } catch (error) {
    throw new Error("Erro ao deletar acatamento: " + error);
  }
};
