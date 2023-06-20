import React, { useContext } from 'react'
import { Modal, Whisper, Tooltip, } from 'rsuite';
import { DataContext } from '../../context/userContext';
import './profileModal.css'
const ProfileModal = (props) => {

    const { user } = useContext(DataContext);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${window.location.origin}/registerForm?leaderid=${user?.cedula}`);
    }

    return (
        <div>
            <Modal id='modalProfile' open={props.open} onClose={props.handleClose}>
                <Modal.Body>
                    <div className="ContainerWidget">
                        <div className="ProfileBox">
                            <div className="LeftContainer">
                                <div className="verticalCenter">
                                    <div className="IconContainer">
                                        {user?.name
                                            ? `${user?.name
                                                .substring(0, 1)
                                                .toUpperCase()}${user?.surnames
                                                    .substring(0, 1)
                                                    .toUpperCase()}`
                                            : "JD"}
                                    </div>
                                    <div className="UserNameLeft">
                                        {user?.name?.toUpperCase() + " " + user?.surnames?.toUpperCase()}
                                    </div>
                                    <p className="InformationData">
                                        Role: [{user?.role}]
                                    </p>
                                </div>
                            </div>
                            <div className="InformationContainer">
                                <div className="Section">
                                    <h5 className="Header">Información Base</h5>
                                    <div className="ContainerColumns">
                                        <div className="ContainerInformation">
                                            <h5 className="TitleInformation">Nombre</h5>
                                            <p className="InformationData">
                                                {user?.name}
                                            </p>
                                        </div>
                                        <div className="ContainerInformation">
                                            <h5 className="TitleInformation">Apellidos</h5>
                                            <p className="InformationData">
                                                {user?.surnames}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ContainerColumns">
                                        <div className="ContainerInformation">
                                            <h5 className="TitleInformation">Teléfono</h5>
                                            <p className="InformationData">
                                                {user?.phoneNumber}
                                            </p>
                                        </div>
                                        <div className="ContainerInformation">
                                            <h5 className="TitleInformation">Cedula</h5>
                                            <p className="InformationData">
                                                {user?.cedula}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="Section2">
                                    <h5 className="Header">Información Complementaria</h5>
                                    <div className="ContainerColumns">
                                        <div className="ContainerInformation">
                                            <h5 className="TitleInformation">Puesto de votación</h5>
                                            <p className="InformationData">
                                                {user?.votingBooth ? user?.votingBooth : 'NaN'}
                                            </p>
                                        </div>
                                        <div className="ContainerInformation">
                                            <h5 className="TitleInformation">Mesa de votación</h5>
                                            <p className="InformationData">
                                                {user?.table ? user?.table : 'NaN'}
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{width: "100%"}} className="ContainerInformation">
                                        <div className='ContainerTitle'>
                                            <h5 className="TitleInformation">Link Registro</h5>

                                            <Whisper speaker={<Tooltip> Copiar link</Tooltip>} trigger="hover" placement="top">
                                                <button onClick={copyToClipboard} className='copyButton'>Copiar</button>
                                            </Whisper>
                                        </div>
                                        <p className="RegisterLink">
                                            <a href={`${window.location.origin}/registerForm?leaderid=${user?.cedula}`} target="_blank" rel="noreferrer"> {window.location.origin + `/registerForm?leaderid=${user?.cedula}`}</a>
                                        </p>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default ProfileModal