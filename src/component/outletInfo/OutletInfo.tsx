
'use client'
import React, { useEffect, useState } from 'react';
import styles from './Outlet.module.scss';
import Image from 'next/image';
import img from '../../imageFolder/branchInfoBg.png';

const Info: React.FC = () => {
    // const [dynamicValue, setDynamicValue] = useState(() => {
    //     const storedValue = typeof window !== 'undefined' ? localStorage.getItem('dynamicValue') : null;
    //     return storedValue ? parseInt(storedValue) : 10000;
    // });

    // const incFunction = () => {
    //     setDynamicValue(prevValue => prevValue + 50);
    // };

    // useEffect(() => {
    //     localStorage.setItem('dynamicValue', dynamicValue.toString());
    // }, [dynamicValue]);

    // const runEvery24Hours = () => {
    //     setInterval(incFunction, 86400);
    // };

    // useEffect(() => {
    //     runEvery24Hours();
    // }, []);

    return (
        <div className={styles.infoContainer}>
            <div className={styles.imageContainer}>
                <Image src={img} alt="Image Description" className={styles.image} />

                <div className={styles.cardDetails}>
                    <div className={styles.card}>
                        <p className={styles.p}>Number of happy customers</p>
                        <h2 className={styles.h2}>10000 +</h2>
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


