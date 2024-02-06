import React from 'react';
import styles from '../cartDryfruitsDetails/CartDryfruitsDetails.module.scss';
import { FigsSlider } from '../cartDryfruitsDetails/CartSlider';


const CartFigs: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <div id='figs' className={styles.figs}></div>
            <div className={styles.main}>
                <div className={styles.slider}><FigsSlider /></div>
                <div className={styles.details}>
                    <div className={styles.heading}>FIGS</div>
                    <div className={styles.insidedetails1}>
                        <b className={styles.boldHeading}>Description:</b>
                        <ul>
                            <li>I have been a wholesale supplier of high-quality dry fruits for the past 5 years. Purchase from us and savor the finest selection!</li>
                        </ul>
                        <b className={styles.boldHeading}>Origin:</b>
                        <ul>
                            <li>Figs originated in the Mediterranean region.</li>
                            <li>Cultivation dates back to ancient times.</li>
                            <li>Thrive in warm climates with well-drained soil and abundant sunlight.</li>
                        </ul>
                        <b className={styles.boldHeading}>Unique Characteristic:</b>
                        <ul>
                            <li>Figs are delicate and sensitive to physical damage.</li>
                            <li>Prone to postharvest decay infections.</li>
                            <li>Careful handling is crucial to preserve their quality from harvest to consumption.</li>
                        </ul>
                        <b className={styles.boldHeading}>Nutritional Benefits:</b>
                        <ul>
                            <li>Good source of dietary fiber, promoting digestive health.</li>
                            <li>Rich in essential vitamins and minerals, including potassium, magnesium, vitamin K, and vitamin B6.</li>
                            <li>High in antioxidants, contributing to overall health and well - being.</li >
                        </ul >
                        <b className={styles.boldHeading}>Distinct Qualities:</b>
                        <ul>
                            <li>Unique flavor profile with a blend of sweetness and earthiness.</li>
                            <li>Smooth skin and tender flesh create a distinctive texture.</li>
                            <li>Versatile in culinary applications, enhancing both sweet and savory dishes.</li >
                        </ul >
                    </div >
                </div >
            </div >
        </div >
    );
};

export default CartFigs;
