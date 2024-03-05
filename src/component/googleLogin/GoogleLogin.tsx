'use client'
import React, { useState, useEffect } from 'react';
// import { useGoogleOneTapLogin } from "react-google-one-tap-login"
import styles from './GoogleLogin.module.scss'
import { getToken } from '@/getLocalStroageToken';
import Cookies from 'js-cookie';
import { useGoogleOneTapLogin, GoogleOAuthProvider } from '@react-oauth/google';
const jwt = require('jsonwebtoken');

function GoogleLogin() {
    const [showPopup, setShowPopup] = useState(true);
    const token = getToken()

    const PopUpLogin = () => {

        useGoogleOneTapLogin({

            onSuccess: async (response) => {
                setShowPopup(true);
                const credential = response.credential;
                const clientId = response.clientId;
                const decodedToken = jwt.decode(credential, { complete: true });
                console.log(decodedToken.payload);

                if (decodedToken) {
                    if (decodedToken.payload.aud === clientId) {
                        if (response) {
                            const responses = await fetch(`${process.env.BASE_URL}/s/register`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: await JSON.stringify({
                                    firstName: decodedToken.payload.given_name,
                                    lastName: decodedToken.payload.family_name,
                                    email: decodedToken.payload.email
                                })
                            });
                            console.log(responses);

                            if (responses) {
                                if (responses.ok) {
                                    const data = await responses.json();

                                    Cookies.set('token', data.data.token, { expires: 1 });
                                    Cookies.set('userId', data.data.userId, { expires: 1 });
                                    if (typeof window !== 'undefined') {
                                        window.location.reload()
                                    }
                                } else {
                                    const data = await responses.json();
                                    console.log(data);
                                }
                            }
                        }
                    } else {
                        console.error("Invalid client ID");
                    }
                } else {
                    console.error("Invalid JWT token");
                }
            },
            onError: () => console.log('error'),
            cancel_on_tap_outside: false,
        });
    }

    if (!token === true) {
        PopUpLogin();
    }

    return (
        <div>
            {!token && (
                <>
                    <div className={styles.box}></div>
                    <div className={styles.box1}></div>
                </>
            )}
        </div>
    );
}


export default GoogleLogin;



