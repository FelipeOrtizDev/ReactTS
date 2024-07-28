import { axiosInstance } from "./conexaoApi";

export interface Endereco {
  id_Endereco?: number;
  SB_Municipio: string;
  SB_Logradouro: string;
  SB_Numero: number;
  SB_Complemento: string;
  SB_Bairro: string;
  SB_ZonaPressao: string;
  SB_Polo: string;
  SB_Referencia: string;
  SB_SetorAbastecimento: string;
  SB_Cruzamento: string;
}

export const getEnderecos = async (): Promise<Endereco[]> => {
  try {
    const response = await axiosInstance.get("/enderecos");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar endereços: " + error);
  }
};

export const createEnderecos = async (
  endereco: Endereco
): Promise<Endereco> => {
  try {
    const response = await axiosInstance.post("/enderecos", endereco);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar endereço" + error);
  }
};

export const updateEnderecos = async (
  id: number,
  endereco: Partial<Endereco>
): Promise<Endereco> => {
  try {
    const response = await axiosInstance.put(`/enderecos/${id}`, endereco);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar endereços" + error);
  }
};

export const deleteEnderecos = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/enderecos/${id}`);
  } catch (error) {
    throw new Error("Erro ao deletar Endereço" + error);
  }
};
