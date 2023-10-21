import { useState, useEffect } from 'react'
import { votingBoothPaz } from '../../utils/constant';
import { toast } from "react-toastify";
import { registerCounterVotesApi } from '../../api/requestRegisterVote';
import { Input, InputGroup, Whisper, Tooltip, SelectPicker, Button } from 'rsuite';
import InfoIcon from '@rsuite/icons/legacy/Info';
import { HiOutlineIdentification, HiOutlineInboxIn, HiOutlinePlusCircle, HiArrowSmLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import './register.css'


const RegisterCounter = () => {

    const navigate = useNavigate();

    const votingBoothOptions = votingBoothPaz.map((place, index) => {
        return Object.assign({}, { key: index, label: `${place?.puesto}`, value: place?.puesto, mesas: place?.mesas, }) //(${place?.dirección})
    })

    const [isloading, setIsloading] = useState(false);

    const [cedula, setCedula] = useState("");
    const [votingBooth, setVotingBooth] = useState("");
    const [table, setTable] = useState("");
    const [countAt12, setCountAt12] = useState("");
    const [countAt4, setCountAt4] = useState("");



    //set handlers for inputs
    const handleChangeCedula = (e) => { setCedula(e) };
    const handleChangeVotingBooth = (e) => { setVotingBooth(e) };
    const handleChangeTable = (e) => { setTable(e) };
    const handleChangeCountAt12 = (e) => { setCountAt12(e) };
    const handleChangeCountAt4 = (e) => { setCountAt4(e) };

    const [isTimeWithinRange12, setIsTimeWithinRange12] = useState(false);
    const [isTimeWithinRange16, setIsTimeWithinRange16] = useState(false);

    useEffect(() => {

        function isCurrentTimeBetween12And14() {
            const now = new Date();
            const noon = new Date();
            noon.setHours(12, 0, 0, 0);
            const threeThirtyPM = new Date();
            threeThirtyPM.setHours(14, 0, 0, 0);
            return now >= noon && now <= threeThirtyPM;
        }
        function isCurrentTimeBetween16And17() {
            const now = new Date();
            const noon = new Date();
            noon.setHours(16, 0, 0, 0);
            const threeThirtyPM = new Date();
            threeThirtyPM.setHours(17, 0, 0, 0);
            return now >= noon && now <= threeThirtyPM;
        }

        function updateValidationStatus() {
            setIsTimeWithinRange12(isCurrentTimeBetween12And14());
            setIsTimeWithinRange16(isCurrentTimeBetween16And17());

        }

        updateValidationStatus();
        const intervalId = setInterval(updateValidationStatus, 60000); // Check every minute

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const handleSubmit = async () => {
        setIsloading(true)
        if (cedula === "" || votingBooth === "" || table === "") {
            toast.warn(`Debes ingresar todos los campos marcados (*) para realizar el registro`, {
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

                const newRegister = {
                    cedula: cedula,
                    votingBooth: votingBooth,
                    table: table,
                    votesAt12: isTimeWithinRange12 ? countAt12 : "",
                    votesAt4: isTimeWithinRange16 ? countAt4 : ""
                }
                const req = await registerCounterVotesApi(newRegister);
                if (req.status === 201) {
                    toast.success(`Registrado creado correctamente`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });

                } else {

                    if (req.status === 208) {
                        toast.warn(`El testigo ingresado no existe`, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        });
                    } else if (req.response.status === 400) {
                        toast.warn(`La tabla o mesa de votación no coinciden con la del testigo`, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    setIsloading(false)
                }
                setIsloading(false)
            } else {
                toast.warn(`Ingrese una Cedula Valida`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setIsloading(false)
            }

        };
    }

    return (
        <>
            <div className='container'>
                <div className='container__component' style={{ width: 450 }}>
                    <div>
                        <div className='back__button' onClick={() => navigate('/')} style={{ display: 'flex', justifyContent: 'start', cursor: 'pointer' }}>
                            <HiArrowSmLeft size={size} />
                            <p>Volver</p>
                        </div>
                        <h4 className='form__title' style={{ padding: "10px 0px 15px 0px" }}>
                            Registro parcial {isTimeWithinRange12 ? "[12:00 PM]" : isTimeWithinRange16 ? "[04:00 PM]" : <p style={{ textTransform: "uppercase", fontWeight: 700, marginLeft: 7 }}>"cerrado"</p>}
                        </h4>
                    </div>
                    <div style={styles} >
                        <div style={styles}>
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <HiOutlineIdentification size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input type='number' placeholder='Cedula del testigo* [CC]' value={cedula} onChange={handleChangeCedula} />
                                <InputGroup.Addon>
                                    <Whisper placement="right" speaker={<Tooltip> cedula sin espacios o separadores especiales ,-.</Tooltip>}>
                                        <InfoIcon />
                                    </Whisper>
                                </InputGroup.Addon>
                            </InputGroup>
                        </div>
                        <div style={styles}>
                            <SelectPicker placement="autoVerticalEnd" style={{ marginBottom: 10 }} placeholder="Puesto de Votación*" data={votingBoothOptions} searchable={true} block value={votingBooth} onChange={handleChangeVotingBooth} />
                        </div>
                        <div style={styles}>
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <HiOutlineInboxIn size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input type='number' placeholder='Mesa de Votación*' value={table} onChange={handleChangeTable} />
                            </InputGroup>
                        </div>


                        <div style={styles}>
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <HiOutlinePlusCircle size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input disabled={!isTimeWithinRange12} type='number' placeholder='Votos contabilizados a las 12:00am*' value={countAt12} onChange={handleChangeCountAt12} />
                            </InputGroup>
                        </div>
                        <div style={styles}>
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <HiOutlinePlusCircle size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input disabled={!isTimeWithinRange16} type='number' placeholder='Votos contabilizados a las 04:00pm*' value={countAt4} onChange={handleChangeCountAt4} />
                            </InputGroup>
                        </div>

                        <Button appearance='primary' block loading={isloading} onClick={() => handleSubmit()} >
                            Registrar Conteo parcial
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}



export default RegisterCounter

const size = 20;
const styles = {
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
};
