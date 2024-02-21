import React, { useState } from 'react';
import styles from './NewLogin.module.scss';
import Image from 'next/image';
import logo from '../../imageFolder/myDryFruitLogo-removebg-preview.png';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { ToastNotifications, showSuccessToast, showErrorToast } from '../../toastNotifications'


const NewLoginForm = () => {

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
                // router.back();
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


    const handleCancel = () => {
        router.back();
    };

    const handleCloseForm = () => {
        setFormVisible(false);
        window.location.reload();

    };

    const inputType = formData.loginId.includes('@') ? 'email' : 'tel';

    return formVisible ? (
        <div className={styles.register}>
            <form onSubmit={handleSubmit}>
                <div className={styles.companydetails}>

                    <Image src={logo} alt={`Company logo`} width={100} height={100} />
                    <div className={styles.details}>
                        <p className={styles.headerdetails}>MYDRYFRUIT</p>
                        <p className={styles.bodydetails}>Wholesaler of premium quality dryfruits in India and Abroad</p>
                    </div>
                </div>
                <button onClick={handleCloseForm} className={styles.newClosebtn}>✖</button>
                <div className={styles.registerName}>CUSTOMER LOGIN</div>

                <div>
                    <label>Email / Phone Number:</label>
                    <input
                        type={inputType}
                        name="loginId"
                        value={formData.loginId}
                        onChange={handleChange}
                        required
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
                    />
                </div>
                <div>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </div>
                <Link className={styles.link} href='/registration'>  New to mydryfruit  ?<span className={styles.span}> Create an account </span></Link>
            </form>
            <ToastNotifications />
        </div>
    ) : null;
};

export default NewLoginForm;

