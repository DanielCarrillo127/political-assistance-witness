import React, { useState } from 'react'
import ModalLayout from '../../../../layouts/modal/modal'
import { deleteUserApi } from '../../../../api/requestUsers';
import { Input } from 'rsuite';
import { toast } from "react-toastify";


const DeleteVoter = (props) => {

    const [deleteId, setDeleteId] = useState("")
    const handleChangeDeleteId = (e) => { setDeleteId(e) };

    const handlerDeleteVoter = async () => {
        if (deleteId !== "") {
            const req = await deleteUserApi(deleteId);
            if (req.status === 200) {
                props.handleClose()
                setDeleteId("")
                toast.success(`Usuario Eliminado Correctamente.`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                props.handlerUpdateTable();
            }
        } else {
            toast.warn(`Debes ingresar una cedula valida para realizar la acción.`, {
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
            <ModalLayout open={props.open} handleClose={props.handleClose} title='Eliminar Votante'>
                <div>
                    <p>Ingrese la cedula del usuario que desea Eliminar.</p>
                    <Input style={{marginTop: 10}} placeholder='Cedula [cc]*' block value={deleteId} onChange={handleChangeDeleteId} />
                    <br/>
                    <button className='button__actions' onClick={() => handlerDeleteVoter()}>Eliminar</button>
                </div>
            </ModalLayout>
        </>
    )
}

export default DeleteVoter