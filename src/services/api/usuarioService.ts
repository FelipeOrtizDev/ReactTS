import { axiosInstance } from "./conexaoApi";

export interface Usuario {
  id_Usuario?: number;
  SB_NomeCompleto: string;
  SB_Login: string;
  SB_Email: string;
  SB_Senha: string;
  SB_Matricula: number;
  SB_Perfil: string;
  SB_Status: number;
  SB_Unidade: string;
}

export const getAllUsers = async (): Promise<Usuario[]> => {
  try {
    const response = await axiosInstance.get("/usuarios");
    return response.data;
  } catch (error: unknown) {
    throw new Error(" Error ao puxar todos os Usuarios" + error);
  }
};

export const createUser = async (usuario: Usuario): Promise<Usuario> => {
  try {
    const response = await axiosInstance.post("/usuarios", usuario);
    return response.data;
  } catch (error: unknown) {
    throw new Error("Erro ao criar usuario" + error);
  }
};

export const updateUser = async (
  id: number,
  usuario: Partial<Usuario>
): Promise<Usuario> => {
  try {
    const response = await axiosInstance.put(`/usuarios/${id}`, usuario);
    return response.data;
  } catch (error: unknown) {
    throw new Error("Erro ao atualizar usuario" + error);
  }
};

export const deleteUser = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/usuarios/${id}`);
  } catch (error: unknown) {
    throw new Error("Erro ao deletar usuario" + error);
  }
};