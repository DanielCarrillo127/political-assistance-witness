import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
    const isAuthenticated = window.localStorage.getItem('TOKEN');
    if (isAuthenticated === null) return <Component />; //isAuthenticated !== null
    return <Navigate to='/' />;
};

export default PrivateRoute;