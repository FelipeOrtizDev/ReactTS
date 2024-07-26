import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsClipboardCheck, BsArrowBarRight } from "react-icons/bs";
import {
  createUser,
  updateUser,
  Usuario,
} from "../../services/api/usuarioService";
import { Formn, ModalContainer, ModalContent, Title } from "./modalUserStyles";
import {
  ButtonsBox,
  Optionn,
  Selectn,
  Buttons,
  Inputn,
} from "../../utils/commonStyles";

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
        <Formn onSubmit={handleSubmit(onSubmit)}>
          <Inputn
            type="text"
            {...register("SB_NomeCompleto", {
              required: "Nome completo é obrigatório",
            })}
            placeholder="Nome Completo"
          />
          {errors.SB_NomeCompleto && (
            <span>{errors.SB_NomeCompleto.message}</span>
          )}
          <Inputn
            type="text"
            {...register("SB_Login", { required: "Login é obrigatório" })}
            placeholder="Login"
          />
          {errors.SB_Login && <span>{errors.SB_Login.message}</span>}
          <Inputn
            type="email"
            {...register("SB_Email", { required: "Email é obrigatório" })}
            placeholder="Email"
          />
          {errors.SB_Email && <span>{errors.SB_Email.message}</span>}
          <Inputn
            type="password"
            {...register("SB_Senha", { required: "Senha é obrigatória" })}
            placeholder="Senha"
          />
          {errors.SB_Senha && <span>{errors.SB_Senha.message}</span>}
          <Inputn
            type="number"
            {...register("SB_Matricula", {
              required: "Matrícula é obrigatória",
            })}
            placeholder="Matrícula"
          />
          {errors.SB_Matricula && <span>{errors.SB_Matricula.message}</span>}
          <Selectn
            {...register("SB_Perfil", { required: "Perfil é obrigatório" })}
          >
            <Optionn value="">Selecione...</Optionn>
            <Optionn value="Administrador">Administrador</Optionn>
            <Optionn value="Padrão">Padrão</Optionn>
          </Selectn>
          {errors.SB_Perfil && <span>{errors.SB_Perfil.message}</span>}
          <Selectn
            {...register("SB_Status", { required: "Status é obrigatório" })}
          >
            <Optionn value="">Selecione...</Optionn>
            <Optionn value="1">Ativo</Optionn>
            <Optionn value="0">Inativo</Optionn>
          </Selectn>
          {errors.SB_Status && <span>{errors.SB_Status.message}</span>}
          <Inputn
            type="text"
            {...register("SB_Unidade", { required: "Unidade é obrigatória" })}
            placeholder="Unidade"
          />
          {errors.SB_Unidade && <span>{errors.SB_Unidade.message}</span>}
          <ButtonsBox>
            <Buttons type="submit">
              {usuario ? "Atualizar" : "Adicionar"}
              <BsClipboardCheck />
            </Buttons>
            <Buttons type="button" className="close-button" onClick={onClose}>
              Fechar
              <BsArrowBarRight />
            </Buttons>
          </ButtonsBox>
        </Formn>
      </ModalContent>
    </ModalContainer>
  );
};

export default UserModal;
