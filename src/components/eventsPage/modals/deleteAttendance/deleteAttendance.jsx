import React, { useContext, useState } from 'react'
import ModalLayout from '../../../../layouts/modal/modal'
import { deleteAttendanceApi } from '../../../../api/requestAttendance';
import { Input } from 'rsuite';
import { DataContext } from "../../../../context/userContext";
import { toast } from "react-toastify";

const DeleteAttendance = (props) => {

    const { user } = useContext(DataContext);

    const [voterCedula, setVoterCedula] = useState("")
    const handleChangeVoterCedula = (e) => { setVoterCedula(e) };

    const validateData = () => {

        if (voterCedula === "") {
            toast.warn(`Debes ingresar todos los campos marcados con * para crear el evento.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return false
        }
        if (voterCedula.length < 5) {
            toast.warn(`Debes ingresar una identificación válida.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            return false
        }

        return true
    }

    const handlerDeleteAtt = async () => {
        if (validateData()) {
            const data = {
                "userCedula": user.cedula,
                "eventid": props.eventid,
                "attendantCedula": voterCedula,
            }
            const req = await deleteAttendanceApi(data);
            if (req.status === 200) {
                setVoterCedula("")
                props.handleClose()
                props.fetchData()
                toast.success(`Votante eliminado correctamente.`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.warn(`${req.response.data.message === "attendant dont exist in database for this event" ? "El usuario no asistió al evento." : req.response.data.message}`, {
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
    return (
        <>
            <ModalLayout open={props.open} handleClose={props.handleClose} title='Eliminar votante'>
                <div>
                    <p>Ingresa la información necesaria para eliminar el registro.</p>
                    <Input style={{ marginTop: 10 }} placeholder='Cedula [CC]*' value={voterCedula} onChange={handleChangeVoterCedula} />
                    <br />
                    <button className='button__actions' onClick={() => handlerDeleteAtt()}>Eliminar</button>
                </div>
            </ModalLayout>
        </>
    )
}

export default DeleteAttendance