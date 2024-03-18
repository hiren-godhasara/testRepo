import GoogleLogin from '@/component/googleLogin/GoogleLogin';
import LoginForm from '@/component/registrationUser/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
const information = require('../../data/details.json')

export const metadata = {
    title: information?.login?.title,
    description: information?.login?.description,
    keywords: information?.login?.keywords
};

export default function Cart() {
    return (
        <div>
            <GoogleOAuthProvider clientId="1027485564712-nm6m9eifqopa3eqq2pnmj83vljb0e74c.apps.googleusercontent.com">
                <GoogleLogin />
                <LoginForm />
            </GoogleOAuthProvider>
        </div>
    );
}



