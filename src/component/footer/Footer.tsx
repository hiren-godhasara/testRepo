// import React from 'react';
// import styles from './Footer.module.scss';
// import Link from 'next/link';
// import Image from 'next/image';
// import linkedin from '../../imageFolder/linkedinlogo.png';
// import fb from '../../imageFolder/fb.png'
// import insta from '../../imageFolder/insta.png'
// import twitter from '../../imageFolder/icons8-twitter-circled-40.png'
// import CopyRight from '../copyRight/CopyRight';


// const whatsappLink = 'https://wa.me/+919157059719';
// const webSiteLink = 'http://www.mydryfruits.com'
// const faceBookLink = 'https://www.facebook.com/mydryfruit'
// const instagramLink = 'https://instagram.com/mydryfruit_com'
// const Footer = () => {
//     return (
//         <footer >
//             <div className={styles.footer}>
//                 <div className={styles.mainFooter}>

//                     <section className={styles.sectionInfo}>
//                         <Link className={styles.linkH2} href={webSiteLink}><h2>MY DRYFRUIT</h2> </Link>
//                         <p className={styles.letterspacing} style={{ fontSize: '18px' }}>BITSSHADOW LLP</p>
//                         <p className={styles.letterspacing}>Phone: +919157059719</p>
//                         <p className={styles.letterspacing}>519-522 MBC, Lajamni Chowk, opposite Opera Business center, Shanti Niketan Society, Mota Varachha, Surat, Gujarat 394105</p>
//                         <p className={styles.imageP}>
//                             <Link className={styles.linkP} href={faceBookLink}><Image className={styles.fb} src={fb} alt='Home Page' width='40' height='40' /></Link>
//                             <Link className={styles.linkP} href="/"><Image className={styles.twitter} src={twitter} alt='Home Page' width='40' height='40' /></Link>
//                             <Link className={styles.linkP} href={instagramLink}><Image className={styles.insta} src={insta} alt='Home Page' width='40' height='40' /></Link>
//                             <Link className={styles.linkP} href="/"><Image className={styles.linkedin} src={linkedin} alt='Home Page' width='40' height='40' /></Link>
//                         </p>

//                     </section>

//                     <section className={styles.section}>
//                         <Link className={styles.linkP} href={whatsappLink}><p>Home</p></Link>
//                         <br />
//                         <Link className={styles.linkP} href={`/contactUs`}><p>Contact Us</p></Link>
//                         <br />
//                         <Link className={styles.linkP} href={`/aboutUs`}><p>About Us</p></Link>
//                     </section>
//                     <section className={styles.section}>
//                         <Link className={styles.linkP} href={`/#${encodeURIComponent("products")}`}><p>Product</p></Link>
//                         <br />
//                         <Link className={styles.linkP} href={`/cartList`}><p>Cart</p></Link>
//                         <br />
//                         <Link className={styles.linkP} href={`/orderList`}><p>Your Order</p></Link>
//                     </section>
//                     <section className={styles.section}>
//                         <Link className={styles.linkP} href={`/privacyPolicy`}><p>Privacy Policy</p></Link>
//                         <br />
//                         <Link className={styles.linkP} href={`/returnPolicy`}><p>Return Policy</p></Link>
//                         <br />
//                         <Link className={styles.linkP} href={`/termsOfUse`}><p>Terms & Condition </p></Link>
//                     </section>
//                 </div>
//             </div>
//             <div>
//                 <CopyRight />
//             </div>
//         </footer >
//     );
// };

// export default Footer;



import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import Image from 'next/image';
import styles from './Footer.module.scss'
import insta from '../../imageFolder/footerInsta.png'
import fb from '../../imageFolder/footerFb.png'
import wp from '../../imageFolder/footerWp.png'

const whatsappLink = 'https://wa.me/+919157059719';
const webSiteLink = 'http://www.mydryfruits.com'
const faceBookLink = 'https://www.facebook.com/mydryfruit'
const instagramLink = 'https://instagram.com/mydryfruit_com'

export default function FooterDemo() {
    return (
        <footer className={styles.container}>
            <div
                className={styles.footer}>
                <div className={styles.main}>

                    <Link href={webSiteLink} className={styles.head}>
                        My Dry Fruit
                    </Link>
                    <p className={styles.p1}>

                        517-518 MBC, Lajamni Chowk, Shanti Niketan Society, Mota Varachha, Surat, Gujarat 394101
                    </p>

                    <div className={styles.p3}>

                        <Link href={instagramLink}>
                            <Image src={insta} className={styles.img} alt="Insta" width={35} height={35} />
                        </Link>

                        <Link href={faceBookLink}>
                            <Image src={fb} className={styles.img} alt="Fb" width={35} height={35} />
                        </Link>

                        <Link href={whatsappLink}>
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
                                    Link 4
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
                                    Link 4
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.copy}>

                <p className={styles.pcopy}>

                    @2024 All rights reserved by your website.
                </p>
            </div>
        </footer >
    )
}