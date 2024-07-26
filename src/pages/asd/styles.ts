import styled from "styled-components";

export const Sac = styled.div`
  text-align: center;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;

  ::-webkit-scrollbar-track {
  background: none; /* Cor do fundo da scrollbar */
  border-radius: 10px; /* Bordas arredondadas */
}
`;

export const TitleContainer = styled.div`
  background-color: #00a3e2;
  color: white;
  padding: 10px 0;
  border-bottom: 8px solid #5cac28;
  text-align: center;
`;

export const ListContainer = styled.table`
  margin-top: 0;
  width: 100%;
  overflow: hidden;
`;

export const HeadListTable = styled.thead`
  background-color: #008bb5;
  color: white;
  padding: 1.5rem;
  font-size: 18px;
  font-weight: 600;
`;

export const TitleHeadLineTable = styled.tr`
  display: table-row;
  th {
  }
  /* :first-child {
    width: 25%;
  }
  :nth-child(2) {
    width: 50%;
  }
  :nth-child(5) {
    width: 25%;
  } */
`;

export const BodyTable = styled.tbody`
  width: 100%;
  overflow: scroll;
`;

export const LineTable = styled.tr`
  border-bottom: 1px solid #ccc;
  /* padding: 10px 0; */
  background-color: #f5f5f5;
  color: #000;
  /* :first-child {
    width: 25%;
  }
  :nth-child(2) {
    width: 50%;
  }
  :nth-child(5) {
    width: 25%;
  } */
`;

export const CellTable = styled.td`
  text-align: center;
`;
