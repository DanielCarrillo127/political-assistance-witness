import React, { useContext, useState } from 'react'
import ModalLayout from '../../../../layouts/modal/modal'
import { newAttendanceApi } from '../../../../api/requestAttendance';
import { Input} from 'rsuite';
import { DataContext } from "../../../../context/userContext";
import { toast } from "react-toastify";

const CreateAttendance = (props) => {

    const { user } = useContext(DataContext);

    const [voterCedula, setVoterCedula] = useState("")
    const [voterTel, setVoterTel] = useState("")
    const handleChangeVoterCedula = (e) => { setVoterCedula(e) };
    const handleChangeVoterTel = (e) => { setVoterTel(e) };

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
        if (voterTel !== "" && voterTel.length < 9) {
            toast.warn(`Debes ingresar un número telefónico válido.`, {
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

    const handlerCreateAtt = async () => {
        if (validateData()) {
            const data = {
                "userCedula": user.cedula,
                "eventid": props.eventid,
                "attendantCedula": voterCedula,
                "attendantNumber": voterTel,
            }
            const req = await newAttendanceApi(data);
            if (req.status === 200) {
                setVoterCedula("")
                setVoterTel("")
                props.handleClose()
                props.fetchData()
                toast.success(`Votante registrado correctamente.`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }else{
                toast.warn(`${req.response.data.message === "More information required" ? "Votante no registrado, por favor solicite un número de contacto." : req.response.data.message }`, {
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
            <ModalLayout open={props.open} handleClose={props.handleClose} title='Registrar votante'>
                <div>
                    <p>Ingresa la información necesaria para Registrar una nueva asistencia.</p>
                    <Input style={{ marginTop: 10 }} placeholder='Cedula [CC]*' value={voterCedula} onChange={handleChangeVoterCedula} />
                    <Input style={{ marginTop: 10 }} placeholder='Num. Telefónico' value={voterTel} onChange={handleChangeVoterTel} />
                    <br />
                    <button className='button__actions' onClick={() => handlerCreateAtt()}>Registrar</button>
                </div>
            </ModalLayout>
        </>
    )
}

export default CreateAttendance