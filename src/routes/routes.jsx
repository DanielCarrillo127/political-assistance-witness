import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../views/login/login';
import RegisterForm from '../views/register/registerForm';
import RegisterVote from '../views/registerVote/registerVote'
import RegisterCounter from '../views/registerCounter/registerCounter';
import Dashboard from '../views/dashboard/dashboard';
import PrivateRoute from './privateRoutes';

export const RoutesTree = () => {
    return (
        <BrowserRouter>
            <Routes >
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/registerForm" element={<RegisterForm />} />
                <Route path="/registerVote" element={<RegisterVote />} />
                <Route path="/counterPartial" element={<RegisterCounter />} />

                {/* Private Routes */}
                <>
                    <Route path="/userDashboard" element={<PrivateRoute component={Dashboard} />} />
                </>
            </Routes>
        </BrowserRouter>
    );
};