import React from 'react';
import {LoginPage} from "./pages/LoginPage/LoginPage";
import LandingLayout from "../../components/LandingLayout/LandingLayout";
import {RegistrationPage} from "./pages/RegistrationPage/RegistrationPage";
import {RestorePage} from "./pages/RestorePage/RestorePage";
import {ActivationPage} from "./pages/ActivationPage/ActivationPage";

export const authRoutes = [
    {
        element: <LandingLayout/>,
        children: [
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'registration',
                element: <RegistrationPage/>
            },
            {
                path: 'restore',
                element: <RestorePage/>
            },
            {
                path: 'activate/:code',
                element: <ActivationPage/>
            }
        ]
    }
]
