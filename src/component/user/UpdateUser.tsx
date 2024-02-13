import React, { useState } from 'react';
import styles from './UpdateUser.module.scss';
import Image from 'next/image';
import logo from '../../imageFolder/myDryFruitLogo-removebg-preview.png'
import { useRouter } from 'next/navigation';
import getUserId from '@/getLocalStroageUserId';

const UpdateUser = ({ userDetails, onClose, onFormSubmit }: any) => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: userDetails.firstName || '',
        lastName: userDetails.lastName || '',
        countryCode: userDetails.countryCode || '',
        mobile: userDetails.mobile || '',
        email: userDetails.email || '',
    });


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const userId = getUserId();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.BASE_URL}/s/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            onClose();
            onFormSubmit();

        } catch (error) {
            console.error('Error updating user:', error);
        } finally {
            setFormData({
                firstName: '',
                lastName: '',
                countryCode: '',
                mobile: '',
                email: '',
            });
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

                <div className={styles.registerName}>CUSTOMER EDIT DETAILS</div>


                <div>
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                    <button type="button" onClick={handleReset}>Reset</button>
                </div>

            </form>
            <button onClick={onClose} className={styles.close}>✖</button>
        </div>
    );
};

export default UpdateUser;