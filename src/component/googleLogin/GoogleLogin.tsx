'use client'
import React, { useState, useEffect } from 'react';
import styles from './GoogleLogin.module.scss'
import { getToken } from '@/getLocalStroageToken';
import Cookies from 'js-cookie';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import dynamic from 'next/dynamic';
const jwt = require('jsonwebtoken');

function GoogleLogin() {
    const [showPopup, setShowPopup] = useState(true);
    const token = getToken()



    const handleUserData = async (userID: any, token: any) => {
        try {
            const response = await fetch(`${process.env.BASE_URL}/s/user/${userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const newUserData: any = {
                countryCode: data.data.countryCode,
                email: data.data.email,
                firstName: data.data.firstName,
                lastName: data.data.lastName
            };
            const jsonString = JSON.stringify(newUserData)
            localStorage.setItem('userData', jsonString)
        } catch (error) {
            console.error('There was a problem fetching the data:', error);
        }
    }

    const PopUpLogin = () => {

        useGoogleOneTapLogin({

            onSuccess: async (response: any) => {
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
                                    await handleUserData(data.data.userId, data.data.token)

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
            // auto_select: true
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
export default dynamic(() => Promise.resolve(GoogleLogin), { ssr: false });





