import React, { useContext, useState } from 'react'
import ModalLayout from '../../../../layouts/modal/modal'
import { updateUserApi } from '../../../../api/requestUsers';
import { DataContext } from "../../../../context/userContext";
import { toast } from "react-toastify";
import { Input, InputGroup, Whisper, Tooltip, SelectPicker, Toggle } from 'rsuite';
import InfoIcon from '@rsuite/icons/legacy/Info';
import { HiOutlineIdentification, HiOutlineUserCircle, HiOutlineMinusCircle, HiHashtag, HiOutlineCake, HiOutlineLocationMarker, HiOutlineInboxIn } from "react-icons/hi";
import { optionsEconomicSector, votingBoothVpar } from '../../../../utils/constant';

const UpdateVoter = (props) => {

    const { user } = useContext(DataContext);
    const userData = props.UpdateVoterData

    const votingBoothOptions = votingBoothVpar.map((place, index) => {
        return Object.assign({}, { key: index, label: `${place?.puesto}`, value: place?.puesto, }) //(${place?.dirección})
    })
    const optionSex = [
        { key: 1, label: 'Hombre', value: '1' },
        { key: 2, label: 'Mujer', value: '2' },
        { key: 3, label: 'No identifica', value: '3' },
    ]

    const [isloading, setIsloading] = useState(false);
    const [name, setName] = useState(userData.name ? userData.name : "");
    const [surnames, setSurnames] = useState(userData.surnames ? userData.surnames : "");
    const [cedula, setCedula] = useState(userData.cedula ? userData.cedula : "");
    const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber ? userData.phoneNumber : "");
    const [address, setAddress] = useState(userData.address ? userData.address : "");
    const [sex, setSex] = useState(userData.sex ? optionSex.find((o) => o.label === userData.sex)?.value : "");
    const [age, setAge] = useState(userData.age ? userData.age : "");
    const [votingBooth, setVotingBooth] = useState(userData.votingBooth === null ? "" : userData.votingBooth);
    const [table, setTable] = useState(userData.table === null ? "" : userData.table);
    const [leaderid, setLeaderid] = useState(userData.leaderid ? userData.leaderid : "");
    const [productiveSection, setProductiveSection] = useState(userData.productiveSection ? userData.productiveSection : "");

    const [checkPlace, setCheckPlace] = useState(false);
    const [checkTable, setCheckTable] = useState(false);

    //set handlers for inputs
    const handleChangeCedula = (e) => { setCedula(e) };
    const handleChangeName = (e) => { setName(e) };
    const handleChangeSurname = (e) => { setSurnames(e) };
    const handleChangePhoneNumber = (e) => { setPhoneNumber(e) };
    const handleChangeSex = (e) => { setSex(e) };
    const handleChangeAddress = (e) => { setAddress(e) };
    const handleChangeAge = (e) => { setAge(e) };
    const handleChangeVotingBooth = (e) => { setVotingBooth(e) };
    const handleChangeTable = (e) => { setTable(e) };
    const handleChangeLeaderid = (e) => { setLeaderid(e) };
    const handleChangeSection = (e) => { setProductiveSection(e) };


    const size = 20;
    const styles = {
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
    };

    const handlerUpdateVoter = async () => {
        setIsloading(true)
        if (name === "" || surnames === "" || cedula === "" || phoneNumber === "" || address === "" || sex === "" || age === "" || leaderid === "" || productiveSection === "") {
            toast.warn(`Todos los campos marcados (*) deben estar diligenciados para efectuar una actualización.`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            setIsloading(false)
        } else {
            if (4 < cedula.length && cedula.length <= 10) {
                const updateUserBody = {
                    userCedula: user.cedula,
                    currentCedula: userData.cedula,
                    newName: name,
                    newSurname: surnames,
                    newCedula: cedula,
                    newPhoneNumber: phoneNumber,
                    newSex: sex,
                    newAddress: address,
                    newAge: age,
                    newVotingBooth: votingBooth ? votingBooth : null,
                    newTable: table ? table : null,
                    newProductiveSection: productiveSection,
                }
                const req = await updateUserApi(updateUserBody);
                if (req.status === 200) {
                    toast.success(`Usuario actualizado correctamente`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    props.handlerUpdateTable();
                    props.handleClose();
                }
            }
            setIsloading(false)
        }
    }

    return (
        <> <ModalLayout open={props.open} handleClose={props.handleClose} actionButton={true} actionCallback={handlerUpdateVoter} isloading={isloading} actionText='Actualizar votante' title='Actualizar registro de votantes'>
            <div>
                <div style={styles} >
                    <div style={styles}>
                        <InputGroup inside >
                            <InputGroup.Addon>
                                <HiOutlineUserCircle size={size} className="register__icon" />
                            </InputGroup.Addon>
                            <Input placeholder='Nombre*' value={name} onChange={handleChangeName} />
                        </InputGroup>
                    </div>
                    <div style={styles}>
                        <InputGroup inside>
                            <InputGroup.Addon>
                                <HiOutlineMinusCircle size={size} className="register__icon" />
                            </InputGroup.Addon>
                            <Input placeholder='Apellidos*' value={surnames} onChange={handleChangeSurname} />
                        </InputGroup>
                    </div>
                    <div style={styles}>
                        <InputGroup inside>
                            <InputGroup.Addon>
                                <HiOutlineIdentification size={size} className="register__icon" />
                            </InputGroup.Addon>
                            <Input type='number' placeholder='Cedula* [CC]' value={cedula} onChange={handleChangeCedula} />
                            <InputGroup.Addon>
                                <Whisper placement="right" speaker={<Tooltip> Id sin espacios o separadores especiales ,-.</Tooltip>}>
                                    <InfoIcon />
                                </Whisper>
                            </InputGroup.Addon>
                        </InputGroup>
                    </div>
                    <div style={styles}>
                        <InputGroup inside>
                            <InputGroup.Addon>
                                <HiHashtag size={size} className="register__icon" />
                            </InputGroup.Addon>
                            <Input type='number' placeholder='Tel*' value={phoneNumber} onChange={handleChangePhoneNumber} />
                        </InputGroup>
                    </div>
                    <div style={styles}>
                        <SelectPicker placeholder="Sexo*" data={optionSex} searchable={false} block value={sex} onChange={handleChangeSex} />
                    </div>
                    <div style={styles}>
                        <InputGroup inside>
                            <InputGroup.Addon>
                                <HiOutlineCake size={size} className="register__icon" />
                            </InputGroup.Addon>
                            <Input type='number' placeholder='Edad*' value={age} onChange={handleChangeAge} />
                        </InputGroup>
                    </div>
                    <div style={styles}>
                        <InputGroup inside>
                            <InputGroup.Addon>
                                <HiOutlineLocationMarker size={size} className="register__icon" />
                            </InputGroup.Addon>
                            <Input type='text' placeholder='Dirección*' value={address} onChange={handleChangeAddress} />
                        </InputGroup>
                    </div>
                    <div style={{ padding: '0.5em' }}>
                        <div style={{ textAlign: 'left', padding: '0.5em', color: 'rgba(34,36,38,.58)' }}>
                            Ingrese solo si conoce la localidad y la mesa exacta de votación.
                        </div>
                        <div className='grid__container'>
                            <Toggle style={{ marginTop: 5 }} defaultChecked={checkPlace} onChange={(e) => setCheckPlace(e)} />
                            <SelectPicker disabled={!checkPlace} placement="autoVerticalEnd" style={{ marginBottom: 10 }} placeholder="Puesto de Votación" data={votingBoothOptions} searchable={true} block value={votingBooth} onChange={handleChangeVotingBooth} />
                            <Toggle style={{ marginTop: 5 }} defaultChecked={checkTable} onChange={(e) => setCheckTable(e)} />
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <HiOutlineInboxIn size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input disabled={!checkTable} type='text' placeholder='Mesa de Votación' value={table} onChange={handleChangeTable} />
                            </InputGroup>
                        </div>
                    </div>
                    <div style={styles}>
                        <SelectPicker placeholder={"Sector Economico*"} placement="auto" data={optionsEconomicSector} block value={productiveSection} onChange={handleChangeSection} />
                    </div>

                    <div style={styles}>
                        <InputGroup inside>
                            <InputGroup.Addon>
                                <HiOutlineIdentification size={size} className="register__icon" />
                            </InputGroup.Addon>
                            <Input type='number' placeholder='Cedula del lider* [CC]' disabled={true} value={leaderid} onChange={handleChangeLeaderid} />
                        </InputGroup>
                    </div>
                </div>
            </div>
        </ModalLayout></>
    )
}

export default UpdateVoter