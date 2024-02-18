import React, { useState } from 'react';
import styles from './ContactUs.module.scss';
import Image from 'next/image';
import image from '../../imageFolder/01-01.png'

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

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
            } else {
                const data = await response.json();
                alert(`Form submission failed: ${data.error}`);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert('Form submission failed.');
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.head}>Contact Us</div>
            <div className={styles.contactContainer}>
                <div className={styles.leftSection}>
                    <div className={styles.location}>
                        <Image src={image} alt="Company Image" className={styles.companyImage} />
                    </div>
                    <p> <strong>Address:</strong>  517-518  MBC, Lajamni Chowk, opposite Opera Business center, Shanti Niketan Society, Mota Varachha, Surat, Gujarat 394104</p>
                    <p> <strong> Email: </strong>company@example.com</p>
                    <p> <strong> Mobile:</strong> +1 234 567 890</p>
                </div>
                <div className={styles.rightSection}>
                    <form className={styles.contactForm} onSubmit={handleSubmit}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />

                        <label htmlFor="mobile">Mobile:</label>
                        <input type="text" id="mobile" name="mobile" required />

                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" required></textarea>

                        <div className={styles.buttonContainer}>
                            <button type="submit">Submit</button>
                            <button type="button">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
