import React, { useContext, useState } from 'react'
import ModalLayout from '../../../../layouts/modal/modal'
import { deleteEventsApi } from '../../../../api/requestEvents';
import { SelectPicker } from 'rsuite';
import { DataContext } from "../../../../context/userContext";
import { toast } from "react-toastify";

const DeleteEvent = (props) => {

    const { user } = useContext(DataContext);

    const [eventid, setEventid] = useState("")
    const handleChangeEventId = (e) => { setEventid(e) };

    const optionEvents = props.events?.map((event) => {
        return Object.assign({}, { key: event.eventid, label: event.eventName, value: event.eventid });
    })

    const validateData = () => {
        if (eventid === "") {
            toast.warn(`Debes ingresar el id del evento para eliminarlo.`, {
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

    const handlerCreateEvent = async () => {
        if (validateData()) {
            const data = {
                "userCedula": user.cedula,
                "eventid": eventid,
            }
            const req = await deleteEventsApi(data);
            if (req.status === 200) {
                setEventid("")
                props.handleClose()
                props.fetchData()
                toast.success(`Evento Eliminado Correctamente.`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }else{
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
        }
    }
    return (
        <>
            <ModalLayout open={props.open} handleClose={props.handleClose} title='Eliminar evento'>
                <div>
                    <p>Ingresa la información necesaria eliminar el evento.</p>
                    <SelectPicker style={{ marginTop: 10 }} data={optionEvents} searchable={true} block placeholder={"Nombre del evento"} placement="auto" onChange={handleChangeEventId} />
                    <br />
                    <button className='button__actions' onClick={() => handlerCreateEvent()}>Eliminar Evento</button>
                </div>
            </ModalLayout>
        </>
    )
}

export default DeleteEvent