import { headerCompanyLogo } from '@/S3Images/S3Images'
import styles from './Header.module.scss';
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import useWindowSize from '../hooks/useWindowsize';
import Link from 'next/link';
import cartIcon from '../../imageFolder/icons8-cart-35.png'
import userIcon from '../../imageFolder/icons8-user-35.png'
import { Drawer } from 'antd';
import { useRouter } from 'next/navigation';
import { getToken, removeToken } from '@/getLocalStroageToken';
import { getUserId, removeUserId } from '@/getLocalStroageUserId';
import UserDetails from '../user/UserData';
import cart from '../../../public/cart.svg'
import TagLine from '../tagLine/TagLine';

const Header = () => {
    const isMediumScreen = useWindowSize().mediumScreen
    const cartButtonRef = useRef<HTMLButtonElement>(null);
    const [isMenuShown, setIsMenuShown] = useState(false)
    const [productDetails, setProductDetails] = useState('');
    const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
    const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false);
    const router = useRouter()
    const token = getToken();
    const userId = getUserId();

    useEffect(() => {
        fetchCartData();
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const fetchCartData = () => {
        fetch(`${process.env.BASE_URL}/s/cartProduct/cartProductList/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({}),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {

                const cartProductIds = data.data.productList.map((item: any) => item.cartProductId);
                if (data.data.productList) {
                    const cartItems = cartProductIds.length
                    setProductDetails(cartItems);
                    console.log(cartItems);
                } else {
                    setProductDetails('0');
                }

            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
    };
    const handleDocumentClick = (event: any) => {
        if (cartButtonRef.current && !cartButtonRef.current.contains(event.target)) {
            setIsCartDropdownOpen(false);
        }
    };
    const handleCartButtonClick = () => {
        setIsCartDropdownOpen(!isCartDropdownOpen);
    }
    const openUserDetailsModal = () => {
        setIsUserDetailsModalOpen(true);
    };
    const handleDrawerOpen = () => {
        setIsMenuShown(true)
    }
    const closeUserDetailsModal = () => {
        setIsUserDetailsModalOpen(false);
    };
    const orderListClick = () => {
        router.push('/orderList')
    }
    const onLogoutBtn = () => {
        logout();
    }
    const logout = () => {
        fetch(`${process.env.BASE_URL}/s/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                userId: userId,
                token: token
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                if (data) {
                    removeToken();
                    removeUserId();
                    window.location.reload();
                    window.location.href = '/'
                }

            })
            .catch(error => {
                console.error('There was a problem fetching the data:', error);
            });
    };

    return (
        <div className={styles.mainHeaderWrapper}>
            <TagLine />
            <div className={styles.header}>
                {isMediumScreen &&
                    <div className={styles.mediumScreenHeaderarea}>
                        <div style={{ cursor: 'pointer' }} onClick={() => handleDrawerOpen()}>
                            <svg height={30} width={25} viewBox="0 0 22 14" xmlns="http://www.w3.org/2000/svg">                            <path d="M21 7L1 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 13L1 13" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 1L1 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div className={styles.mediumScreenSectionOne} >
                            <Image src={headerCompanyLogo} width={45} height={45} alt='Home Pagea' className={styles.image} />

                            <div className={styles.drawerHeaderNameSection}>MYDRYFRUIT</div>
                        </div>

                        {token &&
                            <div className={styles.mediumScreenSectionTwo}>
                                <Link href='/cart'>
                                    {/* <Image src={cartIcon} width={35} height={35} alt='Cart list' title='Cart List' className={styles.cartIcon} /> */}
                                    <Image src={cart} width={38} height={38} alt='Cart list' title='Cart List' />
                                </Link>
                                {productDetails && <p className={styles.cartItem}>{productDetails}</p>}
                                <div className={styles.rightSection}>
                                    <button ref={cartButtonRef}
                                        onClick={handleCartButtonClick}>
                                        <Image src={userIcon} width={30} height={30} alt='Home Pagea' className={styles.userIcon} />
                                    </button>
                                    {isCartDropdownOpen && (
                                        <div className={styles.cartDropdownContent} style={{ top: '3.5rem ' }}>
                                            <button onClick={openUserDetailsModal}>User Details</button>
                                            <button onClick={orderListClick} >Your Order</button>
                                            <button onClick={onLogoutBtn} >Log Out</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                }
                {isMenuShown &&
                    <Drawer
                        open={isMenuShown}
                        closable={false}
                        width={200}
                        placement='left'
                        onClose={() => setIsMenuShown(false)}
                        title={
                            <div style={{ direction: 'rtl' }}>
                                <div onClick={() => setIsMenuShown(false)}>
                                    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.64341 6.99901L13.6552 1.99813C13.8747 1.77862 13.998 1.48091 13.998 1.17048C13.998 0.860046 13.8747 0.562331 13.6552 0.342824C13.4358 0.123318 13.1381 0 12.8277 0C12.5173 0 12.2196 0.123318 12.0002 0.342824L7 5.35536L1.99983 0.342824C1.78036 0.123318 1.48268 -2.31288e-09 1.1723 0C0.861913 2.31288e-09 0.56424 0.123318 0.344765 0.342824C0.125289 0.562331 0.00198911 0.860046 0.00198911 1.17048C0.00198911 1.48091 0.125289 1.77862 0.344765 1.99813L5.35659 6.99901L0.344765 11.9999C0.235521 12.1083 0.148811 12.2372 0.0896384 12.3792C0.0304655 12.5213 0 12.6736 0 12.8275C0 12.9814 0.0304655 13.1338 0.0896384 13.2758C0.148811 13.4179 0.235521 13.5468 0.344765 13.6552C0.453117 13.7644 0.582027 13.8512 0.724059 13.9103C0.866091 13.9695 1.01843 14 1.1723 14C1.32616 14 1.47851 13.9695 1.62054 13.9103C1.76257 13.8512 1.89148 13.7644 1.99983 13.6552L7 8.64265L12.0002 13.6552C12.1085 13.7644 12.2374 13.8512 12.3795 13.9103C12.5215 13.9695 12.6738 14 12.8277 14C12.9816 14 13.1339 13.9695 13.2759 13.9103C13.418 13.8512 13.5469 13.7644 13.6552 13.6552C13.7645 13.5468 13.8512 13.4179 13.9104 13.2758C13.9695 13.1338 14 12.9814 14 12.8275C14 12.6736 13.9695 12.5213 13.9104 12.3792C13.8512 12.2372 13.7645 12.1083 13.6552 11.9999L8.64341 6.99901Z" fill={'#000000'} />
                                    </svg>
                                </div>
                            </div>
                        }>
                        <div className={styles.antDrawerBody}>
                            <ul className={styles.drawerMenuItems}>
                                <li><Link className={styles.drawerLink} onClick={() => setIsMenuShown(false)} href="/">Home</Link></li>
                                <li><Link className={styles.drawerLink} onClick={() => setIsMenuShown(false)} href="/#about">About Us</Link></li>
                                <li><Link className={styles.drawerLink} onClick={() => setIsMenuShown(false)} href="/#products">Products</Link></li>
                                <li><Link className={styles.drawerLink} onClick={() => setIsMenuShown(false)} href="/#deals">Best Deals</Link></li>
                                <li><Link className={styles.drawerLink} onClick={() => setIsMenuShown(false)} href="/#store">Store</Link></li>
                                <li><Link className={styles.drawerLink} onClick={() => setIsMenuShown(false)} href="/#gifting">Gifting</Link></li>
                            </ul>
                            <div className={styles.antDrawerBtn}>
                                {!token && <Link className={styles.contactUsBtn} href='/registration'>Register</Link>}
                                {!token && <Link className={styles.contactUsBtn} href='/login'>Login</Link>}
                            </div>
                        </div>
                    </Drawer>
                }

                {!isMediumScreen &&
                    <div className={`${styles.fullScreenHeader} maxScreenWidth`}>
                        <div className={styles.leftSection}>
                            <Image src={headerCompanyLogo} width={50} height={50} alt='Home Pagea' className={styles.image} />
                            <div className={styles.leftSectionName}>MYDRYFRUIT</div>
                        </div>
                        <div className={styles.headerLinkWrapper}>
                            <Link className={styles.headerLink} onClick={() => setIsMenuShown(false)} href="/">Home</Link>
                            <Link className={styles.headerLink} onClick={() => setIsMenuShown(false)} href="/#about">About Us</Link>
                            <Link className={styles.headerLink} onClick={() => setIsMenuShown(false)} href="/#products">Products</Link>
                            <Link className={styles.headerLink} onClick={() => setIsMenuShown(false)} href="/#deals">Best Deals</Link>
                            <Link className={styles.headerLink} onClick={() => setIsMenuShown(false)} href="/#store">Store</Link>
                            <Link className={styles.headerLink} onClick={() => setIsMenuShown(false)} href="/#gifting">Gifting</Link>
                        </div>
                        {!token &&
                            <div className={styles.headerButtonsWrapper}>
                                <Link href='/registration' className={styles.contactUsBtn}>Register</Link>
                                <Link href='/login' className={styles.contactUsBtn}>Login</Link>
                            </div>
                        }
                        {token &&
                            <div className={styles.mediumScreenSectionTwo}>
                                <Link href='/cart'>
                                    <Image src={cart} width={38} height={40} alt='Cart list' title='Cart List' />
                                </Link>
                                {productDetails && <p className={styles.cartItem}>{productDetails}</p>}
                                <div className={styles.rightSection}>
                                    <button ref={cartButtonRef}
                                        onClick={handleCartButtonClick}>
                                        <Image src={userIcon} width={35} height={35} alt='Home Pagea' />
                                    </button>
                                    {isCartDropdownOpen && (
                                        <div className={styles.cartDropdownContent} style={{ top: '5rem ' }}>
                                            <button onClick={openUserDetailsModal}>User Details</button>
                                            <button onClick={orderListClick} >Your Order</button>
                                            <button onClick={onLogoutBtn} >Log Out</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        }
                        {isUserDetailsModalOpen && (
                            <UserDetails onClose={closeUserDetailsModal} />
                        )}
                    </div>
                }
            </div>
        </div>
    )
}


export default Header;
