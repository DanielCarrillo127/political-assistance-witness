import React from 'react'

const FormTablePage = () => {
    return (
        <div>
            <div>
                Bienvenido, encontraras listadas las diferentes acciones asociadsas a los usuarios de la aplicacion.
                <div className="container__component">
                    <div className="container__header">
                        <h2>Sistema de planillas</h2>
                    </div>
                    <div>
                        <select id="requestOptions">
                            <option value="1">Todos los Votantes</option>
                            <option value="2">Votantes registrados por el coordinador</option>
                            <option value="2">Votantes registrados por el lider</option>
                            <option value="3">Listado total de lideres</option>
                            <option value="4">Listado de coordinadores</option>
                            <option value="5">Listado de lideres cargados por el coordinador</option>
                        </select>
                        <input placeholder='ingrese la cedula [CC]' />
                        <button>Buscar</button>

                        <div>
                            <div>
                                <button> descargar xlsx</button>
                                <div class="table-responsive">
                                    <table width="100%">
                                        <thead>

                                            <tr>
                                                <td>Cedula</td>
                                                <td>Nombre</td>
                                                <td>Apellidos</td>
                                                <td>Tel</td>
                                                <td>Direccion</td>
                                                <td>Cedula lider</td>
                                                <td>Edad</td>
                                                <td>Sex</td>
                                                <td>Puesto de votacion</td>
                                                <td>Lugar de votacion</td>
                                                <td>role</td>
                                                <td>Sector productivo</td>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Website</td>
                                                <td>Frontend</td>
                                                <td>
                                                    <span class="status purple"></span>
                                                    Review
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Website</td>
                                                <td>Frontend</td>
                                                <td>
                                                    <span class="status orange"></span>
                                                    Pending
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Website</td>
                                                <td>Frontend</td>
                                                <td>
                                                    <span class="status pink"></span>
                                                    In Progress
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Website</td>
                                                <td>Frontend</td>
                                                <td>
                                                    <span class="status purple"></span>
                                                    Review
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Website</td>
                                                <td>Frontend</td>
                                                <td>
                                                    <span class="status pink"></span>
                                                    In Progress
                                                </td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormTablePage