import { Acatamento } from "../../models/acatamentoModel";
import { axiosInstance } from "../conexaoApi";

export const getAcatamentos = async (
  solicitacaoBaseID: number
): Promise<Acatamento> => {
  try {
    const response = await axiosInstance.get(
      `/acatamento/${solicitacaoBaseID}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar acatamentos:" + error);
  }
};

export const createAcatamento = async (
  solicitacaoBaseId: number,
  acatamentoData: Acatamento
): Promise<Acatamento> => {
  try {
    const response = await axiosInstance.post(
      `/acatamentos/${solicitacaoBaseId}`,
      acatamentoData
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar acatamento: " + error);
  }
};

export const updateAcatamento = async (
  acatamento: Partial<Acatamento>
): Promise<Acatamento> => {
  try {
    const response = await axiosInstance.put(
      `/acatamentos/${acatamento.id_Acatamentos}`,
      acatamento
    );
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

// Função para salvar ou atualizar um fechamento
// Essa função deve usar o solicitacaoBaseId ao criar ou atualizar o fechamento
export const saveOrUpdateAcatamento = async (
  solicitacaoBaseId: number,
  acatamentoData: Acatamento
): Promise<Acatamento> => {
  if (acatamentoData.id_Acatamentos) {
    updateAcatamento(acatamentoData);
  } else {
    // Caso contrário, crie um novo fechamento
    return await createAcatamento(solicitacaoBaseId, acatamentoData);
  }
};
