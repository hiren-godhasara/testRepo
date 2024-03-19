// 'use client'

import React from 'react';

import styles from './AboutUs.module.scss';




const AboutUs = () => {
    return (
        <div className={styles.aboutContainer}>
            <div className={styles.detailsContainer}>
                <h1 className={styles.head}>About Us</h1>
                <p>At Bitsshadow LLP, we proudly present &quot;MyDryFruit&quot; our distinguished brand renowned for its superior quality dry fruits. As pioneers in the industry, we specialize in processing, sorting, and repackaging an extensive assortment of premium dry fruits. Our dedication to excellence drives us to meticulously grade, package, and market these products, guaranteeing our customers unparalleled quality and satisfaction.</p>
                <br /> <div className={styles.details1}>
                    <div className={styles.p}>Our Mission:</div> <br />
                    <p>At Bitsshadow, our mission is to bring you the finest selection of dry fruits, curated to meet your cravings anytime, anywhere. We understand the importance of offering top-quality products that not only satiate your snack desires but also promote a balanced and active lifestyle. Our commitment is to provide you with nutritious delights that not only please your palate but also nourish your body, empowering you to enjoy life to the fullest.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>Quality Assurance:</div> <br />
                    <p>Under the banner of MyDryFruit, we guarantee the highest standards of hygiene and quality for all our products. Each dry fruit undergoes a rigorous process of processing and grading within our state-of-the-art facilities. We are committed to providing our customers with dry fruits that are not only delicious but also meet the highest quality standards.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>Product Range:</div> <br />
                    <p>Explore the exquisite range of MyDryFruit products, showcasing a diverse assortment of flavors meticulously crafted to elevate your breakfasts and evening snacks. Whether you seek to invigorate a weary day or prepare a nutritious feast, our dry fruits are the ultimate choice. With a wide array of products available in preferred quantity packaging and weight options, we ensure convenience and satisfaction in every purchase.</p>
                </div>

                <div className={styles.details1}>
                    <div className={styles.p}>Customer Satisfaction:</div> <br />
                    <p>At Bitsshadow, we prioritize customer satisfaction and aim to be your first choice when it comes to fulfilling your dry fruit needs. Our commitment to delivering top-notch products is reflected in every bite of our MyDryFruit offerings. With a dedicated focus on quality assurance and prompt customer support, we strive to exceed your expectations and build lasting relationships based on trust and excellence. Your satisfaction is not just our goal; it&apos;s our driving force. </p>
                </div>


            </div>

        </div>
    );
};

export default AboutUs;


