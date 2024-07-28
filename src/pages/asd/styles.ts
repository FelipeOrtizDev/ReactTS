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
  padding: 1rem;
  border-bottom: 8px solid #5cac28;
  text-align: center;
  font-size: 1.7rem;
  font-family: Arial, sans-serif;
  font-weight: bold;
`;

export const ListContainer = styled.table`
  margin-top: 0;
  width: 100%;
  overflow: hidden;
  table-layout: fixed;
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
`;

export const BodyTable = styled.tbody`
  width: 100%;
`;

export const LineTable = styled.tr`
  border-bottom: 1px solid #ccc;
  background-color: #f5f5f5;
  color: #000;
`;

export const CellTable = styled.td`
  text-align: center;
`;

export const Buttons = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: space-evenly;
    height: 3rem;
    width: 6rem;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 5px;
    background-color: #00a3e2;
    cursor: pointer;
    margin: 0.5rem;
    font-size: 1.3rem;
    font-weight: 600;

  svg {
    stroke-width: 1;
  }
`;