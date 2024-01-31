import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';
import image from '../../images/myDryFruitLogo-removebg-preview.png';


const Header = () => {
    const whatsappLink = 'https://wa.me/+919157059719';

    return (
        <header className={styles.fixedHeader}>
            <div className={styles.header}>
                <div className={styles.leftSection}>
                    <Image src={image} alt='Home Pagea' className={styles.image} />
                    <div className={styles.leftSectionName}>MYDRYFRUIT</div>
                </div>

                <div className={styles.middleSection}>
                    <ul className={styles.navList}>
                        <li><Link className={styles.link} href="/">Home</Link></li>
                        <li><Link className={styles.link} href="/#about">About Us</Link></li>
                        <li><Link className={styles.link} href="/#products">Products</Link></li>
                        <li><Link className={styles.link} href="/#deals">Best Deals</Link></li>
                        <li><Link className={styles.link} href="/#store">Store</Link></li>
                        <li><Link className={styles.link} href="/#gifting">Gifting</Link></li>
                    </ul>
                </div>

                <div className={styles.rightSection}>
                    <p className={styles.number}><span>Mo.</span> <Link className={styles.mobileNumber} href="">+91 9157059719</Link></p>

                    <Link className={styles.contactUsBtn} href={whatsappLink}>Contact Us</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
