import React from 'react';
import styles from './Footer.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import linkedin from '../../imageFolder/linkedinlogo.png';
import fb from '../../imageFolder/fb.png'
import insta from '../../imageFolder/insta.png'
import twitter from '../../imageFolder/icons8-twitter-circled-40.png'


const whatsappLink = 'https://wa.me/+919157059719';
const webSiteLink = 'http://www.mydryfruits.com'
const faceBookLink = 'https://www.facebook.com/mydryfruit'
const instagramLink = 'https://instagram.com/mydryfruit_com'
const Footer = () => {
    return (
        <footer className={styles.footer}>


            <div className={styles.mainFooter}>

                <section className={styles.sectionInfo}>
                    <Link className={styles.linkH2} href={webSiteLink}><h2>MyDryFruit<span>.com</span></h2> </Link>

                    <p className={styles.letterspacing}>The variety of products available at our store at the moment is vast,but we still continue to widen our assortment.</p>
                    <p className={styles.imageP}>
                        <Link className={styles.linkP} href={faceBookLink}><Image className={styles.fb} src={fb} alt='Home Page' width='40' height='40' /></Link>
                        <Link className={styles.linkP} href="/"><Image className={styles.twitter} src={twitter} alt='Home Page' width='40' height='40' /></Link>
                        <Link className={styles.linkP} href={instagramLink}><Image className={styles.insta} src={insta} alt='Home Page' width='40' height='40' /></Link>
                        <Link className={styles.linkP} href="/"><Image className={styles.linkedin} src={linkedin} alt='Home Page' width='40' height='40' /></Link>
                    </p>

                </section>

                <section className={styles.section}>
                    <Link className={styles.linkP} href={whatsappLink}><p>Contact Us</p></Link>
                    <br />
                    <Link className={styles.linkP} href={`/#${encodeURIComponent("productDetail")}`}><p>All Products</p></Link>
                    <br />
                    <Link className={styles.linkP} href={`/#${encodeURIComponent("gifting")}`}><p> Gifting</p></Link>
                    <br />
                    <Link className={styles.linkP} href={`/#${encodeURIComponent("reviews")}`}><p>Reviews</p></Link>
                </section>

                <section className={styles.section}>
                    <Link className={styles.linkP} href={`/products/mazafatiDates`}><p>Mazafati</p></Link>
                    <br />
                    <Link className={styles.linkP} href={`/products/khalasDates`}><p>Khalas</p></Link>
                    <br />
                    <Link className={styles.linkP} href={`/products/fardDates`}><p>Fard</p></Link>
                    <br />
                    <Link className={styles.linkP} href={`/products/medjoolDates`}><p>Medjool</p></Link>

                </section>

                <section className={styles.section}>
                    <Link className={styles.linkP} href={`/products/almond`}><p>Almond</p></Link>
                    <br />
                    <Link className={styles.linkP} href={`/products/cashew`}><p>Cashew</p></Link>
                    <br />
                    <Link className={styles.linkP} href={`/products/pistachio`}><p>Pistachio</p></Link>
                    <br />
                    <Link className={styles.linkP} href={`/products/figs`}><p>Figs</p></Link>

                </section>

                <section className={styles.section}>
                    <Link className={styles.linkP} href={`/#${encodeURIComponent("")}`}><p>Home</p></Link>
                    <br />
                    <Link className={styles.linkP} href={`/registration`}><p>Registartion</p></Link>
                    <br />
                    <Link className={styles.linkP} href={`/login`}><p>Login</p></Link>
                    <br />
                    <Link className={styles.linkP} href={`/#${encodeURIComponent("products")}`}><p>Privacy Policy</p></Link>
                </section>

            </div>

        </footer >
    );
};

export default Footer;
