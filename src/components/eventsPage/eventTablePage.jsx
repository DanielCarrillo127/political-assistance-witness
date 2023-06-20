import React, { useState, useEffect, useContext } from 'react'
import './eventTablePage.css'
import TableEvents from './eventTable/tableEvents'
import { getAllEventsApi } from '../../api/requestEvents'
import { DataContext } from '../../context/userContext'
import TableReusable from '../table/table'
import { getAllAttendanceApi } from '../../api/requestAttendance'

import CreateEvent from './modals/createEvent/createEvent'
import DeleteEvent from './modals/deleteEvent/deleteEvent'
import CreateAttendance from './modals/registerAttendance/createAttendance'
import DeleteAttendance from './modals/deleteAttendance/deleteAttendance'

const EventTablePage = () => {

  const { user } = useContext(DataContext);
  const [data, setData] = useState([])
  const defaultColumns = [
    {
      key: 'eventid',
      label: 'Id Evento',
      value: 'eventid',
      sortable: true,
      width: 90,
      hasDetail: true,
    },
    {
      key: 'eventName',
      label: 'Nombre',
      value: 'eventName',
      sortable: true,
      fullText: true,
      flexGrow: 1
    },
    {
      key: 'description',
      label: 'Descripción',
      value: 'description',
      fullText: true,
      flexGrow: 3
    },
    {
      key: 'address',
      label: 'Direccion',
      value: 'address',
      fullText: true,
      flexGrow: 1
    },
    {
      key: 'dateDevelopment',
      label: 'Fecha-hora del evento',
      value: 'dateDevelopment',
      fullText: true,
      sortable: true,
      width: 200
    },
    {
      key: 'transport',
      label: 'Req Transporte',
      value: 'transport',
      fullText: true,
      width: 50
    },
    {
      key: 'refreshments',
      label: 'Req Refrigerios',
      value: 'refreshments',
      fullText: true,
      width: 50
    },
    {
      key: 'creatorid',
      label: 'Creador',
      value: 'creatorid',
      fullText: true,
      sortable: true,
    },
    {
      key: 'dateCreated',
      label: 'Fecha de creación',
      value: 'dateCreated',
      fullText: true,
      sortable: true,
      flexGrow: 1
    },

  ];

  const [attendanceData, setAttendanceData] = useState([])
  const [attendanceName, setAttendanceName] = useState("")
  const [eventid, setEventid] = useState("")
  const defaultColumnsAttendance = [

    {
      key: 'type',
      label: 'Tipo',
      value: 'type',
      sortable: true,
      fullText: true,
      flexGrow: 1
    },
    {
      key: 'name',
      label: 'Nombre',
      value: 'name',
      sortable: true,
      fullText: true,
      flexGrow: 1
    },
    {
      key: 'cedula',
      label: 'Cedula',
      value: 'cedula',
      fullText: true,
      sortable: true,
      flexGrow: 1
    },
    {
      key: 'phoneNumber',
      label: 'Teléfono',
      value: 'phoneNumber',
      fullText: true,
      sortable: true,
      flexGrow: 1
    },
    {
      key: 'leaderid',
      label: 'lider id',
      value: 'leaderid',
      fullText: true,
      sortable: true,
      flexGrow: 1
    },
  ];


  const [openCreateEvent, setOpenCreateEvent] = useState(false);
  const handleCloseCreateEvent = () => setOpenCreateEvent(false);

  const [openDeleteEvent, setOpenDeleteEvent] = useState(false);
  const handleCloseDeleteEvent = () => setOpenDeleteEvent(false);

  const [openCreateAtt, setOpenCreateAtt] = useState(false);
  const handleCloseCreateAtt = () => setOpenCreateAtt(false);

  const [openDeleteAtt, setOpenDeleteAtt] = useState(false);
  const handleCloseDeleteAtt = () => setOpenDeleteAtt(false);

  async function fetchData() {

    const resAllData = await getAllEventsApi(user?.cedula);
    if (resAllData?.status === 200) {
      setData(resAllData?.data?.events)
    } else {
      setData([])
    }
  }

  async function fetchAttendanceData(eventid) {
    const resAllData = await getAllAttendanceApi(user?.cedula, eventid);
    if (resAllData?.status === 200) {
      //manage data for new attendace
      const convertData = resAllData?.data?.attendance.map((user) => {
        return Object.assign({}, { name: user.attendant?.name + user.attendant?.surnames, cedula: user.attendant?.cedula, phoneNumber: user.attendant?.phoneNumber, leaderid: user.attendant?.leaderid, type: user.type === "NEW" ? "Usuario nuevo" : "Usuario registrado" });
      })
      setAttendanceData(convertData)
    } else {
      setAttendanceData([
      ])
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handlerNav = (eventid, name) => {
    if (eventid) {
      fetchAttendanceData(eventid)
      setAttendanceName(name)
      setEventid(eventid)
    }
  }

  return (
    <div>
      <div>
        <p style={{ padding: '8px' }}>Bienvenido, encontraras listadas las diferentes eventos registrados</p>
        <div className="container__component">
          <div className="container__header">
            <h2>Eventos registrados</h2>
          </div>
          <div style={{ marginTop: "20px" }}>
            <div>
              <div className='contianer__voter__actions'>
                <button className='button__actions voter__action' onClick={() => setOpenCreateEvent(true)} > Crear nuevo evento</button>
                <button className='button__actions voter__action' onClick={() => setOpenDeleteEvent(true)} > Eliminar evento</button>
                <button className='button__actions voter__action' disabled> Actualizar Evento</button>
              </div>
              <div>
                <TableEvents dataKey={'eventid'} defaultColumns={defaultColumns} data={data} activeColumnSort={true} pageLimit={25} handlerNav={handlerNav} />
              </div>
            </div>
          </div>
        </div>

        {attendanceName !== "" ? <>
          <div className="container__component">
            <div className="container__header">
              <h2>Registro de asistencia ~{attendanceName}</h2>
              <h2 style={{ cursor: "pointer" }} onClick={() => setAttendanceData([])}>x</h2>
            </div>
            <div style={{ marginTop: "20px" }}>
              <div>
                <div className='contianer__voter__actions'>
                  <button className='button__actions voter__action' onClick={() => setOpenCreateAtt(true)}> Registrar usuario</button>
                  <button className='button__actions voter__action' onClick={() => setOpenDeleteAtt(true)}> Eliminar usuario</button>
                </div>
                <div>
                  <TableReusable defaultColumns={defaultColumnsAttendance} data={attendanceData} activeColumnSort={true} pageLimit={25} />
                </div>
              </div>
            </div>
          </div>
        </> : null}
      </div>
      <CreateEvent open={openCreateEvent} handleClose={handleCloseCreateEvent} fetchData={fetchData} />
      <DeleteEvent open={openDeleteEvent} handleClose={handleCloseDeleteEvent} fetchData={fetchData} events={data} />
      <CreateAttendance open={openCreateAtt} handleClose={handleCloseCreateAtt} fetchData={() => fetchAttendanceData(eventid)} eventid={eventid} />
      <DeleteAttendance open={openDeleteAtt} handleClose={handleCloseDeleteAtt} fetchData={() => fetchAttendanceData(eventid)} eventid={eventid} />
    </div>
  )
}

export default EventTablePage