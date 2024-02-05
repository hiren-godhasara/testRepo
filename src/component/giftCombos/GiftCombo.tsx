import Image from 'next/image';
import styles from './GiftCombo.module.scss';
import image from '../../imageFolder/image 8.png';
import kaju from '../../imageFolder/kaju.png';
import badam from '../../imageFolder/badam.png';
import mazafati from '../../imageFolder/mazafati.png';
import khalas from '../../imageFolder/khalas.png';

const GiftCombo: React.FC = () => {

    return (
        <div className={styles.giftComboContainer}>
            <div className={styles.backgroundImageContainer}>
                <Image src={image} alt='Home Page' className={styles.backgroundImage} />
            </div>

            <div className={styles.contentContainer}>
                <h1 className={styles.h1}>Gift Combos</h1>

                <div className={styles.cardsContainer}>

                    <div className={styles.cardRow}>
                        <div className={styles.card}>
                            <div className={styles.left}>
                                <h3>Premium Dates</h3>
                                <h4>Grade: A+</h4>
                                <div className={styles.h5}><h5>10% Off</h5></div>
                            </div>
                            <div className={styles.right}>
                                <Image src={mazafati} alt='' className={styles.rightImage} />
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.left}>
                                <h3>Premium Dates</h3>
                                <h4>Grade: A+</h4>
                                <div className={styles.h5}><h5>10% Off</h5></div>
                            </div>
                            <div className={styles.right}>
                                <Image src={khalas} alt='' className={styles.rightImage} />
                            </div>
                        </div>
                    </div>

                    {/* Second Row of Cards */}
                    <div className={styles.cardRow}>
                        <div className={styles.card}>
                            <div className={styles.left}>
                                <h3>Premium Dates</h3>
                                <h4>Grade: A+</h4>
                                <div className={styles.h5}><h5>10% Off</h5></div>
                            </div>
                            <div className={styles.right}>
                                <Image src={badam} alt='' className={styles.rightImage} />
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.left}>
                                <h3>Premium Dates</h3>
                                <h4>Grade: A+</h4>
                                <div className={styles.h5}><h5>10% Off</h5></div>
                            </div>
                            <div className={styles.right}>
                                <Image src={kaju} alt='' className={styles.rightImage} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GiftCombo;
