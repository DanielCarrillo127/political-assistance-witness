import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../views/login/login'
import Dashboard from '../views/dashboard/dashboard';
import PrivateRoute from './privateRoutes';

export const RoutesTree = () => {
    return (
        <BrowserRouter>
            <Routes >
                {/* Public Routes */}
                <Route path="/" element={<Login />} />

                {/* Private Routes */}
                <>
                    <Route path="/userDashboard" element={<PrivateRoute component={Dashboard} />} />
                </>
            </Routes>
        </BrowserRouter>
    );
};