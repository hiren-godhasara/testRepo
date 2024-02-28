import React, { useState } from 'react';
import styles from './Register.module.scss';
import Image from 'next/image';
import logo from '../../imageFolder/mdfLogo.png'
import { useRouter } from 'next/navigation';
import { ToastNotifications, showSuccessToast, showErrorToast } from '../../toastNotifications'
import Cookies from 'js-cookie';
import i1 from '../../imageFolder/raw-cashews-nuts-bag-dark-background-PhotoRoom (1) 1.png'
import i2 from '../../imageFolder/raw-cashews-nuts-bag-dark-background-PhotoRoom (2) 1.png'

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

    // const returnUrl = localStorage.getItem('returnURL')
    const returnUrl = typeof window !== 'undefined' ? localStorage.getItem('returnURL') : null;

    const handleCheckEmail: any = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = emailRegex.test(formData.email);
        if (email === false) {
            showErrorToast('Invalid email address');
            return false
        }
        return true
    }

    const handleCheckMobile: any = () => {
        const mobileRegex = /^[1-9]\d{9}$/;
        const mobile = mobileRegex.test(formData.mobile);
        if (mobile === false) {
            showErrorToast('Invalid mobile number');
            return false
        }
        return true
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'mobile' && isNaN(value)) {
            return;
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (!handleCheckEmail()) {
                return;
            }
            if (!handleCheckMobile()) {
                return;
            }

            const response = await fetch(`${process.env.BASE_URL}/s/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log(response);

            if (response) {
                if (response.ok) {
                    const data = await response.json();
                    showSuccessToast(data.message);
                    setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        countryCode: '+91',
                        mobile: '',
                        password: ''
                    });
                    Cookies.set('token', data.data.token, { expires: 1 });
                    Cookies.set('userId', data.data.userId, { expires: 1 });
                    if (returnUrl) {
                        router.push(returnUrl);
                        localStorage.removeItem('returnURL')
                    } else {
                        router.push('/');
                    }
                } else {
                    const data = await response.json();
                    console.log(data);
                    showErrorToast(data.message)
                }
            }

        } catch (error: any) {
            console.log('Error registering:', error);
        }
    };

    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            countryCode: '+91',
            mobile: '',
            password: ''
        });
    };

    const handleCancel = () => {
        router.back();
    };

    return (
    <div className={styles.backImg}>
        <div className={styles.register}>
            <div className={styles.i1}  ></div>
            <div className={styles.i2}  ></div>

            <form onSubmit={handleSubmit}>
                <div className={styles.imgDiv}>
                    <Image src={logo} alt={`Company logo`} fill={true} objectFit='contain'/>
                </div>
                <div className={styles.registerName}>Sign up</div>
                <div>
                    <label>Name: <span style={{ color: 'red' }}>*</span></label>
                    <div className={styles.num}>
                    <input   className={styles.firstName} type="text" name="firstName" placeholder='First Name' value={formData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder='Last Name' value={formData.lastName} onChange={handleChange} required />
                    </div>
                </div>
              
                <div>
                    <label>Email: <span style={{ color: 'red' }}>*</span></label>
                    <input type="email" name="email" placeholder='Enter Email' value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone Number: <span style={{ color: 'red' }}>*</span></label>
                    <div className={styles.num}>
                        <input
                            className={styles.code}
                            maxLength={6}
                            type="tel"
                            name="countryCode"
                            value={`+${formData.countryCode.slice(1, 3)}`}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="tel"
                            name="mobile"
                            placeholder="Enter Phone"
                            value={formData.mobile}
                            onChange={handleChange}
                            maxLength={10}
                            required
                        />


                    </div>

                </div>
                <div>
                    <label>Password: <span style={{ color: 'red' }}>*</span></label>
                    <input type="password"
                        name="password" placeholder='Enter Password' value={formData.password} onChange={handleChange} required />
                </div>
                <div >
                    <button type="submit" className={styles.btn} onClick={handleSubmit}>Submit</button>
                </div>
            </form>
            <ToastNotifications />
        </div>
    </div>
    );
};

export default RegisterForm;
