'use client'
import React, { useEffect, useState } from 'react';
import styles from './InstagramFeed.module.scss';
import axios from 'axios';
import { Carousel } from 'antd';
import Image from 'next/image';
import companyLogo from '../../imageFolder/mdfLogo.png'
import like from '../../imageFolder/heart.png'
import comment from '../../imageFolder/comment.png'
import share from '../../imageFolder/share.png'
import dots from '../../imageFolder/dots.png'
import save from '../../imageFolder/saveIcon.png'
import Link from 'next/link';


interface InstagramFeed {
    id: string;
    media_type: 'IMAGE' | 'VIDEO';
    media_url: string;
    permalink: string;
    caption: string;
    timestamp: string;
}

const fetchInstagramFeeds = async (accessToken: string, count: Number) => {
    try {
        const response = await axios.get(
            `https://graph.instagram.com/v12.0/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}&limit=${count}`
        );
        return response.data.data;
    } catch (error) {
        console.error('Error fetching Instagram feeds:', error);
        return [];
    }
};

const InstagramFeeds: React.FC = () => {
    const [feeds, setFeeds] = useState<InstagramFeed[]>([]);
    const [slidesToShow, setSlidesToShow] = useState<number>(3);

    const accessToken = 'IGQWRNS2RYcW9yUFhXNEg5b19RLWo5aHZA1OWRfMUkzQXFONnZALT0VMcnY5X1NOUkRvemlTb1VVTDhZAaC12X3pCZAHZASbUpNZAFQ4Q3psSl9FNkRjQWRqOUdkYzFIa3FBa0VFbFdyNnFIV0ZAzdzk4bkw2cEFDOUVTemMZD';


    const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth < 765) {
            setSlidesToShow(1);
        } else if (windowWidth < 990) {
            setSlidesToShow(2);
        } else if (windowWidth < 1280) {
            setSlidesToShow(3);
        } else if (windowWidth < 1320) {
            setSlidesToShow(3)
        } else {
            setSlidesToShow(4);
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        fetchInstagramFeeds(accessToken, 10)
            .then((data) => setFeeds(data))
            .catch((error) => console.error('Error setting Instagram feeds:', error));
    }, []);

    // const filteredArray = feeds.filter(item => !item.caption || !item.caption.includes(hashtag));

    const finalArray = feeds

    return (
        <div className={styles.instagramFeedArea}>
            <h1 className={styles.h1}>Instagram Feeds</h1>
            <Carousel
                slidesToShow={slidesToShow}
                autoplay
                draggable
                autoplaySpeed={3500}
                speed={1500}
                dots={false}
                className={styles.card}
            >
                {finalArray.map((feed) => (
                    <div key={feed.id} >
                        <div key={feed.id} className={styles.feedBackContainer}>
                            <Link href={feed.permalink} target="_blank" rel="noopener noreferrer">
                                <div className={styles.feedBackWrapper}>
                                    <div className={styles.feedBackHeader}>
                                        <div style={{ marginLeft: '0.2rem' }}>
                                            <Image src={companyLogo} alt="Image1" width={50} height={50} className={styles.companyLogo} />
                                        </div>
                                        <p className={styles.feedBackHeading}>mydryfruit_com</p>
                                    </div>
                                    <div>
                                        <Image src={dots} alt="Image2" width={25} height={25} style={{ marginRight: '0' }} />
                                    </div>
                                </div>
                                <div className={styles.feedBackImageArea}>
                                    <Image src={feed.media_url} width={220} height={205} alt={feed.caption || 'imagesInsta'} className={styles.feedImg} />
                                </div>
                                <div className={styles.mainIcon}>
                                    <div className={styles.icons}>
                                        <Image src={like} alt="Image3" width={28} height={28} className={styles.like} />
                                        <Image src={comment} alt="Image4" width={25} height={25} className={styles.comment} />
                                        <Image src={share} alt="Image5" width={25} height={25} className={styles.share} />
                                    </div>
                                    <div className={styles.saveIcon}>
                                        <Image src={save} alt="Image6" width={28} height={28} className={styles.save} />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))
                }
            </Carousel >
        </div>
    );
};

export default InstagramFeeds;
