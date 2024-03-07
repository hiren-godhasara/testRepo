'use client'

import React, { useState, useEffect } from 'react';
import styles from './ReviewData.module.scss';
import { StaticImageData } from 'next/image';
import Image from 'next/image';
import { Carousel } from 'antd';

interface CardProps {
    name: string;
    designation: string;
    review: string;
    rating: string;
    image: string | StaticImageData;
}

interface ReviewSliderProps {
    reviews: CardProps[];
}

const ReviewData: React.FC<ReviewSliderProps> = ({ reviews }) => {
    const imageWidth = 50;
    const imageHeight = 50;
    const cardWidth = 470;

    const [slidesToShow, setSlidesToShow] = useState<number>(3);

    const handleResize = () => {
        const windowWidth = window.innerWidth;

        if (windowWidth < 977) {
            setSlidesToShow(1);
        } else if (windowWidth < 1280) {
            setSlidesToShow(2);
        } else {
            setSlidesToShow(3);
        }
    };

    useEffect(() => {
        // Initial setup
        handleResize();

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <Carousel
            autoplay
            className={styles.carouselContainer}
            slidesToShow={slidesToShow}
            autoplaySpeed={3000}
            speed={1500}
            dots={false}
            draggable
        >
            {reviews.map((product, index) => (
                <div key={index} className={styles.cardContainer} style={{ width: `${cardWidth}px` }}>
                    <div className={styles.card}>
                        <Image
                            className={styles.image}
                            src={typeof product.image === 'object' ? product.image.src : product.image}
                            alt={`${product.name}, ${product.designation}`}
                            width={imageWidth}
                            height={imageHeight}
                        />
                        <h2 className={styles.h2}>{product.name}</h2>
                        <h3 className={styles.h3}>{product.designation}</h3>
                        <h4 className={styles.h4}>{product.rating}</h4>
                        <p className={styles.p}>{product.review}</p>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default ReviewData;
