/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useUsuarios } from "../../hooks/useUsuarios";
import {
  Box,
  Block,
  Container,
  Buttons,
  Title,
  Field,
  InfoUser,
  UserItem,
  UserField,
  UserList,
} from "./styles";
import UserModal from "../../utils/modals/modalUser";

const Usuario: React.FC = () => {
  const { usuarios, error, removeUser } = useUsuarios();
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (usuario: any) => {
    console.log("Edit user:", usuario);
    // Logic for editing a user can go here, like opening a modal with user info
  };

  const handleDelete = async (id: number) => {
    try {
      await removeUser(id);
      console.log("User deleted:", id);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  return (
    <>
      <Box>
        <Container>
          <Block>
            <Buttons>Voltar</Buttons>
            <Buttons className="botao_2" onClick={() => setShowModal(true)}>
              adicionar novo usuario
            </Buttons>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Title> Usuarios</Title>
          </Block>
          <Field>
            <InfoUser>id</InfoUser>

            <InfoUser>Nome</InfoUser>

            <InfoUser>Email</InfoUser>

            <InfoUser>Perfil</InfoUser>

            <InfoUser>Status</InfoUser>

            <InfoUser>Ações</InfoUser>
          </Field>
          <Container>
            <UserModal show={showModal} onClose={() => setShowModal(false)} />

            <UserList>
              {usuarios.map((usuario) => (
                <UserItem key={usuario.id_Usuario}>
                  <UserField>{usuario.id_Usuario}</UserField>
                  <UserField>{usuario.SB_NomeCompleto}</UserField>
                  <UserField>{usuario.SB_Email}</UserField>
                  <UserField>{usuario.SB_Perfil}</UserField>
                  <UserField>{usuario.SB_Status}</UserField>
                  <UserField>
                    <Buttons
                      className="edit-button"
                      onClick={() => handleEdit(usuario.id_Usuario)}
                    >
                      Editar
                    </Buttons>
                    {usuario.id_Usuario !== undefined && (
                      <Buttons
                        className="delete-button"
                        onClick={() => handleDelete(usuario.id_Usuario!)}
                      >
                        Excluir
                      </Buttons>
                    )}
                  </UserField>
                </UserItem>
              ))}
            </UserList>
          </Container>
        </Container>
      </Box>
    </>
  );
};

export default Usuario;
