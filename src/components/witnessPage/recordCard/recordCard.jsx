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
                <span className='witnessName'>{props.witnessName}</span>
                <p className='site'>{props.witnessSite}</p>
                <div className='container-2'>
                    <div style={{ display: 'flex' }}>
                        <p className='votes'>Votos:</p> <p className='count'>{props.votes}</p>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <p className='inspector'>Revisor:</p>{props.inspector}
                    </div>
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