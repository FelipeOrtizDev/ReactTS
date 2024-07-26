import styled from "styled-components";

export const Box = styled.div`
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  width: 100%;
  height: 100vh;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 960px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }

  @media (min-width: 1400px) {
    max-width: 1320px;
  }
`;

export const Container = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

export const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 15%;
  margin-bottom: 25px;
  .botao_2 {
    margin-left: 10px;
  }
`;

export const SearchInput = styled.input`
  width: 30%;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
`;

export const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;

  span {
    margin: 0 15px;
  }
`;

export const Buttons = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: auto;
  padding: 0 20px;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 5px;
  background-color: #00a3e2;
  transition: all 0.3s linear;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 7px;
  text-decoration: none;
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
  text-align: left;
  margin-left: 25%;
  margin-right: 25%;
`;

export const Field = styled.div`
  border: 2px;
  display: flex;
  flex-direction: row;
  background-color: black;
  height: 40px;
  p:first-child {
    border: none;
    width: 25%;
  }
  p:nth-child(2) {
    width: 50%;
  }
  p:nth-child(5) {
    width: 25%;
  }
  p:last-child {
    border: none;
  }
  //   min-inline-size: min-content;
`;

export const InfoUser = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  color: #fff;
  border: #fff;
  border-style: none solid none solid;
  border-width: 1px;
  width: 100%;
  height: 97%;
`;

export const UserList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const UserItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  background-color: #f5f5f5;
  color: #000;
  :first-child {
    width: 25%;
  }
  :nth-child(2) {
    width: 50%;
  }
  :nth-child(5) {
    width: 25%;
  }
`;

export const UserField = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
