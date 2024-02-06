import React from 'react';
import styles from '../cartDryfruitsDetails/CartDryfruitsDetails.module.scss';
import { KhalasSlider } from '../cartDryfruitsDetails/CartSlider';


const CartKhalasDates: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <div id='khalasDates' className={styles.khalasDates}></div>
            <div className={styles.main}>
                <div className={styles.slider}><KhalasSlider /></div>
                <div className={styles.details}>
                    <div className={styles.heading}>KHALAS DATES</div>
                    <div className={styles.insidedetails1}>
                        <b className={styles.boldHeading}>Description:</b>
                        <ul>
                            <li>I have been a wholesale supplier of high-quality dry fruits for the past 5 years. Purchase from us and savor the finest selection!</li>
                        </ul>
                        <b className={styles.boldHeading}>Origin:</b>
                        <ul>
                            <li>Khalas Dates have their origin in regions recognized for cultivating high-quality dates, with a particular emphasis on the Middle East.</li>
                            <li> Grown in areas with climates conducive to date palm cultivation, contributing to the unique taste and texture of Khalas Dates.</li>
                        </ul>
                        <b className={styles.boldHeading}>Unique Characteristic:</b>
                        <ul>
                            <li> The distinctive feature of Khalas Dates lies in their exquisite, caramel-like taste, setting them apart from other date varieties.</li>
                            <li>What truly makes Khalas Dates unique is their commitment to purity. They are free from preservatives, additives, and artificial colors or flavors, ensuring a genuine and unadulterated experience.</li>
                        </ul>
                        <b className={styles.boldHeading}>Nutritional Benefits:</b>
                        <ul>
                            <li> Khalas Dates are a rich source of natural sugars, providing a quick and sustained energy boost.</li>
                            <li>These dates contain essential nutrients, including fiber, potassium, magnesium, and antioxidants, contributing to digestive health, heart function, and overall well-being.</li>
                        </ul>
                        <b className={styles.boldHeading}>Distinct Qualities:</b>
                        <ul>
                            <li>The distinct qualities of Khalas Dates make them suitable for various culinary uses, including snacking, blending into smoothies, or incorporating into baked goods.</li>
                            <li> The absence of preservatives and artificial additives underscores their commitment to providing a pure and unadulterated product.</li>
                            <li>Consumers can enjoy a naturally sweet and wholesome experience with Khalas Dates, knowing that each bite is free from compromise on taste or quality.</li>
                        </ul>
                    </div>
                </div>
            </div >

        </div >
    );
};

export default CartKhalasDates;
