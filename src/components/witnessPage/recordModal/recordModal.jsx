import React from 'react';
import ModalLayout from '../../../layouts/modal/modal';
import './recordModal.css'
import ZoomImage from './ZoomImage';

const RecordModal = (props) => {

    const votesPerCandidate = () => {
        // console.log(props.data?.votersData)
        if (props.data?.votersData) {
            const dataArray = Object.values(props.data?.votersData);
            return dataArray.map(vote => {
                if (vote.name !== undefined) {
                    return <div key={vote.index} style={{ display: 'flex', margin: '2px 0' }}>
                        <p className={vote.isPrincipal ? "votes" : "site"}> {vote.name}</p>
                        <p style={{ marginTop: 0, marginLeft: 5 }} className={vote.isPrincipal ? "votes" : "site"}>~ {vote.isPrincipal ? "Votos a favor: " : "Votos: "} {vote.votes}</p>
                    </div>
                }
                return null
            })
        }
    }

    const totalVotes =() => {
        let totalVotes = 0;

        if (props.data?.votersData) {
            for (const [key, value] of Object.entries(props.data?.votersData)) {
                totalVotes += Number(value?.votes) || 0;
            }
        }
        totalVotes += Number(props.data?.votersData?.nullVotes) || 0;
        totalVotes += Number(props.data?.votersData?.whiteVotes) || 0;
        totalVotes += Number(props.data?.votersData?.unmarkedVotes) || 0;
        

        return totalVotes;
    }

    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        // timeZoneName: 'short',
      };

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
                        <span className='witnessName'>Testigo: {props.data?.witnessId.name + " " + props.data?.witnessId.surnames} ~ +57 {props.data?.witnessId.phoneNumber}</span>
                        <p style={{ marginTop: 0 }} className='inspector'>Lugar de votación: {props.data?.witnessId.votingBoothInCharge}</p>
                        <p style={{ marginTop: 0 }} className='inspector'>Mesa de votación: #{props.data?.witnessId.tableInCharge}</p>
                        <p className='inspector'>Hora de creación: {new Date(props.data?.updated_at).toLocaleString(undefined, options)}</p>
                        <div style={{ display: 'flex' }}>
                            <p className='inspector'>Estado:</p><p style={{textDecorationLine: 'underline',marginTop: 0, fontWeight: 'bold', color: props.data?.status === 'PENDIENTE' ? 'var(--rs-btn-primary-bg)' : 'red' }}>{props.data?.status}</p>
                        </div>

                        <hr className='line' />
                        {votesPerCandidate()}
                        <p style={{ marginTop: 0 }} className='site'>Votos en blanco: {props.data?.votersData?.nullVotes}</p>
                        <p style={{ marginTop: 0 }} className='site'>Votos anulados: {props.data?.votersData?.whiteVotes}</p>
                        <p style={{ marginTop: 0 }} className='site'>Votos no marcados: {props.data?.votersData?.unmarkedVotes}</p>
                        <div style={{ display: 'flex' }}>
                            <p className='inspector'>Votos totales en la mesa: {totalVotes()}</p>
                        </div>


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