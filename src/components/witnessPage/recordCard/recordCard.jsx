import React from 'react'
import './recordCard.css'
import { Whisper, Tooltip } from 'rsuite';
import { FaCheck, FaSearch, FaTimes } from "react-icons/fa";

const RecordCard = (props) => {
    return (
        <div className='recordCard'>
            <div className="img__container">
                <img className='image-contain' style={{ borderRadius: 13 }} src={props.img} alt="imgRecord" onClick={() => props.handleOpenDetail(props.id)} />
            </div>
            <div className='info__container'>
                <p className='site'>Testigo:</p>
                <span className='witnessName'>{props.witnessName}</span>
                <p className='site'>Lugar de votación:</p>
                <p className='site' style={{ marginTop: 0, fontWeight: 'bold' }} >{props.witnessSite}</p>

                <div style={{ display: 'flex', margin: '2px 0' }}>
                    <p className='votes'>Votos a favor:</p> <p className='count'>{props.votes}</p>
                </div>
                <div style={{ display: 'flex' }}>
                    <p className='inspector' style={{ marginTop: 0 }}>Estado:</p> <p style={{textDecorationLine: 'underline',marginTop: 0, fontWeight: 'bold', color: props?.status === 'PENDIENTE' ? 'var(--rs-btn-primary-bg)' : 'red' }}>{props.status}</p>
                </div>
            </div>
            <hr className='line' />
            <div className="actions__section">
                <Whisper speaker={<Tooltip> Aceptar</Tooltip>} trigger="hover" placement="bottom">
                    <button className='button__action' onClick={() => props.handleSuccess(props.id)}><FaCheck className='icon' size={20} /></button>
                </Whisper>
                <Whisper speaker={<Tooltip> Rechazar</Tooltip>} trigger="hover" placement="bottom">
                    <button className='button__action' onClick={() => props.handleDecline(props.id)}><FaTimes className='icon' size={20} /></button>
                </Whisper>
                <Whisper speaker={<Tooltip>Detalle</Tooltip>} trigger="hover" placement="bottom">
                    <button className='button__action' onClick={() => props.handleOpenDetail(props.id)}><FaSearch className='icon' size={20} /></button>
                </Whisper>
            </div>
        </div>
    )
}

export default RecordCard