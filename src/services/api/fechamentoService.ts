import { Fechamento } from "../models/fechamentoModel";
import { axiosInstance } from "./conexaoApi";

export const getFechamentos = async (solicitacaoBaseId: number): Promise<Fechamento[]> => {
  try {
      const response = await axiosInstance.get<Fechamento[]>(`/fechamentos/${solicitacaoBaseId}`);
      console.log("get response:",response.data);
      return response.data;
  } catch (error) {
      console.error("Erro ao buscar fechamentos", error);
      throw error;
  }
};

export const createFechamento = async (
  solicitacaoBaseId: number, 
  fechamentoData: Fechamento
): Promise<Fechamento> => {
  try {
    const response = await axiosInstance.post<Fechamento>(
      `/fechamentos/${solicitacaoBaseId}`,
      fechamentoData
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar fechamento:", error);
    throw error;
  }
};

export const updateFechamento = async (fechamento: Fechamento): Promise<Fechamento> => {
  try {
      const response = await axiosInstance.put<Fechamento>(`/fechamentos/${fechamento.id_Fechamentos}`, fechamento);
      return response.data;
  } catch (error) {
      console.error("Erro ao atualizar fechamento", error);
      throw error;
  }
};


export const deleteFechamento = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/fechamentos/${id}`);
  } catch (error) {
    throw new Error("Erro ao deletar o fechamento" + error);
  }
};

// Função para salvar ou atualizar um fechamento
// Essa função deve usar o solicitacaoBaseId ao criar ou atualizar o fechamento
export const saveOrUpdateFechamento = async (solicitacaoBaseId: number, fechamentoData: Fechamento): Promise<Fechamento> => {
  if (fechamentoData.id_Fechamentos) {
    // Se o fechamento já existe, você pode usar um método de atualização, como PUT
    // Implementar o método de atualização conforme necessário
  } else {
    // Caso contrário, crie um novo fechamento
    return await createFechamento(solicitacaoBaseId, fechamentoData);
  }
};