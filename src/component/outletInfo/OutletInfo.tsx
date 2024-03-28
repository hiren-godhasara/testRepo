
'use client'
import React, { useEffect, useState } from 'react';
import styles from './Outlet.module.scss';
import Image from 'next/image';
import img from '../../imageFolder/branchInfoBg1.png';

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
                <div className={styles.demo}>
                    <Image src={img} alt="Image Description" className={styles.image} />
                </div>
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
                        <h2 className={styles.h2}>25+</h2>
                    </div>
                    <div className={styles.card}>
                        <p className={styles.p}>Customer Satisfaction Rate</p>
                        <h2 className={styles.h2}>99%</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;


