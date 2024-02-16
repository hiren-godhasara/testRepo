import React from 'react';
import styles from './Footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import linkedin from '../../imageFolder/linkedinlogo.png';
import fb from '../../imageFolder/fb.png'
import insta from '../../imageFolder/insta.png'
import twitter from '../../imageFolder/icons8-twitter-circled-40.png'
import CopyRight from '../copyRight/CopyRight';


const whatsappLink = 'https://wa.me/+919157059719';
const webSiteLink = 'http://www.mydryfruits.com'
const faceBookLink = 'https://www.facebook.com/mydryfruit'
const instagramLink = 'https://instagram.com/mydryfruit_com'
const Footer = () => {
    return (
        <footer >
            <div className={styles.footer}>
                <div className={styles.mainFooter}>

                    <section className={styles.sectionInfo}>
                        <Link className={styles.linkH2} href={webSiteLink}><h2>MY DRYFRUIT</h2> </Link>
                        <p className={styles.letterspacing} style={{ fontSize: '18px' }}>BITSSHADOW LLP</p>
                        <p className={styles.letterspacing}>Phone: +919157059719</p>
                        <p className={styles.letterspacing}>519-522 MBC, Lajamni Chowk, opposite Opera Business center, Shanti Niketan Society, Mota Varachha, Surat, Gujarat 394105</p>
                        <p className={styles.imageP}>
                            <Link className={styles.linkP} href={faceBookLink}><Image className={styles.fb} src={fb} alt='Home Page' width='40' height='40' /></Link>
                            <Link className={styles.linkP} href="/"><Image className={styles.twitter} src={twitter} alt='Home Page' width='40' height='40' /></Link>
                            <Link className={styles.linkP} href={instagramLink}><Image className={styles.insta} src={insta} alt='Home Page' width='40' height='40' /></Link>
                            <Link className={styles.linkP} href="/"><Image className={styles.linkedin} src={linkedin} alt='Home Page' width='40' height='40' /></Link>
                        </p>

                    </section>

                    <section className={styles.section}>
                        <Link className={styles.linkP} href={whatsappLink}><p>Home</p></Link>
                        <br />
                        <Link className={styles.linkP} href={`/#${encodeURIComponent("productDetail")}`}><p>Contact Us</p></Link>
                        <br />
                        <Link className={styles.linkP} href={`/#${encodeURIComponent("gifting")}`}><p>About Us</p></Link>
                    </section>
                    <section className={styles.section}>
                        <Link className={styles.linkP} href={whatsappLink}><p>Product</p></Link>
                        <br />
                        <Link className={styles.linkP} href={`/#${encodeURIComponent("productDetail")}`}><p>Cart</p></Link>
                        <br />
                        <Link className={styles.linkP} href={`/#${encodeURIComponent("gifting")}`}><p>Your Order</p></Link>
                    </section>
                    <section className={styles.section}>
                        <Link className={styles.linkP} href={`/products/almond250`}><p>Privacy Policy</p></Link>
                        <br />
                        <Link className={styles.linkP} href={`/products/almond250`}><p>Return Policy</p></Link>
                        <br />
                        <Link className={styles.linkP} href={`/products/almond250`}><p>Terms & Condition </p></Link>
                    </section>
                </div>
            </div>
            <div>
                <CopyRight />
            </div>
        </footer >
    );
};

export default Footer;
