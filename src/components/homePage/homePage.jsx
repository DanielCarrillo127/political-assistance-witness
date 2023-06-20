import React from 'react'
import Cards from '../cardsHighlights/cards'
import { HiHeart, HiOutlineDocumentAdd, HiOutlineClipboardCheck, HiOutlineUserGroup } from "react-icons/hi";
import "./homePage.css"

const HomePage = () => {
  return (
    <>
      <div className="cards">
        <Cards title="Votantes Registrados" number="+150" icon={<HiOutlineDocumentAdd size={50} />} />
        <Cards title="Eventos Exitosos" number="12" icon={<HiOutlineClipboardCheck size={50} />} />
        <Cards title="Lideres Activos" number="15" icon={<HiOutlineUserGroup size={50} />} />
        <Cards title={`"Interacciones" en redes sociales`} number="+1200" icon={<HiHeart size={50} />} />
      </div>

      <div className="home__grid">
        <div>
          <div style={{height:500}} className="container__component">
            <div className="container__header">
              <h2>Esquema de éxito</h2>
              <button disabled>Mas</button>
            </div>
            <h2 className='center'  style={{marginTop:150}}>Próximamente...</h2>

          </div>

        </div>

        <div>
          <div className="container__component">
            <div className="container__header">
              <h2>Proximos Eventos</h2>
              <button disabled>Conoce Mas</button>
            </div>
            <div style={{height:400}} className='container_event_body'>
              <h4 className='center' style={{margin:'auto'}}>No se han encontrado eventos.</h4>
              {/* <div className="eventCard">
                <div className="info">
                  <div className='eventCircle'>
                    EV
                  </div>
                  <div>
                    <h4>Evento 1</h4>
                    <small>direccion</small>
                  </div>
                </div>
                <div>

                </div>
              </div> */}
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default HomePage
