'use client'
import Link from "next/link"
import Image from 'next/image';
import styles from './Footer.module.scss'
import insta from '../../imageFolder/footerInsta.png'
import fb from '../../imageFolder/footerFb.png'
import wp from '../../imageFolder/footerWp.png'
import logo from "../../imageFolder/mdfLogo.png";

const whatsappLink = 'https://wa.me/+919157059719';
const webSiteLink = 'http://www.mydryfruit.com'
const faceBookLink = 'https://www.facebook.com/mydryfruit'
const instagramLink = 'https://instagram.com/mydryfruit_com'
const year = process.env.COPYRIGHT_YEAR || "20233"


export default function Footer() {
    return (
        <footer className={styles.container}>
            <div
                className={styles.footer}>
                <div className={styles.main}>

                    <Link href={webSiteLink} className={styles.head}>
                        <Image
                            src={logo}
                            alt='logo'
                            fill={true}
                            style={{ objectFit: "contain" }}
                        />
                        {/* <p className={styles.headp}>My Dry Fruit</p> */}
                    </Link>
                    <Link href='/' className={styles.p11}>
                        MYDRYFRUIT
                    </Link>

                    <p className={styles.p1}>
                        powered by: <span>BITSSHADOW LLP</span>
                    </p>
                    <p className={styles.p1} >
                        519-521 Meridian Business Center, Mota Varachha, Surat, Gujarat 394101
                    </p>

                    <div className={styles.p3}>

                        <Link href={instagramLink} target="_blank" rel="noopener noreferrer">
                            <Image src={insta} className={styles.img} alt="Insta" width={35} height={35} />
                        </Link>

                        <Link href={faceBookLink} target="_blank" rel="noopener noreferrer">
                            <Image src={fb} className={styles.img} alt="Fb" width={35} height={35} />
                        </Link>

                        <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                            <Image src={wp} className={styles.img} alt="Wp" width={35} height={35} />
                        </Link>

                    </div>
                </div>

                <div className={styles.p4}>
                    <div className={styles.h1}>


                        <ul className={styles.ul}>

                            <li>
                                <Link href={"/"} className={styles.gray}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href={"/contactUs"} className={styles.gray}>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href={"/aboutUs"} className={styles.gray}>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className={styles.gray}>
                                    Combos Offer
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.h1}>
                        <ul className={styles.ul}>

                            <li className={styles.li}>
                                <Link href={"/#products"} className={styles.gray}>
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href={"/cart"} className={styles.gray}>
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link href={"/orderList"} className={styles.gray}>
                                    Your Order
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className={styles.gray}>
                                    Best Deals
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={styles.h1}>
                        <ul className={styles.ul}>

                            <li>
                                <Link href={"/privacyPolicy"} className={styles.gray}>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href={"/returnPolicy"} className={styles.gray}>
                                    Return Policy
                                </Link>
                            </li>
                            <li>
                                <Link href={"/termsOfUse"} className={styles.gray}>
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className={styles.gray}>
                                    Gifting
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.copy}>

                <p className={styles.pcopy}>

                    @{`${process.env.COPYRIGHT_YEAR}`} <Link className={styles.span} href={webSiteLink}>MYDRYFRUIT</Link> All Rights Reserved.

                </p>
            </div>
        </footer >
    )
}