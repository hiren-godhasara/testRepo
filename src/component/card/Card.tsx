import React from 'react';
import styles from './Card.module.scss';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
    image: string | StaticImageData;
    name: string;
    grade: string;
    displayname: string;
}

const Card: React.FC<CardProps> = ({ image, name, grade, displayname }) => {
    const imageWidth = 180;
    const imageHeight = 180;


    const onBtnClick = () => {
        console.log(displayname);
    }

    return (
        <div className={styles.card}>
            <div className={`${styles.image} ${styles.image1}`}>
                <Image src={typeof image === 'object' ? image.src : image} alt={name} width={imageWidth} height={imageHeight} />
            </div>

            <div className={styles['card-info']}>
                <h2 className={styles.h2}>{name}</h2>
                <p className={styles.p}>Grade: <b className={styles.grade}>{grade}</b></p>
                <Link href={`/products/${displayname}`}>
                    <button onClick={onBtnClick} className={styles.button} ><span>Buy Now</span></button>
                </Link>
            </div>
        </div>

    );
};

export default Card;
