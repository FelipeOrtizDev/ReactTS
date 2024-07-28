import { axiosInstance } from "./conexaoApi";
import { SolicitacaoBase } from "./solicitacaoBase";

// Interface para AcatamentosAbertura
export interface AcatamentosAbertura extends SolicitacaoBase {
  id_AcatamentosAbertura?: number;
  SB_DataAcatamentoAbertura: string;
  SB_PrvisãoAcatamentoAbertura: string;
  SB_EquipeResponsavelAbertura: string;
  SB_SolicitacaoAbertura_id_SolicitacaoAbertura: number;
  SB_ObservacaoAcatamentoAbertura: string;
}

// Funções de serviço para AcatamentosAbertura
export const getAcatamentosAbertura = async (): Promise<
  AcatamentosAbertura[]
> => {
  try {
    const response = await axiosInstance.get("/acatamentos-abertura");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar acatamentos de abertura: " + error);
  }
};

export const createAcatamentosAbertura = async (
  acatamentoAbertura: AcatamentosAbertura
): Promise<AcatamentosAbertura> => {
  try {
    const response = await axiosInstance.post(
      "/acatamentos-abertura",
      acatamentoAbertura
    );
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar acatamento de abertura: " + error);
  }
};

export const updateAcatamentosAbertura = async (
  id: number,
  acatamentoAbertura: Partial<AcatamentosAbertura>
): Promise<AcatamentosAbertura> => {
  try {
    const response = await axiosInstance.put(
      `/acatamentos-abertura/${id}`,
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
