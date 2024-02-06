import React from 'react';
import styles from '../cartDryfruitsDetails/CartDryfruitsDetails.module.scss';
import { CashewSlider } from '../cartDryfruitsDetails/CartSlider';


const CartCashew: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>
            <div id='cashew' className={styles.cashew}></div>
            <div className={styles.main}>
                <div className={styles.slider}><CashewSlider /></div>
                <div className={styles.details}>
                    <div className={styles.heading}>CASHEW</div>
                    <div className={styles.insidedetails1}>
                        <b className={styles.boldHeading}>Description:</b>
                        <ul>
                            <li>I have been a wholesale supplier of high-quality dry fruits for the past 5 years. Purchase from us and savor the finest selection!</li>
                        </ul>
                        <b className={styles.boldHeading}>Origin:</b>
                        <ul>
                            <li>Cashew nuts come from the cashew tree, scientifically known as Anacardium occidentale.</li>
                            <li>Originally native to northeastern Brazil, they are now cultivated in tropical regions globally.</li>
                        </ul>
                        <b className={styles.boldHeading}>Unique Characteristic:</b>
                        <ul>
                            <li>Cashew nuts contain a caustic, oily substance between their shells.</li>
                            <li>This characteristic complicates the cultivation and harvesting process, requiring careful handling.</li>
                        </ul>
                        <b className={styles.boldHeading}>Nutritional Benefits:</b>
                        <ul>
                            <li>Rich source of minerals like magnesium, phosphorus, zinc, and iron.</li>
                            <li>High in heart-healthy monounsaturated fats, protein, fiber, and B vitamins (thiamine, vitamin B6).</li>
                        </ul>
                        <b className={styles.boldHeading}>Distinct Qualities:</b>
                        <ul>
                            <li>Celebrated for a rich, creamy flavor and smooth texture.</li>
                            <li>Versatile in culinary applications, used in sweet and savory dishes globally.</li>
                            <li>Popular choices include roasted, salted, or as an ingredient in various cuisines.</li>
                        </ul>
                    </div >
                </div >
            </div >
        </div >
    );
};

export default CartCashew;
