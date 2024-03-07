'use client'

import { Carousel } from 'antd';
import styles from './smallHomepage.module.scss';
import Image from 'next/image';
import i1 from '../../imageFolder/01-01.png'
import i2 from '../../imageFolder/01-02.png'
import i3 from '../../imageFolder/01-03.png'
import i4 from '../../imageFolder/01-04.png'
import i5 from '../../imageFolder/01-05.png'
import i6 from '../../imageFolder/01-06.png'
import vector from '../../imageFolder/111xxxhdpi.png'
import vector1 from '../../imageFolder/Asset 1xxxhdpi.png'

import { useRouter } from 'next/navigation';
import Loader from '../loader/Loader';
import { useEffect, useState } from 'react';

const HomePage1 = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onBtnClick = () => {
        router.push('/contactUs')
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);



    return (
        <div className={styles.home}>
            {loading ? (
                <div className={styles.loaderContainer}>
                    <Loader />
                </div>
            ) : (
                <>
                    <div className={styles.productCarousel}>
                        <Carousel slidesToShow={1} dots={false} autoplay draggable autoplaySpeed={3000} speed={1000}  >
                            {/* <Image src={vector} alt={` Image`} objectFit='cover' className={styles.imageWrapper} />
                            <Image src={vector1} alt={` Image`} objectFit='cover' className={styles.imageWrapper} />
                            <Image src={vector} alt={` Image`} objectFit='cover' className={styles.imageWrapper} />
                            <Image src={vector1} alt={` Image`} objectFit='cover' className={styles.imageWrapper} />
                            <Image src={vector} alt={` Image`} objectFit='cover' className={styles.imageWrapper} />
                            <Image src={vector1} alt={` Image`} objectFit='cover' className={styles.imageWrapper} /> */}

                            <div className={`${styles.imageWrapper1} ${styles.imageWrapper}`}>
                                <div className={styles.flex}>
                                    <Image src={vector} className={styles.leftImage} alt="Almonds" />
                                    <h3 className={styles.heada3}>Fresh & Naturally</h3>
                                    <Image src={vector1} className={styles.rightImage} alt="Almonds" />
                                </div>
                                <h1 className={styles.heada1}>PREMIUM ALMONDS </h1>
                                <h2 className={styles.heada2}>The Healthy Way to Snack</h2>
                                <button onClick={onBtnClick} className={styles.btna1}>Contact Us</button>
                            </div>






                            <div className={`${styles.imageWrapper2} ${styles.imageWrapper}`}>
                                <div className={styles.flex}>
                                    <Image src={vector} className={styles.leftImage} alt="Almonds" />
                                    <h3 className={styles.headp3}>The Natural Snack</h3>
                                    <Image src={vector1} className={styles.rightImage} alt="Almonds" />
                                </div>
                                <h1 className={styles.headp1}>PREMIUM </h1>
                                <h2 className={styles.headp2}>CASHEW</h2>
                                <button onClick={onBtnClick} className={styles.btnp1}>Contact Us</button>
                            </div>

                            <div className={`${styles.imageWrapper3} ${styles.imageWrapper}`}>
                                <div className={styles.flex}>
                                    <Image src={vector} className={styles.leftImage} alt="Almonds" />
                                    <h3 className={styles.headp3}>Everyone Loves it</h3>
                                    <Image src={vector1} className={styles.rightImage} alt="Almonds" />
                                </div>
                                <h1 className={styles.headp1}>PREMIUM </h1>
                                <h2 className={styles.headp2}>PISTACHIO</h2>
                                <button onClick={onBtnClick} className={styles.btnp1}>Contact Us</button>
                            </div>

                            <div className={`${styles.imageWrapper4} ${styles.imageWrapper}`}>
                                <h3 className={styles.headcombo1}> Premium </h3>

                                <h1 className={styles.headcombo2}>Dry Fruit Combos Are</h1>
                                <h2 className={styles.headcombo3}>Avaialble.....</h2>
                                <button onClick={onBtnClick} className={styles.btncombo1}>Contact Us</button>
                            </div>


                            <div className={`${styles.imageWrapper5} ${styles.imageWrapper}`}>
                                <h3 className={styles.headdetails1}>The Finest Dryfruits</h3>
                                <hr className={styles.hr} />
                                <h1 className={styles.headdetails2}>Eat healthy,Live well!</h1>
                                <h2 className={styles.headdetails3}>Packed with good fats,micronutrients and antioxidants,our premium quality dry fruits make an excellent snack and are perfect festival gifts.</h2>
                                <button onClick={onBtnClick} className={styles.btndetails1}>Contact Us</button>
                            </div>


                        </Carousel>
                    </div>
                </>)
            }

        </div>
    );
};

export default HomePage1;
