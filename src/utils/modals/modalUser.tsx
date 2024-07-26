import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  createUser,
  updateUser,
  Usuario,
} from "../../services/api/usuarioService";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 8px;
    font-size: 16px;
  }

  button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const Title = styled.div`
  color: #000;
  font-weight: bold;
  font-size: 30px;
  text-align: left;
`;

interface UserModalProps {
  show: boolean;
  onClose: () => void;
  usuario?: Usuario;
}

const UserModal: React.FC<UserModalProps> = ({ show, onClose, usuario }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Usuario>();

  useEffect(() => {
    if (usuario) {
      reset(usuario);
    }
  }, [usuario, reset]);

  const onSubmit = async (data: Usuario) => {
    try {
      if (usuario) {
        await updateUser(usuario.id_Usuario!, data);
      } else {
        await createUser(data);
      }

      onClose();
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <ModalContainer>
      <ModalContent>
        <Title>{usuario ? "Editar Usuário" : "Adicionar Novo Usuário"}</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("SB_NomeCompleto", {
              required: "Nome completo é obrigatório",
            })}
            placeholder="Nome Completo"
          />
          {errors.SB_NomeCompleto && (
            <span>{errors.SB_NomeCompleto.message}</span>
          )}
          <input
            type="text"
            {...register("SB_Login", { required: "Login é obrigatório" })}
            placeholder="Login"
          />
          {errors.SB_Login && <span>{errors.SB_Login.message}</span>}
          <input
            type="email"
            {...register("SB_Email", { required: "Email é obrigatório" })}
            placeholder="Email"
          />
          {errors.SB_Email && <span>{errors.SB_Email.message}</span>}
          <input
            type="password"
            {...register("SB_Senha", { required: "Senha é obrigatória" })}
            placeholder="Senha"
          />
          {errors.SB_Senha && <span>{errors.SB_Senha.message}</span>}
          <input
            type="number"
            {...register("SB_Matricula", {
              required: "Matrícula é obrigatória",
            })}
            placeholder="Matrícula"
          />
          {errors.SB_Matricula && <span>{errors.SB_Matricula.message}</span>}
          <input
            type="text"
            {...register("SB_Perfil", { required: "Perfil é obrigatório" })}
            placeholder="Perfil"
          />
          {errors.SB_Perfil && <span>{errors.SB_Perfil.message}</span>}
          <input
            type="number"
            {...register("SB_Status", { required: "Status é obrigatório" })}
            placeholder="Status"
          />
          {errors.SB_Status && <span>{errors.SB_Status.message}</span>}
          <input
            type="text"
            {...register("SB_Unidade", { required: "Unidade é obrigatória" })}
            placeholder="Unidade"
          />
          {errors.SB_Unidade && <span>{errors.SB_Unidade.message}</span>}
          <button type="submit">{usuario ? "Atualizar" : "Adicionar"}</button>
          <button type="button" className="close-button" onClick={onClose}>
            Fechar
          </button>
        </Form>
      </ModalContent>
    </ModalContainer>
  );
};

export default UserModal;
