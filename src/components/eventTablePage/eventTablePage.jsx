import React, { useState, useEffect, useContext } from 'react'
import './eventTablePage.css'
import TableEvents from '../eventTable/tableEvents'
import { getAllEventsApi } from '../../api/requestEvents'
import { DataContext } from '../../context/userContext'
import TableReusable from '../table/table'
import { getAllAttendanceApi } from '../../api/requestAttendance'

const EventTablePage = () => {

  const { user } = useContext(DataContext);
  const [data, setData] = useState([])
  const defaultColumns = [
    {
      key: 'eventid',
      label: 'Id Evento',
      value: 'eventid',
      sortable: true,
      flexGrow: 1,
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
      sortable: true,
      fullText: true,
      flexGrow: 2
    },
    {
      key: 'address',
      label: 'Direccion',
      value: 'address',
      fullText: true,
      sortable: true,
      flexGrow: 1
    },
    {
      key: 'dateDevelopment',
      label: 'Fecha-hora del evento',
      value: 'dateDevelopment',
      fullText: true,
      sortable: true,
      flexGrow: 2
    },
    {
      key: 'transport',
      label: 'Req Transporte',
      value: 'transport',
      fullText: true,
      sortable: true,
      width: 50
    },
    {
      key: 'refreshments',
      label: 'Req Refrigerios',
      value: 'refreshments',
      fullText: true,
      sortable: true,
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
    },

  ];

  const [attendanceData, setAttendanceData] = useState([])
  const [attendanceName, setAttendanceName] = useState("")
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
                <button className='button__actions voter__action' > Crear nuevo evento</button>
                <button className='button__actions voter__action' > Eliminar evento</button>
                <button className='button__actions voter__action' disabled> Actualizar Evento</button>
              </div>
              <div>
                <TableEvents dataKey={'eventid'} defaultColumns={defaultColumns} data={data} activeColumnSort={true} pageLimit={25} handlerNav={handlerNav} />
              </div>
            </div>
          </div>
        </div>

        {attendanceData.length > 0 ? <>
          <div className="container__component">
            <div className="container__header">
              <h2>Registro de asistencia ~{attendanceName}</h2>
              <h2 style={{ cursor: "pointer" }} onClick={() => setAttendanceData([])}>x</h2>
            </div>
            <div style={{ marginTop: "20px" }}>
              <div>
                <div className='contianer__voter__actions'>
                  <button className='button__actions voter__action'> Registrar usuario</button>
                  <button className='button__actions voter__action'> Eliminar usuario</button>
                </div>
                <div>
                  <TableReusable defaultColumns={defaultColumnsAttendance} data={attendanceData} activeColumnSort={true} pageLimit={25} />
                </div>
              </div>
            </div>
          </div>
        </> : null}
      </div>
    </div>
  )
}

export default EventTablePage