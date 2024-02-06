import React from 'react';
import styles from '../cartDryfruitsDetails/CartDryfruitsDetails.module.scss';
import { MedjoolSlider } from '../cartDryfruitsDetails/CartSlider';


const CartMedjoolDates: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <div id='medjoolDates' className={styles.medjoolDates}></div>
            <div className={styles.main}>
                <div className={styles.slider}><MedjoolSlider /></div>
                <div className={styles.details}>
                    <div className={styles.heading}>MEDJOOL DATES</div>
                    <div className={styles.insidedetails1}>
                        <b className={styles.boldHeading}>Description:</b>
                        <ul>
                            <li>I have been a wholesale supplier of high-quality dry fruits for the past 5 years. Purchase from us and savor the finest selection!</li>
                        </ul>
                        <b className={styles.boldHeading}>Origin:</b>
                        <ul>
                            <li>Medjool dates are originally from Morocco.</li>
                            <li>The climate and soil in Morocco contribute to the unique characteristics of these dates.</li>

                        </ul>
                        <b className={styles.boldHeading}>Unique Characteristic:</b>
                        <ul>
                            <li>Medjool dates stand out due to their sweet, caramel taste.</li>
                            <li>The chewy texture of these dates sets them apart from other varieties.</li>
                            <li>They are considered a premium and luxurious fruit due to their regal taste.</li>
                        </ul>
                        <b className={styles.boldHeading}>Nutritional Benefits:</b>
                        <ul>
                            <li> Medjool dates are rich in essential nutrients, including potassium and magnesium.</li>
                            <li>They contain vitamins and fiber, contributing to a healthy diet.</li>
                            <li>These dates serve as a natural source of energy and offer various health benefits.</li>
                        </ul>
                        <b className={styles.boldHeading}>Distinct Qualities:</b>
                        <ul>
                            <li>Medjool dates are not only a delightful snack but also versatile in culinary applications.</li>
                            <li>Their natural sweetness makes them an excellent sugar substitute in cooking and baking.</li>
                            <li>They add a touch of luxury to kitchen endeavors, enhancing both sweet and savory dishes.</li>
                        </ul>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default CartMedjoolDates;
