'use client'

import React from 'react';

import styles from './AboutUs.module.scss';




const AboutUs = () => {
    return (
        <div className={styles.aboutContainer}>
            <div className={styles.detailsContainer}>
                <h1 className={styles.head}>About Us</h1>
                <p >At Bitsshadow, we take pride in being a leading manufacturer, processor, and trader of a diverse range of high-quality dry fruits under our esteemed brand name &quot;MyDryFruit.&quot; With a commitment to excellence, we engage in the meticulous processing, grading, packaging, and marketing of a wide variety of dry fruits and spices, ensuring that our customers receive nothing but the best.</p>
                <br /> <div className={styles.details1}>
                    <div className={styles.p}>Our Mission:</div> <br />
                    <p>At Bitsshadow, we are dedicated to delivering wholesome and nutritious dry fruits to satisfy your cravings at any time of the day. We understand the importance of offering premium products that not only curb your odd-hour cravings but also contribute to a healthy and energetic lifestyle.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>Quality Assurance:</div> <br />
                    <p>Under the banner of MyDryFruit, we guarantee the highest standards of hygiene and quality for all our products. Each dry fruit undergoes a rigorous process of processing and grading within our state-of-the-art facilities. We are committed to providing our customers with dry fruits that are not only delicious but also meet the highest quality standards.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>Product Range:</div> <br />
                    <p>Explore the exquisite range of MyDryFruit products, featuring the finest assortment of flavors to enhance your breakfasts and evening snacks. Whether you are looking to add a boost to your tiresome day or preparing a healthy feast, our dry fruits are the perfect choice.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>Customer Satisfaction:</div> <br />
                    <p>At Bitsshadow, we prioritize customer satisfaction and aim to be your first choice when it comes to fulfilling your dry fruit needs. Our commitment to delivering top-notch products is reflected in every bite of our MyDryFruit offerings. </p>
                </div>


            </div>

        </div>
    );
};

export default AboutUs;


