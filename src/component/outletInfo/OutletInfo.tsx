import React from 'react';
import styles from './Outlet.module.scss';
import Image from 'next/image';
import img from '../../imageFolder/branchInfoBg.png'


const Info: React.FC = () => {
    return (
        <div className={styles.infoContainer}>
            <Image src={img} alt="Image Description" className={styles.image} />
            <div className={styles.cardDetails}>
                <div className={styles.card}>
                    <h2 className={styles.h2}>150+</h2>
                    <p className={styles.p}>Number of Stores</p>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.h2}>4+</h2>
                    <p className={styles.p}>Countries</p>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.h2}>2000+</h2>
                    <p className={styles.p}>Number of Products</p>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.h2}>45+</h2>
                    <p className={styles.p}>Varieties Of  dates</p>
                </div>
            </div>
        </div>
    );
};

export default Info;









