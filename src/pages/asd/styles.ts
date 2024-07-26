import styled from "styled-components";

export const Sac = styled.div`
  text-align: center;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const TitleContainer = styled.div`
  background-color: #00a3e2;
  color: white;
  padding: 10px 0;
  border-bottom: 8px solid #5cac28;
`;

export const ListContainer = styled.table`
  margin-top: 0;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const HeadListTable = styled.thead`
  background-color: #008bb5;
  color: white;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 35px;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
  height: 10px;
`;

export const BodyTable = styled.tbody`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const LineTable = styled.tr`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
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

export const CellTable = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;