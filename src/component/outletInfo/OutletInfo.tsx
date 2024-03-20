
'use client'
import React, { useEffect, useState } from 'react';
import styles from './Outlet.module.scss';
import Image from 'next/image';
import img from '../../imageFolder/branchInfoBg.png';

const Info: React.FC = () => {
    const [dynamicValue, setDynamicValue] = useState(10519);
    const userCount = async () => {
        try {
            const response = await fetch(`${process.env.BASE_URL}/s/usersCount`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data?.data?.userCount);
            setDynamicValue(prevValue => prevValue + (data?.data?.userCount || 0));
        } catch (error) {
            console.error('Error fetching user count:', error);
        }
    };
    useEffect(() => {
        userCount();
    }, []);

    return (
        <div className={styles.infoContainer}>
            <div className={styles.imageContainer}>
                <Image src={img} alt="Image Description" className={styles.image} />

                <div className={styles.cardDetails}>
                    <div className={styles.card}>
                        <p className={styles.p}>Number of happy customers</p>
                        <h2 className={styles.h2}>{dynamicValue}+</h2>
                    </div>
                    <div className={styles.card}>
                        <p className={styles.p}>Shipping Global Destinations</p>
                        <h2 className={styles.h2}>4+</h2>
                    </div>
                    <div className={styles.card}>
                        <p className={styles.p}>Discover Exclusive Products</p>
                        <h2 className={styles.h2}>2000+</h2>
                    </div>
                    <div className={styles.card}>
                        <p className={styles.p}>Explore Distinct Varieties of Premium Dry Fruits</p>
                        <h2 className={styles.h2}>45+</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;


