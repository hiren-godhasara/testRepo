'use client'

import React, { useEffect, useState } from 'react';
import styles from './Login.module.scss';
import Image from 'next/image';
import logo from '../../imageFolder/mdfLogo.png';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { ToastNotifications, showSuccessToast, showErrorToast } from '../../toastNotifications'
import Header from '../headerSection/Header';


const LoginForm = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        loginId: '',
        password: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


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
            var jsonString = JSON.stringify(data.data);
            localStorage.setItem('userData', jsonString)

        } catch (error) {
            console.error('There was a problem fetching the data:', error);
        }
    }

    const isOrderRedirecting = typeof window !== 'undefined' ? localStorage.getItem('isOrderRedirecting') : null

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (
            formData.loginId.trim() === '' ||
            formData.password.trim() === ''
        ) {
            showErrorToast("Fill all mandetory field")
            return;
        }
        try {
            const response = await fetch(`${process.env.BASE_URL}/s/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if ((data.data && Object.keys(data.data).length > 0)) {
                Cookies.set('token', data.data.token, { expires: 1 });
                Cookies.set('userId', data.data.userId, { expires: 1 });
                await handleUserData(data.data.userId, data.data.token)
                showSuccessToast(data.message);
                if (isOrderRedirecting === "true") {
                    window.history.back();
                } else {
                    window.location.reload()
                    window.location.href = '/'
                }
                setFormData({
                    loginId: '',
                    password: ''
                });
            } else {
                showErrorToast(data.message)
            }

        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    const handleReset = () => {
        setFormData({ loginId: '', password: '' });
    };


    const handleCancel = () => {
        router.back();
    };

    const inputType = formData.loginId.includes('@') ? 'text' : "text";

    const authToken = Cookies.get('token')


    return (
        <>
            {!authToken === true &&
                <div className={styles.backImg}>
                    <div className={styles.register}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.companydetails}>
                                <div className={styles.imgDiv}>
                                    <Image src={logo} alt={`Company logo`} fill={true} objectFit='contain' />
                                </div>
                            </div>
                            <div className={styles.registerName}>Welcome Back !</div>

                            <div>
                                <label>Email / Phone Number: <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type={inputType}
                                    placeholder="Enter Email Or Phone"
                                    name="loginId"
                                    value={formData.loginId}
                                    onChange={handleChange}
                                // required
                                />
                            </div>
                            <div>
                                <label>Password: <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                // required

                                />
                            </div>
                            <div>
                                <button type="submit" className={styles.btn}>Sign In</button>
                            </div>
                            <div style={{ textAlign: "center", margin: "0 0 10px 0", color: "#a9a9a9" }}>Don&apos;t have an account? </div>
                            <div>
                                <Link href='/registration'>
                                    <button className={`${styles.btn} ${styles.registerBtn}`} >Create account</button>
                                </Link>
                            </div>
                        </form>
                        <ToastNotifications />
                    </div>
                </div>
            }

            {!authToken === false &&
                router.push('/')
            }
        </>
    );
};

export default LoginForm;

