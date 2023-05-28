import React, { useContext,useState } from 'react'
import ModalLayout from '../../../layouts/modal/modal'
import { setRoleApi } from '../../../api/requestUsers';
import { Input, SelectPicker } from 'rsuite';
import { DataContext } from "../../../context/userContext";
import { toast } from "react-toastify";

const SetRoleVoter = (props) => {

    const { user } = useContext(DataContext);

    const [userChangeId, setUserChangeId] = useState("")
    const [newRole, setNewRole] = useState("")

    const optionRoles = [
        { key: 1, label: 'Votante', value: 'VOTER' },
        { key: 2, label: 'Coordinador', value: 'COORDINATOR' },
        { key: 3, label: 'Lider', value: 'LEADER' },
    ]
    const handleChangeUserChangeId = (e) => { setUserChangeId(e) };
    const handleChangeUserNewRole = (e) => { setNewRole(e) };

    const handlerSetRole = async () => {
        if (userChangeId !== "") {
            const req = await setRoleApi(user.cedula,userChangeId, newRole);
            if (req.status === 200) {
                props.handleClose()
                setUserChangeId("")
                toast.success(`Rol Actualizado Correctamente.`, {
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
            toast.warn(`Debes ingresar una cedula y/o seleccionar un rol valido para realizar el cambio.`, {
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
    return (
        <>
         <ModalLayout open={props.open} handleClose={props.handleClose} title='Asignar Nuevo Rol'>
                <div>
                    <p>Ingrese la cedula del usuario Al que desea cambiarle el Rol.</p>
                    <Input style={{marginTop: 10}} placeholder='Cedula [cc]*' block value={userChangeId} onChange={handleChangeUserChangeId} />
                    <SelectPicker style={{marginTop: 5}} data={optionRoles} searchable={false} block placeholder={"Nuevo Rol"} placement="auto" onChange={handleChangeUserNewRole}/>
                    <br/>
                    <button className='button__actions' onClick={() => handlerSetRole()}>Cambiar Rol</button>
                </div>
            </ModalLayout>
        </>
    )
}

export default SetRoleVoter