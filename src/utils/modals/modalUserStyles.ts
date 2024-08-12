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
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Garantir scroll vertical */

  @media (max-width: 992px) {
    max-width: 90%;
    padding: 1rem;
  }

  @media (max-width: 768px) {
    max-width: 95%;
  }

  @media (max-width: 576px) {
    padding: 0.5rem;
  }
`;

export const Formn = styled.form`
  display: flex;
  flex-direction: column;

  input {
    padding: 8px;
    font-size: 16px;
  }
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 1008px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }

  .input {
    width: 100%;
  }
`;
export const Field1 = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 1008px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }

  .input {
    width: 100%;
  }
`;

export const FieldTwo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

export const TextArean = styled.textarea`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #000;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  resize: none;
  width: 72%;

  @media (max-width: 630px) {
    font-size: 0.875rem;
  }
`;

export const ObsArea = styled.textarea`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #000;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  resize: none;
  width: 90%;

  @media (max-width: 630px) {
    font-size: 0.875rem;
  }
`;

export const Title = styled.div`
  font-weight: bold;
  color: #000000;
  font-size: 2rem;
  text-align: left;

  @media (max-width: 576px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;
