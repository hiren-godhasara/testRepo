import React, { useState } from 'react';
import styles from './Register.module.scss';
import Image from 'next/image';
import logo from '../../imageFolder/myDryFruitLogo-removebg-preview.png'
import { useRouter } from 'next/navigation';
import { ToastNotifications, showSuccessToast, showErrorToast } from '../../toastNotifications'


const RegisterForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+91',
        mobile: '',
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
            const response = await fetch(`${process.env.BASE_URL}/s/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data);

            if (data.data._id) {
                showSuccessToast(data.message);
                router.push('/login');
            }
            if (!data.data._id) {
                showErrorToast(data.message);

            }
        } catch (error: any) {
            showErrorToast('Something went wrong');
            console.log('Error registering:', error);

        } finally {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                countryCode: '+91',
                mobile: '',
                password: ''
            });
        }
    };

    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            countryCode: '',
            mobile: '',
            password: ''
        });
    };

    const handleCancel = () => {
        router.back();
    };

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

                <div className={styles.registerName}>NEW CUSTOMER REGISTRATION</div>


                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <div className={styles.num}>
                        <input className={styles.code} type="tel" name="countryCode" value={formData.countryCode} onChange={handleChange} required />
                        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />
                    </div>

                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className={styles.btns}>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                    <button onClick={handleCancel} className={styles.cancelReg}>✖</button>
                </div>
            </form>
            <ToastNotifications />
        </div>
    );
};

export default RegisterForm;
