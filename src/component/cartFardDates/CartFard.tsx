import React from 'react';
import styles from '../cartDryfruitsDetails/CartDryfruitsDetails.module.scss';
import { FardSlider } from '../cartDryfruitsDetails/CartSlider';


const CartFardDates: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <div id='fardDates' className={styles.fardDates}></div>
            <div className={styles.main}>
                <div className={styles.slider}><FardSlider /></div>
                <div className={styles.details}>
                    <div className={styles.heading}>FARD DATES</div>
                    <div className={styles.insidedetails1}>
                        <b className={styles.boldHeading}>Description:</b>
                        <ul>
                            <li>I have been a wholesale supplier of high-quality dry fruits for the past 5 years. Purchase from us and savor the finest selection!</li>
                        </ul>
                        <b className={styles.boldHeading}>Origin:</b>
                        <ul>
                            <li>The Fard Dates used in Date Crown Premium Fard Dates are sourced from regions known for producing high-quality dates.</li>
                            <li>While the exact origin may vary, Fard Dates are commonly associated with the Middle East, where the climate and soil conditions are favorable for growing premium quality dates.</li>
                        </ul>
                        <b className={styles.boldHeading}>Unique Characteristic:</b>
                        <ul>
                            <li>The unique characteristic of Date Crown Premium Fard Dates lies in their semi-moist texture.</li>
                            <li>The mild sweetness of these dates also contributes to their unique flavor profile.</li>
                        </ul>
                        <b className={styles.boldHeading}>Nutritional Benefits:</b>
                        <ul>
                            <li>Date Crown Premium Fard Dates offer a good source of natural sugars, providing a quick energy boost.</li>
                            <li>They are rich in fiber, vitamins, and minerals, contributing to digestive health and overall well-being.</li>
                            <li>The nutritional profile of these dates makes them a wholesome option for those looking for a healthy and flavorful snack.</li>
                        </ul>
                        <b className={styles.boldHeading}>Distinct Qualities:</b>

                        <ul>
                            <li>Date Crown Premium Fard Dates redefine the concept of healthy indulgence.</li>
                            <li>They offer a perfect balance of texture and subtle sweetness, making them suitable for various culinary endeavors.</li>
                            <li>These dates are designed to complement both baking recipes and daily snacking pleasures, emphasizing a premium quality that sets them apart in the market.</li>
                        </ul>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default CartFardDates;
