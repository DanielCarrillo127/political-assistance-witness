import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast } from "react-toastify";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [isErrorId, setIsErrorId] = useState(false);
    const [isErrorPass, setIsErrorPass] = useState(false);

    const handleChangeId = (e) => setIsErrorId(false);
    const handleChangePass = (e) => setIsErrorPass(false);

    const handleSubmit = (event) => {

        if (data.get('cedula') === "" || data.get('password') === "") {
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
            if (password === "") { setIsErrorPass(true) }

        } else {

            if (true) {
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
            }

        }

    };

    return (
        <>
            <h1>login</h1>
        </>
    )
}


export default Login