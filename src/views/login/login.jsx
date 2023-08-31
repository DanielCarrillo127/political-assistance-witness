import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../../api/requestUsers";
import { DataContext } from '../../context/userContext'
import "./login.css"
import { HiOutlineIdentification, HiOutlineLockOpen, HiOutlineChevronRight, HiOutlineAtSymbol } from "react-icons/hi";


// window.open(`${window.location.origin}/registerForm`, '_blank')

const Login = () => {


    const navigate = useNavigate();
    const { saveUser, logOutUser } = useContext(DataContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isErrorId, setIsErrorId] = useState(false);
    const [isErrorpass, setIsErrorpass] = useState(false);

    const handleChangeId = (e) => { setUsername(e.target.value); setIsErrorId(false) };
    const handleChangePass = (e) => { setPassword(e.target.value); setIsErrorpass(false) };

    useEffect(() => {
        logOutUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async () => {

        if (username === "" || password === "") {
            toast.warn(`Debes ingresar todos los campos para ingresar a la plataforma`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            if (username === "") { setIsErrorId(true) }
            if (password === "") { setIsErrorpass(true) }

        } else {
            if (4 < username.length && username.length <= 10) {
                const req = await loginApi(username, password);
                if (req.status === 200) {
                    saveUser(req.data.accesToken, req.data.info)
                    toast.success(`Bienvenido,`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });

                    navigate("/userDashboard");
                } else {
                    if (req.response.status === 403) {
                        toast.warn(`No Tienes acceso al portal`, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        });

                    } else if (req.response.status === 404) {
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

                    //clear inputs
                    setUsername("")
                    setPassword("")
                }
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

            }


        }

    };

    return (
        <>
            <div className="container">
                <div className="screen">
                    <div className="screen__content">
                        <div className="login">
                        <div> <HiOutlineAtSymbol size={40} /></div>
                        <h3><span>Asis~Politico</span></h3>
                            <div className="login__field">

                                <HiOutlineIdentification size={19} className="login__icon " />
                                <input type="text" className="login__input" placeholder="Cedula [cc]" value={username} onChange={handleChangeId} />
                            </div>
                            <div className="login__field">
                                <HiOutlineLockOpen className="login__icon" />
                                <input type="password" className="login__input" placeholder="Contraseña" value={password} onChange={handleChangePass} />
                            </div>
                            {isErrorId ? <>existe un error en tu id</> : <></>}
                            {isErrorpass ? <>existe un error en tu password</> : <></>}
                            <button className="button login__submit" onClick={() => handleSubmit()}>
                                <span className="button__text">Iniciar Sesión</span>
                                <HiOutlineChevronRight className="button__icon" />
                            </button>

                        </div>
                        {/* <div className="company__login">
                            <h3>Prod by</h3>
                        </div> */}
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login