import styled from "styled-components";

export const Inputn = styled.input`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const Selectn = styled.select`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
`;

export const Optionn = styled.option`
  border-radius: unset;
  font-size: 1rem;
  font-weight: 400;
  color: #000;
`;

export const ButtonsBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 3%;

  button:last-child {
    margin-right: 0;
  }
`;

export const Buttons = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-evenly;
  height: 3rem;
  width: 8rem;
  padding: 1%;
  padding-bottom: 9px !important;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 5px;
  background-color: #00a3e2;
  cursor: pointer;
  margin-right: 1%;
  font-size: 1.3rem;
  font-weight: 600;

  svg {
    stroke-width: 1;
  }
`;