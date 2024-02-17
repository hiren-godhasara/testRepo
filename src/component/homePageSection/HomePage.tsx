import { Carousel } from 'antd';
import styles from './HomePage.module.scss';
import Image from 'next/image';
import { homePage1, homePage2, homePage3, homePage4, homePage5, homePage6 } from '@/S3Images/S3Images';
import i1 from '../../imageFolder/mdfh1.jpg'
import i2 from '../../imageFolder/mdfh2.jpg'
import i3 from '../../imageFolder/mdfh3.jpg'
import i4 from '../../imageFolder/mdfh4.jpg'
import i5 from '../../imageFolder/mdfh5.jpg'
import i6 from '../../imageFolder/mdfh6.jpg'

const HomePage = () => {

    return (
        <div className={styles.home}>
            <div className={styles.productCarousel}>
                <Carousel slidesToShow={1} autoplay autoplaySpeed={4500} speed={2000}  >
                    <Image src={i1} alt={`Image`} width={1423} height={740} className={styles.image} />
                    <Image src={i2} alt={`Image`} width={1423} height={740} className={styles.image} />
                    <Image src={i3} alt={`Image`} width={1423} height={740} className={styles.image} />
                    <Image src={i4} alt={`Image`} width={1423} height={740} className={styles.image} />
                    <Image src={i5} alt={`Image`} width={1423} height={740} className={styles.image} />
                    <Image src={i6} alt={`Image`} width={1423} height={740} className={styles.image} />
                </Carousel>
            </div>

            <button className={styles.rightSection}>Contact Us</button>
        </div>
    );
};

export default HomePage;
