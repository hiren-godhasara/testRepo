import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';
import image from '../../imageFolder/myDryFruitLogo-removebg-preview.png';
import { headerCompanyLogo } from '@/S3Images/S3Images';
import { useRouter } from 'next/navigation';
import UserDetails from '../user/UserData';
import userIcon from '../../imageFolder/icons8-user-35.png'
import cartIcon from '../../imageFolder/icons8-cart-35.png'



const Header = () => {
    const router = useRouter()
    const whatsappLink = 'https://wa.me/+919157059719';
    const phoneNumber = "+91 9157059719";
    const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
    const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
    const cartButtonRef = useRef<HTMLButtonElement>(null);


    const handleCartButtonClick = () => {
        setIsCartDropdownOpen(!isCartDropdownOpen);
    };

    const orderListClick = () => {
        router.push('/orderList')
    }

    const openUserDetailsModal = () => {
        setIsUserDetailsModalOpen(true);
    };

    const closeUserDetailsModal = () => {
        setIsUserDetailsModalOpen(false);
    };

    const handleDocumentClick = (event: any) => {
        if (cartButtonRef.current && !cartButtonRef.current.contains(event.target)) {
            setIsCartDropdownOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);
    return (
        <header className={styles.fixedHeader}>
            <div className={styles.header}>
                <div className={styles.leftSection}>
                    <Image src={headerCompanyLogo} width={65} height={65} alt='Home Pagea' className={styles.image} />
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
                    <div className={styles.dropdownContainer}>
                        <button ref={cartButtonRef}
                            className={styles.userBtn}
                            onClick={handleCartButtonClick}>
                            <Image src={userIcon} width={35} height={35} alt='Home Pagea' className={styles.userIcon} />
                        </button>
                        {isCartDropdownOpen && (
                            <div className={styles.cartDropdownContent}>
                                <button onClick={openUserDetailsModal}>User Details</button>
                                <button onClick={orderListClick} >Your Order</button>
                            </div>
                        )}
                    </div>

                    <Link href='/cartList'>
                        <Image src={cartIcon} width={35} height={35} alt='Cart list' title='Cart List' className={styles.cartIcon} />
                    </Link>

                    <Link className={styles.contactUsBtn} href='/registration'>Register</Link>
                    <Link className={styles.contactUsBtn} href='/login'>Login</Link>




                </div>
            </div>
            {isUserDetailsModalOpen && (
                <UserDetails onClose={closeUserDetailsModal} />
            )}
        </header>
    );
};

export default Header;
