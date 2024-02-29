'use client'

import React, { useState } from 'react';
import styles from './ContactUs.module.scss';
import Link from 'next/link';
import { getToken } from '@/getLocalStroageToken';
import { ToastNotifications, showSuccessToast, showErrorToast } from '../../toastNotifications'
import Image from 'next/image';
import logo from '../../imageFolder/mdfLogo.png'


const ContactUs = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        countryCode: '+91',
        message: '',
    });

    // const handleChange = (e: { target: { name: any; value: any; }; }) => {
    //     if (name === 'mobile' && isNaN(value)) {
    //         return;
    //     }
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'mobile' && isNaN(value)) {
            return;
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const token = getToken()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.BASE_URL}/s/contactUs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,

                },
                body: JSON.stringify(formData),

            });

            if (response) {
                if (response.ok) {
                    const data = await response.json();
                    showSuccessToast(data.message)
                    setFormData({
                        name: '',
                        email: '',
                        countryCode: '+91',
                        mobile: '',
                        message: ''
                    });
                } else {
                    const data = await response.json();
                    showErrorToast(data.message)
                }
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: '',
            email: '',
            mobile: '',
            countryCode: '+91',
            message: ''
        });
    }



    return (
        <div className={styles.backImg}>
            <div className={styles.main}>
                <div className={styles.head}>Contact Us</div>
                <div className={styles.contactContainer}>
                    <div className={styles.leftSection}>
                        <h1 className={styles.h1}>
                            <Image src={logo} alt={`Company logo`} fill={true} objectFit='contain' />
                        </h1>
                        <p><strong>Address:</strong> 517-518 Meridian Business Center, Mota Varachha, Surat, Gujarat 394101</p>
                        <p><strong>Email:</strong> <Link href="mailto:mydryfruitinfo@gmail.com">mydryfruitinfo@gmail.com</Link></p>
                        <p><strong>Mobile:</strong> +91 9157059719</p>
                    </div>
                    <div className={styles.rightSection}>
                        <form className={styles.contactForm} onSubmit={handleSubmit}>
                            <label>Name:<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                            <label>Email:<span style={{ color: 'red' }}>*</span></label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />


                            <div className={styles.div}>
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

                            <label>Message:<span style={{ color: 'red' }}>*</span></label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>

                            <div className={styles.buttonContainer}>
                                <button type="submit" onClick={handleSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastNotifications />
            </div>
        </div>

    );
};

export default ContactUs;
