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

const HashtagInstagramFeeds: React.FC = () => {
    const [feeds, setFeeds] = useState<InstagramFeed[]>([]);
    const [slidesToShow, setSlidesToShow] = useState<number>(3);

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


    const fetchInstagramFeeds = async () => {
        fetch(`${process.env.BASE_URL}/s/instagram/posts`, {
            method: 'GET',
        }).then(response => {
            console.log(response);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
            .then(data => {
                setFeeds(data?.data)
                console.log(data.data);
            })
            .catch(error => {
                console.error('There was a problem fetching Instgram the data:', error);
            });

    }

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        fetchInstagramFeeds()
    }, []);

    const ary = feeds.filter(obj => obj.caption && obj.caption.includes("#feedback"));


    return (
        <div className={styles.instagramFeedArea1}>
            {/* <h1 className={styles.h2}>Instagram Customer Reviews</h1> */}
            <Carousel
                slidesToShow={slidesToShow}
                autoplay
                draggable
                autoplaySpeed={3500}
                speed={1500}
                dots={false}
                className={styles.card}
            >
                {ary.map((feed) => (
                    <div key={feed.id} >
                        <div key={feed.id} className={styles.feedBackContainer}>
                            <Link href={feed.permalink} target="_blank" rel="noopener noreferrer">
                                <div className={styles.feedBackWrapper}>
                                    <div className={styles.feedBackHeader}>
                                        <div style={{ marginLeft: '0.2rem' }}>
                                            <Image src={companyLogo} alt="Image" width={50} height={50} className={styles.companyLogo} />
                                        </div>
                                        <p className={styles.feedBackHeading}>mydryfruit_com</p>
                                    </div>
                                    <div>
                                        <Image src={dots} alt="Image" width={25} height={25} style={{ marginRight: '0' }} />
                                    </div>
                                </div>
                                <div className={styles.feedBackImageArea}>
                                    {feed.media_type === 'VIDEO' ? (
                                        <video width={220} height={205} autoPlay controls className={styles.feedImg}>
                                            <source src={feed.media_url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <img src={feed.media_url} width={220} height={205} alt={feed.caption || 'imagesInsta'} className={styles.feedImg} />
                                    )}

                                    {/* <Image src={feed.media_url} width={220} height={205} alt={feed.caption || 'imagesInsta'} className={styles.feedImg} /> */}
                                </div>
                                <div className={styles.mainIcon}>
                                    <div className={styles.icons}>
                                        <Image src={like} alt="Image" width={28} height={28} className={styles.like} />
                                        <Image src={comment} alt="Image" width={25} height={25} className={styles.comment} />
                                        <Image src={share} alt="Image" width={25} height={25} className={styles.share} />
                                    </div>
                                    <div className={styles.saveIcon}>
                                        <Image src={save} alt="Image" width={28} height={28} className={styles.save} />
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

export default HashtagInstagramFeeds;
