import React from 'react'
import './profileCard.css'

const Index = () => {
    return (
        <>
            <div className="profile-card">
                <div className="personal-info-container">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <img className="img-candidate" src="candidate.jpeg" alt="Candidate" />
                        {/* <img className="img-number" src="number.png" alt="number pic" /> */}
                    </div>
                    <div>
                        <p style={{ fontSize: '1.5em', fontWeight: 'bold', margin: 0 }}>Wilson <br /> Rincón Álvarez</p>
                    </div>
                    <div>
                        <p> <strong>Candidato a la Alcaldía de La Paz - Cesar </strong> por el partido Alianza por La Paz Dejando Huellas</p>
                        <p>2024 - 2027</p>
                        <p><strong>Perfil profesional</strong></p>
                        <p><em>Administración Financiera y de sistema • Universidad del Santander UDES.</em></p>
                        <ul>
                            <li> - Especialista en mercadeo • Universidad autónoma del caribe.</li>
                            <li> - Gerencia de la hacienda publica • CECAR.</li>
                            <li> - Especialista en Gerencia en gobierno y gestión pública • Universidad jorge tadeo lozano - UPC Cesar.</li>
                            <li> - XIII International Seminar on Organizational Management.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
