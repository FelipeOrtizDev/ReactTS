/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  Usuario,
} from "../services/api/usuarioService";

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await getAllUsers();
        setUsuarios(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchUsuarios();
  }, []);

  const addUser = async (usuario: Usuario) => {
    try {
      const newUsuario = await createUser(usuario);
      setUsuarios([...usuarios, newUsuario]);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const editUser = async (id: number, usuario: Partial<Usuario>) => {
    try {
      const updatedUsuario = await updateUser(id, usuario);
      setUsuarios(
        usuarios.map((u) => (u.id_Usuario === id ? updatedUsuario : u))
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  const removeUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsuarios(usuarios.filter((u) => u.id_Usuario !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  return {
    usuarios,
    error,
    addUser,
    editUser,
    removeUser,
  };
};
