import React from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import styles from './HomePageSlider.module.scss';
import { homePage1, homePage2, homePage3, homePage4, homePage5, homePage6 } from '@/S3Images/S3Images';




const HomePageSlider = () => {
    return (
        <div>
            <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} className='productCarousel'>
                <Image src={homePage1} alt={`Image`} width={1500} height={740} className={styles.image} />
                <Image src={homePage2} alt={`Image`} width={1500} height={740} className={styles.image} />
                <Image src={homePage3} alt={`Image`} width={1500} height={740} className={styles.image} />
                <Image src={homePage4} alt={`Image`} width={1500} height={740} className={styles.image} />
                <Image src={homePage5} alt={`Image`} width={1500} height={740} className={styles.image} />
                <Image src={homePage6} alt={`Image`} width={1500} height={740} className={styles.image} />
            </Carousel>
        </div>
    );
};

export default HomePageSlider;








