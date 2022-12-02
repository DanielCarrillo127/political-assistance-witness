// import { useState } from 'react'

// import { optionsEconomicSector } from '../../utils/constant';
// import { toast } from "react-toastify";
// import { registerApi } from '../../api/request';


const RegisterForm = () => {

    // const [isloading, setIsloading] = useState(false);
    // const [name, setName] = useState("");
    // const [surnames, setSurnames] = useState("");
    // const [cedula, setCedula] = useState("");
    // const [phoneNumber, setPhoneNumber] = useState("");
    // const [address, setAddress] = useState("");
    // const [sex, setSex] = useState("");
    // const [age, setAge] = useState("");
    // const [votingBooth, setVotingBooth] = useState("");
    // const [table, setTable] = useState("");
    // const [leaderid, setLeaderid] = useState("");
    // const [productiveSection, setProductiveSection] = useState("");

    // const [checkPlace, setCheckPlace] = useState(false);
    // const [checkTable, setCheckTable] = useState(false);
    // //set handlers for inputs
    // const handleChangeCedula = (e) => { setCedula(e.target.value) };
    // const handleChangeName = (e) => { setName(e.target.value) };
    // const handleChangeSurname = (e) => { setSurnames(e.target.value) };
    // const handleChangePhoneNumber = (e) => { setPhoneNumber(e.target.value) };
    // const handleChangeSex = (e, { value }) => { setSex(value) };
    // const handleChangeAddress = (e) => { setAddress(e.target.value) };
    // const handleChangeAge = (e) => { setAge(e.target.value) };
    // const handleChangeVotingBooth = (e) => { setVotingBooth(e.target.value) };
    // const handleChangeTable = (e) => { setTable(e.target.value) };
    // const handleChangeLeaderid = (e) => { setLeaderid(e.target.value) };
    // const handleChangeSection = (e, { value }) => { setProductiveSection(value) };

    // const options = [
    //     { key: 1, text: 'Hombre', value: '1' },
    //     { key: 2, text: 'Mujer', value: '2' },
    //     { key: 3, text: 'Prefiero no indicarlo', value: '3' },
    // ]


    // const handleSubmit = async () => {
    //     setIsloading(true)
    //     if (name === "" || surnames === "" || cedula === "" || phoneNumber === "" || address === "" || sex === "" || age === "" || leaderid === "") {
    //         toast.warn(`Debes ingresar todos los campos marcados (*) para realizar el registro`, {
    //             position: "top-right",
    //             autoClose: 3000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: false,
    //             draggable: true,
    //             progress: undefined,
    //         });
    //         setIsloading(false)
    //     } else {
    //         if (4 < cedula.length && cedula.length <= 10) {
    //             const newUser = {
    //                 name: name,
    //                 surnames: surnames,
    //                 cedula: cedula,
    //                 phoneNumber: phoneNumber,
    //                 sex: sex,
    //                 address: address,
    //                 age: age,
    //                 votingBooth: votingBooth ? votingBooth : null,
    //                 table: table ? table : null,
    //                 leaderid: leaderid,
    //                 productiveSection: productiveSection ? productiveSection : "No identifica",
    //             }
    //             const req = await registerApi(newUser);
    //             if (req.status === 201) {
    //                 toast.success(`Usuario Registrado Correctamente`, {
    //                     position: "top-right",
    //                     autoClose: 3000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: false,
    //                     draggable: true,
    //                     progress: undefined,
    //                 });
    //                 setIsloading(false)
    //             } else {
    //                 if (req.response.status === 208) {
    //                     toast.warn(`El usuario ya se encuentra registrado`, {
    //                         position: "top-right",
    //                         autoClose: 3000,
    //                         hideProgressBar: false,
    //                         closeOnClick: true,
    //                         pauseOnHover: false,
    //                         draggable: true,
    //                         progress: undefined,
    //                     });
    //                 }
    //                 setIsloading(false)
                    
    //             }

    //                 //clear inputs
    //                 setName("")
    //                 setSurnames("")
    //                 setCedula("")
    //                 setPhoneNumber("")
    //                 setSex("")
    //                 setAge("")
    //                 setAddress("")
    //                 setVotingBooth("")
    //                 setTable("")
    //                 setLeaderid("")
    //                 setProductiveSection("")
    //         } else {
    //             toast.warn(`Ingrese una Cedula Valida`, {
    //                 position: "top-right",
    //                 autoClose: 3000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: false,
    //                 draggable: true,
    //                 progress: undefined,
    //             });
    //             setIsloading(false)
    //         }

    //     };
    // }

    return (
        <>
            {/* <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 500 }}>
                    <Header as='h2' textAlign='center'>
                        Registro En Planilla
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder='Nombre*' value={name} onChange={handleChangeName} />
                            <Form.Input fluid icon='circle' iconPosition='left' placeholder='Apellidos*' value={surnames} onChange={handleChangeSurname} />
                            <Form.Input type='number' fluid icon='id card' iconPosition='left' placeholder='Cedula* [CC]' value={cedula} onChange={handleChangeCedula} />
                            <Form.Input type='number' fluid icon='hashtag' iconPosition='left' placeholder='Tel*' value={phoneNumber} onChange={handleChangePhoneNumber} />
                            <div style={{ paddingBottom: '1em' }}>
                                <Dropdown fluid clearable placeholder='Sexo*' options={options} selection value={sex} onChange={handleChangeSex} />
                            </div>
                            <Form.Input type='number' min="18" max="75" fluid icon='id card outline' iconPosition='left' placeholder='Edad*' value={age} onChange={handleChangeAge} />
                            <Form.Input fluid icon='map marker alternate' iconPosition='left' placeholder='Dirección*' value={address} onChange={handleChangeAddress} />
                            <div style={{ textAlign: 'left', fontWeight: 'bold', color: 'rgba(34,36,38,.58)' }}>
                                Ingrese solo si conoce la localidad y la mesa exacta de votación.
                            </div>

                            <div style={{ padding: '1em' }}>
                                <Grid>
                                    <Grid.Row >
                                        <Grid.Column width={2} verticalAlign='middle' >
                                            <Checkbox toggle onChange={(e, data) => setCheckPlace(data.checked)} checked={checkPlace} />
                                        </Grid.Column>
                                        <Grid.Column width={14}>
                                            <Form.Input disabled={!checkPlace} type='text' icon='zip' iconPosition='left' placeholder='Puesto de Votación' value={votingBooth} onChange={handleChangeVotingBooth} />
                                        </Grid.Column>
                                    </Grid.Row>

                                    <Grid.Row>
                                        <Grid.Column width={2} verticalAlign='middle' >
                                            <Checkbox toggle onChange={(e, data) => setCheckTable(data.checked)} checked={checkTable} />
                                        </Grid.Column>
                                        <Grid.Column width={14}>
                                            <Form.Input disabled={!checkTable} type='text' icon='clone' iconPosition='left' placeholder='Mesa de Votación' value={table} onChange={handleChangeTable} />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </div>
                            <div style={{ paddingBottom: '1em' }}>
                                <Dropdown fluid clearable placeholder='Sector Economico' options={optionsEconomicSector} selection value={productiveSection} onChange={handleChangeSection} />
                            </div>
                            <Form.Input type='number' fluid icon='id card outline' iconPosition='left' placeholder='Cedula del lider* [CC]' value={leaderid} onChange={handleChangeLeaderid} />
                            <Button primary fluid size='large' loading={isloading} onClick={() => handleSubmit()} >
                                Registrar Votante
                            </Button>

                        </Segment>

                    </Form>
                </Grid.Column>
            </Grid> */}
        </>
    )
}



export default RegisterForm