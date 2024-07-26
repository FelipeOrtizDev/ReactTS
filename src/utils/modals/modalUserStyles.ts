import styled from "styled-components";

export const ModalContainer = styled.div`
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

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

 export const Title = styled.div`
  color: #000;
  font-weight: bold;
  font-size: 30px;
  text-align: left;
`;
export const Formn = styled.form`
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