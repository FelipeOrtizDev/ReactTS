import React from "react";
import "./ServicosEmAndamentoPage.css";

const ServicosEmAndamentoPage: React.FC = () => {

  return (
    <div className='servicos-em-andamento-container'>
      <div className='titulo-container'>
        <h3>Fechamentos</h3>
      </div>
      <div className='lista-container'>
        <div className='linha titulos'>
          <span>Data</span>
          <span>Hora</span>
          <span>Polo</span>
          <span>Município</span>
          <span>Endereço</span>
          <span>Status</span>
          <span>Andamento</span>
        </div>
      </div>

{/*       <div className='pesquisas-e-ocorrencias'>
        <div className='pesquisas-container'>
          <div className='titulo-container borda-verde'>
            <h3>Pesquisas</h3>
          </div>
          <div className='lista-container'>
            <div className='linha titulos'>
              <span>Data</span>
              <span>Hora</span>
              <span>Polo</span>
              <span>Município</span>
              <span>Endereço</span>
              <span>Tipo</span>
              <span>Andamento</span>
            </div>
          </div>
        </div>
        <div className='separador'></div>
        <div className='ocorrencias-container'>
          <div className='titulo-container borda-verde'>
            <h3>Ocorrências</h3>
          </div>
          <div className='lista-container'>
            <div className='linha titulos'>
              <span>Data</span>
              <span>Hora</span>
              <span>Polo</span>
              <span>Município</span>
              <span>Equipamento</span>
              <span className='afeta-abastecimento'>
                Afeta
                <br />
                Abastecimento
              </span>
              <span>Andamento</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ServicosEmAndamentoPage;
