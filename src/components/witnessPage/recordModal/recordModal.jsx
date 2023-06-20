import React from 'react';
import ModalLayout from '../../../layouts/modal/modal';
import './recordModal.css'
import ZoomImage from './ZoomImage';

const RecordModal = (props) => {
    return (
        <>
            <ModalLayout open={props.open} handleClose={props.handleClose} title='Verificación detallada.'>
                <div id='recordModal'>
                    {/* <div className="img__container">
                        <img className='image-contain' style={{ borderRadius: 13 }} src={props.data?.img} alt="imgRecord"/>
                    </div> */}
                    <div className='img__container'>
                        <ZoomImage image={props.data?.img} />
                    </div>

                    <div className="info__container">
                        <span className='witnessName'>Testigo: {props.data?.witnessName}</span>
                        <p style={{marginTop:0}} className='site'>Lugar de votación: {props.data?.witnessSite}</p>
                        <p className='site'>Hora: {props.data?.dateTime}</p>
                        <div style={{ display: 'flex' }}>
                            <p className='inspector'>Revisor:</p>{props.data?.inspector}
                        </div>
                        <p className='votes'>Votos: {props.data?.votes}</p>
                       
                    </div>
                    <hr className='line' />
                    <div className='actions_section'>
                        <button className='button__actions' onClick={() => { props.handleSuccess(props.data?.id); props.handleClose() }}>Aceptar Evidancia</button>
                        <button className='button__actions' onClick={() => { props.handleDecline(props.data?.id); props.handleClose() }}>Rechazar Evidancia</button>
                    </div>
                </div>
            </ModalLayout>
        </>
    )
}

export default RecordModal