'use client'
import React, { useState, useEffect } from 'react';
import styles from './KeyWords.module.scss';
import Link from 'next/link';
import Marquee from "react-fast-marquee";

const SlidingCarousel = () => {

    // const btn = () => {
    //     localStorage.setItem("productId", "65e6fd05c8e4f16395e10850")
    // }

    return (
        <div className={styles.container}>
            <Marquee>
                <Link href='/products/almond'> <p>almond 500 gm prices</p></Link>
                <Link href='/#products'> <p>kaju 500 gm price</p></Link>
                <Link href='/#products'> <p>cashew 500 gm price</p></Link>
                <Link href='/#products'> <p>badam 500 gm price</p></Link>
                <Link href='/#products'> <p>premium almond</p></Link>
                <Link href='/#products'> <p>almond 500 gm price</p></Link>
                <Link href='/#products'> <p>dry fruit combo pack</p></Link>
                <Link href='/#products'> <p>pista 500 gm price</p></Link>
                <Link href='/#products'> <p>almond 500 gm price</p></Link>
                <Link href='/#products'> <p>almond and kaju</p></Link>
                <Link href='/#products'> <p>almond 500 gm price</p></Link>
                <Link href='/#products'> <p>premium california almond</p></Link>
                <Link href='/#products'> <p>almond 500 gm price</p></Link>
                <Link href='/#products'> <p>dry fruits small packet</p></Link>
            </Marquee>
        </div>
    );
};

export default SlidingCarousel;
