import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi } from "../../api/request";
import { DataContext } from '../../context/userContext'
import "./login.css"
import { HiOutlineIdentification, HiOutlineLockOpen, HiOutlineChevronRight } from "react-icons/hi";



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
            <div class="container">
                <div class="screen">
                    <div class="screen__content">
                        <div class="login">
                            <div class="login__field">

                                <HiOutlineIdentification size={19} class="login__icon fas fa-user" />
                                <input type="text" class="login__input" placeholder="Cedula [cc]" value={username} onChange={handleChangeId} />
                            </div>
                            <div class="login__field">
                                <HiOutlineLockOpen class="login__icon fas fa-lock" />
                                <input type="password" class="login__input" placeholder="Contraseña" value={password} onChange={handleChangePass} />
                            </div>
                            <button class="button login__submit" onClick={() => handleSubmit()}>
                                <span class="button__text">Iniciar Sesión</span>
                                <HiOutlineChevronRight class="button__icon fas fa-chevron-right" />
                            </button>
                        </div>
                        {/* <div class="company__login">
                            <h3>Prod by</h3>
                        </div> */}
                    </div>
                    <div class="screen__background">
                        <span class="screen__background__shape screen__background__shape4"></span>
                        <span class="screen__background__shape screen__background__shape3"></span>
                        <span class="screen__background__shape screen__background__shape2"></span>
                        <span class="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login