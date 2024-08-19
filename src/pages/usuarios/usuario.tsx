/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useUsuarios } from "../../hooks/useUsuarios";
import { Usuario } from "../../services/api/usuarioService";
import {
  Box,
  Block,
  Container,
  ButtonsUser,
  Title,
  Field,
  InfoUser,
  UserItem,
  UserField,
  UserList,
  SearchInput,
  PaginationControls,
  ButtonsUserAdd,
} from "./styles";
import {
  BsArrowLeftShort,
  BsArrowRightShort,
  BsPersonPlusFill,
  BsPersonXFill,
} from "react-icons/bs";
import UserModal from "../../utils/modals/modalUser";
import { Link } from "react-router-dom";

const ListaUsuario: React.FC = () => {
  const { usuarios, error, removeUser } = useUsuarios();
  const [showModal, setShowModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getStatusConversor = (status: number) => {
    return status === 1 ? "Ativo" : "Desligado";
  };

  const filteredUsuarios = usuarios.filter((usuario) => {
    const statusText = getStatusConversor(usuario.SB_Status);

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const searchTermAsNumber = parseInt(searchTerm, 10);

    return (
      usuario.id_Usuario === searchTermAsNumber || // Check if the ID matches
      usuario.SB_NomeCompleto.toLowerCase().includes(lowerCaseSearchTerm) ||
      usuario.SB_Email.toLowerCase().includes(lowerCaseSearchTerm) ||
      usuario.SB_Perfil.toLowerCase().includes(lowerCaseSearchTerm) ||
      statusText.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsuarios = filteredUsuarios.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const totalPages = Math.ceil(filteredUsuarios.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Box>
        <Container>
          <Block>
            <ButtonsUser as={Link} to={"/"}>
              <BsArrowLeftShort />
              Voltar
            </ButtonsUser>
            <ButtonsUserAdd onClick={handleAddNewUser}>
              <BsPersonPlusFill />
              Novo Usuario
            </ButtonsUserAdd>

            <Title>Usuários</Title>
            <SearchInput
              type="text"
              placeholder="Pesquisar usuários..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
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
              {currentUsuarios.map((usuario) => (
                <UserItem key={usuario.id_Usuario}>
                  <UserField>{usuario.id_Usuario}</UserField>
                  <UserField>{usuario.SB_NomeCompleto}</UserField>
                  <UserField>{usuario.SB_Email}</UserField>
                  <UserField>{usuario.SB_Perfil}</UserField>
                  <UserField>{getStatusConversor(usuario.SB_Status)}</UserField>
                  <UserField>
                    <ButtonsUser
                      className="edit-button"
                      onClick={() => handleEdit(usuario)}
                    >
                      Editar
                      {/* <BsPencil /> */}
                    </ButtonsUser>
                    {usuario.id_Usuario !== undefined && (
                      <ButtonsUser
                        className="delete-button"
                        onClick={() => handleDelete(usuario.id_Usuario!)}
                      >
                        Excluir
                        <BsPersonXFill />
                      </ButtonsUser>
                    )}
                  </UserField>
                </UserItem>
              ))}
            </UserList>
            <PaginationControls>
              <ButtonsUser
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <BsArrowLeftShort />
                Anterior
              </ButtonsUser>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <ButtonsUser
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Próxima
                <BsArrowRightShort />
              </ButtonsUser>
            </PaginationControls>
          </Container>
        </Container>
      </Box>
    </>
  );
};

export default ListaUsuario;
