import React, { useState } from 'react';
import styles from './Register.module.scss';
import Image from 'next/image';
import logo from '../../imageFolder/myDryFruitLogo-removebg-preview.png';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        loginId: '', // Combined field for email or phone number
        password: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(formData);
        // Reset the form after submission if needed
        setFormData({ loginId: '', password: '' });
    };

    const handleReset = () => {
        setFormData({ loginId: '', password: '' });
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
            </form>
        </div>
    );
};

export default LoginForm;

