import React, { useContext, useEffect, useState } from 'react'
import { Input, SelectPicker } from 'rsuite';
import { getAllUsersApi, getAllLeadersApi, getAllVotersByLeaderApi, getAllVotersByCoordinatorApi, getAllCoordinatorsApi, getAllLeadersByCoordinatorsApi } from '../../api/requestUsers';
import TableReusable from '../table/table'
import { DataContext } from "../../context/userContext";
import { toast } from "react-toastify";
import DeleteVoter from './modals/deleteVoter/deleteVoter';
import SetRoleVoter from './modals/setRoteVoter/setRoleVoter';
import UpdateVoter from './modals/updateVoter/updateVoter';
import './formTablePage.css'

//to do; STATE to determinate if the user can set roles, and modify list of search
const FormTablePage = () => {

    const { user, levelRestrictions } = useContext(DataContext);
    const Restrictions = levelRestrictions

    const [data, setData] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [idSearch, setIdSearch] = useState("")
    const [isActiveInput, setIsActiveInput] = useState(true)

    const handleChangeSearch = (e) => { setSearchValue(e); if (e === '1' || e === '4' || e === '5') { setIsActiveInput(false) } else { setIsActiveInput(true) } }
    const handleChangeIdSearch = (e) => { setIdSearch(e) }

    const [disabledItemsValues, setDisabledItemsValues] = useState([])

    useEffect(() => {
        if (Restrictions === 2) {//coordinador
            setDisabledItemsValues(['1', '4', '5'])
        } else if (Restrictions === 3) {//leader
            setDisabledItemsValues(['1', '2', '4', '5', '6'])
        } else {//super admin or candidate
            setDisabledItemsValues([])
        }
    }, [Restrictions])


    const defaultColumns = [
        {
            key: 'cedula',
            label: 'Cedula',
            value: 'cedula',
            sortable: true,
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
            key: 'surnames',
            label: 'Apellidos',
            value: 'surnames',
            sortable: true,
            fullText: true,
            flexGrow: 1
        },
        {
            key: 'phoneNumber',
            label: 'Tel',
            value: 'phoneNumber',
            fullText: true,
            sortable: true,
            flexGrow: 1
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
            key: 'leaderid',
            label: 'Cedula lider',
            value: 'leaderid',
            fullText: true,
            sortable: true,
            flexGrow: 1
        },
        {
            key: 'age',
            label: 'Edad',
            value: 'age',
            fullText: true,
            sortable: true,
            width: 65
        },
        {
            key: 'sex',
            label: 'Sexo',
            value: 'sex',
            fullText: true,
            sortable: true,
            width: 70
        },
        {
            key: 'table',
            label: 'Mesa/Puesto de votacion',
            value: 'table',
            fullText: true,
            sortable: true,
            width: 60
        },
        {
            key: 'votingBooth',
            label: 'Lugar de votacion',
            value: 'votingBooth',
            fullText: true,
            sortable: true,
            flexGrow: 1
        },
        {
            key: 'role',
            label: 'Role',
            value: 'role',
            fullText: true,
            sortable: true,
            flexGrow: 1
        },
        {
            key: 'productiveSection',
            label: 'Sector productivo',
            value: 'productiveSection',
            fullText: true,
            sortable: true,
            flexGrow: 1
        },
    ];

    const optionSearch = [
        { key: 1, label: 'Todos los Votantes', value: '1' },
        { key: 2, label: 'Votantes registrados por el coordinador', value: '2' },
        { key: 3, label: 'Votantes registrados por el lider', value: '3' },
        { key: 4, label: 'Listado total de lideres', value: '4' },
        { key: 5, label: 'Listado de coordinadores', value: '5' },
        { key: 6, label: 'Listado de lideres registrados por el coordinador', value: '6' },
    ]

    const handlerSearch = async () => {
        switch (searchValue) {
            case '1':
                const req = await getAllUsersApi(user.cedula); //user.cedula
                if (req.status === 200) {
                    const newLabelsData = changeLabels(req.data.result)
                    setData(newLabelsData)
                }
                break;
            case '2':
                if (idSearch !== "") {
                    const reqByCoor = await getAllVotersByCoordinatorApi(user.cedula, idSearch);
                    // console.log(reqByCoor)
                    if (reqByCoor.status === 200) {
                        const newLabelsData = changeLabels(reqByCoor.data.result)
                        setData(newLabelsData)
                        // setIdSearch("")
                    }else if(reqByCoor.response.status === 403){
                        toast.warn(`La cédula ingresada no corresponde a un coordinador.`, {
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
                    toast.warn(`Debes ingresar una cedula valida para realizar la busqueda.`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
                break;
            case '3':
                if (idSearch !== "") {
                    const reqByLeader = await getAllVotersByLeaderApi(user.cedula, idSearch);
                    if (reqByLeader.status === 200) {
                        const newLabelsData = changeLabels(reqByLeader.data.result)
                        setData(newLabelsData)
                        // setIdSearch("")
                    }
                } else {
                    toast.warn(`Debes ingresar una cedula valida para realizar la busqueda.`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
                break;

            case '4':
                const reqAllLeader = await getAllLeadersApi(user.cedula);
                if (reqAllLeader.status === 200) {
                    const newLabelsData = changeLabels(reqAllLeader.data.result)
                    setData(newLabelsData)
                    // setIdSearch("")
                }
                break;
            case '5':
                const reqAllCoor = await getAllCoordinatorsApi(user.cedula);
                if (reqAllCoor.status === 200) {
                    const newLabelsData = changeLabels(reqAllCoor.data.result)
                    setData(newLabelsData)
                    // setIdSearch("")
                }
                break;
            case '6':
                if (idSearch !== "") {
                    const reqLeadersByCoor = await getAllLeadersByCoordinatorsApi(user.cedula, idSearch);
                    if (reqLeadersByCoor.status === 200) {
                        const newLabelsData = changeLabels(reqLeadersByCoor.data.result)
                        setData(newLabelsData)
                        // setIdSearch("")
                    }
                } else {
                    toast.warn(`Debes ingresar una cedula valida para realizar la busqueda.`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                }
                break;
            default:

                break;
        }
    }

    const changeLabels = (data) => {
        data.forEach(element => {
            if (element.sex === "MALE") {
                element.sex = "Hombre"
            } else if (element.sex === "WOMEN") {
                element.sex = "Mujer"
            } else {
                element.sex = "No identifica"
            }

            if (element.role === "COORDINATOR") {
                element.role = "Coordinador"
            } else if (element.role === "VOTER") {
                element.role = "Votante"
            } else if (element.role === "LEADER") {
                element.role = "Lider"
            }

            if (element.productiveSection === "other") {
                element.productiveSection = "Otros"
            }
        });
        return data
    }

    //handlers to open the different modals
    const [openDeleteV, setOpenDeleteV] = useState(false);
    const handleCloseDeleteV = () => setOpenDeleteV(false);

    const [openSetRole, setOpenSetRole] = useState(false);
    const handleCloseSetRole = () => setOpenSetRole(false);

    const [openUpdateVoter, setOpenUpdateVoter] = useState(false);
    const [UpdateVoterData, setUpdateVoterData] = useState({});
    const handleCloseUpdateVoter = () => setOpenUpdateVoter(false);


    const handlerOpenEdit = (data) => {
        setUpdateVoterData(data)
        // console.log(data)
        setOpenUpdateVoter(true)
    }
    const handlerUpdateTable = () => {
        handlerSearch()
    }

    return (
        <div>
            <div>
                <p style={{ padding: '8px' }}>Bienvenido, encontraras listadas las diferentes acciones asociadas a los usuarios de la aplicacion.</p>
                <div className="container__component">
                    <div className="container__header">
                        <h2>Sistema de planillas</h2>
                    </div>
                    <div>
                        <div className='contianer_actions'>
                            <SelectPicker disabledItemValues={disabledItemsValues} data={optionSearch} onChange={handleChangeSearch} placeholder='Seleccione el tipo de busqueda' />
                            <Input type='number' placeholder='ingrese la cedula [CC]' disabled={!isActiveInput} value={idSearch} onChange={handleChangeIdSearch} />
                            <button className='button__actions' onClick={() => handlerSearch()}>Buscar</button>
                        </div>
                        <div>
                            <div className='contianer__voter__actions'>
                                <button className='button__actions voter__action' onClick={() => setOpenSetRole(true)} > Administrar Roles</button>
                                <button className='button__actions voter__action' onClick={() => setOpenDeleteV(true)} > Eliminar Votante</button>
                                {/* <button className='button__actions voter__action' onClick={() => setOpenUpdateVoter(true)} > Actualizar Votante</button> */}
                            </div>
                            <div>
                                <TableReusable defaultColumns={defaultColumns} data={data} activeColumnSort={true} pageLimit={25} hasEdit={true} callbackEdit={handlerOpenEdit} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteVoter open={openDeleteV} handleClose={handleCloseDeleteV} handlerUpdateTable={handlerUpdateTable} />
            <SetRoleVoter open={openSetRole} handleClose={handleCloseSetRole} handlerUpdateTable={handlerUpdateTable} />
            {openUpdateVoter && <UpdateVoter open={openUpdateVoter} handleClose={handleCloseUpdateVoter} UpdateVoterData={UpdateVoterData} handlerUpdateTable={handlerUpdateTable} />}
        </div>
    )
}

export default FormTablePage