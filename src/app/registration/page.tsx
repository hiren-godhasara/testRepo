import GoogleLogin from '@/component/googleLogin/GoogleLogin';
import RegisterForm from '@/component/registrationUser/Register';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

const information = require('../../data/details.json')

export const metadata = {
    title: information?.registration?.title,
    description: information?.registration?.description,
    keywords: information?.registration?.keywords
};

export default function Cart() {
    return (
        <div>
            <GoogleOAuthProvider clientId="1027485564712-nm6m9eifqopa3eqq2pnmj83vljb0e74c.apps.googleusercontent.com">
                <GoogleLogin />
                <RegisterForm />
            </GoogleOAuthProvider>
        </div>
    );
}



