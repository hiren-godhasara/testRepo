import React, { useState } from 'react';
import styles from './ContactUs.module.scss';
import Image from 'next/image';
import image from '../../imageFolder/01-04.png'
import Link from 'next/link';
import { getToken } from '@/getLocalStroageToken';

const ContactUs = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: '',
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
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

            if (response.ok) {
                alert('Form submitted successfully!');
            } else {
                const data = await response.json();
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        } finally {
            setFormData({
                name: '',
                email: '',
                mobile: '',
                message: ''
            });
        }
    };
    const email = "mydryfruitinfo@gmail.com"
    return (
        <div className={styles.main}>
            <div className={styles.head}>Contact Us</div>
            <div className={styles.contactContainer}>
                <div className={styles.leftSection}>
                    <div className={styles.location}>
                        <Image src={image} alt="Company Image" className={styles.companyImage} />
                    </div>
                    <p> <strong>Address:</strong>  517-518  MBC, Lajamni Chowk, opposite Opera Business center, Shanti Niketan Society, Mota Varachha, Surat, Gujarat 394104</p>
                    <p> <strong> Email: </strong> <Link href="mailto:mydryfruitinfo@gmail.com" className={styles.link}>mydryfruitinfo@gmail.com</Link>   </p>
                    <p> <strong> Mobile:</strong> +91 9157059719</p>
                </div>
                <div className={styles.rightSection}>
                    <form className={styles.contactForm} onSubmit={handleSubmit}>
                        <label>Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                        <label >Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                        <label >Mobile:</label>
                        <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />

                        <label >Message:</label>
                        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>

                        <div className={styles.buttonContainer}>
                            <button type="submit" onClick={handleSubmit}>Submit</button>
                            <button type="button">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
