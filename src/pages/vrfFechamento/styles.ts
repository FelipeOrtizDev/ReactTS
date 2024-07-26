import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  background-color: #f8f9fa;
  padding: 2rem;
  margin: 3% auto;
  border-radius: 10px;

  /* @media (min-width: 576px) {
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
  } */
`;

export const Title = styled.div`
  font-weight: bold;
  color: #000000;
  font-size: 2rem;
  text-align: left;
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: 55% 65% 80%;
`;

export const SectionBox = styled.div`
  display: grid;
  grid-template-columns: max-content;

  @media (min-width: 768px) {
    flex: 0 0 auto;
    width: 25%;
  }
`;

export const SectionTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  width: 100%;
  text-align: left;
  margin-top: 1rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-flow: column wrap;
  margin-right: 3%;

  @media (min-width: 768px) {
    // flex: 0 0 auto;
    // width: 50%;
  }
  .input {
    width: 100%;
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
