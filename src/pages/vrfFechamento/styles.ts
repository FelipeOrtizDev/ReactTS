import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-flow: column wrap;
  width: 100%;
  background-color: #f8f9fa;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
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

export const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #000000;
  font-size: 24px;
  text-align: left;
`;

export const Field = styled.div`
  margin: 0 0.35em;
//   padding: 0.35em 0.625em 0.75em;
  border: 2px;
//   min-inline-size: min-content;
`;

export const SectionBox = styled.div`
  display: flex !important;
  flex-direction: row;
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
  position: relative;
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
  font-size: 1rem;
  font-weight: normal;
  color: gray;
  margin-bottom: 0.5rem;
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
