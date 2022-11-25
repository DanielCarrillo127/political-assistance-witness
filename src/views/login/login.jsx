import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Grid, Header, Message, Segment, } from 'semantic-ui-react';
import { login } from "../../api/request";
import "./login.css"



const Login = () => {
    const navigate = useNavigate();

    const [isloading, setIsloading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isErrorId, setIsErrorId] = useState(false);
    const [isErrorpass, setIsErrorpass] = useState(false);

    const handleChangeId = (e) => { setUsername(e.target.value); setIsErrorId(false) };
    const handleChangePass = (e) => { setPassword(e.target.value); setIsErrorpass(false) };


    const handleSubmit = async () => {
        setIsloading(true)
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
            setIsloading(false)
        } else {
            if (4 < username.length && username.length <= 10) {
                const req = await login(username, password);
                if (req.status === 200) {
                    //save user in context and set the token in LS
                    //saveUser(req.data.accesToken, req.data.info)
                    toast.success(`Bienvenido,`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                    });
                    setIsloading(false)
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
                    setIsloading(false)
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
                setIsloading(false)
            }


        }

    };

    return (
        <>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center'>
                        {/* <Image src='/logo.png' /> */} Ingresa a tu cuenta
                        {/* <h1 className="headerTitle" >hola</h1> */}
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid icon='user' iconPosition='left' value={username} placeholder='Cedula [CC]' onChange={handleChangeId} error={isErrorId} />

                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Contraseña'
                                type='password'
                                value={password}
                                onChange={handleChangePass}
                                autoComplete={password.value}
                                error={isErrorpass}

                            />

                            <Button primary fluid size='large' loading={isloading} onClick={() => handleSubmit()}>
                                Iniciar Sesión
                            </Button>

                        </Segment>

                    </Form>
                    <Message>
                        No tienes usuario? <a href='/'>Contáctenos</a>
                    </Message>
                </Grid.Column>
            </Grid>
        </>
    )
}


export default Login