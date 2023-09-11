import React, { useContext, useState } from 'react'
import ModalLayout from '../../../layouts/modal/modal';
import {updateUserPasswordApi} from '../../../api/requestUsers';
import { Input, InputGroup } from 'rsuite';
import { DataContext } from '../../../context/userContext';
import { toast } from "react-toastify";
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import '../profileModal.css'

const ChangePassword = (props) => {

    const { user } = useContext(DataContext);

    const [visible, setVisible] = React.useState([false, false]);

    const handleChange = (index) => {
        const arr = [...visible];
        arr[index] = !arr[index]
        setVisible(arr);
    };


    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordValidation, setNewPasswordValidation] = useState("")

    const handleChangeCurrentPassword = (e) => { setCurrentPassword(e) };
    const handleChangeNewPassword = (e) => { setNewPassword(e) };
    const handleChangeNewPasswordValidation = (e) => { setNewPasswordValidation(e) };

    function hasWhiteSpace(s) {
        return (/\s/).test(s);
    }

    const handlerChangePassword = async () => {
        if (currentPassword === "" || newPassword === "" || newPasswordValidation === "") {
            toast.warn(`Debes ingresar todos los campos requeridos.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } else if (newPassword !== newPasswordValidation) {
            toast.warn(`Las contraseña nueva no coincide.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
        } else if (newPassword === newPasswordValidation) {
            if (!hasWhiteSpace(newPassword) && newPassword.length >= 6) {
                const reqBody = {
                    userCedula: user.cedula,
                    updateUserCedula: user.cedula,
                    oldPassword: currentPassword,
                    newPassword: newPassword
                }
                const req = await updateUserPasswordApi(reqBody);
                if (req.status === 200) {
                    toast.success(`Contraseña Actualizado Correctamente.`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    setCurrentPassword("")
                    setNewPassword("")
                    setNewPasswordValidation("")
                }else if(req.response.status === 404){
                    toast.warn(`${req.response.data.message}`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } else {
                toast.warn(`La contraseña no puede contener espacios en blanco y debe tener la longitud mínima de 6 caracteres.`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    }

    const styles = {
        width: 330,
        marginBottom: 10,
        marginTop: 5
    };
    return (
        <>
            <ModalLayout size='xs' open={props.open} handleClose={props.handleClose} title='Asignar Nuevo Rol'>
                <div className='modal__body'>
                    <p>Ingrese su contraseña actual.</p>
                    {visible}
                    <InputGroup inside style={styles}>
                        <Input type={visible[0] ? 'text' : 'password'} placeholder='Contraseña actual*' value={currentPassword} onChange={handleChangeCurrentPassword} />
                        <InputGroup.Button onClick={() => handleChange(0)}>
                            {visible[0] ? <EyeIcon /> : <EyeSlashIcon />}
                        </InputGroup.Button>
                    </InputGroup>


                    <p style={{ fontWeight: '500', fontSize: 12, lineHeight: 1, marginBottom: 5, marginTop: 15 }}>Recuerda: Su nueva contraseña debe tener al menos seis caracteres y no puede contener espacios en blanco.</p>
                    <p>Ingrese su contraseña nueva.</p>
                    <InputGroup inside style={styles}>
                        <Input type={visible[1] ? 'text' : 'password'} placeholder='Contraseña nueva*' value={newPassword} onChange={handleChangeNewPassword} />
                        <InputGroup.Button onClick={() => handleChange(1)}>
                            {visible[1] ? <EyeIcon /> : <EyeSlashIcon />}
                        </InputGroup.Button>
                    </InputGroup>

                    <p>Ingrese nuevamente su contraseña nueva.</p>
                    <InputGroup inside style={styles}>
                        <Input type={visible[1] ? 'text' : 'password'} placeholder='Confirmar contraseña nueva*' value={newPasswordValidation} onChange={handleChangeNewPasswordValidation} />
                        <InputGroup.Button onClick={() => handleChange(1)}>
                            {visible[1] ? <EyeIcon /> : <EyeSlashIcon />}
                        </InputGroup.Button>
                    </InputGroup>


                    <br />
                    <button className='button__actions' onClick={() => handlerChangePassword()}>Cambiar Contraseña</button>
                </div>
            </ModalLayout>
        </>
    )
}

export default ChangePassword