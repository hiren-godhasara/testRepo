import Image from 'next/image';
import styles from './GiftCombo.module.scss';
import image from '../../imageFolder/image 8.png';
import { giftComboAlmond, giftComboBackground, giftComboCashew, giftComboDates1, giftComboDates2 } from '@/S3Images/S3Images';

const GiftCombo: React.FC = () => {

    return (
        <div className={styles.giftComboContainer}>
            <div className={styles.backgroundImageContainer}>
                <Image src={giftComboBackground} alt='Home Page' width={1870} height={751} className={styles.backgroundImage} />
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
                                <Image src={giftComboDates1} alt='' width={118} height={118} className={styles.rightImage} />
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.left}>
                                <h3>Premium Dates</h3>
                                <h4>Grade: A+</h4>
                                <div className={styles.h5}><h5>10% Off</h5></div>
                            </div>
                            <div className={styles.right}>
                                <Image src={giftComboDates2} alt='' width={118} height={118} className={styles.rightImage} />
                            </div>
                        </div>
                    </div>

                    {/* Second Row of Cards */}
                    <div className={styles.cardRow}>
                        <div className={styles.card}>
                            <div className={styles.left}>
                                <h3>Premium Almond</h3>
                                <h4>Grade: A+</h4>
                                <div className={styles.h5}><h5>10% Off</h5></div>
                            </div>
                            <div className={styles.right}>
                                <Image src={giftComboAlmond} alt='' width={118} height={118} className={styles.rightImage} />
                            </div>
                        </div>

                        <div className={styles.card}>
                            <div className={styles.left}>
                                <h3>Premium Cashew</h3>
                                <h4>Grade: A+</h4>
                                <div className={styles.h5}><h5>10% Off</h5></div>
                            </div>
                            <div className={styles.right}>
                                <Image src={giftComboCashew} alt='' width={118} height={118} className={styles.rightImage} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default GiftCombo;
