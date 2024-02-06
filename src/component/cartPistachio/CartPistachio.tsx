import React from 'react';
import styles from '../cartDryfruitsDetails/CartDryfruitsDetails.module.scss';
import { PistachioSlider } from '../cartDryfruitsDetails/CartSlider';


const CartPistachio: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <div id='pistachio' className={styles.pistachio}></div>
            <div className={styles.main}>
                <div className={styles.slider}><PistachioSlider /></div>
                <div className={styles.details}>
                    <div className={styles.heading}>PISTACHIO</div>
                    <div className={styles.insidedetails1}>
                        <b className={styles.boldHeading}>Description:</b>
                        <ul>
                            <li>I have been a wholesale supplier of high-quality dry fruits for the past 5 years. Purchase from us and savor the finest selection!</li>
                        </ul>
                        <b className={styles.boldHeading}>Origin:</b>
                        <ul>
                            <li>Originates from a plant where it develops within a drupe.</li>
                            <li> Specific plant species may vary.</li>
                            <li>Cultivated and widely available in regions conducive to its growth.</li>
                        </ul>
                        <b className={styles.boldHeading}>Unique Characteristic:</b>
                        <ul>
                            <li>Drupe classification with an elongated seed.</li>
                            <li> Resilient, cream-colored outer shell.</li>
                            <li>Mauve-colored skin and light green flesh.</li>
                            <li>Unique combination of textures and flavors sets it apart.</li>
                        </ul >
                        <b className={styles.boldHeading}>Nutritional Benefits:</b>
                        <ul>
                            <li>Rich in essential nutrients and compounds.</li>
                            <li>Contains vitamins, minerals, and dietary fiber.</li>
                            <li>Light green flesh provides healthy fats.</li >
                            <li> Offers a well - rounded nutritional profile.</li >
                        </ul >
                        <b className={styles.boldHeading}>Distinct Qualities:</b>
                        <ul>
                            <li>Versatile and prized in culinary applications.</li>
                            <li>Unique textures and flavors enhance dishes.</li>
                            <li>Valuable ingredient for standalone snacks, recipes, or garnishes.</li >
                            <li>Popular in the culinary world due to its distinct qualities.</li >
                        </ul >
                    </div >
                </div >
            </div >
        </div >
    );
};

export default CartPistachio;
