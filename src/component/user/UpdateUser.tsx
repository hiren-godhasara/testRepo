'use client'

import React, { useState } from 'react';
import styles from './UpdateUser.module.scss';
import Image from 'next/image';
import logo from '../../imageFolder/mdfLogo.png'
import { useRouter } from 'next/navigation';
import { getUserId } from '@/getLocalStroageUserId';
import { getToken } from '@/getLocalStroageToken';
import { Spin } from 'antd';
import Loader from '../loader/Loader';
import { ToastNotifications, showSuccessToast, showErrorToast } from '../../toastNotifications'


const UpdateUser = ({ userDetails, onClose, onFormSubmit }: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: userDetails.firstName || '',
        lastName: userDetails.lastName || '',
        countryCode: userDetails.countryCode || '',
        mobile: userDetails.mobile || '',
        email: userDetails.email || '',
    });


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
    const userId = getUserId();
    const token = getToken()

    const handleCheckMobile: any = () => {
        const mobileRegex = /^[1-9]\d{9}$/;
        const mobile = mobileRegex.test(formData.mobile);
        if (mobile === false) {
            showErrorToast('Invalid mobile number');
            return false
        }
        return true
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            setLoading(true)
            if (!handleCheckMobile()) {
                return;
            }

            const response = await fetch(`${process.env.BASE_URL}/s/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            onClose();
            onFormSubmit();
            setFormData({
                firstName: '',
                lastName: '',
                countryCode: '',
                mobile: '',
                email: '',
            });

        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setLoading(false)

        }
    };


    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            countryCode: '',
            mobile: '',
            email: '',
        });
        onClose()
    };


    return (
        <div className={styles.register}>
            {loading ? (
                <div className={styles.loaderContainer}>
                    {/* <Spin size="large" /> */}
                    <Loader />
                </div>
            ) : (
                <>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.companydetails}>
                            <Image src={logo} alt="Company logo" width={100} height={100} />
                        </div>

                        <div className={styles.registerName}>CUSTOMER EDIT DETAILS</div>


                        <div>
                            <label>First Name:</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                        {/* {!userDetails.mobile && */}
                        <div className={userDetails.mobile ? styles.hide : styles.show}>
                            <label>Mobile:</label>
                            <input type="tel" maxLength={10} name="mobile" value={formData.mobile} onChange={handleChange} required />
                        </div>
                        {/* } */}
                        <div>
                            <button type="button" onClick={handleReset}>Close</button>
                            <button type="submit" onClick={handleSubmit}>Submit</button>
                        </div>

                    </form>
                    <ToastNotifications />

                </>
            )
            }
        </div >
    );
};

export default UpdateUser;
