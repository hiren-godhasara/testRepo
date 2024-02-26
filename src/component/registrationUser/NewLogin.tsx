import React, { useState } from 'react';
import styles from './NewLogin.module.scss';
import Image from 'next/image';
import logo from '../../imageFolder/myDryFruitLogo-removebg-preview.png';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { ToastNotifications, showSuccessToast, showErrorToast } from '../../toastNotifications'
import { usePathname } from 'next/navigation'


const NewLoginForm = () => {

    const router = useRouter()
    const [formData, setFormData] = useState({
        loginId: '',
        password: ''
    });

    // const [returnURL, setReturnURL] = useState<any>('')

    const pathname = usePathname()

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const [formVisible, setFormVisible] = useState(true);

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
                router.back();
                setFormVisible(false);
                window.location.reload();
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
        // setFormData({ loginId: '', password: '' });
    };

    const handleReset = () => {
        setFormData({ loginId: '', password: '' });
    };


    const handleCloseForm = () => {
        setFormVisible(false);
        router.push('/');

    };

    const inputType = formData.loginId.includes('@') ? 'email' : 'tel';

    const handleLinkClick = () => {
        localStorage.setItem('returnURL', pathname);
    };


    return formVisible ? (
        <div className={styles.register}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email / Phone Number: <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type={inputType}
                        name="loginId"
                        value={formData.loginId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password: <span style={{ color: 'red' }}>*</span></label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Log In</button>
                    <button type="button" onClick={handleCloseForm}>Close</button>
                </div>
                <Link onClick={handleLinkClick} className={styles.link} href='/registration'>  New to mydryfruit  ?<span className={styles.span}> Create an account </span></Link>
            </form>
            <ToastNotifications />
        </div>
    ) : null;
};

export default NewLoginForm;

