import React, { useState } from 'react';
import styles from './Register.module.scss';
import Image from 'next/image';
import logo from '../../imageFolder/myDryFruitLogo-removebg-preview.png';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

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
            console.log(data.data);

            if ((data.data && Object.keys(data.data).length > 0)) {
                router.push('/');
                // Cookies.set('token', data.data.token, { expires: 7 });
                // Cookies.set('userId', data.data.userId, { expires: 7 });
                Cookies.set('token', data.data.token, { expires: 30 / (24 * 60 * 60) });
                Cookies.set('userId', data.data.userId, { expires: 30 / (24 * 60 * 60) });



                // const storedToken = Cookies.get('token');
                // const storedUserId = Cookies.get('userId');
                // console.log(storedToken, storedUserId);

                // localStorage.setItem('token', data.data.token);
                // localStorage.setItem('userId', data.data.userId);
            }

        } catch (error) {
            console.error('Error registering:', error);
        } finally {
            setFormData({
                loginId: '',
                password: ''
            });
        }
        setFormData({ loginId: '', password: '' });
    };

    const handleReset = () => {
        setFormData({ loginId: '', password: '' });
    };

    const handleCancel = () => {
        router.back();
    };

    const inputType = formData.loginId.includes('@') ? 'email' : 'tel';

    return (
        <div className={styles.register}>
            <form onSubmit={handleSubmit}>
                <div className={styles.companydetails}>
                    <Image src={logo} alt={`Company logo`} width={100} height={100} />
                    <div className={styles.details}>
                        <p className={styles.headerdetails}>MYDRYFRUIT</p>
                        <p className={styles.bodydetails}>Wholesaler of premium quality dryfruits in India and Abroad</p>
                    </div>
                </div>
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
                <Link className={styles.link} href='/registration'>Create an account</Link>
            </form>
            <button onClick={handleCancel} className={styles.cancel}>✖</button>
        </div>
    );
};

export default LoginForm;

