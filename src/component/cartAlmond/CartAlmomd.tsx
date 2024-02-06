import React from 'react';
import styles from '../cartDryfruitsDetails/CartDryfruitsDetails.module.scss';
import { AlmondSlider } from '../cartDryfruitsDetails/CartSlider';


const CartAlmond: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <div id='almond' className={styles.almond}></div>
            <div className={styles.main}>
                <div className={styles.slider}><AlmondSlider /></div>
                <div className={styles.details}>
                    <div className={styles.heading}>ALMONDS</div>
                    <div className={styles.insidedetails1}>
                        <b className={styles.boldHeading}>Description:</b>
                        <ul>
                            <li>I have been a wholesale supplier of high-quality dry fruits for the past 5 years. Purchase from us and savor the finest selection!</li>
                        </ul>
                        <b className={styles.boldHeading}>Origin:</b>
                        <ul>
                            <li>Almonds have ancient origins, with cultivation dating back thousands of years.</li>
                            <li>Native to the Middle East, particularly Iran, almonds are now grown globally.</li>
                        </ul>
                        <b className={styles.boldHeading}>Unique Characteristic:</b>
                        <ul>
                            <li>Almonds are versatile and used in various culinary applications, from classic nougats to marzipan.</li>
                            <li>They seamlessly fit into both sweet and savory dishes, contributing a distinct taste and satisfying crunch.</li>
                        </ul>
                        <b className={styles.boldHeading}>Nutritional Benefits:</b>
                        <ul>
                            <li>Almonds are nutritionally dense, offering essential nutrients like healthy monounsaturated fats, protein, and fiber.</li>
                            <li>They are a rich source of vitamin E, an antioxidant supporting skin health.</li>
                            <li>Almonds contribute to heart health by helping to lower bad cholesterol levels</li>
                        </ul>
                        <b className={styles.boldHeading}>Distinct Qualities:</b>
                        <ul>
                            <li>The creamy and slightly sweet flavor of almonds makes them a popular choice for snacking and culinary uses.</li>
                            <li>The crunchiness of almonds enhances the texture of dishes.</li>
                            <li>Recognized for promoting satiety, almonds are a satisfying and nutritious snack.</li>
                        </ul>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default CartAlmond;
