import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: #f8f9fa;
  padding: 2rem;
  margin: 2% auto;
  border-radius: 10px;
  height: 87vh; /* Ajusta a altura máxima */
  overflow-y: auto; /* Adiciona a rolagem vertical */

  @media (min-width: 576px) {
    width: 80%;
  }

  @media (min-width: 768px) {
    width: 70%;
  }

  @media (min-width: 992px) {
    width: 60%;
  }

  @media (min-width: 1200px) {
    width: 50%;
  }
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const SectionBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  width: 100%;
  text-align: left;
  margin-top: 0.5rem;
  line-height: 1.5;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-right: 3%;
  }
`;

export const Labeln = styled.label`
  display: inline-block;
  text-align: left;
  font-size: 1.3rem;
  font-weight: 600;
  color: gray;
  margin: 0.5rem 0;
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
  height: 100px; 
  width: 200%;
`;
