import React from 'react';
import Image from 'next/image';
import { Carousel } from 'antd';
import styles from './HomePageSlider.module.scss';

import homepage1 from '../../Images/HomePageImages/homepage1.png';
import homepage2 from '../../Images/HomePageImages/homepage2.png';
import homepage3 from '../../Images/HomePageImages/homepage3.png';
import homepage4 from '../../Images/HomePageImages/homepage4.png';
import homepage5 from '../../Images/HomePageImages/homepage5.png';
import homepage6 from '../../Images/HomePageImages/homepage6.png';


const HomePageSlider: React.FC = () => {
    return (
        <div>
            <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000} className='productCarousel'>
                <Image src={homepage1} alt={`Image`} className={styles.image} />
                <Image src={homepage2} alt={`Image`} className={styles.image} />
                <Image src={homepage3} alt={`Image`} className={styles.image} />
                <Image src={homepage4} alt={`Image`} className={styles.image} />
                <Image src={homepage5} alt={`Image`} className={styles.image} />
                <Image src={homepage6} alt={`Image`} className={styles.image} />
            </Carousel>
        </div>
    );
};

export default HomePageSlider;








