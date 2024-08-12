import { AcatamentosAbertura } from "../../models/acatamentoAberturaModel";
import { axiosInstance } from "../conexaoApi";

// Interface para AcatamentosAbertura

// Funções de serviço para AcatamentosAbertura
export const getAcatamentosAbertura = async (
  solicitacaoAberturaId: number
): Promise<AcatamentosAbertura> => {
  try {
    const response = await axiosInstance.get<AcatamentosAbertura>(`/acatamentos-abertura/${solicitacaoAberturaId}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar acatamentos de abertura: " + error);
  }
};


export const createAcatamentosAbertura = async (
  solicitacaoAberturaId: number,
  acatamentoAberturaData: AcatamentosAbertura
): Promise<AcatamentosAbertura> => {
  try {
    const response = await axiosInstance.post(
      `/acatamentos-abertura/${solicitacaoAberturaId}`,
      acatamentoAberturaData
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar acatamento de abertura: " + error);
  }
};

export const updateAcatamentosAbertura = async (
  acatamentoAbertura: AcatamentosAbertura
): Promise<AcatamentosAbertura> => {
  try {
    const response = await axiosInstance.put(
      `/acatamentos-abertura/${acatamentoAbertura.id_AcatamentosAbertura}`,
      acatamentoAbertura
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar acatamento de abertura: " + error);
  }
};

export const deleteAcatamentosAbertura = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/acatamentos-abertura/${id}`);
  } catch (error) {
    throw new Error("Erro ao deletar acatamento de abertura: " + error);
  }
};

// Função para salvar ou atualizar um fechamento
// Essa função deve usar o solicitacaoBaseId ao criar ou atualizar o fechamento
export const saveOrUpdateAcatamentoAbertura = async (
  solicitacaoAberturaId: number,
  acatamentoAberturaData: AcatamentosAbertura
): Promise<AcatamentosAbertura> => {
  if (acatamentoAberturaData.id_AcatamentosAbertura) {
    // Se já existe, você pode usar um método de atualização, como PUT
    // Implementar o método de atualização conforme necessário
  } else {
    // Caso contrário, crie um novo fechamento
    return await createAcatamentosAbertura(solicitacaoAberturaId, acatamentoAberturaData);
  }
};