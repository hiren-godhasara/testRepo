import React from 'react';
import styles from '../cartDryfruitsDetails/CartDryfruitsDetails.module.scss';
import { MazafatiSlider } from '../cartDryfruitsDetails/CartSlider';

const CartMazafatDates: React.FC = () => {
    return (
        <div className={styles.pageWrapper}>

            <div id='mazafatiDates' className={styles.mazafatiDates}></div>
            <div className={styles.main}>

                <div className={styles.slider}><MazafatiSlider /></div>
                <div className={styles.details}>
                    <div className={styles.heading}>MAZAFATI DATES</div>
                    <div className={styles.insidedetails1}>
                        <b className={styles.boldHeading}>Description:</b>
                        <ul>
                            <li>I have been a wholesale supplier of high-quality dry fruits for the past 5 years. Purchase from us and savor the finest selection!</li>
                        </ul>
                        <b className={styles.boldHeading}>Origin:</b>
                        <ul>
                            <li> Primarily cultivated in the southern regions of Iran, particularly renowned for their cultivation in the Bam region.</li>
                            <li>The climate and soil conditions in these regions contribute to the unique flavor and texture of Mazafati dates.</li>
                        </ul>
                        <b className={styles.boldHeading}>Unique Characteristic:</b>
                        <ul>
                            <li>Mazafati dates sleek, shiny black skin is a unique characteristic that sets them apart in terms of appearance.</li>
                            <li>The ease with which the skin peels away adds to the premium quality of Mazafati dates.</li>
                        </ul>
                        <b className={styles.boldHeading}>Nutritional Benefits:</b>
                        <ul>
                            <li> Mazafati dates are high in iron, essential for maintaining healthy blood circulation and preventing anemia.</li>
                            <li> Rich in natural sugars, providing a quick and natural energy boost.</li>
                            <li>The nutritional richness makes Mazafati dates a perfect choice for those seeking both exquisite taste and health benefits.</li>
                        </ul>
                        <b className={styles.boldHeading}>Distinct Qualities:</b>
                        <ul>
                            <li> Mazafati dates are characterized by their abundant juiciness, enhancing the overall eating experience.</li>
                            <li> Each bite offers a refreshing experience, making them a satisfying and luxurious treat.</li>
                            <li> The unique combination of sweetness, juiciness, and nutritional richness distinguishes Mazafati dates as a premium variety appealing to a wide range of consumers.</li>
                        </ul>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default CartMazafatDates;
