/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useUsuarios } from "../../hooks/useUsuarios";
import { Usuario } from "../../services/api/usuarioService";
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
import { Link } from "react-router-dom";

const ListaUsuario: React.FC = () => {
  const { usuarios, error, removeUser } = useUsuarios();
  const [showModal, setShowModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);

  const handleEdit = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await removeUser(id);
      console.log("User deleted:", id);
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const handleAddNewUser = () => {
    setSelectedUsuario(null);
    setShowModal(true);
  };

  return (
    <>
      <Box>
        <Container>
          <Block>
            <Buttons as={Link} to={"/"}>
              Voltar
            </Buttons>
            <Buttons className="botao_2" onClick={handleAddNewUser}>
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
            <UserModal
              show={showModal}
              onClose={() => setShowModal(false)}
              usuario={selectedUsuario!}
            />
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
                      onClick={() => handleEdit(usuario)}
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

export default ListaUsuario;
