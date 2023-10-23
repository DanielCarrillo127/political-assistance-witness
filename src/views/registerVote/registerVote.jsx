import { useState } from 'react'
import { votingBoothPaz, candidatesInfo } from '../../utils/constant';
// eslint-disable-next-line
import { toast } from "react-toastify";
import { registerVotesApi } from '../../api/requestRegisterVote';
import { Input, InputGroup, Whisper, Tooltip, SelectPicker, Button, List, FlexboxGrid } from 'rsuite';
import InfoIcon from '@rsuite/icons/legacy/Info';
import ImageIcon from '@rsuite/icons/legacy/Image';
import { HiOutlineIdentification, HiOutlineInboxIn, HiOutlineFlag, HiOutlineMinusCircle, HiOutlineXCircle, HiArrowSmLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { imageDb } from '../../api/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import './register.css'


const RegisterVote = () => {

    const navigate = useNavigate();

    const votingBoothOptions = votingBoothPaz.map((place, index) => {
        return Object.assign({}, { key: index, label: `${place?.puesto}`, value: place?.puesto, mesas: place?.mesas, }) //(${place?.dirección})
    })

    const candidatesOptions = candidatesInfo.map((candidate, index) => {
        return Object.assign({}, { index: candidate.id, name: `${candidate?.name}`, politicalParty: `${candidate?.politicalParty}`, isPrincipal: candidate?.isPrincipal, votes: undefined })
    })


    const [isloading, setIsloading] = useState(false);
    const [cedula, setCedula] = useState("");
    const [votingBooth, setVotingBooth] = useState("");
    const [table, setTable] = useState("");
    const [whiteVotes, setwhiteVotes] = useState("");
    const [nullVotes, setnullVotes] = useState("");
    const [unmarkedVotes, setUnmarkedVotes] = useState("");
    const [votes, setVotes] = useState(candidatesOptions ? candidatesOptions : []);

    const [file, setFile] = useState(null);
    const [responseMessage, setResponseMessage] = useState({
        message: "",
        type: ""
    });

    //set handlers for inputs
    const handleChangeCedula = (e) => { setCedula(e) };
    const handleChangeVotingBooth = (e) => { setVotingBooth(e) };
    const handleChangeTable = (e) => { setTable(e) };
    const handleChangeWhiteVotes = (e) => { setwhiteVotes(e) };
    const handleChangeNullVotes = (e) => { setnullVotes(e) };
    const handleChangeUnmarkedVotes = (e) => { setUnmarkedVotes(e) };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        var output = document.getElementById('output');
        output.src = URL.createObjectURL(e.target.files[0]);
        output.onload = function () {
            URL.revokeObjectURL(output.src) // free memory
        }
        setFile(selectedFile);
    };

    const handleChangeVotes = (e, index) => {
        if (votes) {
            const votesAux = [...votes];
            votesAux[index].votes = e;
            setVotes(votesAux);
        }
    }

    const handleSubmit = async () => {
        setIsloading(true)
        setResponseMessage({
            message: "",
            type: ""
        })
        if (cedula === "" || votingBooth === "" || table === "" || whiteVotes === "" || nullVotes === "" || file === null || unmarkedVotes === "") {
            // toast.warn(`Debes ingresar todos los campos marcados (*) para realizar el registro`, {
            //     position: "top-right",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: false,
            //     draggable: true,
            //     progress: undefined,
            // });
            setResponseMessage({
                message: "Debes ingresar todos los campos marcados (*) para realizar el registro",
                type: "warning"
            })
            setIsloading(false)
        } else {
            if (6 < cedula.length && cedula.length <= 10) {

                let url
                try {
                    const storageRef = ref(imageDb, `/${cedula}-${votingBooth}-${table}`);
                    await uploadBytes(storageRef, file);
                    url = await getDownloadURL(storageRef);
                } catch (error) {
                    console.log(error);
                    return null
                }
                const objVotes = Object.assign({}, votes);
                const newRegister = {
                    cedula: cedula,
                    votingBooth: votingBooth,
                    table: table,
                    votersData: {
                        ...objVotes,
                        whiteVotes: whiteVotes,
                        nullVotes: nullVotes,
                        unmarkedVotes: unmarkedVotes
                    },
                    img: url
                }
                const req = await registerVotesApi(newRegister);
                if (req.status === 201) {
                    // toast.success(`Registrado creado correctamente`, {
                    //     position: "top-right",
                    //     autoClose: 3000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: false,
                    //     draggable: true,
                    //     progress: undefined,
                    // });
                    setResponseMessage({
                        message: `Registrado creado correctamente`,
                        type: "success"
                    })

                } else {
                    if (req.status === 208) {
                        // toast.warn(`El testigo ingresado no existe`, {
                        //     position: "top-right",
                        //     autoClose: 3000,
                        //     hideProgressBar: false,
                        //     closeOnClick: true,
                        //     pauseOnHover: false,
                        //     draggable: true,
                        //     progress: undefined,
                        // });
                        setResponseMessage({
                            message: `El testigo ingresado no existe`,
                            type: "warning"
                        })

                    } else if (req.response.status === 400) {
                        // toast.warn(`La tabla o mesa de votación no coinciden con la del testigo`, {
                        //     position: "top-right",
                        //     autoClose: 3000,
                        //     hideProgressBar: false,
                        //     closeOnClick: true,
                        //     pauseOnHover: false,
                        //     draggable: true,
                        //     progress: undefined,
                        // });
                        setResponseMessage({
                            message: `La tabla o mesa de votación no coinciden con la del testigo`,
                            type: "warning"
                        })
                    }
                }
                // //clear inputs
                // setCedula("")
                // setVotingBooth("")
                // setTable("")
                // setnullVotes("")
                // setwhiteVotes("")
                // setFile(null)
                // setVotes(candidatesOptions ? candidatesOptions : [])
                setIsloading(false)
            } else {
                // toast.warn(`Ingrese una Cedula Valida`, {
                //     position: "top-right",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: false,
                //     draggable: true,
                //     progress: undefined,
                // });
                setResponseMessage({
                    message: `Ingrese una Cedula Valida`,
                    type: "warning"
                })
                
                setIsloading(false)
            }

        };
    }

    return (
        <>
            <div className='container'>
                <div className='container__component' style={{ width: 450, margin: '40px 20px' }}>
                    <div>
                        <div className='back__button' onClick={() => navigate('/')} style={{ display: 'flex', justifyContent: 'start', cursor: 'pointer' }}>
                            <HiArrowSmLeft size={size} />
                            <p>Volver</p>
                        </div>
                        <h4 className='form__title'>
                            Registro de Votos
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
                            <List bordered hover>
                                {votes.map((item, index) => (
                                    <List.Item key={item['index']} index={index + 1}>
                                        <FlexboxGrid style={{ justifyContent: "space-between" }}>
                                            {/*icon*/}
                                            <FlexboxGrid.Item colspan={2} style={styleCenter}>
                                                <ImageIcon style={{ color: 'darkgrey', fontSize: '1.5em' }} />,
                                            </FlexboxGrid.Item>
                                            {/*base info*/}
                                            <FlexboxGrid.Item
                                                style={{
                                                    ...styleCenter,
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    // flexWrap: 'wrap',
                                                }}
                                            >
                                                <div style={titleStyle}>{item['name']}</div>
                                                <div style={slimText}>
                                                    <div>{item['politicalParty']}</div>
                                                </div>
                                            </FlexboxGrid.Item>
                                            <FlexboxGrid.Item colspan={6} style={{
                                                display: 'flex',
                                                justifyContent: 'end',
                                                alignItems: 'center',
                                                height: '60px'
                                            }}>
                                                <Input type='number' placeholder='Votos*' value={item['votes']} onChange={(e) => handleChangeVotes(e, index)} />
                                            </FlexboxGrid.Item>
                                        </FlexboxGrid>
                                    </List.Item>
                                ))}
                            </List>
                        </div>
                        <div style={styles}>
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <HiOutlineFlag size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input type='number' placeholder='Votos en blanco*' value={whiteVotes} onChange={handleChangeWhiteVotes} />
                            </InputGroup>
                        </div>
                        <div style={styles}>
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <HiOutlineMinusCircle size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input type='number' placeholder='Votos nulos*' value={nullVotes} onChange={handleChangeNullVotes} />
                            </InputGroup>
                        </div>
                        <div style={styles}>
                            <InputGroup inside>
                                <InputGroup.Addon>
                                    <HiOutlineXCircle size={size} className="register__icon" />
                                </InputGroup.Addon>
                                <Input type='number' placeholder='No marcados*' value={unmarkedVotes} onChange={handleChangeUnmarkedVotes} />
                            </InputGroup>
                        </div>
                        <div style={styles}>
                            <div style={{ textAlign: 'left', paddingBottom: '0.5em', paddingTop: '0.5em', color: 'rgba(34,36,38,.58)' }}>
                                Agrega la evidencia fotográfica*
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <input  accept=".png, .jpg, .jpeg" type="file" name="file-input" id="file-input" className="inputfile inputfile-border" onChange={handleFileChange} />
                                <label for="file-input">
                                    <span class="iborrainputfile">Adjuntar evidencia</span>
                                </label>
                                <img id="output" src="" className={file === null && 'hidden'} alt="Uploaded file" width="100"></img>
                            </div>
                        </div>
                        <Button appearance='primary' block loading={isloading} onClick={() => handleSubmit()} >
                            Registrar Votos
                        </Button>
                        {responseMessage?.message !== "" && <p style={responseMessage?.type === "success" ? { color: "green", marginTop: 10 } : { color: "red", marginTop: 10 }}>{responseMessage.message}</p>}
                    </div>
                </div>
            </div>
        </>
    )
}



export default RegisterVote

const size = 20;
const styles = {
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
};

const styleCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60px'
};

const slimText = {
    fontSize: '0.966em',
    color: '#97969B',
    fontWeight: 'lighter',
    paddingBottom: 5
};

const titleStyle = {
    paddingBottom: 5,
    whiteSpace: 'nowrap',
    fontWeight: 500
};
