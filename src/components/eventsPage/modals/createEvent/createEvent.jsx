import React, { useContext, useState } from 'react'
import ModalLayout from '../../../../layouts/modal/modal'
import { createEventsApi } from '../../../../api/requestEvents';
import { Input, SelectPicker, DatePicker, InputGroup } from 'rsuite';
import { DataContext } from "../../../../context/userContext";
import { toast } from "react-toastify";

const CreateEvent = (props) => {

    const { user } = useContext(DataContext);

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [dateDevelopment, setDateDevelopment] = useState(null)
    const [timeStart, setTimeStart] = useState(null)
    const [timeEnd, setTimeEnd] = useState(null)

    const [transport, setTransport] = useState("")
    const [refreshments, setRefreshments] = useState("")

    const handleChangeName = (e) => { setName(e) };
    const handleChangeDescription = (e) => { setDescription(e) };
    const handleChangeAddress = (e) => { setAddress(e) };

    const handleChangeDateDevelopment = (e) => { setDateDevelopment(e) };
    const handleChangeTimeStart = (e) => { setTimeStart(e) };
    const handleChangeTimeEnd = (e) => { setTimeEnd(e) };

    const handleChangeTransport = (e) => { setTransport(e) };
    const handleChangeRefreshments = (e) => { setRefreshments(e) };

    const optionType = [
        { key: 1, label: 'Si', value: 'Si' },
        { key: 2, label: 'No', value: 'No' },
    ]

    const validateData = () => {

        if (name === "" || description === "" || address === "" || transport === "" || refreshments === "") {
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

        //date not empty
        if (dateDevelopment === null) {
            toast.warn(`Debes ingresar la fecha del evento.`, {
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

        //time delta validation
        if (timeEnd < timeStart) {
            toast.warn(`La hora de finalización del evento no puede ser antes que su fecha de inicio.`, {
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
            var date = `${dateDevelopment.toISOString().slice(0, 10)},${timeStart.getHours()}:${timeStart.getMinutes()}-${timeEnd.getHours()}:${timeEnd.getMinutes()}`;
            const data = {
                "userCedula": user.cedula,
                "eventName": name,
                "description": description,
                "address": address,
                "dateDevelopment": date, //"2022-11-31, 5:00-9:00pm"
                "transport": transport, //"Si"
                "refreshments": refreshments
            }
            const req = await createEventsApi(data);
            if (req.status === 201) {
                setName("")
                setDescription("")
                setAddress("")
                setDateDevelopment("")
                setTransport("")
                setRefreshments("")
                props.handleClose()
                props.fetchData()
                toast.success(`Evento Creado Correctamente.`, {
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
            <ModalLayout open={props.open} handleClose={props.handleClose} title='Crear nuevo evento'>
                <div>
                    <p>Ingresa la información necesaria para crear un nuevo evento.</p>
                    <Input style={{ marginTop: 10 }} placeholder='Nombre del evento*' value={name} onChange={handleChangeName} />
                    <Input as="textarea" rows={3} style={{ marginTop: 10 }} placeholder='Descripción*' value={description} onChange={handleChangeDescription} />
                    <Input style={{ marginTop: 10 }} placeholder='Dirección*' value={address} onChange={handleChangeAddress} />
                    <div style={{ marginTop: 10 }}>
                        <DatePicker placeholder='Fecha de desarrollo*' format="yyyy-MM-dd" block value={dateDevelopment} onChange={handleChangeDateDevelopment}
                            locale={{
                                sunday: 'Do',
                                monday: 'Lu',
                                tuesday: 'Ma',
                                wednesday: 'Mi',
                                thursday: 'Ju',
                                friday: 'Vi',
                                saturday: 'Sa',
                                ok: 'OK',
                            }}
                        />
                        <InputGroup style={{ width: '100%', marginTop: 10 }} >
                            <DatePicker format="HH:mm" block style={{ width: '100%' }}
                                value={timeStart}
                                onChange={handleChangeTimeStart}
                                hideHours={hour => hour < 8 || hour > 22}
                                hideMinutes={minute => minute % 1 !== 0}
                                locale={{
                                    hours: 'Horas',
                                    minutes: 'Minutos',
                                    ok: 'OK',
                                }}

                            />
                            <InputGroup.Addon>-</InputGroup.Addon>
                            <DatePicker format="HH:mm" block style={{ width: '100%' }}
                                value={timeEnd}
                                onChange={handleChangeTimeEnd}
                                hideHours={hour => hour < 8 || hour > 22}
                                hideMinutes={minute => minute % 1 !== 0}
                                locale={{
                                    hours: 'Horas',
                                    minutes: 'Minutos',
                                    ok: 'OK',
                                }} />
                        </InputGroup>
                    </div>
                    <SelectPicker style={{ marginTop: 10 }} data={optionType} searchable={false} block placeholder={"Requiere transporte"} placement="auto" onChange={handleChangeTransport} />
                    <SelectPicker style={{ marginTop: 5 }} data={optionType} searchable={false} block placeholder={"Requiere refrigerios"} placement="auto" onChange={handleChangeRefreshments} />
                    <br />
                    <button className='button__actions' onClick={() => handlerCreateEvent()}>Nuevo Evento</button>
                </div>
            </ModalLayout>
        </>
    )
}

export default CreateEvent