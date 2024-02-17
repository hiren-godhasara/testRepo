import { Carousel } from 'antd';
import styles from './HomePage.module.scss';
import Image from 'next/image';
import { homePage1, homePage2, homePage3, homePage4, homePage5, homePage6 } from '@/S3Images/S3Images';
import i1 from '../../imageFolder/01-01.png'
import i2 from '../../imageFolder/01-02.png'
import i3 from '../../imageFolder/01-03.png'
import i4 from '../../imageFolder/01-04.png'
import i5 from '../../imageFolder/01-05.png'
import i6 from '../../imageFolder/01-06.png'


const HomePage = () => {

    return (
        <div className={styles.home}>
            <div className={styles.productCarousel}>
                <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000}  >
                    <Image src={i1} alt={`Image`} width={1920} height={640} className={styles.image} />
                    <Image src={i2} alt={`Image`} width={1920} height={640} className={styles.image} />
                    <Image src={i3} alt={`Image`} width={1920} height={640} className={styles.image} />
                    <Image src={i4} alt={`Image`} width={1920} height={640} className={styles.image} />
                    <Image src={i5} alt={`Image`} width={1920} height={640} className={styles.image} />
                    <Image src={i6} alt={`Image`} width={1920} height={640} className={styles.image} />
                </Carousel>
            </div>

            <button className={styles.rightSection}>Contact Us</button>
        </div>
    );
};

export default HomePage;
