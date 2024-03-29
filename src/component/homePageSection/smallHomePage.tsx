'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/autoplay'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './smallHomepage.module.scss';
import Image from 'next/image';
import i1 from '../../imageFolder/Mobile/Web Phone-01.webp'
import i2 from '../../imageFolder/Mobile/Web Phone-02.webp'
import i3 from '../../imageFolder/Mobile/Web Phone-03.webp'
import i4 from '../../imageFolder/Mobile/Web Phone-04.webp'
import i5 from '../../imageFolder/Mobile/Web Phone-05.webp'
import vector from '../../imageFolder/111xxxhdpi.png'
import vector1 from '../../imageFolder/Asset 1xxxhdpi.png'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const HomePage1 = () => {
    const router = useRouter();
    const onBtnClick = () => {
        router.push('/contactUs')
    }

    return (
        <div className={styles.home}>
            <>
                <Swiper
                    centeredSlides={true}
                    speed={1500}
                    loop={true}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                >
                    <SwiperSlide className={styles.mySwiper}>
                        <Link href='/products/natural-premium-california-almond-200gm'>
                            <div className={`${styles.imageWrapper1}`}>
                                <Image src={i1} alt="Image" style={{ objectFit: "cover" }} priority />
                            </div>
                            <div className={styles.flex}>
                                <Image src={vector} className={styles.leftImage} alt="Almonds" />
                                <h3 className={styles.heada3}>Fresh & Naturally</h3>
                                <Image src={vector1} className={styles.rightImage} alt="Almonds" />
                            </div>
                            <h1 className={styles.heada1}>PREMIUM ALMONDS </h1>
                            <h2 className={styles.heada2}>The Healthy Way to Snack</h2>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide className={styles.mySwiper}>
                        <Link href='/products/buy-premium-Whole-Cashew(kaju)-Nuts-200gm'>
                            <div className={`${styles.imageWrapper2}`}>
                                <Image src={i2} alt="Image" style={{ objectFit: "cover" }} className={styles.imageWrapper} priority={true} />
                            </div>

                            <div className={styles.flex}>
                                <Image src={vector} className={styles.leftImage} alt="Almonds" />
                                <h3 className={styles.headp3}>The Natural Snack</h3>
                                <Image src={vector1} className={styles.rightImage} alt="Almonds" />
                            </div>
                            <h1 className={styles.headp1}>PREMIUM </h1>
                            <h2 className={styles.headp2}>CASHEW</h2>
                        </Link>
                    </SwiperSlide>


                    <SwiperSlide className={styles.mySwiper}>
                        <Link href='/products/buy-freshly-roasted-salted-pista-200gm'>
                            <div className={`${styles.imageWrapper3}`}>
                                <Image src={i3} alt="Image" style={{ objectFit: "cover" }} className={styles.imageWrapper} priority={true} />

                            </div>

                            <div className={styles.flex}>
                                <Image src={vector} className={styles.leftImage} alt="Almonds" />
                                <h3 className={styles.headp3}>Everyone Loves it</h3>
                                <Image src={vector1} className={styles.rightImage} alt="Almonds" />
                            </div>
                            <h1 className={styles.headp1}>PREMIUM </h1>
                            <h2 className={styles.headp2}>PISTACHIO</h2>
                        </Link>
                    </SwiperSlide>


                    <SwiperSlide className={styles.mySwiper}>
                        <Link href='/products/buy-freshly-roasted-salted-pista-200gm'>
                            <div className={`${styles.imageWrapper4}`}>
                                <Image src={i4} alt="Image" style={{ objectFit: "cover" }} className={styles.imageWrapper} priority={true} />

                            </div>

                            <h3 className={styles.headcombo1}> Premium </h3>

                            <h1 className={styles.headcombo2}>Dry Fruit Combos Are</h1>
                            <h2 className={styles.headcombo3}>Avaialble.....</h2>
                        </Link>
                    </SwiperSlide>


                    <SwiperSlide className={styles.mySwiper}>
                        <div className={`${styles.imageWrapper5}`}>
                            <Image src={i5} alt="Image" style={{ objectFit: "cover" }} className={styles.imageWrapper} priority={true} />

                        </div>

                        <h3 className={styles.headdetails1}>The Finest Dryfruits</h3>
                        <hr className={styles.hr} />
                        <h1 className={styles.headdetails2}>Eat healthy,Live well!</h1>
                        <h2 className={styles.headdetails3}>Packed with good fats,micronutrients and antioxidants,our premium quality dry fruits make an excellent snack and are perfect festival gifts.</h2>
                        <button onClick={onBtnClick} className={styles.btndetails1}>Contact Us</button>
                    </SwiperSlide>




                </Swiper>

            </>
            {/* ) } */}

        </div>
    );
};

export default HomePage1;
