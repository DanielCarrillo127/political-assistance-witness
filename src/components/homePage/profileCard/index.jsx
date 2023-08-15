import React from 'react'
import './profileCard.css'

const Index = () => {
    return (
        <>
            <div className="profile-card">
                <div className="personal-info-container">
                    <div style={{ display: 'flex' , flexDirection: 'column'}}>
                        <img className="img-candidate" src="candidate.png" alt="Candidate" />
                        <img className="img-number" src="number.png" alt="number pic" />
                    </div>
                    <div>
                        <h2>Ender Carrillo</h2>
                        <p>Candidato al concejo por el partido conservador</p>
                        <p>2024 - 2027</p>
                        <p>Perfil profesional: Psicologo</p>
                        <ul>
                            <li>•Fundación Universitaria Área Andina</li>
                            <li>•Zoni Lenguaje</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h3>Cargos comunitarios y públicos</h3>
                    <ul>
                        <li>•Edil comuna 4 (presidente) Apoyo psicosocial</li>
                        <li>•Fundación Goyo Zuleta</li>
                        <li>•Acompamiento psicologico VFC</li>
                        <li>•Acompañamiento junta de acción comunal Villa Miriam</li>
                    </ul>
                </div>
                <div>
                    <h3>Apoyo a la gestión en valledupar</h3>
                    <ul>
                        <li>•Acompañamiento a favor de la lucha en contra la tercerización de EMDUPAR</li>
                        <li>•Secretaria general "alumbrado público"</li>
                        <li>•Secretaria de gobierno "seguridad, convivencia y lotes públicos enmontados y con puntos críticos en Valledupar"</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Index
