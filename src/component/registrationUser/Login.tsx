import React, { useState } from 'react';
import styles from './Login.module.scss';
import Image from 'next/image';
import logo from '../../imageFolder/mdfLogo.png';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { ToastNotifications, showSuccessToast, showErrorToast } from '../../toastNotifications'


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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
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
                showSuccessToast(data.message);
                router.push('/');
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

    const inputType = formData.loginId.includes('@') ? 'email' : "text";

    return (
        <div className={styles.register}>
            <form onSubmit={handleSubmit}>
                <div className={styles.companydetails}>
                    <Image src={logo} alt={`Company logo`} width={60} height={60} />
                    <p className={styles.headerdetails}>MYDRYFRUIT</p>
                </div>
                <button onClick={handleCancel} className={styles.cancelReg}>✖</button>
                <div className={styles.registerName}>Welcome Back</div>

                <div>
                    <label>Email / Phone Number:</label>
                    <input
                        type={inputType}
                        name="loginId"
                        value={formData.loginId}
                        onChange={handleChange}
                        required
                        style={{ color: "black" }}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{
                            color: "black"
                        }}
                    />
                </div>
                <div>
                    <button type="submit">Log In</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </div>
                <Link className={styles.link} href='/registration'>  New to mydryfruit  ?<span className={styles.span}> Create an account </span></Link>
            </form>
            <ToastNotifications />
        </div>
    );
};

export default LoginForm;

